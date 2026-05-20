Aqui está uma proposta detalhada de milestones (marcos de entrega) e tarefas, organizada do setup inicial até o deploy em produção. Esta estrutura foca em construir o sistema de forma incremental, garantindo que o back-end forneça a base necessária antes que o front-end em Angular consuma os dados.

### Fase 1: Fundação e Infraestrutura (Setup Inicial)

O objetivo desta fase é deixar os ambientes de desenvolvimento prontos, integrados e padronizados.

- [ ] **Modelagem do Banco de Dados:** Refinar o Diagrama Entidade-Relacionamento (ER) com todos os campos e relações exatas.
- [ ] **Setup do Back-end (Spring Boot):**
- Inicializar o projeto com as dependências centrais (Web, JPA, Security, PostgreSQL).
- Configurar a estrutura de pastas Package-by-Feature (como `auth`, `catalog`, `booking`).
- Configurar o Flyway e criar a primeira _migration_ (V1) com as tabelas base.
- Configurar variáveis de ambiente e perfil de desenvolvimento (`application-dev.yml`).

- [ ] **Setup do Front-end (Angular):**
- Criar o workspace do Angular.
- Configurar o Tailwind CSS para a estilização dos componentes.
- Estabelecer a arquitetura de pastas do front-end (ex: `core`, `shared`, `features`).

- [ ] **Integração Inicial:** Criar um endpoint genérico de "Health Check" no Spring e consumi-lo no Angular para validar o CORS e a comunicação.

---

### Fase 2: Segurança e Autenticação (Identidade)

Garantir que os usuários e administradores possam acessar o sistema com segurança.

- [ ] **Back-end (API):**
- Criar as entidades de `User` e a enumeração de `Role` (ADMIN, CLIENT).
- Implementar a configuração do Spring Security.
- Desenvolver o serviço de geração e validação de tokens JWT.
- Criar os endpoints `/api/auth/login` e `/api/auth/register`.

- [ ] **Front-end (Angular):**
- Desenvolver as telas de Cadastro e Login baseadas nos wireframes.
- Implementar serviços HTTP interceptors para anexar o token JWT nas requisições subsequentes.
- Criar as _Route Guards_ para proteger as rotas que exigem autenticação.

---

### Fase 3: Catálogo e Gestão do Negócio (Cadastros)

Permitir que o administrador popule a plataforma com os serviços oferecidos e os profissionais disponíveis.

- [ ] **Back-end (API):**
- Criar _migrations_ e entidades para `Service`, `Professional` e a tabela de relacionamento entre eles.
- Desenvolver os endpoints CRUD completos (Create, Read, Update, Delete) para esses módulos.
- Implementar paginação e filtros nas consultas de listagem.

- [ ] **Front-end (Painel Admin):**
- Desenvolver formulários reativos no Angular para cadastro e edição de profissionais e serviços.
- Criar tabelas de listagem para gerenciamento visual desses dados.

- [ ] **Front-end (Visão Cliente):**
- Desenvolver a "Home" do aplicativo, consumindo a API para exibir os serviços e profissionais cadastrados de forma dinâmica.

---

### Fase 4: O Motor de Agendamento (Core do Sistema)

Esta é a fase mais complexa, onde a regra de negócios principal é implementada.

- [ ] **Back-end (API):**
- Definir a entidade `Booking` e os status possíveis (Pendente, Confirmado, Concluído, Cancelado).
- Desenvolver a lógica de verificação de disponibilidade (impedir _double-booking_ para o mesmo profissional no mesmo horário).
- Criar endpoints para buscar horários livres, registrar um agendamento e alterar o status de um agendamento.

- [ ] **Front-end (Visão Cliente):**
- Implementar a interface de seleção de data (calendário) e exibição de horários dinâmicos.
- Desenvolver o fluxo de "Finalizar Reserva".
- Criar a tela de "Meus Agendamentos" listando o histórico do usuário logado e opção de cancelamento.

- [ ] **Front-end (Painel Admin):**
- Desenvolver a visualização da agenda do dia/semana para o negócio.
- Implementar botões de ação rápida para confirmar ou rejeitar solicitações de clientes.

---

### Fase 5: Feedbacks e Relatórios (Inteligência do Negócio)

Adicionar valor à plataforma fechando o ciclo de atendimento e provendo métricas.

- [ ] **Back-end (API):**
- Criar entidade e endpoints para `Feedback` (vinculados a um agendamento concluído).
- Desenvolver serviços de consulta agregada usando _queries_ otimizadas (JPQL ou nativas) para calcular: Total Arrecadado, Clientes Frequentes e Serviços mais Populares.

- [ ] **Front-end (Visão Cliente):**
- Adicionar o modal/tela de avaliação para serviços concluídos (estrelas e comentários).

- [ ] **Front-end (Painel Admin):**
- Desenvolver o Dashboard inicial com gráficos e indicadores de desempenho baseados nos endpoints de relatórios.
- Implementar a visualização e moderação de avaliações recebidas.

---

### Fase 6: Refinamento e DevSecOps (Pre-Produção)

Garantir a estabilidade, performance e preparar o empacotamento do sistema.

- [ ] **Testes e Qualidade:**
- Escrever testes unitários no Spring Boot, focando especialmente nas regras de bloqueio de horário (`BookingService`).
- Testar responsividade do layout no Angular (Desktop vs. Mobile).

- [ ] **Infraestrutura e Deploy:**
- Escrever `Dockerfiles` para conteinerizar a aplicação Spring Boot e o build do Angular.
- Configurar um arquivo `docker-compose.yml` para orquestrar o banco de dados e os containers facilmente.
- Configurar um servidor reverso (como Nginx) para expor as portas corretamente e gerenciar certificados SSL caso avance para um domínio público.
- (Opcional) Configurar um pipeline básico de CI/CD (ex: GitHub Actions) para compilar e testar o código a cada _commit_ na _main_.

---

### Fase 7: Lançamento (Produção)

- [ ] Executar as _migrations_ finais no banco de dados de produção.
- [ ] Realizar um _smoke test_ geral no ambiente em nuvem para validar fluxos ponta a ponta.
- [ ] Iniciar a operação do sistema para os primeiros usuários reais..,
