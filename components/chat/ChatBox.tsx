'use client';
import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { ChatMessage, type ChatMsg } from './ChatMessage';

type Status = 'Connecting' | 'Online' | 'Offline';

export default function ChatBox() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<Status>('Connecting');
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Ping endpoint to check status
  useEffect(() => {
    let mounted = true;
    const ping = async () => {
      try {
        await fetch('/api/chat', {
          method: 'POST',
          body: JSON.stringify({ ping: true }),
        });
        mounted && setStatus('Online');
      } catch {
        mounted && setStatus('Offline');
      }
    };
    ping();
    const id = setInterval(ping, 30000); // Ping every 30 seconds
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [msgs]);

  // Handle streaming chat
  async function ask(text: string) {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMsg = { role: 'user', content: text };
    setMsgs((m) => [...m, userMsg]);
    setQ('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...msgs, userMsg],
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      // Check if streaming response
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('text/event-stream')) {
        // Handle streaming response
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let assistantMsg = '';

        // Add empty assistant message that will be updated
        setMsgs((m) => [...m, { role: 'assistant', content: '' }]);

        while (reader) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                break;
              }
              try {
                const parsed = JSON.parse(data);

                // 🦇 BATMAN MODE TRIGGER 🦇
                if (parsed.batman) {
                  console.log('🦇🦇🦇 BATMAN MODE ACTIVATED! 🦇🦇🦇');
                  console.log('Removing light class, adding batman class');
                  document.documentElement.classList.remove('light');
                  document.documentElement.classList.add('batman');
                  localStorage.setItem('theme', 'batman');
                  console.log('Current HTML classes:', document.documentElement.className);
                  console.log('localStorage theme:', localStorage.getItem('theme'));
                }

                if (parsed.content) {
                  assistantMsg += parsed.content;
                  // Update the last message in real-time
                  setMsgs((m) => {
                    const newMsgs = [...m];
                    newMsgs[newMsgs.length - 1] = {
                      role: 'assistant',
                      content: assistantMsg,
                    };
                    return newMsgs;
                  });
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }

        setStatus('Online');
      } else {
        // Handle non-streaming response (fallback)
        const data = await response.json();
        setMsgs((m) => [
          ...m,
          { role: 'assistant', content: data.answer || 'No answer' },
        ]);
        setStatus('Online');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMsgs((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            'Sorry, I encountered an error. Please make sure your GROQ_API_KEY is configured in .env.local',
        },
      ]);
      setStatus('Offline');
    } finally {
      setIsLoading(false);
    }
  }

  const chips = [
    "What's your most impressive project?",
    'Tell me about your AI research',
    'What technologies do you specialize in?',
    'Are you available for hire?',
  ];

  const dot =
    status === 'Online'
      ? 'bg-emerald-500'
      : status === 'Connecting'
      ? 'bg-amber-500'
      : 'bg-rose-500';

  return (
    <div className="card relative overflow-hidden p-4 shadow-glow">
      {/* AI-themed gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[hsl(var(--accent))]/5 via-transparent to-transparent" />

      <div className="relative">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[hsl(var(--accent))]" />
            <h3 className="text-lg font-semibold">AI Assistant</h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className={`h-2 w-2 rounded-full ${dot} animate-pulse`}></span>
            {status}
          </div>
        </div>

        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && ask(q)}
            placeholder="Ask about skills, projects, experience..."
            disabled={isLoading}
            className="h-11 flex-1 rounded-full border border-border bg-background px-4 transition-all focus:border-[hsl(var(--accent))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/20 disabled:opacity-50"
          />
          <button
            onClick={() => ask(q)}
            disabled={isLoading || !q.trim()}
            className="h-11 w-11 rounded-full bg-[hsl(var(--accent))] text-white shadow-glow transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          >
            {isLoading ? (
              <div className="mx-auto h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Send className="mx-auto h-4 w-4" />
            )}
          </button>
        </div>

        {msgs.length === 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {chips.map((c) => (
              <button
                key={c}
                onClick={() => ask(c)}
                disabled={isLoading}
                className="tag transition-all hover:scale-105 hover:shadow-glow disabled:opacity-50"
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <div
          ref={ref}
          className="mt-3 max-h-96 space-y-3 overflow-auto scroll-smooth"
        >
          {msgs.map((m, i) => (
            <ChatMessage key={i} msg={m} />
          ))}
          {isLoading && msgs[msgs.length - 1]?.role === 'user' && (
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-[hsl(var(--accent))]" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-[hsl(var(--accent))]" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-[hsl(var(--accent))]" style={{ animationDelay: '300ms' }} />
              </div>
              Thinking...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
