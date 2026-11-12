import type { ShowcaseCopy } from '../types';
export const pt: ShowcaseCopy = {
  featured: 'Projeto em destaque',
  badge: 'Plataforma de software B2B',
  lead: 'Do código da peça à próxima oportunidade.',
  summary:
    'Clientes, estoque, abastecimento e inteligência de dados em um só ambiente para o negócio de componentes eletrônicos.',
  back: 'Voltar ao portfólio',
  explore: 'Explorar funcionalidades',
  live: 'Ver plataforma',
  auth: 'O acesso operacional pode exigir uma conta.',
  study:
    'Software desenvolvido e apresentado como estudo de caso. Esta apresentação pública não exige login.',
  overview: 'O produto',
  problemLabel: 'O desafio',
  problemTitle: 'Dados dispersos. Decisões desconectadas.',
  problemBody:
    'Um código de peça está em uma planilha, a disponibilidade em outra e a necessidade do comprador em uma conversa. Reconstruir esse contexto exige buscas manuais e dificulta o acompanhamento comercial.',
  solutionLabel: 'A proposta',
  solutionTitle: 'Um contexto comum para cada componente.',
  solutionBody:
    'Electronic Parts Intelligence reúne organizações, catálogos, estoque e necessidades. Conecta consultas, análise de oportunidades e colaboração sem prometer resultados comerciais não medidos.',
  modulesTitle: 'Um produto. Operações conectadas.',
  modulesIntro:
    'Explore o propósito e o fluxo de cada módulo. Os esquemas explicam o produto; não são sessões conectadas nem resultados reais.',
  moduleFlow: 'Fluxo do módulo',
  modules: [
    [
      'Clientes',
      'O contexto comercial começa aqui.',
      'Um diretório de organizações e seus perfis oferece contexto antes de trabalhar as necessidades. A captura fornecida mostra este módulo.',
      'Diretório → perfil da organização → contexto comercial',
    ],
    [
      'Oportunidades',
      'Relacionar demanda e disponibilidade.',
      'O código revisado normaliza MPNs e avalia estoque, demanda e ofertas. Uma referência correspondente não representa uma venda confirmada.',
      'Arquivos de origem → comparação MPN → revisão de oportunidades',
    ],
    [
      'Estoque e necessidades',
      'Entender o que pode ser atendido.',
      'O modelo distingue estoque, cobertura parcial, faltas e dados desconhecidos. Mantém a relação com as importações de origem.',
      'Necessidade → disponibilidade → cobertura e faltas',
    ],
    [
      'Busca',
      'Encontrar a referência no contexto.',
      'Consulta estruturada de registros e códigos de peças. Campos e resultados respeitam o acesso do usuário, separadamente da IA generativa.',
      'Consulta → campos permitidos → registros',
    ],
    [
      'IA e inteligência de dados',
      'Perguntas de negócio com evidências.',
      'O assistente combina ferramentas autorizadas, respostas determinísticas e geração de linguagem com OpenAI quando configurada. O servidor aplica o escopo de acesso.',
      'Pergunta → ferramenta autorizada → resposta contextual',
    ],
    [
      'Conversa',
      'Dar continuidade à colaboração.',
      'Conversas entre participantes da plataforma. O código verifica a participação nas conversas e diferencia o acesso à auditoria.',
      'Conversa → participantes → acompanhamento',
    ],
    [
      'Importações',
      'Tornar os catálogos consultáveis.',
      'Importação de Excel e CSV com validação e tarefas em segundo plano no código revisado. Os erros de importação fazem parte do acompanhamento.',
      'Arquivo → validação e processamento → registros',
    ],
    [
      'Usuários e perfis',
      'Organizar quem pode fazer o quê.',
      'O código define funcionário, gerente, administrador e administrador técnico. As capacidades são verificadas por função; a configuração de produção não foi auditada.',
      'Conta → perfil e função → capacidades permitidas',
    ],
    [
      'Registros',
      'Manter a rastreabilidade dos dados.',
      'Consultar informações importadas e normalizadas com referências à origem antes de utilizá-las em análises comerciais.',
      'Importação → registro normalizado → consulta',
    ],
    [
      'Administração de clientes',
      'Dar estrutura ao diretório.',
      'Rotas de criação e edição de organizações usam capacidades de gestão diferenciadas. A manutenção complementa a consulta comercial.',
      'Permissão de gestão → criação ou edição → diretório',
    ],
    [
      'Abastecimento',
      'Avançar quando falta fornecimento.',
      'O código inclui solicitações, ofertas e decisões de abastecimento. Permite acompanhar as atividades sem apresentar uma oferta como compra concluída.',
      'Solicitação → ofertas → revisão e acompanhamento',
    ],
  ],
  illustration: 'Vista ilustrativa',
  source: 'Revisado no código',
  sourceNote:
    'Evidências: interface fornecida e código local Electronic Parts Demo. A equivalência exata com a versão publicada e sua configuração não foi verificada. Não se afirmam clientes reais, impactos medidos ou garantias de segurança.',
  aiLabel: 'Inteligência com contexto',
  aiTitle: 'Perguntas melhores começam com dados conectados.',
  aiBody:
    'O valor vai além de gerar texto: recuperar informações relevantes, respeitar seu escopo e explicar o que sustenta a resposta. O fluxo representa o código revisado; esta página não consulta dados empresariais.',
  aiSteps: [
    'Pergunta do usuário',
    'Aplicação e controle de acesso',
    'Consulta autorizada',
    'Processamento',
    'Resposta contextualizada',
  ],
  structuredTitle: 'Consulta estruturada',
  structuredBody:
    'Ferramentas específicas consultam MPN, estoque, oportunidades e registros no escopo autorizado. Alguns resultados são determinísticos.',
  generativeTitle: 'Linguagem generativa',
  generativeBody:
    'A integração OpenAI processa contexto filtrado quando configurada. Não substitui o banco de dados nem implica que toda resposta use um modelo generativo.',
  boundaryTitle: 'A permissão vem antes da resposta',
  boundaryBody:
    'O código verifica sessão, função e escopo, filtra campos sensíveis e limita solicitações. São controles implementados, não uma certificação ou auditoria de produção.',
  architectureTitle: 'Projetado em torno do fluxo de informação.',
  architectureBody:
    'Arquitetura observada no código local. A hospedagem e os provedores da demonstração pública ainda precisam ser verificados.',
  layers: [
    ['Experiência', 'Next.js · React · TypeScript'],
    ['Aplicação', 'Rotas de servidor · validação · autorização'],
    ['Dados', 'Supabase · PostgreSQL · armazenamento'],
    ['Processamento', 'Importações em segundo plano · OpenAI opcional'],
  ],
  workflowTitle: 'Do catálogo ao próximo passo comercial.',
  workflowBody:
    'Um percurso possível entre os módulos revisados. Cada etapa exige dados e permissões adequados; não representa automação completa sem intervenção.',
  workflowSteps: [
    'Importar catálogos',
    'Organizar registros',
    'Buscar e analisar',
    'Revisar oportunidades',
    'Gerenciar abastecimento',
    'Colaborar',
  ],
  videoTitle: 'Veja o produto em ação.',
  videoIntro:
    'Dois percursos, uma plataforma. O idioma do vídeo é independente do idioma da apresentação.',
  videoEnglish: 'Demonstração em inglês',
  videoChinese: 'Demonstração em chinês',
  videoEnglishBody: 'Percurso em inglês pelo ambiente de trabalho e pelo fluxo comercial.',
  videoChineseBody: 'Percurso em chinês simplificado pelos módulos e seus usos.',
  comingSoon: 'Vídeo em breve',
  videoError: 'O vídeo não está disponível no momento.',
  useTitle: 'Para equipes que trabalham com componentes.',
  uses: [
    ['Distribuidores eletrônicos', 'Reunir catálogos, disponibilidade e contexto comercial.'],
    ['Vendas B2B', 'Preparar conversas a partir de necessidades e oportunidades.'],
    ['Abastecimento', 'Acompanhar solicitações e avaliar ofertas recebidas.'],
    ['Gestão de catálogos', 'Organizar arquivos, referências e registros de origem.'],
    ['Compras', 'Consultar referências e analisar necessidades de fornecimento.'],
  ],
  galleryTitle: 'Por dentro do ambiente de trabalho.',
  galleryBody:
    'Conheça os principais módulos. Quando não há captura publicável, um esquema é claramente identificado como ilustração.',
  placeholder: 'Captura em preparação',
  zoom: 'Ampliar vista',
  close: 'Fechar galeria',
  previous: 'Vista anterior',
  next: 'Próxima vista',
  screenshot: 'Captura da interface',
  demoData: 'Nomes e empresas demonstrativos não implicam relações comerciais.',
  engineeringTitle: 'O trabalho por trás do produto.',
  engineering: [
    [
      'Desenvolvimento completo',
      'Interface, rotas de servidor e modelos de dados organizados em torno das operações B2B.',
    ],
    [
      'Dados antes de promessas',
      'Normalização, rastreabilidade e distinção entre dados ausentes e disponibilidade.',
    ],
    [
      'Limites explícitos para IA',
      'Separação entre consulta de dados, autorização e geração de linguagem.',
    ],
  ],
  stackLabel: 'Tecnologias observadas no código',
  contactTitle: 'Vamos conversar sobre sua próxima plataforma.',
  contactBody:
    'Quer organizar operações B2B ou explorar uma solução semelhante? Entre em contato com o desenvolvedor para conversar ou solicitar uma demonstração.',
  contact: 'Contatar o desenvolvedor',
  readCase: 'Conhecer o projeto',
};
