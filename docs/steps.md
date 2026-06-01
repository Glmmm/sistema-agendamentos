Aqui está o roteiro de desenvolvimento aprimorado. O arquivo `steps.md` foi reestruturado para mapear diretamente os Casos de Uso (UCs) detalhados nos documentos de requisitos, garantindo que nenhuma funcionalidade exigida fique de fora.

A stack tecnológica foi mantida com Angular (utilizando Tailwind e PrimeNG para componentes de interface) no front-end e Spring Boot no back-end.

---

### Fase 1: Fundação e Infraestrutura (Setup Inicial)

O objetivo desta fase é deixar os ambientes de desenvolvimento prontos, integrados e padronizados para suportar os casos de uso.

* [ ] **Modelagem do Banco de Dados:** Refinar o Diagrama Entidade-Relacionamento (ER) contemplando tabelas para Clientes, Administradores, Serviços, Profissionais, Agendamentos, Avaliações e Informações do Negócio.
* [ ] **Setup do Back-end (Spring Boot):**
* Inicializar o projeto com as dependências centrais (Web, JPA, Security, PostgreSQL).
* Configurar a estrutura de pastas Package-by-Feature (como `auth`, `catalog`, `booking`, `reports`).
* Configurar o Flyway e criar a primeira *migration* (V1) com as tabelas base.
* Configurar variáveis de ambiente e perfil de desenvolvimento (`application-dev.yml`).


* [ ] **Setup do Front-end (Angular):**
* Criar o workspace do Angular.
* Configurar o Tailwind CSS e biblioteca de componentes (como PrimeNG) para estilização ágil e responsiva.
* Estabelecer a arquitetura de pastas do front-end dividindo entre Área do Cliente (App) e Gestão (Painel Admin).


* [ ] **Integração Inicial:** Criar um endpoint genérico de "Health Check" no Spring e consumi-lo no Angular para validar o CORS e a comunicação.

---

### Fase 2: Segurança e Autenticação (Identidade)

Garantir o acesso seguro separando a Área do Cliente do Painel Administrativo.

* [ ] **Back-end (API):**
* Criar a entidade base `User` e a hierarquia/permissões (`Role`: ADMIN, CLIENT).
* Implementar o Spring Security com filtro de geração e validação de tokens JWT.
* Desenvolver os endpoints genéricos de `/api/auth/login` e `/api/auth/register`.


* [ ] **Front-end (Área do Cliente e Painel Admin):**
* **[UC01] Cadastrar Conta:** Desenvolver o formulário de cadastro de novos clientes.
* **[UC02] Fazer Login:** Criar tela de autenticação unificada que redireciona o Cliente para o App e o Admin para o Dashboard.
* Implementar HTTP Interceptors no Angular para anexar o JWT nas requisições.
* Criar *Route Guards* protegendo rotas específicas de Cliente e de Admin.



---

### Fase 3: Gestão do Negócio e Catálogo (Cadastros)

Permitir que o administrador configure a base da plataforma e que o cliente possa explorar essas informações.

* [ ] **Back-end (API):**
* Criar *migrations* e entidades para `BusinessInfo`, `Service`, `Professional`.
* Desenvolver os endpoints CRUD completos para as informações do local, serviços oferecidos e equipe.


* [ ] **Front-end (Painel Admin):**
* **[UC08/09/10] Gerenciar Informações, Serviços e Profissionais:** Criar interfaces para o administrador realizar o CRUD dos dados do negócio, montar o catálogo de serviços e cadastrar os profissionais da equipe.


* [ ] **Front-end (Área do Cliente):**
* **[UC03] Explorar Serviços e Profissionais:** Desenvolver a "Home" do aplicativo, consumindo a API de forma pública ou autenticada para exibir o catálogo dinâmico para os clientes.



---

### Fase 4: Motor de Agendamento e Gestão de Agenda (Core do Sistema)

Implementação da regra de negócio central, da configuração da grade de horários até a efetivação da reserva.

* [ ] **Back-end (API):**
* Definir a entidade `Booking` e o fluxo de status (Pendente, Confirmado, Cancelado, Concluído).
* Desenvolver a lógica de disponibilidade e prevenção de conflitos de horário (*double-booking*).
* Criar endpoints de consulta de grade de horários, registro, atualização de status e cancelamento.


* [ ] **Front-end (Painel Admin):**
* **[UC11] Configurar Horários Disponíveis:** Criar a interface para o Admin definir dias de trabalho, horários de início/fim e intervalos para profissionais e serviços.
* **[UC12] Confirmar/Cancelar Agendamentos:** Desenvolver a visão de calendário gerencial para aprovar, rejeitar ou cancelar solicitações pendentes.


* [ ] **Front-end (Área do Cliente):**
* **[UC04] Agendar Horário:** Criar o fluxo *wizard* onde o cliente seleciona o serviço, o profissional e um horário da grade disponível (gerada via UC11).
* **[UC05] Acompanhar/Cancelar Meus Agendamentos:** Desenvolver a listagem do histórico do cliente logado, permitindo o cancelamento de eventos futuros.



---

### Fase 5: Inteligência de Negócio e Feedbacks (Pós-Atendimento)

Fechamento do ciclo de atendimento com avaliações e visualização de métricas de desempenho.

* [ ] **Back-end (API):**
* Criar entidade `Feedback` vinculada a agendamentos com status "Concluído".
* Desenvolver endpoints de relatórios utilizando agregações e *queries* otimizadas (JPQL/SQL nativo).


* [ ] **Front-end (Área do Cliente):**
* **[UC06] Avaliar Serviço:** Desenvolver modal para submissão de nota (estrelas) e comentários após o serviço prestado.


* [ ] **Front-end (Painel Admin):**
* **[UC13] Gerenciar Feedbacks:** Criar a tela de moderação para que o Admin leia, responda ou oculte avaliações na plataforma.
* **[UC14/15/16] Visualizar Relatórios:** Construir o Dashboard analítico consumindo a API para exibir:
* Faturamento financeiro (Total Arrecadado).
* Métricas de retenção (Clientes Frequentes).
* Popularidade do catálogo (Serviços mais agendados).





---

### Fase 6: Refinamento e DevSecOps (Pré-Produção)

Garantir estabilidade, responsividade e preparar o empacotamento.

* [ ] **Testes e Qualidade:**
* Escrever testes unitários no Spring Boot focando nos serviços críticos, especialmente o `BookingService` (impedimento de choques de agenda).
* Testar a responsividade do layout em Angular simulando dispositivos mobile (Área do Cliente) e desktops (Painel Admin).


* [ ] **Infraestrutura e Deploy:**
* Escrever `Dockerfiles` otimizados (multi-stage) para compilação do Spring Boot e do Angular.
* Criar arquivo `docker-compose.yml` integrando o PostgreSQL, o Back-end e o Front-end.
* Configurar proxy reverso (Nginx) para roteamento das requisições `/api` e servir os arquivos estáticos do front-end.



---

### Fase 7: Lançamento (Produção)

* [ ] **Execução Final:** Rodar as *migrations* finais no banco de produção.
* [ ] **Validação End-to-End:** Realizar *smoke tests* simulando todos os 16 UCs no ambiente em nuvem para validar o fluxo ponta a ponta.
* [ ] **Go-live:** Iniciar a operação para os primeiros usuários reais.