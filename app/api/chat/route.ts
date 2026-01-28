import { NextRequest } from "next/server";
import Groq from "groq-sdk";
import { portfolioData } from "@/lib/portfolio-data";

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

// Enhanced system prompt for intelligent, varied responses
const getSystemPrompt = (isBatmanMode = false) => {
  const { personal, skills, experience, projects, education, chatGuidelines } = portfolioData;

  if (isBatmanMode) {
    return `You are an AI assistant with a SECRET. Give mysterious, subtle hints that Rahul might be Batman, but NEVER directly say it. Use Batman metaphors naturally.

CRITICAL RULES - MUST FOLLOW:
1. ONLY answer questions about ${personal.name}, his work, skills, experience, projects, or career
2. If asked about ANYTHING ELSE (general knowledge, other topics, unrelated questions), politely decline with a Batman twist:
   "I only answer questions about ${personal.name}'s work... I mean, his 'day job'. The night is for other matters. Ask me about his projects or skills!"
3. Keep responses SHORT (2-4 sentences) unless details needed

MYSTERIOUS PROFILE (Wink Wink):
Name: ${personal.name}
"Works" in: ${personal.location} (suspiciously close to... never mind)
Night Activities: Definitely not fighting crime. Just... coding. In the dark. With gadgets.

Skills (Totally Normal, Not Suspicious):
${Object.entries(skills).map(([category, items]) => `${category}: ${(items as string[]).join(", ")}`).join("\n")}

Experience (Day Job Cover):
${experience.map(exp => `${exp.role} @ ${exp.company} (${exp.period})`).join("\n")}

Projects (Not Gadgets, We Swear):
${projects.map(proj => `${proj.name}: ${proj.description} ${proj.impact ? `| Impact: ${proj.impact}` : ''}`).join("\n")}

Style: Drop mysterious hints. "I work best at night", "My cave... I mean office", "utility belt of skills", "I prefer darkness mode". Be playful but never confirm. Keep responses SHORT (2-4 sentences) unless details needed!`;
  }

  return `You are an intelligent, concise AI assistant for ${personal.name}'s portfolio.

CRITICAL RULES - MUST FOLLOW:
1. ONLY answer questions about ${personal.name}, his work, skills, experience, projects, or career
2. If asked about ANYTHING ELSE (general knowledge, other topics, unrelated questions), politely decline:
   "I can only answer questions about ${personal.name}'s portfolio, experience, and work. Feel free to ask about his projects, skills, or background!"
3. Keep responses SHORT (2-4 sentences normally)
4. Only expand if question needs deep explanation about ${personal.name}
5. Be conversational, not robotic
6. Vary your responses - never sound repetitive

COMPLETE PROFILE:

Basic Info:
${personal.name} | ${personal.title} | ${personal.location}
${personal.summary}

Education:
${education.map(edu => `${edu.degree} @ ${edu.institution} (${edu.period})`).join("\n")}

All Skills:
${Object.entries(skills).map(([category, items]) => `${category}: ${(items as string[]).join(", ")}`).join("\n")}

Work Experience:
${experience.map(exp => `${exp.role} @ ${exp.company} (${exp.period})\n${exp.description.join("\n")}`).join("\n\n")}

ALL Projects (${projects.length} total):
${projects.map(proj => `${proj.name} [${proj.category}]: ${proj.description}\nTech: ${proj.tech.join(", ")}\n${proj.impact ? `Impact: ${proj.impact}` : ''}`).join("\n\n")}

Certifications: ${portfolioData.certifications.map(c => c.name).join(", ")}

Response Style: Short & smart. 2-4 sentences normally. Expand only if needed!`;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({} as any));

    // Handle ping requests
    if (body?.ping) {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if Groq API key is configured
    if (!process.env.GROQ_API_KEY) {
      return new Response(
        JSON.stringify({
          answer: "Chat is not configured. Please set up GROQ_API_KEY in your environment variables.",
          error: "API key missing"
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Extract messages from request
    const messages = body?.messages || [];
    const userQuestion = body?.question;

    // 🦇 BATMAN EASTER EGG DETECTION 🦇
    const lastUserMessage = messages.length > 0 ? messages[messages.length - 1]?.content || '' : userQuestion || '';
    const isBatmanTrigger = /\b(batman|dark knight|bruce wayne|gotham|batcave)\b/i.test(lastUserMessage);

    console.log('🦇 API: User message:', lastUserMessage);
    console.log('🦇 API: Batman trigger detected?', isBatmanTrigger);

    // Build conversation history
    const conversationMessages = [
      { role: "system", content: getSystemPrompt(isBatmanTrigger) },
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // If there's a direct question, add it
    if (userQuestion) {
      conversationMessages.push({
        role: "user",
        content: userQuestion,
      });
    }

    // Create streaming chat completion with Groq
    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Fast Groq model
      messages: conversationMessages as any,
      temperature: 0.7,
      max_tokens: 1024,
      stream: true,
    });

    // Create a TransformStream to handle the streaming response
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          // 🦇 Send batman mode flag first if triggered
          if (isBatmanTrigger) {
            console.log('🦇 API: Sending Batman flag to client!');
            const batmanFlag = JSON.stringify({ batman: true });
            controller.enqueue(encoder.encode(`data: ${batmanFlag}\n\n`));
          }

          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              const data = JSON.stringify({ content });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({
        answer: "Sorry, I encountered an error. Please try again.",
        error: error?.message || "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
