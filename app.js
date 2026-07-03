/* ==========================================
   BOTTEGA AI - INTERACTIVE LOGIC (app.js)
   Controls Countdown, Simulator, Form & Translations
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Language Translation Dictionary & Engine
    // ==========================================
    const i18n = {
        en: {
            metaTitle: "BottegaAI Workshop | The Renaissance of Executive Power & AI Agents",
            metaDesc: "Master the art of the High Individual Contributor at BottegaAI. A Renaissance-inspired workshop for executives to design and build autonomous AI Agents. August 22nd, 2026 at Heineken House, São Paulo.",
            // Header
            "nav-philosophy": "Philosophy",
            "nav-curriculum": "Curriculum",
            "nav-simulator": "Agent Builder",
            "nav-venue": "Venue",
            "nav-magister": "Magister",
            "nav-cta": "Apply to Guild",
            // Hero
            "hero-date": "AUGUST 22, 2026",
            "hero-title": "The Renaissance of <br>\n                    <span class=\"gold-text-glow\">Executive Power</span>",
            "hero-subtitle": "In the 15th century, Leonardo da Vinci ran a Bottega—a workshop where art, science, and machinery converged. Today, artificial intelligence gives you the power to become a one-person guild. Learn to orchestrate your own digital apprentices and lead as a High Individual Contributor.",
            "hero-label-workshop": "THE WORKSHOP",
            "hero-val-workshop": "Create your own AI Agent",
            "hero-label-venue": "THE VENUE",
            "hero-cta-apply": "Apply for Admission",
            "hero-cta-explore": "Simulate an Apprentice",
            "hero-fig-title": "Fig I. De Proportione Humana et Mechanica (BottegaAI, 2026)",
            "hero-fig-desc": "Representing the alignment of executive agency (Ratio) and digital agents (Synthesia).",
            // Countdown
            "metric-days": "Days Remaining",
            "metric-seats": "Executive Seats Max",
            "metric-agents": "Custom Agents Built",
            "metric-leverage": "Productivity Leverage",
            // Philosophy
            "philosophy-tagline": "THE CODEX OF LEVERAGE",
            "philosophy-title": "The Vitruvian Executive",
            "philosophy-p1": "The traditional corporate structure is obsolete. For decades, executives measured their power by the size of their headcount. More reports meant more status. Today, large human structures introduce latency, alignment overhead, and operational friction.",
            "philosophy-p2": "The future belongs to the High Individual Contributor Executive. Inspired by Leonardo da Vinci—who was simultaneously a master painter, engineer, anatomist, and military strategist—the modern leader is a creator, not just a delegator.",
            "philosophy-p3": "At BottegaAI, we teach you how to establish your own digital workshop. By designing and deploying your own tailored network of autonomous AI Agents, you can execute complex business initiatives, analyze massive data scopes, and build whole projects with the leverage of a 50-person department.",
            "philosophy-card1-title": "The Renaissance Mindset",
            "philosophy-card1-desc": "Transition from manager to architect. Learn to view AI models not as tools, but as raw intelligence waiting for structure.",
            "philosophy-card2-title": "Digital Apprentices",
            "philosophy-card2-desc": "Instead of managing employees, you will design autonomous agents that research, analyze, write, and execute code for you.",
            // Simulator Controls
            "sim-tagline": "EXPERIMENT WITH THE CRAFT",
            "sim-title": "The Agent Synthesis Console",
            "sim-subtitle": "Draft a blueprint for your first digital apprentice and calculate your leverage.",
            "sim-ctrl-title": "Blueprint Customization",
            "sim-ctrl-label-1": "1. Apprentice Archetype (Role)",
            "sim-ctrl-label-2": "2. Intellectual Core (LLM Engine)",
            "sim-ctrl-label-3": "3. Guild Instruments (Tool Integrations)",
            "sim-ctrl-label-4": "4. Autonomy Level",
            "sim-btn-synthesize": "Synthesize Apprentice Blueprint",
            // Archetypes
            "arch-analyst-title": "Financial Strategist",
            "arch-analyst-desc": "Analyzes market trends & models risk",
            "arch-researcher-title": "Intel Research Agent",
            "arch-researcher-desc": "Deep web research & synthesis",
            "arch-ops-title": "Ops Orchestrator",
            "arch-ops-desc": "Automates multi-app workflows",
            "arch-prod-title": "Creative Prototyper",
            "arch-prod-desc": "Generates code, specs & assets",
            // Checkboxes
            "tool-search-lbl": "Web Search & Scraping",
            "tool-code-lbl": "Code Sandbox Execution",
            "tool-db-lbl": "Vector DB / Knowledge Base",
            "tool-email-lbl": "Email & Chat Dispatcher",
            // Autonomy Label
            "autonomy-lvl-1": "Ad-Hoc Tool",
            "autonomy-lvl-2": "Co-Pilot (Human-in-Loop)",
            "autonomy-lvl-3": "Fully Autonomous",
            // Blueprint Output
            "blueprint-stamp": "APPROVED",
            "blueprint-core": "Intellectual Core:",
            "blueprint-autonomy": "Autonomy Level:",
            "blueprint-instruments": "Active Instruments:",
            "blueprint-desc-title": "APPRENTICE FUNCTION:",
            "blueprint-saved-lbl": "Hours Saved / Wk",
            "blueprint-lift-lbl": "Productivity Lift",
            // Curriculum
            "curric-tagline": "THE STUDY METRICS",
            "curric-title": "The Guild's Curriculum",
            "curric-subtitle": "One intensive day of mastership.<br>No coding or IT professional skills required.",
            "curric-t1-title": "AI Agent Integration & Foundations",
            "curric-t1-desc": "Learn how to build your own custom AI Agent on top of Gemini, Claude, or GPT to perform corporate tasks. We will explore why this agentic structure is the most modern approach compared to barely using these models raw.",
            "curric-t1-i1": "Connecting AI cores directly to corporate internal systems",
            "curric-t1-i2": "Comparing bare LLM chats vs. autonomous agent architectures",
            "curric-t1-i3": "Establishing system guardrails for task execution",
            "curric-t2-title": "The Apprentice Core: NousResearch Hermes",
            "curric-t2-desc": "Meet and install Hermes from NousResearch—the leading self-improving open-source AI Agent model. Learn to configure its reasoning engine, memory systems, and self-correction cycles for maximum reliability.",
            "curric-t2-i1": "Installing and hosting Hermes on local or cloud infrastructures",
            "curric-t2-i2": "Orchestrating self-improving loops and reflection patterns",
            "curric-t2-i3": "Configuring vector databases for localized context memory",
            "curric-t3-title": "Demonstration: Google Workspace Orchestration",
            "curric-t3-desc": "Master execution scheduling. We will build a live demonstrative agent that orchestrates Google Workspace applications, enabling it to schedule events, manage docs, and run multi-app tasks autonomously.",
            "curric-t3-i1": "Automating task scheduling and execution calendars",
            "curric-t3-i2": "Connecting Google Docs, Sheets, and Gmail via APIs",
            "curric-t3-i3": "Designing fail-safe recovery for multi-step office workflows",
            "curric-t4-title": "Anthropic Skills & WhatsApp Dispatching",
            "curric-t4-desc": "Final integration. Learn how to install and leverage specialized Anthropic computer use skills for SMB and corporate tasks, sending commands and receiving deliverables directly via WhatsApp.",
            "curric-t4-i1": "Deploying Anthropic skills to automate SMB & corporate tasks",
            "curric-t4-i2": "Interfacing WhatsApp as the main control input for your agent",
            "curric-t4-i3": "Security, privacy compliance, and token budget management",
            "curric-t5-title": "Corporate Replication & Scaling Strategy",
            "curric-t5-desc": "Learn how to replicate these advanced agentic patterns in your organization. Design a custom strategy to implement autonomous AI agents across your company departments and educate your teams on modern execution.",
            "curric-t5-i1": "Formulating an enterprise-wide agentic AI strategy",
            "curric-t5-i2": "Educating internal teams on advanced agent capabilities vs raw chat",
            "curric-t5-i3": "Roadmapping security, integration, and budget guardrails for departments",
            // Magister
            "magister-tagline": "THE MAGISTER",
            "magister-title-role": "IT Executive & Experienced Professor",
            "magister-bio-p1": "Jeff Prestes is an IT Executive with more than 30 years of hands-on experience guiding technological evolutions, leading high-performance engineering groups, and designing robust system architectures.",
            "magister-bio-p2": "At BottegaAI, he acts as the Magister, translating raw generative models and complex agent workflows into practical, high-leverage executive assets.",
            // Venue
            "venue-tagline": "THE ACADEMY",
            "venue-title": "Heineken House",
            "venue-d1": "BottegaAI is hosted at the exclusive Heineken House São Paulo. Surrounded by award-winning green architecture, modern design, and premier amenities, this space represents the perfect blend of tradition and future-facing innovation.",
            "venue-d2": "Enjoy premium catering, private workspace stations, high-speed fiber lines, and an exclusive craft networking session on the rooftop patio after the guild workshop finishes.",
            "venue-btn": "Explore Heineken House ↗",
            "venue-card-tag": "EXCLUSIVE VENUE",
            "venue-card-addr": "Parque Villa Lobos, São Paulo - SP",
            "venue-card-status": "Private Executive Booking",
            // Registration
            "reg-title": "Secure Admission",
            "reg-desc-1": "Due to the hands-on nature of our Agent Synthesis session and physical space limits at Heineken House, BottegaAI is strictly limited to 25 executives.",
            "reg-desc-2": "Ensure your participation by completing the registration payment. Limited seats are available for the August 2026 cohort.",
            "pay-badge": "EXECUTIVE PASS",
            "pay-price-currency": "R$",
            "pay-price-amount": "1,000",
            "pay-price-period": "/ seat",
            "pay-title": "Complete Registration",
            "pay-desc": "Admission to the masterclass is secured instantly via our payment gateway. Click the link below to process your fee on Stripe's secure portal. You will receive a calendar invitation and preparatory codex guidelines immediately after payment.",
            "pay-feat-1": "Full Workshop Access & Live Interactive Modules",
            "pay-feat-2": "Custom AI Agent Deployment Sandbox",
            "pay-feat-3": "Premium Catering & Heineken House Admission",
            "pay-feat-4": "Exclusive Post-Workshop Craft Networking",
            "pay-btn": "Secure Seat & Pay via Stripe ↗",
            // Footer
            "footer-tagline": "Re-engineering executive execution through Renaissance principles.",
            "footer-nav-title": "NAVIGATION",
            "footer-meta-date": "Date: August 22nd, 2026",
            "footer-meta-loc": "Location: Heineken House SP",
            "footer-meta-email": "Enquiries: sales@novatrix.com.br",
            "footer-copyright": "&copy; 2026 BottegaAI. Inspired by the Codex Atlanticus. All agents aligned."
        },
        pt: {
            metaTitle: "BottegaAI | O Renascimento do Poder Executivo e Agentes de IA",
            metaDesc: "Domine a arte do Alto Contribuidor Individual na BottegaAI. Um workshop inspirado no Renascimento para executivos projetarem e criarem Agentes de IA autônomos na Heineken House, São Paulo. 22 de Agosto de 2026.",
            // Header
            "nav-philosophy": "Filosofia",
            "nav-curriculum": "Currículo",
            "nav-simulator": "Simulador de Agente",
            "nav-venue": "Local",
            "nav-magister": "Magister",
            "nav-cta": "Inscrever-se no Workshop",
            // Hero
            "hero-date": "22 DE AGOSTO, 2026",
            "hero-title": "O Renascimento do <br>\n                    <span class=\"gold-text-glow\">Poder Executivo</span>",
            "hero-subtitle": "No século XV, Leonardo da Vinci liderava uma Bottega—um ateliê onde arte, ciência e engenharia convergiam. Hoje, a inteligência artificial oferece a você a capacidade de se tornar um workshop de um homem só. Aprenda a orquestrar seus próprios aprendizes digitais e lidere como um Alto Contribuidor Individual.",
            "hero-label-workshop": "O WORKSHOP",
            "hero-val-workshop": "Crie seu próprio Agente de IA",
            "hero-label-venue": "O LOCAL",
            "hero-cta-apply": "Solicitar Admissão",
            "hero-cta-explore": "Simular um Aprendiz",
            "hero-fig-title": "Fig I. De Proportione Humana et Mechanica (BottegaAI, 2026)",
            "hero-fig-desc": "Representando o alinhamento da agência executiva (Razão) e agentes digitais (Síntese).",
            // Countdown
            "metric-days": "Dias Restantes",
            "metric-seats": "Vagas Executivas Max",
            "metric-agents": "Agentes Criados",
            "metric-leverage": "Alavancagem de Produtividade",
            // Philosophy
            "philosophy-tagline": "O CÓDIGO DA ALAVANCAGEM",
            "philosophy-title": "O Executivo Vitruviano",
            "philosophy-p1": "A estrutura corporativa tradicional está obsoleta. Por décadas, executivos mediam seu poder pelo tamanho de sua equipe. Mais subordinados significavam mais status. Hoje, grandes estruturas humanas introduzem latência, custos de alinhamento e fricção operacional.",
            "philosophy-p2": "O futuro pertence ao Executivo de Alto Impacto Individual. Inspirado por Leonardo da Vinci—que foi simultaneamente um mestre pintor, engenheiro, anatomista e estrategista militar—o líder moderno é um criador, não apenas um delegador.",
            "philosophy-p3": "Na BottegaAI, ensinamos você a estabelecer seu próprio ateliê digital. Ao projetar e implantar sua própria rede personalizada de Agentes de IA autônomos, você pode executar iniciativas de negócios complexas, analisar grandes volumes de dados e criar projetos inteiros com a alavancagem de um departamento de 50 pessoas.",
            "philosophy-card1-title": "Mentalidade Renascentista",
            "philosophy-card1-desc": "Transição de gerente para arquiteto. Aprenda a ver os modelos de IA não como ferramentas, mas como inteligência bruta aguardando estrutura.",
            "philosophy-card2-title": "Aprendizes Digitais",
            "philosophy-card2-desc": "Em vez de gerenciar funcionários, você projetará agentes autônomos que pesquisam, analisam, escrevem e executam código por você.",
            // Simulator Controls
            "sim-tagline": "EXPERIMENTE A ARTE",
            "sim-title": "Console de Síntese de Agente",
            "sim-subtitle": "Esboce um projeto para seu primeiro aprendiz digital e calcule sua alavancagem.",
            "sim-ctrl-title": "Personalização do Projeto",
            "sim-ctrl-label-1": "1. Arquétipo do Aprendiz (Função)",
            "sim-ctrl-label-2": "2. Núcleo Intelectual (Mecanismo LLM)",
            "sim-ctrl-label-3": "3. Instrumentos do Workshop (Integrações)",
            "sim-ctrl-label-4": "4. Nível de Autonomia",
            "sim-btn-synthesize": "Sintetizar Projeto do Aprendiz",
            // Archetypes
            "arch-analyst-title": "Estrategista Financeiro",
            "arch-analyst-desc": "Analisa tendências de mercado & modela riscos",
            "arch-researcher-title": "Agente de Inteligência",
            "arch-researcher-desc": "Pesquisa profunda na web & síntese",
            "arch-ops-title": "Orquestrador de Ops",
            "arch-ops-desc": "Automatiza fluxos de trabalho multi-app",
            "arch-prod-title": "Prototipador Criativo",
            "arch-prod-desc": "Gera código, especificações & ativos",
            // Checkboxes
            "tool-search-lbl": "Pesquisa na Web & Captura de Dados",
            "tool-code-lbl": "Execução em Sandbox de Código",
            "tool-db-lbl": "Banco de Dados Vetorial / Base de Conhecimento",
            "tool-email-lbl": "Despachante de E-mail & Chat",
            // Autonomy Label
            "autonomy-lvl-1": "Ferramenta Ad-Hoc",
            "autonomy-lvl-2": "Co-Piloto (Validação Humana)",
            "autonomy-lvl-3": "Totalmente Autônomo",
            // Blueprint Output
            "blueprint-stamp": "APROVADO",
            "blueprint-core": "Núcleo Intelectual:",
            "blueprint-autonomy": "Nível de Autonomia:",
            "blueprint-instruments": "Instrumentos Ativos:",
            "blueprint-desc-title": "FUNÇÃO DO APRENDIZ:",
            "blueprint-saved-lbl": "Horas Salvas / Sem",
            "blueprint-lift-lbl": "Ganho de Produtividade",
            // Curriculum
            "curric-tagline": "A ESTRUTURA DOS ESTUDOS",
            "curric-title": "O Currículo do Workshop",
            "curric-subtitle": "Um dia intensivo de maestria.<br>Não é necessário conhecimento em programação ou TI.",
            "curric-t1-title": "Integração e Fundações de Agentes de IA",
            "curric-t1-desc": "Aprenda a construir seu próprio Agente de IA personalizado sobre o Gemini, Claude ou GPT para realizar tarefas corporativas. Exploraremos por que essa estrutura baseada em agentes é a abordagem mais moderna em comparação ao uso simples desses modelos brutos.",
            "curric-t1-i1": "Conectando núcleos de IA diretamente aos sistemas internos da empresa",
            "curric-t1-i2": "Comparando chats de LLM brutos versus arquiteturas de agentes autônomos",
            "curric-t1-i3": "Estabelecendo diretrizes e limites para a execução de tarefas",
            "curric-t2-title": "O Aprendiz Central: NousResearch Hermes",
            "curric-t2-desc": "Instale e configure o Hermes da NousResearch—atualmente o melhor modelo de Agente de IA com capacidade de auto-aprimoramento. Aprenda a configurar seu motor de raciocínio, sistemas de memória e ciclos de auto-correção.",
            "curric-t2-i1": "Instalação e hospedagem do Hermes em infraestrutura local ou na nuvem",
            "curric-t2-i2": "Orquestrando fluxos de auto-aprimoramento e padrões de reflexão",
            "curric-t2-i3": "Configuração de bancos de dados vetoriais para memória de contexto local",
            "curric-t3-title": "Demonstração: Orquestração do Google Workspace",
            "curric-t3-desc": "Domine o agendamento de tarefas. Criaremos um agente demonstrativo ao vivo que orquestra os aplicativos do Google Workspace, permitindo agendar reuniões, redigir documentos e coordenar tarefas corporativas de forma autônoma.",
            "curric-t3-i1": "Automatização do agendamento de tarefas e calendários de execução",
            "curric-t3-i2": "Integração do Google Docs, Sheets e Gmail via APIs",
            "curric-t3-i3": "Tratamento de falhas para fluxos de trabalho de escritório com múltiplas etapas",
            "curric-t4-title": "Skills da Anthropic & Controle via WhatsApp",
            "curric-t4-desc": "Integração final. Aprenda a instalar e utilizar as skills especializadas da Anthropic para tarefas corporativas e de PMEs (SMB), enviando comandos e recebendo entregáveis diretamente pelo WhatsApp.",
            "curric-t4-i1": "Implantando skills da Anthropic para automatizar tarefas operacionais e de PMEs",
            "curric-t4-i2": "Integrando o WhatsApp como o canal principal de comando do seu agente",
            "curric-t4-i3": "Segurança, privacidade de dados e gestão de custos de tokens",
            "curric-t5-title": "Replicação Corporativa & Estratégia de Escala",
            "curric-t5-desc": "Saiba como replicar estes padrões avançados de agentes na sua organização. Desenvolva uma estratégia personalizada para implementar agentes de IA autônomos nos departamentos da sua empresa e capacitar suas equipes sobre a execução moderna.",
            "curric-t5-i1": "Formulando uma estratégia de IA baseada em agentes para toda a empresa",
            "curric-t5-i2": "Treinando equipes internas no uso avançado de agentes vs chats tradicionais",
            "curric-t5-i3": "Planejando segurança, integração e controle de custos para departamentos",
            // Magister
            "magister-tagline": "O MAGISTER",
            "magister-title-role": "Executivo de TI & Professor Experiente",
            "magister-bio-p1": "Jeff Prestes é um Executivo de TI com mais de 30 anos de experiência prática liderando evoluções tecnológicas, equipes de engenharia de alta performance e desenhando arquiteturas robustas de sistemas.",
            "magister-bio-p2": "Na BottegaAI, ele atua como o Magister, traduzindo modelos generativos puros e fluxos complexos de agentes em ativos executivos práticos e de alta alavancagem.",
            // Venue
            "venue-tagline": "A ACADEMIA",
            "venue-title": "Heineken House",
            "venue-d1": "A BottegaAI é sediada na exclusiva Heineken House São Paulo. Cercada por arquitetura sustentável premiada, design moderno e comodidades de primeira linha, este espaço representa a fusão perfeita de tradição e inovação futurista.",
            "venue-d2": "Desfrute de buffet premium, estações de trabalho privadas, conexões de fibra de alta velocidade e uma sessão de networking com cervejas artesanais no pátio da cobertura após o encerramento do workshop.",
            "venue-btn": "Explorar Heineken House ↗",
            "venue-card-tag": "LOCAL EXCLUSIVO",
            "venue-card-addr": "Parque Villa Lobos, São Paulo - SP",
            "venue-card-status": "Reserva Privada para Executivos",
            // Registration
            "reg-title": "Garantir Admissão",
            "reg-desc-1": "Devido à natureza prática da nossa sessão de Síntese de Agentes e aos limites físicos da Heineken House, a BottegaAI é estritamente limitada a 25 executivos.",
            "reg-desc-2": "Garanta a sua participação efetuando o pagamento da inscrição. As vagas são limitadas para a turma de agosto de 2026.",
            "pay-badge": "PASSE EXECUTIVO",
            "pay-price-currency": "R$",
            "pay-price-amount": "1.000",
            "pay-price-period": "/ vaga",
            "pay-title": "Concluir Inscrição",
            "pay-desc": "A admissão no masterclass é garantida instantaneamente através da nossa plataforma de pagamento. Clique no link abaixo para processar sua taxa no portal seguro do Stripe. Você receberá um convite no calendário e o guia preparatório do codex logo após a confirmação do pagamento.",
            "pay-feat-1": "Acesso Completo ao Workshop & Módulos Interativos",
            "pay-feat-2": "Ambiente de Testes (Sandbox) de IA Personalizado",
            "pay-feat-3": "Catering Premium & Admissão na Heineken House",
            "pay-feat-4": "Networking de Integração Exclusivo Pós-Workshop",
            "pay-btn": "Garantir Vaga & Pagar via Stripe ↗",
            // Footer
            "footer-tagline": "Reestruturando a execução executiva por meio de princípios renascentistas.",
            "footer-nav-title": "NAVEGAÇÃO",
            "footer-meta-title": "O WORKSHOP",
            "footer-meta-date": "Data: 22 de Agosto de 2026",
            "footer-meta-loc": "Local: Heineken House SP",
            "footer-meta-email": "Contato: sales@novatrix.com.br",
            "footer-copyright": "&copy; 2026 BottegaAI. Inspirado no Codex Atlanticus. Todos os agentes alinhados."
        },
        it: {
            metaTitle: "BottegaAI Workshop | Il Rinascimento del Potere Esecutivo & Agenti AI",
            metaDesc: "Domina l'arte dell'Alto Contributore Individuale a BottegaAI. Un workshop ispirato al Rinascimento per dirigenti per progettare e creare Agenti AI autonomi presso la Heineken House, San Paolo. 22 agosto 2026.",
            // Header
            "nav-philosophy": "Filosofia",
            "nav-curriculum": "Programma",
            "nav-simulator": "Simulatore Agente",
            "nav-venue": "La Sede",
            "nav-magister": "Magister",
            "nav-cta": "Candidati alla Gilda",
            // Hero
            "hero-date": "22 AGOSTO 2026",
            "hero-title": "Il Rinascimento del <br>\n                    <span class=\"gold-text-glow\">Potere Esecutivo</span>",
            "hero-subtitle": "Nel XV secolo, Leonardo da Vinci gestiva una Bottega—un laboratorio in cui convergevano arte, scienza e ingegneria. Oggi, l'intelligenza artificiale ti dà il potere di diventare una corporazione di una sola persona. Impara a orchestrare i tuoi apprendisti digitali e guida come un Alto Contributore Individuale.",
            "hero-label-workshop": "IL WORKSHOP",
            "hero-val-workshop": "Crea il tuo Agente AI",
            "hero-label-venue": "LA SEDE",
            "hero-cta-apply": "Richiedi l'Ammissione",
            "hero-cta-explore": "Simula un Apprendista",
            "hero-fig-title": "Fig I. De Proportione Humana et Mechanica (BottegaAI, 2026)",
            "hero-fig-desc": "Rappresenta l'allineamento dell'azione esecutiva (Ratio) e degli agenti digitali (Synthesia).",
            // Countdown
            "metric-days": "Giorni Rimanenti",
            "metric-seats": "Posti Esecutivi Max",
            "metric-agents": "Agenti Creati",
            "metric-leverage": "Leva di Produttività",
            // Philosophy
            "philosophy-tagline": "IL CODICE DELLA LEVA",
            "philosophy-title": "L'Esecutore Vitruviano",
            "philosophy-p1": "La struttura aziendale tradizionale è obsoleta. Per decenni, i dirigenti hanno misurato il proprio potere in base alle dimensioni del personale gestito. Più collaboratori significavano uno status più elevato. Oggi, le grandi strutture umane introducono latenza, costi di allineamento e attrito operativo.",
            "philosophy-p2": "Il futuro appartiene all'Esecutivo ad Alto Impatto Individuale. Ispirato a Leonardo da Vinci—che fu contemporaneamente maestro pittore, ingegnere, anatomista e stratega militare—il leader moderno è un creatore, non solo un delegatore.",
            "philosophy-p3": "Presso BottegaAI ti insegniamo a creare il tuo laboratorio digitale. Progettando e implementando la tua rete personalizzata di Agenti AI autonomi, puoi eseguire complesse iniziative di business, analizzare enormi volumi di dati e creare interi progetti con la leva di un reparto di 50 persone.",
            "philosophy-card1-title": "Mentalità Rinascimentale",
            "philosophy-card1-desc": "Transizione da manager ad architetto. Impara a vedere i modelli di intelligenza artificiale non come strumenti, ma come pura intelligenza in attesa di struttura.",
            "philosophy-card2-title": "Apprendisti Digitali",
            "philosophy-card2-desc": "Invece di gestire dipendenti, progetterai agenti autonomi che ricercano, analizzano, scrivono ed eseguono codice per te.",
            // Simulator Controls
            "sim-tagline": "SPERIMENTA L'ARTE",
            "sim-title": "Console di Sintesi degli Agenti",
            "sim-subtitle": "Disegna il progetto per il tuo primo apprendista digitale e calcola la tua leva.",
            "sim-ctrl-title": "Personalizzazione Progetto",
            "sim-ctrl-label-1": "1. Archetipo dell'Apprendista (Ruolo)",
            "sim-ctrl-label-2": "2. Nucleo Intellettuale (Motore LLM)",
            "sim-ctrl-label-3": "3. Strumenti della Gilda (Integrazioni)",
            "sim-ctrl-label-4": "4. Livello di Autonomia",
            "sim-btn-synthesize": "Sintetizza Progetto Apprendista",
            // Archetypes
            "arch-analyst-title": "Strategista Finanziario",
            "arch-analyst-desc": "Analizza tendenze di mercato & modella rischi",
            "arch-researcher-title": "Agente di Ricerca",
            "arch-researcher-desc": "Ricerca profonda sul web & sintesi dei dati",
            "arch-ops-title": "Orchestratore Ops",
            "arch-ops-desc": "Automatizza flussi di lavoro multi-app",
            "arch-prod-title": "Prototipatore Creativo",
            "arch-prod-desc": "Genera codice, specifiche & risorse visuali",
            // Checkboxes
            "tool-search-lbl": "Ricerca Web & Estrazione Dati",
            "tool-code-lbl": "Esecuzione in Sandbox di Codice",
            "tool-db-lbl": "Database Vettoriale / Base di Conoscenza",
            "tool-email-lbl": "Gestore di Email & Chat",
            // Autonomy Label
            "autonomy-lvl-1": "Strumento Ad-Hoc",
            "autonomy-lvl-2": "Co-Pilota (Validazione Umana)",
            "autonomy-lvl-3": "Completamente Autonomo",
            // Blueprint Output
            "blueprint-stamp": "APPROVATO",
            "blueprint-core": "Nucleo Intellettuale:",
            "blueprint-autonomy": "Livello di Autonomia:",
            "blueprint-instruments": "Strumenti Attivi:",
            "blueprint-desc-title": "FUNZIONE APPRENDISTA:",
            "blueprint-saved-lbl": "Ore Risparmiate / Sett",
            "blueprint-lift-lbl": "Aumento Produttività",
            // Curriculum
            "curric-tagline": "IL PROGRAMMA DI STUDIO",
            "curric-title": "Il Programma della Gilda",
            "curric-subtitle": "Una giornata intensiva di maestria.<br>Non sono richieste competenze di programmazione o informatiche.",
            "curric-t1-title": "Integrazione e Fondamenta degli Agenti AI",
            "curric-t1-desc": "Impara a costruire il tuo Agente AI personalizzato su Gemini, Claude o GPT per eseguire compiti aziendali. Scopriremo perché questa struttura ad agenti è l'approccio più moderno rispetto al semplice utilizzo dei modelli grezzi.",
            "curric-t1-i1": "Connessione diretta dei core AI ai sistemi aziendali interni",
            "curric-t1-i2": "Confronto tra semplici chat LLM e architetture di agenti autonomi",
            "curric-t1-i3": "Definizione delle linee guida e dei limiti di esecuzione",
            "curric-t2-title": "L'Apprendista Centrale: NousResearch Hermes",
            "curric-t2-desc": "Installa e configura Hermes di NousResearch—il miglior modello di Agente AI auto-migliorante oggi sul mercato. Impara a impostare il suo motore di ragionamento, i sistemi di memoria e i cicli di autocorrezione.",
            "curric-t2-i1": "Installazione e hosting di Hermes su infrastruttura locale o cloud",
            "curric-t2-i2": "Orchestrazione di cicli di auto-miglioramento e riflessione",
            "curric-t2-i3": "Configurazione di database vettoriali per la memoria di contesto locale",
            "curric-t3-title": "Dimostrazione: Orchestrazione di Google Workspace",
            "curric-t3-desc": "Domina la pianificazione delle attività. Creeremo un agente dimostrativo che orchestra le app di Google Workspace, consentendo di pianificare riunioni, gestire documenti e coordinare flussi aziendali in modo autonomo.",
            "curric-t3-i1": "Automazione della pianificazione e dei calendari di esecuzione",
            "curric-t3-i2": "Integrazione di Google Docs, Sheets e Gmail tramite API",
            "curric-t3-i3": "Gestione degli errori per flussi di lavoro d'ufficio complessi",
            "curric-t4-title": "Skill Anthropic & Controllo via WhatsApp",
            "curric-t4-desc": "Integrazione finale. Impara a installare e utilizzare le skill specializzate di Anthropic per attività aziendali e per PMI (SMB), inviando comandi e ricevendo risultati direttamente tramite WhatsApp.",
            "curric-t4-i1": "Implementazione delle skill di Anthropic per automatizzare attività operative e PMI",
            "curric-t4-i2": "Integrazione di WhatsApp come interfaccia principale di comando dell'agente",
            "curric-t4-i3": "Sicurezza, riservatezza dei dati e gestione del budget dei token",
            "curric-t5-title": "Replicazione Aziendale & Strategia di Scala",
            "curric-t5-desc": "Scopri come replicare questi schemi avanzati di agenti nella tua organizzazione. Progetta una strategia personalizzata per implementare agenti AI autonomi nei vari dipartimenti e formare i tuoi team sui metodi più moderni.",
            "curric-t5-i1": "Formulazione di una strategia AI basata su agenti a livello aziendale",
            "curric-t5-i2": "Formazione dei team interni sull'uso avanzato degli agenti rispetto alle chat grezze",
            "curric-t5-i3": "Pianificazione di sicurezza, integrazione e controllo dei costi nei dipartimenti",
            // Magister
            "magister-tagline": "IL MAGISTER",
            "magister-title-role": "Dirigente IT & Professore di Esperienza",
            "magister-bio-p1": "Jeff Prestes è un Dirigente IT con oltre 30 anni di esperienza pratica nella guida dell'evoluzione tecnologica, nella direzione di team ingegneristici ad alte prestazioni e nella progettazione di architetture di sistema robuste.",
            "magister-bio-p2": "Presso BottegaAI, ricopre il ruolo di Magister, traducendo modelli generativi grezzi e flussi di lavoro complessi di agenti in risorse esecutive ad alto rendimento.",
            // Venue
            "venue-tagline": "L'ACCADEMIA",
            "venue-title": "Heineken House",
            "venue-d1": "BottegaAI si tiene presso l'esclusiva Heineken House San Paolo. Circondata da una premiata architettura ecologica, design moderno e servizi di lusso, questo spazio rappresenta la fusione ideale tra tradizione e innovazione orientata al futuro.",
            "venue-d2": "Goditi il catering premium, postazioni di lavoro private, linee in fibra ad alta velocità e un'esclusiva sessione di networking con birre artigianali sulla terrazza panoramica dopo la conclusione del workshop.",
            "venue-btn": "Esplora Heineken House ↗",
            "venue-card-tag": "SEDE ESCLUSIVA",
            "venue-card-addr": "Parque Villa Lobos, San Paolo - SP",
            "venue-card-status": "Prenotazione Privata per Dirigenti",
            // Registration
            "reg-title": "Assicura l'Ammissione",
            "reg-desc-1": "A causa della natura pratica della nostra sessione di Sintesi degli Agenti e dei limiti fisici della Heineken House, BottegaAI è strettamente limitata a 25 dirigenti.",
            "reg-desc-2": "Assicurati la partecipazione completando il pagamento dell'iscrizione. I posti sono limitati per la classe di agosto 2026.",
            "pay-badge": "PASSO ESECUTIVO",
            "pay-price-currency": "R$",
            "pay-price-amount": "1.000",
            "pay-price-period": "/ posto",
            "pay-title": "Completa l'Iscrizione",
            "pay-desc": "L'ammissione alla masterclass è garantita istantaneamente tramite la nostra piattaforma di pagamento. Clicca sul link sottostante per essere reindirizzato al portale sicuro di Stripe. Riceverai un invito nel calendario e la guida del codex preparatorio subito dopo la conferma del pagamento.",
            "pay-feat-1": "Accesso Completo al Workshop & Moduli Interattivi",
            "pay-feat-2": "Sandbox per l'Implementazione dell'Agente AI",
            "pay-feat-3": "Catering Premium & Ingresso alla Heineken House",
            "pay-feat-4": "Networking di Integrazione Esclusivo Post-Workshop",
            "pay-btn": "Assicura Posto & Paga con Stripe ↗",
            // Footer
            "footer-tagline": "Riprogettare l'esecuzione esecutiva attraverso i principi del Rinascimento.",
            "footer-nav-title": "NAVIGAZIONE",
            "footer-meta-title": "IL WORKSHOP",
            "footer-meta-date": "Data: 22 Agosto 2026",
            "footer-meta-loc": "Sede: Heineken House SP",
            "footer-meta-email": "Contatti: sales@novatrix.com.br",
            "footer-copyright": "&copy; 2026 BottegaAI. Ispirato al Codex Atlanticus. Tutti gli agenti allineati."
        }
    };

    // Active Language State
    let currentLang = 'en';

    function setLanguage(lang) {
        if (!i18n[lang]) lang = 'en';
        currentLang = lang;
        localStorage.setItem('bottega-lang', lang);

        const trans = i18n[lang];

        // 1. Translate UI elements with [data-i18n]
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (trans[key]) {
                el.innerHTML = trans[key];
            }
        });

        // 2. Translate placeholders with [data-i18n-placeholder]
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (trans[key]) {
                el.setAttribute('placeholder', trans[key]);
            }
        });

        // 3. Update Meta tags & Title
        document.title = trans.metaTitle;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', trans.metaDesc);
        
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', trans.metaTitle);
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', trans.metaDesc);
        
        const twTitle = document.querySelector('meta[name="twitter:title"]');
        if (twTitle) twTitle.setAttribute('content', trans.metaTitle);
        const twDesc = document.querySelector('meta[name="twitter:description"]');
        if (twDesc) twDesc.setAttribute('content', trans.metaDesc);

        // 4. Update Language switcher active buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // 5. Re-run blueprint logic to update outputs with new translation context
        calculateBlueprint();
    }

    function detectLanguage() {
        // 0. Check pathname for sharing URLs (forces language to match static file)
        const path = window.location.pathname.toLowerCase();
        if (path.endsWith('pt.html') || path.includes('/pt.html')) {
            return 'pt';
        }
        if (path.endsWith('it.html') || path.includes('/it.html')) {
            return 'it';
        }

        // 1. Check URL parameters (crucial for SEO crawler index links)
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && i18n[urlLang]) {
            return urlLang;
        }

        // 2. Check local storage
        const savedLang = localStorage.getItem('bottega-lang');
        if (savedLang && i18n[savedLang]) {
            return savedLang;
        }

        // 3. Fallback to browser configuration
        const detected = (navigator.languages && navigator.languages[0]) || navigator.language || '';
        const code = detected.toLowerCase();
        if (code.startsWith('pt')) {
            return 'pt';
        } else if (code.startsWith('it')) {
            return 'it';
        }
        return 'en';
    }

    // Set up language switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const selected = btn.getAttribute('data-lang');
            setLanguage(selected);
        });
    });


    // ==========================================
    // 2. Countdown Timer (Target: August 22, 2026)
    // ==========================================
    const countdownDaysElement = document.getElementById('countdown-days');
    
    function updateCountdown() {
        const targetDate = new Date('2026-08-22T09:00:00');
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            if (countdownDaysElement) countdownDaysElement.innerText = "0";
            return;
        }

        const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
        if (countdownDaysElement) {
            countdownDaysElement.innerText = days.toString();
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000 * 60 * 60);


    // ==========================================
    // 3. Interactive Agent Synthesis Console
    // ==========================================
    const archetypeOptions = document.querySelectorAll('.radio-option');
    const llmSelect = document.getElementById('sim-llm-select');
    const autonomyRange = document.getElementById('autonomy-range');
    const checkboxes = document.querySelectorAll('.checkbox-option input[type="checkbox"]');
    const btnSynthesize = document.getElementById('btn-synthesize-agent');
    
    // Output Elements
    const outputAgentTitle = document.querySelector('.blueprint-agent-title');
    const outputMetaEngine = document.getElementById('meta-engine');
    const outputMetaAutonomy = document.getElementById('meta-autonomy');
    const outputMetaTools = document.getElementById('meta-tools');
    const outputDescText = document.getElementById('blueprint-desc-text');
    const outputHours = document.getElementById('metric-hours');
    const outputRoi = document.getElementById('metric-roi');
    const coreCircle = document.getElementById('core-circle');

    // Synthesis Base Parameters
    const archetypes = {
        analyst: {
            baseHours: 12,
            baseRoi: 12.5,
            titleKey: 'arch-analyst-title',
            descMap: {
                en: "Synthesizes historical market indices, financial statements, and custom projections. Writes python scripts internally to calculate options pricing scenarios and exports reports autonomously.",
                pt: "Sintetiza índices de mercado históricos, demonstrações financeiras e projeções personalizadas. Escreve scripts em Python internamente para calcular cenários de precificação de opções e exporta relatórios de forma autônoma.",
                it: "Sintetizza indici di mercato storici, rendiconti finanziari e proiezioni personalizzate. Scrive script Python internamente per calcolare scenari di determinazione del prezzo delle opzioni ed esporta report in modo autonomo."
            }
        },
        researcher: {
            baseHours: 15,
            baseRoi: 10.0,
            titleKey: 'arch-researcher-title',
            descMap: {
                en: "Crawls competitive intelligence feeds, parses PDF whitepapers, summarizes market filings, and produces executive intelligence updates on a daily schedule.",
                pt: "Rastreia canais de inteligência competitiva, analisa artigos e whitepapers em PDF, resume relatórios regulatórios e gera relatórios de inteligência executiva em uma escala programada diária.",
                it: "Scansiona feed di intelligence competitiva, analizza whitepaper PDF, riassume i documenti di mercato e produce aggiornamenti quotidiani pianificati per l'intelligence esecutiva."
            }
        },
        operations: {
            baseHours: 18,
            baseRoi: 15.0,
            titleKey: 'arch-ops-title',
            descMap: {
                en: "Coordinates workflows across SaaS products. Listens to transaction events, triggers automated operations, drafts follow-up emails, and coordinates approvals.",
                pt: "Coordena fluxos de trabalho entre produtos SaaS. Monitora eventos transacionais, executa operações automatizadas, redige e-mails de acompanhamento e gerencia fluxos de aprovação.",
                it: "Coordina i flussi di lavoro tra vari prodotti SaaS. Rileva eventi transazionali, attiva operazioni automatizzate, redige email di follow-up e coordina le approvazioni."
            }
        },
        product: {
            baseHours: 20,
            baseRoi: 18.0,
            titleKey: 'arch-prod-title',
            descMap: {
                en: "Generates quick mockups, interactive HTML code sandboxes, API drafts, and feature specifications from voice commands or whiteboard sketches.",
                pt: "Gera protótipos rápidos, sandboxes interativas de código HTML, esboços de APIs e especificações técnicas de funcionalidades a partir de comandos de voz ou esboços manuais.",
                it: "Genera prototipi rapidi, sandbox interattive di codice HTML, bozze di API e specifiche di funzionalità a partire da comandi vocali o schizzi su lavagna."
            }
        }
    };

    const engines = {
        'gemini-pro': { name: "Gemini 1.5 Pro", hoursBonus: 2, roiBonus: 1.2 },
        'gemini-flash': { name: "Gemini 1.5 Flash", hoursBonus: 0, roiBonus: 0.5 },
        'claude-sonnet': { name: "Claude 3.5 Sonnet", hoursBonus: 3, roiBonus: 2.0 },
        'gpt-4o': { name: "GPT-4o", hoursBonus: 1, roiBonus: 0.8 }
    };

    const autonomyLevels = {
        1: { nameKey: "autonomy-lvl-1", hoursMult: 0.7, roiMult: 0.6 },
        2: { nameKey: "autonomy-lvl-2", hoursMult: 1.0, roiMult: 1.0 },
        3: { nameKey: "autonomy-lvl-3", hoursMult: 1.4, roiMult: 1.6 }
    };

    // Toggle styling for Radio Options
    archetypeOptions.forEach(option => {
        option.addEventListener('click', function() {
            archetypeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            const radioInput = this.querySelector('input[type="radio"]');
            if (radioInput) {
                radioInput.checked = true;
                calculateBlueprint();
            }
        });
    });

    // Toggle styling for Checkbox Options
    checkboxes.forEach(chk => {
        chk.addEventListener('change', function() {
            const parent = this.closest('.checkbox-option');
            if (parent) {
                if (this.checked) {
                    parent.classList.add('active');
                } else {
                    parent.classList.remove('active');
                }
            }
            calculateBlueprint();
        });
    });

    // Event listeners for select and range inputs
    llmSelect.addEventListener('change', calculateBlueprint);
    autonomyRange.addEventListener('input', calculateBlueprint);

    // Core Calculation Logic
    function calculateBlueprint() {
        // 1. Get Selected Archetype
        const selectedArchetypeRadio = document.querySelector('input[name="archetype"]:checked');
        const archetypeKey = selectedArchetypeRadio ? selectedArchetypeRadio.value : 'analyst';
        const archData = archetypes[archetypeKey];

        // 2. Get Selected Engine
        const engineKey = llmSelect.value;
        const engineData = engines[engineKey];

        // 3. Get Autonomy Level
        const autonomyVal = parseInt(autonomyRange.value) || 2;
        const autonomyData = autonomyLevels[autonomyVal];

        // 4. Gather Checkbox Tool Names (Translated dynamically)
        let toolNames = [];
        let toolHoursBonus = 0;
        let toolRoiBonus = 0;
        const trans = i18n[currentLang] || i18n.en;

        checkboxes.forEach(chk => {
            const parent = chk.closest('.checkbox-option');
            if (chk.checked && parent) {
                const labelSpan = parent.querySelector('span[data-i18n]');
                let labelText = labelSpan ? trans[labelSpan.getAttribute('data-i18n')] : '';
                if (!labelText) {
                    labelText = parent.innerText;
                }
                
                // Trim label text to fit the blueprint
                const trimmedLabel = labelText.split(' & ')[0].split(' / ')[0].split(' e ')[0].split(' e/o ')[0];
                toolNames.push(trimmedLabel);
                toolHoursBonus += 1.5;
                toolRoiBonus += 0.8;
            }
        });

        if (toolNames.length === 0) {
            toolNames.push(currentLang === 'pt' ? "Nenhum" : (currentLang === 'it' ? "Nessuno" : "None"));
        }

        // 5. Calculate Metrics
        let calculatedHours = (archData.baseHours + engineData.hoursBonus + toolHoursBonus) * autonomyData.hoursMult;
        let calculatedRoi = (archData.baseRoi + engineData.roiBonus + toolRoiBonus) * autonomyData.roiMult;

        // Apply floor/ceil constraints for realism
        calculatedHours = Math.max(2, Math.round(calculatedHours));
        calculatedRoi = Math.max(1.5, Math.round(calculatedRoi * 10) / 10);

        // 6. Fetch translated titles & descriptions
        const translatedArchTitle = trans[archData.titleKey] || archData.titleKey;
        const translatedArchDesc = archData.descMap[currentLang] || archData.descMap.en;
        const translatedAutonomyName = trans[autonomyData.nameKey] || autonomyData.nameKey;

        // 7. Update DOM Elements
        outputAgentTitle.innerText = translatedArchTitle;
        outputMetaEngine.innerText = engineData.name;
        outputMetaAutonomy.innerText = translatedAutonomyName;
        outputMetaTools.innerText = toolNames.join(', ');
        outputDescText.innerText = translatedArchDesc;
        
        outputHours.innerText = calculatedHours;
        outputRoi.innerText = calculatedRoi + "x";
    }

    // Synthesis Animation Click Trigger
    if (btnSynthesize) {
        btnSynthesize.addEventListener('click', () => {
            const parchment = document.querySelector('.parchment-sheet');
            if (parchment) {
                parchment.style.transform = 'scale(0.98)';
                parchment.style.boxShadow = '0 0 40px rgba(212, 175, 55, 0.4)';
                
                if (coreCircle) {
                    coreCircle.setAttribute('r', '15');
                    coreCircle.style.stroke = '#8f231b';
                }

                setTimeout(() => {
                    parchment.style.transform = 'scale(1.02)';
                    parchment.style.boxShadow = '0 15px 45px rgba(0, 0, 0, 0.6)';
                    
                    if (coreCircle) {
                        coreCircle.setAttribute('r', '10');
                        coreCircle.style.stroke = '#665030';
                    }
                    
                    setTimeout(() => {
                        parchment.style.transform = 'none';
                    }, 200);
                }, 300);
            }
        });
    }

    // Form and registration elements removed in favor of Stripe checkout direct links.

    // Initialize Language settings
    const langToSet = detectLanguage();
    setLanguage(langToSet);
});
