src/
└── app/
├── core/ # Singleton services, interceptors, models globais
│ ├── guards/
│ ├── interceptors/
│ └── services/ # Auth, ErrorHandler, Logging
├── shared/ # Componentes, Pipes e Diretivas comuns
│ ├── components/ # Ex: Custom Button, Data Table com PrimeNG
│ ├── models/ # Interfaces (ex: Cliente, Agendamento)
│ └── prime-ng/ # Módulo que exporta componentes do PrimeNG
├── features/ # Módulos Funcionais (Lazy Loaded)
│ ├── dashboards/ # Resumo de arrecadação e frequências
│ ├── cadastros/ #
│ │ ├── negocio/ # Informações do Negócio
│ │ ├── servicos/ # Serviços Oferecidos
│ │ ├── profissionais/ # Cadastro de Profissionais e Horários
│ │ └── feedbacks/ # Gerenciamento de Feedbacks
│ ├── movimentacoes/ #
│ │ ├── agenda/ # Reserva de Horários
│ │ └── gerenciamento/ # Confirmação e Cancelamento
│ └── relatorios/ #
│ ├── financeiro/ # Total Arrecadado por período/profissional
│ └── estatisticas/ # Clientes e Serviços Frequentes
└── theme/ # Estilos globais e customização do PrimeNG (SCSS)
