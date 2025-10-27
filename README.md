# NestJS Boilerplate

Boilerplate NestJS moderno, pronto para produção, com TypeScript, configuração de logging, segurança, validação, rate limiting e documentação via Swagger.

## 🚀 Features

- **Modern Stack**: Node.js 20+, TypeScript, NestJS
- **Estrutura Modular**: Módulos organizados por domínio
- **Documentação**: Swagger/OpenAPI
- **Segurança**: Helmet e CORS
- **Rate Limiting**: Throttler
- **Validação**: class-validator
- **Logging**: nestjs-pino (Pino) com pretty printing em dev
- **Qualidade de Código**: ESLint, Prettier, Husky
- **Containerização**: Docker e docker-compose

## 📁 Project Structure

```
src/
├── common/
│   └── http/                # Utilidades HTTP comuns
├── modules/
│   └── user/                # User module
│       ├── dto/
│       ├── user.controller.ts
│       ├── user.module.ts
│       └── user.service.ts
├── app.module.ts            # Root module
└── main.ts                  # Application entry point
```

## 🛠️ Requisitos

- Node.js >= 20.0.0
- npm >= 9.0.0
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
   Exemplo de `.env`:
   ```env
   NODE_ENV=development
   PORT=3000
   API_PREFIX=api/v1
   LOG_LEVEL=debug
   RATE_LIMIT_TTL=60
   RATE_LIMIT_MAX=100
   SAP_INTEGRATION_API_KEY=sap-simulated-key
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

Por padrão:
- API: `http://localhost:3000/api/v1`
- Swagger: `http://localhost:3000/docs`

Observação: sem `.env`, o código usa defaults `PORT=8081` e `API_PREFIX=api/v1/`.

### Usando Docker Compose

1. **Subir os serviços** (opcional)
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

## 🔚 Endpoints

### Criar usuário
```bash
POST /api/v1/users
Content-Type: application/json
x-api-key: <sua-chave>

{
  "email": "user@example.com",
  "name": "John Doe"
}
```

Observações:
- O header `x-api-key` é obrigatório e deve corresponder à variável `SAP_INTEGRATION_API_KEY` (default: `sap-simulated-key`).

## 🗄️ Banco de Dados

Este boilerplate não inclui integração de ORM por padrão. Use o provedor de sua preferência e ajuste a documentação conforme necessário.

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

Não há serviço de cache configurado no código neste momento.

## 📨 Mensageria

Não há integração de mensageria implementada no código.

## 🚢 Deploy

### Docker

Build da imagem:
```bash
docker build -t your-app:latest .
```

### Variáveis de Ambiente

Recomendadas em produção (veja exemplo acima):
- `NODE_ENV`
- `PORT`
- `API_PREFIX`
- `LOG_LEVEL`
- `RATE_LIMIT_TTL`
- `RATE_LIMIT_MAX`
- `SAP_INTEGRATION_API_KEY`

### Health Checks

Alguns serviços de infraestrutura podem estar definidos em `docker-compose.yml`, mas são opcionais e não utilizados diretamente pelo código atual.

## 📝 Documentação da API

Swagger é gerado automaticamente e disponível em:
```
http://localhost:3000/docs
```

Adicione documentação aos endpoints usando decorators do Swagger conforme necessário.

## 🎯 Boas práticas

1. **Organização de Módulos**: Agrupe features relacionadas
2. **Injeção de Dependência**: Utilize o DI do NestJS
3. **DTOs**: Para validação e tipagem
4. **Tratamento de Erros**: Exception filters globais
5. **Logging**: Eventos importantes e erros
6. **Testes**: Cubra fluxos críticos
7. **Segurança**: Não comite segredos, use variáveis de ambiente
8. **Qualidade**: ESLint e Prettier

## 🧩 Integração SAP

O endpoint de criação de usuário simula uma integração via header `x-api-key`. Ajuste conforme sua necessidade de integração real.

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
