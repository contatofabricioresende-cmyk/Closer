
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Users, 
  Search, 
  Settings, 
  Rocket, 
  Star, 
  Briefcase,
  Menu,
  X,
  Phone,
  ArrowRight,
  Clock,
  Sparkles,
  Zap,
  Play,
  MessageCircle,
  Target,
  Palette,
  Laptop,
  FileText,
  Bot,
  Mail,
  Focus,
  Send,
  Linkedin,
  Flame,
  BarChart3,
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react';

/**
 * --- TYPES & CONSTANTS ---
 */

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "Quanto custa implementar o ProCloser Digital?",
    answer: "O investimento varia conforme o porte da sua empresa e o escopo necessário. Fazemos um diagnóstico gratuito para apresentar uma proposta personalizada baseada na sua realidade comercial."
  },
  {
    question: "Funciona para qualquer tipo de empresa?",
    answer: "Sim! O ProCloser Digital funciona para qualquer negócio B2B ou B2C que tenha um faturamento acima de R$ 10.000/mês. Se você tem leads mas eles não fecham, nossa metodologia resolve."
  },
  {
    question: "Quanto tempo até ver resultados?",
    answer: "Os primeiros resultados aparecem em 15-30 dias através do ajuste de scripts e abordagem. O sistema completo e automatizado costuma estar rodando em sua capacidade máxima entre 60 e 90 dias."
  },
  {
    question: "É só consultoria ou vocês implementam?",
    answer: "Fazemos o ciclo completo: diagnóstico, treinamento intensivo da equipe, implementação das ferramentas de automação e acompanhamento de performance. Não entregamos teoria, entregamos resultado."
  },
  {
    question: "Preciso ter equipe grande?",
    answer: "Não. O ProCloser funciona desde operações solo (você sozinho) até empresas com 50+ pessoas no comercial. Adaptamos a metodologia ao seu tamanho atual."
  },
  {
    question: "Vocês garantem resultado?",
    answer: "Garantimos a implementação perfeita da metodologia e ferramentas. O resultado final depende da execução da sua equipe, mas 87% dos clientes que aplicam corretamente dobram o fechamento em 90 dias."
  },
  {
    question: "Já uso CRM, vocês substituem?",
    answer: "Não necessariamente. Podemos integrar com seu CRM atual (Pipedrive, HubSpot, RD Station, etc) ou implementar nossa solução otimizada. Analisamos no diagnóstico o que faz mais sentido."
  },
  {
    question: "Tenho outros problemas na empresa, vocês têm soluções além de vendas?",
    answer: (
      <span>
        Sim! Além da metodologia de vendas, oferecemos soluções completas: Branding, Site, Automação, Prospecção, LinkedIn, Analytics e mais. Podemos resolver todo o ecossistema comercial da sua empresa.{" "}
        <a href="#solucoes-extras" className="text-green-500 underline font-black italic uppercase tracking-tighter">Ver Soluções Extras →</a>
      </span>
    )
  }
];

interface ExtraSolution {
  id: number;
  icon: React.ReactNode;
  title: string;
  bullets: string[];
  fullDesc: string;
}

const EXTRA_SOLUTIONS: ExtraSolution[] = [
  {
    id: 1,
    icon: <Palette size={40} />,
    title: "BRANDING & IDENTIDADE",
    bullets: ["Logo profissional memorável", "Paleta estratégica de cores", "Tom de voz consistente", "Brand guidelines completo"],
    fullDesc: "Sua marca é o que as pessoas dizem sobre você quando você não está na sala. Criamos identidades visuais que exalam autoridade e confiança, facilitando a venda pelo valor percebido e não pelo preço."
  },
  {
    id: 2,
    icon: <Laptop size={40} />,
    title: "SITE INSTITUCIONAL",
    bullets: ["Carregamento < 2 segundos", "SEO otimizado (Google)", "Captação estratégica", "Mobile-first responsivo"],
    fullDesc: "Um site institucional de alta performance é o pilar central da sua autoridade online. Desenvolvemos sites rápidos, seguros e focados em converter visitantes em oportunidades reais de negócio."
  },
  {
    id: 3,
    icon: <FileText size={40} />,
    title: "LANDING PAGE / VSL",
    bullets: ["Copy persuasivo (AIDA, PAS)", "Video Sales Letter profis.", "Conversão 15-30%", "Checkout otimizado"],
    fullDesc: "Desenvolvemos páginas ultra-especializadas para venda direta ou geração de leads. Unimos design de ponta com as melhores estratégias de copywriting do mercado para maximizar seu ROI."
  },
  {
    id: 4,
    icon: <Bot size={40} />,
    title: "AUTOMAÇÕES & CHATBOT IA",
    bullets: ["Chatbot IA 24/7", "WhatsApp Business API", "Workflows inteligentes", "80% tarefas eliminadas"],
    fullDesc: "Implementamos inteligência artificial para qualificar seus leads em tempo real. Nossa automação não substitui o humano, ela potencializa o fechamento ao entregar o lead pronto para o closer."
  },
  {
    id: 5,
    icon: <Mail size={40} />,
    title: "EMAIL MARKETING",
    bullets: ["Sequências automáticas", "Segmentação avançada", "Nurturing progressivo", "A/B testing de assuntos"],
    fullDesc: "A lista de e-mails ainda é o ativo mais valioso de uma empresa digital. Criamos fluxos de nutrição que educam o lead e o preparam para a compra, gerando vendas no piloto automático."
  },
  {
    id: 6,
    icon: <Focus size={40} />,
    title: "PROSPECÇÃO INBOUND",
    bullets: ["SEO estratégico", "Content marketing", "Tráfego pago otimizado", "Lead magnets irresistíveis"],
    fullDesc: "Atraia leads qualificados de forma passiva. Estruturamos canais que trazem pessoas interessadas na sua solução todos os dias, reduzindo seu custo por aquisição ao longo do tempo."
  },
  {
    id: 7,
    icon: <Rocket size={40} />,
    title: "PROSPECÇÃO OUTBOUND",
    bullets: ["Cold email sequências", "Scraping Apollo, Maps", "Multi-channel approach", "20-80 leads B2B/mês"],
    fullDesc: "Não espere o telefone tocar. Atacamos o mercado de forma cirúrgica, abordando decisores estratégicos em empresas que possuem o perfil ideal do seu cliente (ICP)."
  },
  {
    id: 8,
    icon: <Linkedin size={40} />,
    title: "LINKEDIN AUTOMATION",
    bullets: ["Perfil otimizado", "Conexões automáticas", "Mensagens personalizadas", "Sales Navigator integration"],
    fullDesc: "Domine a maior rede profissional do mundo. Criamos um sistema de networking automatizado que gera conexões reais com CEOs e diretores, abrindo portas que antes eram inacessíveis."
  },
  {
    id: 9,
    icon: <Flame size={40} />,
    title: "AQUECIMENTO DE LEADS",
    bullets: ["Nutrição personalizada", "Retargeting estratégico", "Lead scoring automático", "60% leads voltam quentes"],
    fullDesc: "O dinheiro está no follow-up. Re-engajamos leads que 'esfriaram' ou que não fecharam de primeira, mantendo sua empresa presente na mente do prospect até o momento ideal da compra."
  },
  {
    id: 10,
    icon: <BarChart3 size={40} />,
    title: "ANALYTICS & BI",
    bullets: ["Dashboard tempo real", "Atribuição multi-touch", "Testes A/B sistemáticos", "Otimização por dados"],
    fullDesc: "O que não é medido não é gerenciado. Entregamos dashboards completos para que você tenha visão total do seu comercial, sabendo exatamente onde investir para dobrar o lucro."
  }
];

const TESTIMONIALS = [
  {
    name: "João Silva",
    role: "CEO",
    quote: "“Nossa conversão subiu de 15% para 48% em apenas 60 dias. O SPIN Selling mudou completamente como abordamos cada novo lead no funil.”"
  },
  {
    name: "Maria Santos",
    role: "Diretora Comercial",
    quote: "“Criamos um sistema de recorrência sólido. Nosso faturamento não apenas cresceu 3x, como se tornou previsível mês após mês.”"
  },
  {
    name: "Carlos Mendes",
    role: "Fundador",
    quote: "“Hoje, 30% dos nossos novos clientes vêm por indicação direta. O sistema da ProCloser transformou clientes em verdadeiros promotores.”"
  },
  {
    name: "Davi Oliveira",
    role: "Head de Vendas",
    quote: "“Implementar o SPIN foi o divisor de águas para nossa equipe de SDRs. O volume de agendamentos qualificados dobrou na primeira quinzena.”"
  },
  {
    name: "Ana Paula Lima",
    role: "Gerente Comercial",
    quote: "“A previsibilidade de caixa que alcançamos em 3 meses é algo que nunca tivemos antes. O controle sobre o pipeline agora é total.”"
  },
  {
    name: "Ricardo Fontes",
    role: "Sócio-Diretor",
    quote: "“O atendimento consultivo elevou o ticket médio dos nossos contratos em 40%. O cliente percebe o valor antes mesmo de falarmos de preço.”"
  },
  {
    name: "Juliana Costa",
    role: "Executiva de Contas",
    quote: "“Os scripts personalizados reduzem o tempo de fechamento drasticamente. Não perdemos mais tempo com leads que não têm perfil.”"
  },
  {
    name: "Felipe Almeida",
    role: "Fundador",
    quote: "“Finalmente paramos de queimar leads. Cada contato agora é tratado como uma oportunidade real e estratégica dentro da nossa operação.”"
  },
  {
    name: "Beatriz Rocha",
    role: "Consultora Sênior",
    quote: "“O follow-up inteligente salvou negócios que eu já considerava perdidos. A automação humanizada da ProCloser é um diferencial absurdo.”"
  },
  {
    name: "Gustavo Henrique",
    role: "Diretor de Operações",
    quote: "“A metodologia é prática, direto ao ponto e foca no que realmente importa: lucro líquido e escala comercial sustentável.”"
  }
];

/**
 * --- COMPONENTS ---
 */

const DiagnosisModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá, tudo bem? Meu nome é ${formData.name} e gostaria de agendar o diagnóstico gratuito.`;
    const whatsappNumber = "5535999690356";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-[#111111] w-full max-w-[440px] rounded-[16px] p-6 md:p-10 animate-in fade-in zoom-in duration-300 shadow-2xl border border-white/5">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
          <X size={24} />
        </button>
        
        <div className="mb-6 md:mb-8 text-center md:text-left">
          <h2 className="text-[24px] md:text-[38px] font-black italic tracking-tighter uppercase text-green-500 leading-tight mb-3">Quase lá!</h2>
          <p className="text-gray-400 text-[13px] md:text-[15px] font-black italic tracking-tighter uppercase leading-relaxed">
            Preencha os dados abaixo para agendar seu diagnóstico GRATUITO com um especialista no WhatsApp.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input 
            type="text" 
            required 
            placeholder="Seu Nome" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-[8px] px-5 py-3 md:py-4 focus:border-green-500 outline-none transition-all text-white placeholder:text-gray-500 font-black italic tracking-tighter uppercase text-sm md:text-base" 
          />
          <input 
            type="tel" 
            required 
            placeholder="Seu WhatsApp" 
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-[8px] px-5 py-3 md:py-4 focus:border-green-500 outline-none transition-all text-white placeholder:text-gray-500 font-black italic tracking-tighter uppercase text-sm md:text-base" 
          />
          <input 
            type="email" 
            required 
            placeholder="Seu E-mail" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-[8px] px-5 py-3 md:py-4 focus:border-green-500 outline-none transition-all text-white placeholder:text-gray-500 font-black italic tracking-tighter uppercase text-sm md:text-base" 
          />
          
          <button type="submit" className="w-full bg-green-500 text-black py-4 rounded-[6px] font-black text-[15px] md:text-[18px] hover:brightness-110 transition-all mt-2 flex items-center justify-center gap-3 uppercase tracking-tighter italic">
            AGENDAR NO WHATSAPP <MessageCircle size={20} fill="currentColor" />
          </button>
        </form>
      </div>
    </div>
  );
};

const SolutionInfoModal: React.FC<{ isOpen: boolean; onClose: () => void; solution: ExtraSolution | null; onAgendar: () => void }> = ({ isOpen, onClose, solution, onAgendar }) => {
  if (!isOpen || !solution) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-[#111111] w-full max-w-2xl rounded-[24px] md:rounded-[32px] p-6 md:p-12 animate-in fade-in zoom-in duration-300 border border-green-500/20 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 md:top-8 md:right-8 text-gray-500 hover:text-white transition-colors">
          <X size={32} />
        </button>

        <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="text-green-500 scale-75 md:scale-100">{solution.icon}</div>
          <h2 className="text-xl md:text-4xl font-black italic tracking-tighter uppercase text-green-500">{solution.title}</h2>
        </div>

        <p className="text-sm md:text-2xl text-gray-300 font-black italic tracking-tighter uppercase mb-6 md:mb-8 leading-relaxed">
          {solution.fullDesc}
        </p>

        <div className="space-y-2 md:space-y-4 mb-8 md:mb-10">
          <h3 className="text-green-500 font-black italic tracking-tighter uppercase text-[10px] md:text-xs">O que está incluído:</h3>
          {solution.bullets.map((b, i) => (
            <div key={i} className="flex items-start gap-3 text-xs md:text-lg font-black italic tracking-tighter uppercase text-gray-400">
              <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5 md:mt-1" />
              <span>{b}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={onAgendar}
          className="w-full bg-green-500 text-black py-4 md:py-6 rounded-xl md:rounded-2xl font-black text-base md:text-2xl hover:scale-[1.02] transition-all uppercase tracking-tighter italic flex items-center justify-center gap-4"
        >
          Agendar Diagnóstico Agora <ArrowRight size={22} className="md:w-7 md:h-7" />
        </button>
      </div>
    </div>
  );
};

const VerticalCarousel: React.FC<{ onCardClick: (s: ExtraSolution) => void }> = ({ onCardClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = EXTRA_SOLUTIONS.length;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % total);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  const getIndex = (offset: number) => (currentIndex + offset + total) % total;

  return (
    <div 
      className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 md:gap-6">
        {[-1, 0, 1].map((offset) => {
          const idx = getIndex(offset);
          const item = EXTRA_SOLUTIONS[idx];
          const isCenter = offset === 0;
          
          return (
            <div 
              key={idx}
              onClick={() => onCardClick(item)}
              className={`
                relative w-full max-w-xl transition-all duration-700 ease-in-out cursor-pointer overflow-hidden
                ${isCenter ? 'h-[220px] md:h-[280px] opacity-100 scale-105 md:scale-110 z-20 border-2 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)] bg-[#1a1a1a]' : 'h-[100px] md:h-[150px] opacity-30 scale-90 z-10 bg-[#0f0f0f]'}
                rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col justify-center group
              `}
            >
              <div className="flex items-center gap-4 md:gap-6 mb-2 md:mb-4">
                <div className={`${isCenter ? 'text-green-500' : 'text-gray-600'} transition-colors duration-500`}>
                  {item.icon}
                </div>
                <h4 className={`text-base md:text-2xl font-black italic tracking-tighter uppercase ${isCenter ? 'text-green-500' : 'text-gray-500'}`}>
                  {item.title}
                </h4>
              </div>
              
              {isCenter && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
                  {item.bullets.slice(0, 4).map((b, bi) => (
                    <div key={bi} className="flex items-center gap-2 text-[9px] md:text-xs font-black italic tracking-tighter uppercase text-gray-400">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full shrink-0" />
                      {b}
                    </div>
                  ))}
                </div>
              )}

              {isCenter && (
                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-8 flex items-center gap-2 text-green-500 font-black italic tracking-tighter uppercase text-[9px] md:text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  + Saber Mais <ChevronRight size={14} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const HorizontalCarousel: React.FC<{ onCardClick: (s: ExtraSolution) => void }> = ({ onCardClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide flex gap-4 px-4 snap-x snap-mandatory" ref={scrollRef}>
      {EXTRA_SOLUTIONS.map((item) => (
        <div 
          key={item.id}
          onClick={() => onCardClick(item)}
          className="min-w-[85vw] bg-[#1a1a1a] border border-green-500/20 rounded-2xl p-6 snap-center flex flex-col gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="text-green-500 scale-75">{item.icon}</div>
            <h4 className="text-base font-black italic tracking-tighter uppercase text-green-500">{item.title}</h4>
          </div>
          <div className="space-y-1">
            {item.bullets.slice(0, 3).map((b, bi) => (
              <div key={bi} className="flex items-center gap-2 text-[9px] font-black italic tracking-tighter uppercase text-gray-400">
                <div className="w-1 h-1 bg-green-500 rounded-full" /> {b}
              </div>
            ))}
          </div>
          <button className="mt-auto flex items-center gap-2 text-green-500 font-black italic tracking-tighter uppercase text-[10px]">
            Saber Mais <ArrowRight size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

const Logo: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => (
  <div className="flex items-center gap-2 md:gap-4 group cursor-pointer">
    <div className="relative">
      <div className={`w-9 h-9 md:w-14 md:h-14 ${isScrolled ? 'bg-black border-black' : 'bg-black border-green-500'} border-2 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-500`}>
        <Target className="text-green-500 w-5 h-5 md:w-8 md:h-8" />
      </div>
      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 md:w-4 md:h-4 bg-green-500 rounded-full animate-pulse border-2 border-black"></div>
    </div>
    <div className="flex flex-col leading-none">
      <span className={`text-lg md:text-4xl font-black tracking-tighter uppercase transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>
        ProCloser
      </span>
      <span className="text-[7px] md:text-xs font-bold tracking-[0.4em] uppercase text-green-500 mt-0.5 md:mt-1">
        Digital Systems
      </span>
    </div>
  </div>
);

const Navbar: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    try {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {
      console.error("Navigation error:", err);
    }
  };

  const navBgClass = scrolled 
    ? 'bg-white/90 backdrop-blur-xl border-b border-white/20 py-2.5 md:py-4 shadow-xl'
    : 'bg-transparent py-4 md:py-8';

  const linkStyle = "text-xs md:text-xl font-black italic tracking-tighter uppercase transition-colors duration-300";
  const textColorClass = scrolled ? 'text-black hover:text-green-600' : 'text-white hover:text-green-400';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBgClass}`}>
      <div className="max-w-[1600px] mx-auto px-4 md:px-16 flex justify-between items-center">
        <Logo isScrolled={scrolled} />

        <div className="hidden lg:flex items-center gap-10">
          <a href="#metodologia" onClick={(e) => handleNavClick(e, 'metodologia')} className={`${linkStyle} ${textColorClass}`}>Metodologia</a>
          <a href="#resultados" onClick={(e) => handleNavClick(e, 'resultados')} className={`${linkStyle} ${textColorClass}`}>Resultados</a>
          <a href="#como-funciona" onClick={(e) => handleNavClick(e, 'como-funciona')} className={`${linkStyle} ${textColorClass}`}>Implementação</a>
          <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className={`${linkStyle} ${textColorClass}`}>Dúvidas</a>
          <a href="#solucoes-extras" onClick={(e) => handleNavClick(e, 'solucoes-extras')} className={`${linkStyle} ${textColorClass}`}>Outras Soluções</a>
          
          <button 
            onClick={(e) => { e.preventDefault(); onOpenModal(); }}
            className="px-5 py-2.5 rounded-full text-xs font-black bg-green-500 text-black hover:bg-green-400 transition-all shadow-lg neon-glow uppercase tracking-tighter italic"
          >
            SOLICITE DIAGNÓSTICO
          </button>
        </div>

        <button className={`${scrolled ? 'text-black' : 'text-white'} lg:hidden p-2 transition-colors`} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] md:top-[96px] bg-black/98 backdrop-blur-3xl z-40 p-8 flex flex-col gap-5 animate-in slide-in-from-right duration-300">
          <a href="#metodologia" onClick={(e) => handleNavClick(e, 'metodologia')} className="text-xl font-black italic tracking-tighter uppercase">Metodologia</a>
          <a href="#resultados" onClick={(e) => handleNavClick(e, 'resultados')} className="text-xl font-black italic tracking-tighter uppercase">Resultados</a>
          <a href="#como-funciona" onClick={(e) => handleNavClick(e, 'como-funciona')} className="text-xl font-black italic tracking-tighter uppercase">Implementação</a>
          <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="text-xl font-black italic tracking-tighter uppercase">Dúvidas</a>
          <a href="#solucoes-extras" onClick={(e) => handleNavClick(e, 'solucoes-extras')} className="text-xl font-black italic tracking-tighter uppercase">Outras Soluções</a>
          <button 
            onClick={(e) => { e.preventDefault(); setMenuOpen(false); onOpenModal(); }}
            className="bg-green-500 text-black py-4 rounded-2xl text-base font-black italic tracking-tighter uppercase shadow-2xl mt-4"
          >
            SOLICITE DIAGNÓSTICO GRATUITO
          </button>
        </div>
      )}
    </nav>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSolutionModalOpen, setIsSolutionModalOpen] = useState(false);
  const [activeExtraSolution, setActiveExtraSolution] = useState<ExtraSolution | null>(null);
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  
  const vacancies = 3;

  useEffect(() => {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => sectionObserver.observe(el));
    return () => sectionObserver.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    try {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {
      console.error("Navigation error:", err);
    }
  };

  const handleSolutionClick = (s: ExtraSolution) => {
    setActiveExtraSolution(s);
    setIsSolutionModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-green-500 selection:text-black">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      
      <DiagnosisModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <SolutionInfoModal 
        isOpen={isSolutionModalOpen} 
        onClose={() => setIsSolutionModalOpen(false)} 
        solution={activeExtraSolution}
        onAgendar={() => { setIsSolutionModalOpen(false); setIsModalOpen(true); }}
      />

      {/* SECTION 1: HERO */}
      <section id="inicio" className="relative pt-28 md:pt-64 pb-16 md:pb-32 lg:pt-80 lg:pb-72 overflow-hidden reveal">
        <div className="absolute top-0 right-0 w-[500px] md:w-[1200px] h-[500px] md:h-[1200px] bg-green-500/[0.03] blur-[120px] md:blur-[200px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 md:gap-3 bg-white/5 border border-white/10 px-5 md:px-8 py-1.5 md:py-3 rounded-full mb-8 md:mb-12 animate-float">
            <Sparkles className="text-green-500 w-3.5 h-3.5 md:w-5 md:h-5" />
            <span className="text-gray-400 text-[9px] md:text-xs font-black tracking-[0.2em] md:tracking-[0.3em] uppercase italic">Excelência Comercial Digital</span>
          </div>
          
          <h1 className="text-[30px] sm:text-[56px] md:text-[124px] lg:text-[136px] font-black italic tracking-tighter mb-8 md:mb-12 leading-[1.15] md:leading-[1.1] reveal px-4 md:px-10 py-6 md:py-8 inline-block pr-6 md:pr-32">
            Seus Leads Não <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200 underline decoration-green-500/30 underline-offset-[6px] md:underline-offset-[16px]">
              Viram Clientes?
            </span>
          </h1>
          
          <p className="text-base md:text-4xl text-gray-400 font-black italic tracking-tighter uppercase max-w-5xl mx-auto mb-10 md:mb-20 leading-tight md:leading-relaxed reveal px-4">
            Pare de apenas "atender" curiosos. Transforme seu comercial em uma máquina previsível com a metodologia <span className="text-white font-black italic">SPIN Selling</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center items-center reveal px-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-green-500 hover:bg-green-400 text-black px-8 md:px-16 py-4 md:py-8 rounded-xl md:rounded-[2.5rem] text-lg md:text-3xl font-black transition-all hover:scale-105 neon-glow uppercase italic tracking-tighter flex items-center justify-center gap-3 md:gap-4 shadow-2xl"
            >
              Agendar Diagnóstico <ArrowRight size={26} className="w-5 h-5 md:w-8 md:h-8" />
            </button>
            <a href="#video" onClick={(e) => { e.preventDefault(); document.getElementById('video')?.scrollIntoView({behavior:'smooth'}); }} className="text-xs md:text-xl font-black italic tracking-tighter uppercase border-b border-white/20 hover:border-green-500 transition-all py-1 md:py-2 text-gray-400 hover:text-white">
              Ver Como Funciona
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: VIDEO */}
      <section id="video" className="py-16 md:py-40 bg-white/[0.02] relative reveal border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <div className="mb-10 md:mb-24 max-w-4xl mx-auto">
            <span className="text-green-500 font-black tracking-[0.4em] uppercase text-[10px] md:text-xs mb-4 md:mb-6 block italic">Estratégia Exclusiva</span>
            <h2 className="text-3xl md:text-8xl font-black italic tracking-tighter mb-6 md:mb-10 leading-none uppercase">O Vídeo de <br className="md:hidden" />90 Segundos.</h2>
            <p className="text-sm md:text-xl text-gray-400 font-black italic tracking-tighter uppercase leading-relaxed max-w-2xl mx-auto px-4">
              Descubra por que as maiores empresas do mundo utilizam o método SPIN para fechar contratos milionários todos os dias.
            </p>
          </div>
          
          <div className="relative max-w-5xl mx-auto group px-2">
            <div className="absolute -inset-4 bg-green-500/10 rounded-[1.5rem] md:rounded-[4rem] blur-xl md:blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            <div 
              onClick={() => setIsModalOpen(true)}
              className="relative aspect-video bg-[#0a0a0a] border border-white/10 rounded-2xl md:rounded-[4rem] overflow-hidden flex items-center justify-center cursor-pointer shadow-2xl transition-all group-hover:scale-[1.01]"
            >
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                alt="Corporate Meeting" 
                className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 md:w-32 md:h-32 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(0,255,0,0.6)] group-hover:scale-110 transition-all duration-500">
                  <Play className="text-black fill-black ml-1 w-7 h-7 md:w-14 md:h-14" />
                </div>
                <span className="mt-5 md:mt-10 text-white font-black italic tracking-tighter uppercase text-sm md:text-2xl">Assista Agora</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PROBLEMAS */}
      <section id="problemas" className="py-16 md:py-40 bg-black reveal">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-10 md:gap-24 items-center mb-12 md:mb-32">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl md:text-8xl font-black italic tracking-tighter mb-6 md:mb-10 leading-tight md:leading-[0.9] uppercase">Sua equipe está <br/><span className="text-red-500 italic">travada?</span></h2>
              <p className="text-base md:text-2xl text-gray-500 font-black italic tracking-tighter uppercase leading-relaxed max-w-lg lg:mx-0 mx-auto">
                Vender sem método é o caminho mais rápido para o esgotamento. Identificamos os gargalos que estão destruindo seu ROI.
              </p>
            </div>
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8">
              <ProblemItem title="Funil Furado" description="Investimento alto em tráfego que resulta em conversas vazias e sem fechamento." />
              <ProblemItem title="Medo do 'Não'" description="Vendedores que travam no momento de apresentar o preço ou lidar com objeções." />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-10">
            <ProblemItem title="Follow-up Lento" description="Esperar o lead responder é o maior erro comercial da era digital." />
            <ProblemItem title="Vendedor 'Passivo'" description="Se você só vende para quem já quer comprar, você é um tirador de pedidos." />
            <ProblemItem title="Desorganização" description="Gestão cega impede a escala e mata a previsibilidade do lucro mensal." />
          </div>
        </div>
      </section>

      {/* SECTION 4: SOLUÇÃO */}
      <section id="resultados" className="py-16 md:py-40 bg-[#050505] relative overflow-hidden reveal">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-32 items-center">
            <div className="relative h-[300px] md:h-[700px] w-full">
              <div className="absolute -inset-8 md:-inset-16 bg-green-500/10 blur-[80px] md:blur-[150px] rounded-full"></div>
              <div className="relative rounded-2xl md:rounded-[5rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] w-full h-full">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bbdac8626ad1?q=80&w=2070&auto=format&fit=crop" 
                  alt="Engenharia de Vendas Visual" 
                  className="w-full h-full object-cover transition-all duration-1000 block absolute inset-0 bg-black opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                <div className="absolute bottom-5 left-5 right-5 md:bottom-16 md:left-16 md:right-16">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 md:p-8 rounded-xl md:rounded-3xl">
                    <div className="text-2xl md:text-6xl font-black italic tracking-tighter uppercase text-green-500 mb-1">48.2%</div>
                    <div className="text-[9px] md:text-sm font-black italic tracking-tighter uppercase text-gray-400">Taxa média de conversão pós-implementação</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-green-500 font-black tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6 md:mb-8 block italic">Nossa Proposta</span>
              <h2 className="text-3xl md:text-9xl font-black italic tracking-tighter mb-8 md:mb-14 leading-tight md:leading-[0.9] uppercase">Engenharia <br/>de Vendas.</h2>
              
              <div className="space-y-8 md:space-y-16 mb-10 md:mb-20">
                <SolutionPoint title="Diagnóstico de Valor" desc="Ensinamos sua equipe a encontrar a dor latente que o cliente ainda não percebeu." />
                <SolutionPoint title="Processos de Elite" desc="Automação e gestão de dados para que cada lead seja tratado com prioridade máximo." />
                <SolutionPoint title="Cultura de Fechamento" desc="Transformamos vendedores em consultores de alta performance respeitados pelo mercado." />
              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full md:w-auto bg-white text-black px-8 md:px-16 py-5 md:py-8 rounded-xl md:rounded-3xl font-black text-lg md:text-2xl hover:bg-green-500 transition-all shadow-2xl flex items-center justify-center gap-4 group italic uppercase tracking-tighter"
              >
                QUERO ESTE SISTEMA <Briefcase className="group-hover:rotate-12 transition-transform w-5 h-5 md:w-7 md:h-7" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: METODOLOGIA */}
      <section id="metodologia" className="py-16 md:py-40 bg-black overflow-hidden reveal">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-32">
            <h2 className="text-3xl md:text-[140px] font-black italic tracking-tighter mb-6 md:mb-12 leading-none uppercase">O Poder do <span className="text-green-500 italic">SPIN.</span></h2>
            <p className="text-base md:text-2xl text-gray-500 font-black italic tracking-tighter uppercase max-w-3xl mx-auto leading-tight md:leading-relaxed px-2">Não é sobre falar. É sobre perguntar. O método que mudou a história das vendas globais.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 items-stretch">
            <SpinCard letter="S" name="Situação" desc="O Contexto Atual" />
            <SpinCard letter="P" name="Problema" desc="As Dores Latentes" />
            <SpinCard letter="I" name="Implicação" desc="O Custo da Inércia" />
            <SpinCard letter="N" name="Necessidade" desc="O Valor da Solução" />
          </div>
        </div>
      </section>

      {/* SECTION 6: IMPLEMENTAÇÃO */}
      <section id="como-funciona" className="py-16 md:py-40 bg-white/[0.02] reveal">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-32">
            <h2 className="text-3xl md:text-8xl font-black italic tracking-tighter mb-5 md:mb-8 leading-none uppercase">O Caminho.</h2>
            <p className="text-sm md:text-xl text-gray-500 font-black italic tracking-tighter uppercase">Sua jornada de 90 dias para um comercial de classe mundial.</p>
          </div>
          
          <div className="space-y-10 md:space-y-16 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block"></div>
            
            <TimelineStep side="left" num="01" title="Análise de Vazamentos" desc="Mapeamos cada etapa do seu processo atual para descobrir onde você está perdendo faturamento hoje." />
            <TimelineStep side="right" num="02" title="Treinamento Técnico" desc="Workshops práticos de SPIN Selling com simulações de chamadas e ajustes de scripts personalizados." />
            <TimelineStep side="left" num="03" title="Configuração de Motor" desc="Implementação de CRM e automações de follow-up que impedem qualquer lead de esfriar ou ser forgotten." />
            <TimelineStep side="right" num="04" title="Escala de Faturamento" desc="Análise de métricas, ativação de loop de indicações e foco total em aumento de LTV e recorrência." />
          </div>

          <div className="mt-16 md:mt-40 text-center px-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto bg-red-500 text-black px-10 md:px-20 py-6 md:py-10 rounded-xl md:rounded-[3rem] text-xl md:text-4xl font-black transition-all hover:scale-105 neon-glow uppercase italic tracking-tighter shadow-2xl"
            >
              INICIAR MINHA IMPLEMENTAÇÃO →
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 7: RESULTADOS REAIS */}
      <section id="resultados-reais" className="py-16 md:py-40 bg-black relative overflow-hidden border-t border-white/5 reveal">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 mb-10 md:mb-20">
          <div className="text-center">
            <span className="text-green-500 font-black tracking-[0.4em] uppercase text-[10px] md:text-xs mb-4 md:mb-6 block italic">PROVAS DE PERFORMANCE</span>
            <h2 className="text-3xl md:text-8xl font-black italic tracking-tighter mb-6 md:mb-10 leading-tight md:leading-none uppercase text-white">
              Resultados de quem <br/>estruturou as vendas.
            </h2>
            <p className="text-base md:text-2xl text-gray-500 font-black italic tracking-tighter uppercase max-w-4xl mx-auto leading-relaxed px-4">
              Empresas de serviços, consultorias e operações B2B que passaram a ter <span className="text-white font-black italic">previsibilidade de caixa</span> todos os meses com nosso método.
            </p>
          </div>
        </div>

        {/* Horizontal Slow Carousel */}
        <div className="relative w-full overflow-hidden py-4 md:py-10">
          <div className="flex w-max animate-marquee gap-4 md:gap-8 px-4">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, idx) => (
              <div key={idx} className="w-[280px] md:w-[450px] shrink-0">
                <TestimonialCard 
                  name={testimonial.name} 
                  role={testimonial.role} 
                  quote={testimonial.quote} 
                />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-black to-transparent z-20"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-black to-transparent z-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 mt-12 md:mt-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
            <ResultStatBox value="3x" label="Aumento de Faturamento" />
            <ResultStatBox value="48%" label="Taxa Média de Conversão" />
            <ResultStatBox value="60 dias" label="Prazo Médio Para Resultados" />
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQ */}
      <section id="faq" className="py-16 md:py-40 bg-black reveal">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeader title="Dúvidas?" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 items-start max-w-5xl mx-auto">
            <div className="space-y-4">
              {FAQ_DATA.slice(0, 4).map((item, i) => (
                <FAQAccordion 
                  key={i} 
                  item={item} 
                  isOpen={openFAQIndex === i} 
                  onClick={() => setOpenFAQIndex(openFAQIndex === i ? null : i)}
                />
              ))}
            </div>
            <div className="space-y-4">
              {FAQ_DATA.slice(4, 8).map((item, i) => (
                <FAQAccordion 
                  key={i + 4} 
                  item={item} 
                  isOpen={openFAQIndex === i + 4} 
                  onClick={() => setOpenFAQIndex(openFAQIndex === i + 4 ? null : i + 4)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: SOLUÇÕES EXTRAS */}
      <section id="solucoes-extras" className="py-16 md:py-40 bg-[#0a0a0a] reveal overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-10 md:gap-20 items-center mb-12 md:mb-20">
            {/* Left Column: Fixed Text */}
            <div className="lg:col-span-7 text-center md:text-left">
              <h2 className="text-2xl md:text-6xl font-black italic tracking-tighter mb-5 md:mb-8 leading-tight md:leading-[1.1] uppercase text-white px-2">
                Soluções Extras Para <span className="text-green-500 italic">Maximizar a Performance</span> do Seu Comercial
              </h2>
              <p className="text-lg md:text-2xl text-white font-black italic tracking-tighter uppercase mb-8 md:mb-10 leading-tight">
                O problema não está apenas no lead. Todo o ecossistema precisa estar alinhado.
              </p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full md:w-auto bg-green-500 text-black px-8 md:px-12 py-4 md:py-6 rounded-xl md:rounded-2xl font-black text-base md:text-xl hover:scale-105 transition-all flex items-center justify-center gap-3 italic uppercase tracking-tighter shadow-2xl"
              >
                Diagnóstico Gratuito <ArrowRight size={20} />
              </button>
            </div>

            {/* Right Column: Ferris Wheel Carousel */}
            <div className="lg:col-span-5 h-[350px] md:h-[650px] relative mt-6 md:mt-0">
              <div className="hidden md:block h-full">
                <VerticalCarousel onCardClick={handleSolutionClick} />
              </div>
              <div className="md:hidden">
                <HorizontalCarousel onCardClick={handleSolutionClick} />
              </div>
            </div>
          </div>
          
          {/* Section Footer */}
          <div className="pt-10 md:pt-16 border-t border-white/5">
            <p className="text-sm md:text-2xl text-gray-400 font-black italic tracking-tighter uppercase leading-relaxed text-center max-w-5xl mx-auto px-4">
              Branding fraco, site lento, zero automação, leads frios abandonados... Cada falha custa vendas perdidas. A ProCloser Digital oferece soluções completas para cada desafio.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="cta-final" className="py-24 md:py-56 bg-black relative overflow-hidden border-t border-white/5 reveal">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center relative z-10">
          <span className="text-red-500 font-black tracking-[0.4em] uppercase text-[9px] md:text-[10px] mb-8 md:mb-10 block italic">OPORTUNIDADE LIMITADA</span>
          <h2 className="text-[34px] sm:text-6xl md:text-[140px] font-black italic tracking-tighter mb-10 md:mb-16 leading-tight md:leading-[0.9] uppercase text-white">
            O Próximo Nível <br/><span className="text-red-500 italic">É Agora.</span>
          </h2>
          <p className="text-base md:text-4xl font-black italic tracking-tighter uppercase mb-10 md:mb-20 text-gray-500 max-w-4xl mx-auto px-4">
            Só agendamos 8 novos diagnósticos <span className="text-red-500 font-black italic uppercase">GRATUITOS</span> por mês, visando manter nossa qualidade máxima. Garanta já o seu. <br/>
            <span className="text-white text-sm md:text-2xl mt-4 block">Restam <span className="underline underline-offset-4 md:underline-offset-8 decoration-red-500/50">{vacancies} vagas</span> disponíveis este mês.</span>
          </p>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto bg-red-500 text-black px-10 md:px-20 py-6 md:py-12 rounded-xl md:rounded-[3rem] text-lg md:text-5xl font-black transition-all hover:scale-105 neon-glow uppercase italic tracking-tighter shadow-2xl"
          >
            QUERO MEU DIAGNÓSTICO →
          </button>
          
          <div className="mt-12 md:mt-28 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 opacity-50 hover:opacity-100 transition-opacity">
            <div className="h-px w-20 md:w-32 bg-white/20 hidden md:block"></div>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-3 md:gap-4 text-red-500 font-black hover:text-white transition-colors uppercase tracking-[0.2em] md:tracking-[0.3em] text-sm md:text-lg italic">
              <Phone size={22} className="md:w-7 md:h-7" /> Falar no WhatsApp Direto
            </button>
            <div className="h-px w-20 md:w-32 bg-white/20 hidden md:block"></div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-red-500/[0.05] blur-[100px] md:blur-[120px] rounded-full pointer-events-none"></div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 md:py-32 bg-black border-t border-white/5 reveal">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-20">
          <Logo isScrolled={false} />
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 md:gap-x-16 gap-y-8 text-[9px] md:text-sm font-black italic tracking-tighter uppercase text-gray-600 w-full md:w-auto">
            <div className="flex flex-col gap-4 md:gap-6">
              <span className="text-white mb-2 font-black italic tracking-tighter uppercase">Páginas</span>
              <a href="#inicio" onClick={(e) => handleNavClick(e, 'inicio')} className="hover:text-green-500 transition-colors">Início</a>
              <a href="#metodologia" onClick={(e) => handleNavClick(e, 'metodologia')} className="hover:text-green-500 transition-colors">Metodologia</a>
              <a href="#resultados" onClick={(e) => handleNavClick(e, 'resultados')} className="hover:text-green-500 transition-colors">Resultados</a>
            </div>
            <div className="flex flex-col gap-4 md:gap-6">
              <span className="text-white mb-2 font-black italic tracking-tighter uppercase">Suporte</span>
              <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="hover:text-green-500 transition-colors">Dúvidas</a>
              <a href="https://wa.me/5535999690356" className="hover:text-green-500 transition-colors">WhatsApp</a>
              <button onClick={() => setIsModalOpen(true)} className="text-left hover:text-green-500 transition-colors uppercase">Diagnóstico</button>
            </div>
            <div className="flex flex-col gap-4 md:gap-6 col-span-2 md:col-span-1">
              <span className="text-white mb-2 font-black italic tracking-tighter uppercase">Legal</span>
              <p className="text-gray-800 font-black italic tracking-tighter uppercase leading-tight">© 2024 ProCloser Digital.<br/>Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * --- SUBCOMPONENTS ---
 */

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-12 md:mb-24 px-4 reveal">
    <h2 className="text-3xl md:text-8xl font-black italic tracking-tighter mb-6 md:mb-10 leading-none uppercase">{title}</h2>
    {subtitle && <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-2xl leading-tight md:leading-relaxed font-black italic tracking-tighter uppercase px-4">{subtitle}</p>}
    <div className="w-16 md:w-32 h-1.5 md:h-3 bg-green-500 mx-auto mt-6 md:mt-12 rounded-full"></div>
  </div>
);

const ProblemItem: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-12 rounded-2xl md:rounded-[4rem] hover:bg-white/5 transition-all duration-700 h-full group hover:border-red-500/20 shadow-2xl">
    <div className="w-10 h-10 md:w-16 md:h-16 bg-red-500/10 rounded-xl md:rounded-3xl flex items-center justify-center mb-5 md:mb-10 group-hover:bg-red-500 transition-colors">
      <XCircle className="text-red-500 group-hover:text-black w-5 h-5 md:w-8 md:h-8" />
    </div>
    <h3 className="text-xl md:text-3xl font-black italic tracking-tighter mb-3 md:mb-6 text-white leading-tight uppercase">{title}</h3>
    <p className="text-gray-500 leading-tight md:leading-relaxed font-black italic tracking-tighter uppercase text-sm md:text-lg">{description}</p>
  </div>
);

const SolutionPoint: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className="flex gap-4 md:gap-10 group reveal">
    <div className="shrink-0 w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-3xl bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500 group-hover:text-black transition-all shadow-inner">
      <CheckCircle2 size={20} className="md:w-8 md:h-8" />
    </div>
    <div>
      <h4 className="text-xl md:text-3xl font-black italic tracking-tighter mb-1.5 md:mb-3 uppercase">{title}</h4>
      <p className="text-gray-500 leading-tight md:leading-relaxed font-black italic tracking-tighter uppercase text-sm md:text-xl">{desc}</p>
    </div>
  </div>
);

const SpinCard: React.FC<{ letter: string; name: string; desc: string }> = ({ letter, name, desc }) => (
  <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-10 rounded-2xl md:rounded-[3rem] relative overflow-hidden group hover:border-green-500/40 transition-all shadow-2xl flex flex-col justify-end h-full min-h-[220px] md:min-h-[320px] text-left">
    <div className={`absolute top-0 right-0 w-full h-1/2 flex items-start justify-end ${letter === 'I' ? 'pr-10 md:pr-20' : 'pr-4 md:pr-6'} pt-2 md:pt-4 pointer-events-none overflow-hidden select-none`}>
      <span className="text-[100px] md:text-[180px] font-black italic leading-none text-green-500 opacity-10 group-hover:opacity-25 transition-all duration-700 transform translate-x-4 -translate-y-4 tracking-tighter uppercase">
        {letter}
      </span>
    </div>
    <div className="relative z-10">
      <span className="text-green-500 text-[9px] md:text-sm font-black italic tracking-tighter uppercase mb-2 md:mb-4 block">{name}</span>
      <h3 className="text-xl md:text-3xl font-black italic tracking-tighter leading-tight text-white uppercase">{desc}</h3>
    </div>
  </div>
);

const TimelineStep: React.FC<{ side: 'left' | 'right'; num: string; title: string; desc: string }> = ({ side, num, title, desc }) => (
  <div className={`flex flex-col md:flex-row items-center gap-6 md:gap-16 reveal ${side === 'right' ? 'md:flex-row-reverse' : ''}`}>
    <div className="md:w-1/2 flex justify-center md:justify-end md:px-8 w-full px-4">
      <div className={`p-6 md:p-16 rounded-2xl md:rounded-[5rem] border border-white/5 w-full max-w-md bg-[#050505] shadow-2xl hover:border-red-500/20 transition-all text-left`}>
        <h4 className="text-xl md:text-3xl font-black italic tracking-tighter mb-3 md:mb-6 uppercase">{title}</h4>
        <p className="text-gray-500 leading-tight md:leading-relaxed font-black italic tracking-tighter uppercase text-sm md:text-lg">{desc}</p>
      </div>
    </div>
    <div className="shrink-0 w-14 h-14 md:w-24 md:h-24 rounded-xl md:rounded-[2rem] bg-red-500 text-black flex items-center justify-center text-xl md:text-4xl font-black italic tracking-tighter uppercase shadow-[0_0_50px_rgba(239,68,68,0.5)] z-10 scale-100 md:scale-110">
      {num}
    </div>
    <div className="md:w-1/2"></div>
  </div>
);

const TestimonialCard: React.FC<{ name: string; role: string; quote: string }> = ({ name, role, quote }) => (
  <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-10 rounded-2xl md:rounded-[3rem] hover:bg-white/[0.08] transition-all duration-500 shadow-2xl flex flex-col h-full group hover:border-green-500/20">
    <div className="mb-4 md:mb-8">
      <h4 className="text-lg md:text-2xl font-black italic tracking-tighter text-white uppercase leading-none mb-1.5 md:mb-3 group-hover:text-green-500 transition-colors">{name}</h4>
      <p className="text-[9px] md:text-sm text-green-500/70 font-black italic tracking-tighter uppercase">{role}</p>
    </div>
    <p className="text-gray-400 font-black italic tracking-tighter uppercase mb-6 md:mb-10 leading-tight md:leading-relaxed text-sm md:text-lg flex-grow">
      {quote}
    </p>
    <div className="flex items-center justify-between border-t border-white/5 pt-5 md:pt-8">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-green-500 fill-green-500" />)}
      </div>
      <span className="text-gray-600 text-[8px] md:text-[10px] font-black italic tracking-tighter uppercase">Case ProCloser</span>
    </div>
  </div>
);

const ResultStatBox: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] text-center hover:bg-white/[0.08] transition-all group hover:border-green-500/30 shadow-2xl">
    <div className="text-3xl md:text-8xl font-black italic tracking-tighter text-white uppercase group-hover:text-green-500 transition-all mb-2 md:mb-4">{value}</div>
    <div className="text-[9px] md:text-xs font-black italic tracking-tighter text-gray-500 uppercase">{label}</div>
  </div>
);

const FAQAccordion: React.FC<{ item: FAQItem; isOpen: boolean; onClick: () => void }> = ({ item, isOpen, onClick }) => {
  return (
    <div className={`border rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 ${isOpen ? 'bg-[#111111] border-green-500/40' : 'bg-white/5 border-white/10'}`}>
      <button className="w-full p-4 md:p-6 flex justify-between items-center text-left gap-4" onClick={onClick}>
        <span className={`text-sm md:text-lg font-black italic tracking-tighter uppercase leading-tight ${isOpen ? 'text-green-500' : 'text-white'}`}>
          {item.question}
        </span>
        <div className={`shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180 text-green-500' : 'text-gray-500'}`}>
          {isOpen ? <Minus size={18} className="md:w-6 md:h-6" /> : <Plus size={18} className="md:w-6 md:h-6" />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
        <div className="px-4 md:px-6 pb-4 md:pb-6 text-gray-400 text-xs md:text-base leading-tight md:leading-relaxed border-t border-white/5 pt-3 md:pt-4 font-black italic tracking-tighter uppercase">
          {item.answer}
        </div>
      </div>
    </div>
  );
};
