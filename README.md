# NestJS Boilerplate

Boilerplate NestJS moderno, pronto para produção, com arquitetura limpa, TypeScript, integrações comuns (Prisma, Redis, RabbitMQ) e exemplos de autenticação e integração SAP.

## 🚀 Features

- **Modern Stack**: Node.js 20+, TypeScript, NestJS
- **Arquitetura Limpa**: Estrutura modular com separação de responsabilidades
- **Autenticação**: JWT com refresh tokens
- **Banco de Dados**: Prisma ORM com PostgreSQL
- **Cache**: Integração Redis (cache-manager + ioredis)
- **Mensageria**: Suporte a RabbitMQ
- **Integração SAP**: Módulo de exemplo com DTOs e serviço (`SapIntegrationModule` / `SapService`)
- **Documentação**: Swagger/OpenAPI
- **Segurança**: Helmet, CORS, Rate Limiting (Throttler)
- **Validação**: class-validator
- **Logging**: nestjs-pino (Pino) com pretty printing em dev
- **Testes**: Jest (unit e e2e)
- **Qualidade de Código**: ESLint, Prettier, Husky
- **Containerização**: Docker e docker-compose
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
src/
├── core/                    # Core functionality (filters, interceptors, guards)
│   ├── filters/            # Exception filters
│   ├── interceptors/       # Request/response interceptors
│   └── core.module.ts
├── infrastructure/          # Serviços externos e persistência
│   ├── database/           # Prisma service
│   ├── cache/              # Redis service
│   ├── messaging/          # Serviço RabbitMQ
│   ├── integration/
│   │   └── sap/            # Integração SAP (exemplo)
│   └── infrastructure.module.ts
├── modules/                 # Feature modules
│   ├── auth/               # Authentication module
│   │   ├── dto/
│   │   ├── guards/
│   │   ├── strategies/
│   │   └── decorators/
│   └── user/               # User module
│       ├── dto/
│       └── user.service.ts
├── app.module.ts           # Root module
└── main.ts                 # Application entry point
```

## 🛠️ Requisitos

- Node.js >= 20.0.0
- npm >= 9.0.0
- PostgreSQL >= 14
- Redis >= 7
- RabbitMQ >= 3 (opcional)
- Docker & Docker Compose (opcional)

## 🏃 Quick Start

### Desenvolvimento local

1. **Instale as dependências**
   ```bash
   npm install
   ```

2. **Configure variáveis de ambiente**
   ```bash
   # Crie o arquivo .env na raiz do projeto
   # Use o exemplo abaixo como base
   ```
   Edite `.env` com a sua configuração. Exemplo:
   ```env
   NODE_ENV=development
   PORT=3000
   API_PREFIX=api/v1
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/boilerplate?schema=public
   JWT_SECRET=change-me
   JWT_REFRESH_SECRET=change-me-too
   JWT_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d
   REDIS_HOST=localhost
   REDIS_PORT=6379
   RABBITMQ_URL=amqp://guest:guest@localhost:5672
   LOG_LEVEL=debug
   ```

3. **(Opcional) Suba infraestrutura local**
   ```bash
   docker-compose up -d postgres redis rabbitmq
   ```

4. **Rode as migrações do banco**
   ```bash
   npm run migrate
   ```

5. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

Por padrão:
- API: `http://localhost:3000/api/v1`
- Swagger: `http://localhost:3000/docs`

Observação: sem `.env`, o código usa defaults `PORT=8081` e `API_PREFIX=api/v1/`. Recomenda-se definir via `.env`.

### Usando Docker Compose

1. **Subir todos os serviços**
   ```bash
   docker-compose up -d
   ```

2. **Ver logs**
   ```bash
   docker-compose logs -f app
   ```

3. **Parar serviços**
   ```bash
   docker-compose down
   ```

## 📜 Scripts disponíveis

| Script | Description |
|--------|-------------|
| `npm run dev` | Inicia servidor em desenvolvimento com hot reload |
| `npm run build` | Gera build de produção |
| `npm start` | Inicia servidor em produção (dist/main) |
| `npm run lint` | Executa ESLint |
| `npm run format` | Formata código com Prettier |
| `npm test` | Roda testes unitários |
| `npm run test:watch` | Testes em modo watch |
| `npm run test:cov` | Gera cobertura de testes |
| `npm run test:e2e` | Roda testes e2e |
| `npm run migrate` | Executa migrações (dev) |
| `npm run migrate:deploy` | Aplica migrações (produção) |
| `npm run prisma:studio` | Abre Prisma Studio |

## 🔐 Autenticação

O boilerplate inclui autenticação JWT completa com refresh tokens.

### Registro de novo usuário
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!",
  "name": "John Doe"
}
```

### Login
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!"
}
```

Response:
```json
{
  "statusCode": 200,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER"
    }
  }
}
```

### Refresh tokens
```bash
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

### Rotas protegidas
Add the `Authorization` header with the access token:
```bash
GET /api/v1/users/me
Authorization: Bearer your-access-token
```

## 🗄️ Banco de Dados

### Migrações

```bash
# Create a new migration
npm run migrate

# Apply migrations in production
npm run migrate:deploy

# Reset database (development only)
npm run migrate:reset

# Open Prisma Studio
npm run prisma:studio
```

### Schema

Edit `prisma/schema.prisma` to modify your database schema, then run:
```bash
npm run migrate
```

## 🧪 Testes

### Testes unitários
```bash
npm test
```

### Testes E2E
```bash
npm run test:e2e
```

### Relatório de cobertura
```bash
npm run test:cov
```

## 🔒 Segurança

- **Helmet**: Cabeçalhos HTTP seguros
- **CORS**: Cross-origin configurável
- **Rate Limiting**: Limitação de taxa (Throttler)
- **Hash de Senha**: bcrypt
- **JWT**: Autenticação baseada em token
- **Validação**: class-validator

## 📊 Logging

O projeto usa Pino (via `nestjs-pino`) para logging de alta performance:

```typescript
import { Logger } from '@nestjs/common';

const logger = new Logger('MyService');
logger.log('Info message');
logger.error('Error message');
logger.warn('Warning message');
logger.debug('Debug message');
```

## 🔄 Cache

Cache Redis configurado e pronto para uso:

```typescript
import { RedisService } from '@infrastructure/cache/redis.service';

constructor(private redis: RedisService) {}

async example() {
  // Set cache
  await this.redis.set('key', 'value', 3600); // TTL in seconds
  
  // Get cache
  const value = await this.redis.get('key');
  
  // JSON support
  await this.redis.setJson('user:1', { name: 'John' }, 3600);
  const user = await this.redis.getJson('user:1');
}
```

## 📨 Mensageria

RabbitMQ disponível para mensageria assíncrona:

```typescript
import { RabbitMQService } from '@infrastructure/messaging/rabbitmq.service';

constructor(private rabbitmq: RabbitMQService) {}

async example() {
  // Publish message
  await this.rabbitmq.publish('queue-name', { data: 'value' });
  
  // Consume messages
  await this.rabbitmq.consume('queue-name', async (message) => {
    console.log('Received:', message);
  });
}
```

## 🚢 Deploy

### Docker

Build and push your Docker image:
```bash
docker build -t your-app:latest .
docker push your-app:latest
```

### Variáveis de Ambiente

Garanta as variáveis abaixo em produção (veja exemplo em desenvolvimento acima):
- `NODE_ENV`
- `PORT`
- `API_PREFIX`
- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `JWT_EXPIRES_IN`
- `JWT_REFRESH_EXPIRES_IN`
- `REDIS_HOST`
- `REDIS_PORT`
- `RABBITMQ_URL`
- `LOG_LEVEL`

### Health Checks

Serviços possuem health checks no `docker-compose.yml`. Ajuste conforme necessário.

## 📝 Documentação da API

Swagger é gerado automaticamente e disponível em:
```
http://localhost:3000/docs
```

Adicione documentação aos endpoints usando decorators:
```typescript
@ApiTags('users')
@ApiBearerAuth()
@ApiOperation({ summary: 'Get user profile' })
@ApiResponse({ status: 200, description: 'User profile' })
@Get('me')
getProfile() {
  // ...
}
```

## 🎯 Boas práticas

1. **Organização de Módulos**: Agrupe features relacionadas
2. **Injeção de Dependência**: Utilize o DI do NestJS
3. **DTOs**: Para validação e tipagem
4. **Tratamento de Erros**: Exception filters globais
5. **Logging**: Eventos importantes e erros
6. **Testes**: Cubra fluxos críticos
7. **Segurança**: Não comite segredos, use variáveis de ambiente
8. **Qualidade**: ESLint e Prettier

## 🧩 Integração SAP (exemplo)

O módulo `SapIntegrationModule` expõe o `SapService` com o método `createUser()` e DTO `SapCreateUserDto` (`src/infrastructure/integration/sap/`). Exemplo de uso:

```typescript
import { SapService } from '@infrastructure/integration/sap/sap.service';

constructor(private readonly sap: SapService) {}

async createUserInSap() {
  return this.sap.createUser({ email: 'user@example.com', name: 'John Doe' });
}
```

## 🤝 Contribuição

1. Faça um fork
2. Crie uma branch: `git checkout -b feature/minha-feature`
3. Commit: `git commit -am 'Minha feature'`
4. Push: `git push origin feature/minha-feature`
5. Abra um PR

## 📄 Licença

MIT

## 🙋 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Happy coding! 🎉**
