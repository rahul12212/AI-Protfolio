// Portfolio data extracted from Rahul's resume
export const portfolioData = {
  personal: {
    name: "Rahul Dileep Kumar",
    title: "AI Engineer & Data Scientist",
    tagline: "3+ Years Industry Experience | Research Assistant @ UB | MS AI",
    location: "Buffalo, NY",
    phone: "+1 (716) 415-0874",
    email: "rahuldk302002@gmail.com",
    linkedin: "https://www.linkedin.com/in/rahuldks/",
    github: "https://github.com/rahuldks",
    summary: "AI engineer and Data Scientist with 3+ Years of Industry Experience, Research Assistant and master's student with proven expertise in NLP, AI/ML modeling, Data analysis, Computer Vision and full-stack development. Proficient in Python, TensorFlow, and AWS. Successfully developed patented AI solutions and automated workflows. Seeking roles to drive innovation in AI and ML.",
  },

  education: [
    {
      institution: "University at Buffalo, SUNY",
      degree: "Master of Science in Artificial Intelligence",
      period: "2024 - 2025",
      location: "Buffalo, NY"
    },
    {
      institution: "Coimbatore Institute of Technology",
      degree: "Bachelor of Technology in Information Technology",
      period: "2020 - 2024",
      location: "Coimbatore, India"
    }
  ],

  certifications: [
    {
      name: "Google Project Management Professional Certificate",
      issuer: "Google",
      link: "#"
    },
    {
      name: "Applied Machine Learning in Python",
      issuer: "University of Michigan",
      link: "#"
    },
    {
      name: "AI For Everyone",
      issuer: "DeepLearning.AI",
      link: "#"
    },
    {
      name: "Introduction To Generative AI",
      issuer: "Google Cloud",
      link: "#"
    }
  ],

  skills: {
    languages: ["Python", "C++", "Java", "SQL", "R", "JavaScript", "TypeScript"],
    aiMl: ["TensorFlow", "PyTorch", "Keras", "Scikit-learn", "OpenCV", "XGBoost", "NLTK", "SpaCy", "GenAI", "LangChain", "Hugging Face Transformers"],
    dataTools: ["Pandas", "NumPy", "Jupyter", "Matplotlib", "Seaborn", "Plotly"],
    webFullStack: ["React", "Node.js", "Express", "Spring Boot", "Flask", "FastAPI", "HTML/CSS", "Tailwind", "Next.js", "Vue.js"],
    databases: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Redis"],
    cloudDevOps: ["AWS (S3, EC2, Lambda, SageMaker)", "Google Cloud (Vertex AI, Firestore)", "Docker", "GitHub Actions", "REST APIs", "Git", "Kubernetes"]
  },

  experience: [
    {
      role: "Research Assistant",
      company: "University at Buffalo (SUNY)",
      period: "2024 - Present",
      location: "Buffalo, NY",
      description: [
        "Driving research in biomedical AI, focusing on early prediction of Alzheimer's Disease progression using multimodal datasets (ADNI, USC)",
        "Applied causal modeling frameworks in R (nlmixr2) and nonlinear mixed-effects models (NLME) to explore dynamic biomarker trajectories",
        "Designed multimodal ML pipeline (Random Forests, XGBoost, TensorFlow) integrating imaging features with temporal biomarker profiles",
        "Implemented PBPK-inspired computational models to simulate biomarker kinetics",
        "Discovered biomarker interaction effects (TAU-ABETA synergy) as early warning signals for disease progression",
        "Co-authoring peer-reviewed manuscript on novel approach integrating causal inference with multimodal ML"
      ],
      tags: ["Biomedical AI", "Causal Modeling", "NLME", "TensorFlow", "R", "Python"]
    },
    {
      role: "AI Engineer",
      company: "EffiGO Global",
      period: "2023 - 2024",
      location: "Bangalore, India",
      description: [
        "First AI Engineer leading transition to AI-powered e-procurement intelligence platform",
        "Designed and deployed enterprise conversational AI assistant for procurement workflows and supplier-buyer negotiations",
        "Built domain-specific NLP corpus, fine-tuned transformer LLMs, implemented RAG pipelines (FAISS + LangChain)",
        "Integrated with Spring Boot microservices, containerized with Docker, deployed via AWS ECS, Lambda, and SageMaker",
        "Developed supplier recommendation engines and automated auction summarizers using NLP",
        "Reduced onboarding time by 40%, cut manual support requests by 30%"
      ],
      tags: ["NLP", "LLMs", "RAG", "AWS", "Docker", "Spring Boot", "Transformers"]
    },
    {
      role: "AI Software Engineer",
      company: "Aman Exchange, Kuwait",
      period: "2021 - 2023",
      location: "Kuwait City, Kuwait",
      description: [
        "Led development of Material Management System with AI-driven intelligent assistant",
        "Created custom small-scale language model (SLM) for financial/inventory terminology",
        "Built real-time chatbot with event-driven alerts and predictive supply shortage forecasting",
        "Delivered full-stack platform (Vue.js, Flask, PostgreSQL) with Redis caching",
        "Reduced API latency by 40%, increased procurement efficiency by 25%"
      ],
      tags: ["SLM", "Vue.js", "Flask", "PostgreSQL", "Redis", "ML Forecasting"]
    }
  ],

  projects: [
    {
      name: "SATURDAE - AI Floor Planning Assistant",
      category: "Patented Innovation",
      description: "Invented and patented voice-driven AI system for real-time architectural floor plan generation. Cut manual drafting effort by 80%.",
      longDescription: "Voice-driven AI system combining NLP intent recognition with computer vision rendering for spatial layout creation. Features interactive web interface in React connected to TensorFlow/Keras models.",
      tech: ["NLP", "Computer Vision", "TensorFlow", "Keras", "React", "spaCy", "Transformers"],
      tags: ["Patent", "NLP", "Computer Vision"],
      github: "#",
      demo: "#",
      impact: "80% reduction in manual drafting effort",
      featured: true
    },
    {
      name: "SymptoScan - Disease Classification",
      category: "Healthcare AI",
      description: "Meta-classifier ensemble predicting diseases with overlapping symptoms. Achieved 92% recall with multilingual medical chatbot.",
      longDescription: "Meta-classifier combining Random Forests, Gradient Boosted Trees, and Logistic Regression with SHAP explainability. Extended into multilingual chatbot (English, Spanish, Hindi).",
      tech: ["Scikit-learn", "XGBoost", "SHAP", "NLP", "Flask"],
      tags: ["Healthcare", "ML", "Ensemble"],
      github: "#",
      demo: "#",
      impact: "92% recall in disease classification",
      featured: true
    },
    {
      name: "AptitudeAI - RL Interviewer",
      category: "Reinforcement Learning",
      description: "Deep Q-Network (DQN) interviewer agent dynamically adjusting question difficulty across coding, aptitude, and verbal reasoning.",
      longDescription: "DQN-driven adaptive interviewer with Streamlit dashboard. Generates candidate-specific performance trajectories and hireability reports.",
      tech: ["Reinforcement Learning", "DQN", "Python", "Streamlit", "TensorFlow"],
      tags: ["RL", "DQN", "Hiring AI"],
      github: "#",
      demo: "#",
      featured: true
    },
    {
      name: "Physio for AI - Causal Modeling",
      category: "Research Project",
      description: "Multimodal neural network fusing time-series physiological signals with psychometric features to model donation behavior.",
      longDescription: "Applied causal inference frameworks (SCMs, DoWhy, double/debiased ML) with SHAP interpretability. Conducted counterfactual analysis and clustering.",
      tech: ["Causal Inference", "Neural Networks", "DoWhy", "SHAP", "Python", "R"],
      tags: ["Causal AI", "Research"],
      github: "#",
      featured: true
    },
    {
      name: "Traffic Flow Prediction",
      category: "Smart Cities",
      description: "AI pipeline forecasting urban traffic by combining historical data with real-time events. Achieved 92.4% accuracy.",
      longDescription: "Random Forest models integrated with Google News API and weather feeds. Built ETL pipelines for continuous data stream processing.",
      tech: ["Random Forest", "APIs", "ETL", "Python", "Google Cloud"],
      tags: ["Smart Cities", "ML"],
      github: "#",
      impact: "92.4% prediction accuracy"
    },
    {
      name: "Transformer Sentiment Analysis",
      category: "NLP",
      description: "Custom Transformer encoder for Yelp review sentiment classification. Achieved 87.7% accuracy from scratch.",
      longDescription: "Built Transformer from scratch with multi-head attention, positional encodings, learning-rate scheduling, and gradient clipping.",
      tech: ["Transformers", "PyTorch", "NLP", "Deep Learning"],
      tags: ["NLP", "Transformers"],
      github: "#",
      impact: "87.7% accuracy"
    },
    {
      name: "RAG Health Chatbot",
      category: "Healthcare AI",
      description: "Multilingual RAG chatbot for diabetes management using PubMed, NIH guidelines, and medical datasets.",
      longDescription: "Implemented dense retrieval (FAISS) with summarization models. Supports English, Spanish, and Hindi with keyword-matching fallback.",
      tech: ["RAG", "FAISS", "LangChain", "NLP", "Healthcare"],
      tags: ["RAG", "Healthcare", "Multilingual"],
      github: "#",
      demo: "#"
    },
    {
      name: "Food-11 Image Classification",
      category: "Computer Vision",
      description: "Transfer learning with ResNet-50, EfficientNet-B0, and MobileNetV3 for food classification with edge deployment.",
      longDescription: "Applied data augmentation, model quantization, pruning, and TensorRT acceleration for real-time inference (<150ms).",
      tech: ["Transfer Learning", "ResNet", "EfficientNet", "TensorRT", "PyTorch"],
      tags: ["Computer Vision", "Edge AI"],
      github: "#"
    }
  ],

  publications: [
    {
      title: "SYMPTOSCAN - Disease Classification System",
      type: "Publication",
      year: "2024"
    },
    {
      title: "SATURDAE - Patented AI-driven Floor Planning Assistant",
      type: "Patent",
      year: "2024"
    }
  ],

  leadership: [
    {
      role: "Event Head",
      organization: "College Association",
      period: "2022 - 2024",
      description: "Led workshops and events with 100+ attendees"
    }
  ],

  chatGuidelines: `You are an AI assistant on Rahul Dileep Kumar's portfolio website. Rahul is an exceptional AI Engineer and Data Scientist with 3+ years of industry experience, currently pursuing his MS in AI at University at Buffalo.

Key highlights to emphasize:
- **Patented Innovation**: Created SATURDAE, a patented AI floor planning system
- **Research Excellence**: Working on groundbreaking Alzheimer's Disease prediction using multimodal AI and causal modeling
- **First AI Engineer** at EffiGO Global, leading their AI transformation (40% faster onboarding, 30% reduction in support requests)
- **Enterprise Impact**: Built production AI systems at Aman Exchange (25% efficiency gain, 40% latency reduction)
- **Cutting-edge Skills**: Causal inference, RAG systems, transformers, reinforcement learning, computer vision, NLP
- **Full-stack Capability**: Can build end-to-end AI products from research to deployment

Be enthusiastic about his work, especially:
- His research combining causal AI with multimodal ML for Alzheimer's prediction
- The patented SATURDAE system
- His work with LLMs, RAG pipelines, and enterprise AI
- His ability to deliver measurable business impact

Keep responses conversational, professional, and impressive - matching his exceptional background. If asked about availability for roles, mention he's seeking opportunities to drive innovation in AI/ML.`
};
