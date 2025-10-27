# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

_Sem mudanças no momento._

## [1.0.0] - 2025-10-27

### Added
- NestJS app base com TypeScript e configuração via `@nestjs/config`.
- Logger com `nestjs-pino` e `pino-pretty` em desenvolvimento.
- Rate limiting com `@nestjs/throttler`.
- Segurança com `helmet` e CORS habilitado.
- Validação global com `ValidationPipe` e `class-validator`.
- Documentação Swagger disponível em `/docs`.
- Módulo de usuários com endpoint `POST /users` protegido por `x-api-key` (`SAP_INTEGRATION_API_KEY`).
- Scripts de build, dev, lint, format e testes (unit, e2e, cobertura).
- Dockerfile e docker-compose (serviços de infraestrutura opcionais).
- ESLint, Prettier e Husky.

### Changed
- README reestruturado para refletir o estado atual do código (remoção de referências a Prisma, Redis, RabbitMQ e Autenticação JWT que não existem no projeto).
- Atualização de variáveis de ambiente recomendadas (`PORT`, `API_PREFIX`, `LOG_LEVEL`, `RATE_LIMIT_TTL`, `RATE_LIMIT_MAX`, `SAP_INTEGRATION_API_KEY`).
- Adição da seção de Endpoints com `POST /users` e requisito de `x-api-key`.

### Security
- Helmet para cabeçalhos seguros.
- CORS configurável.
- Validação de entrada com `class-validator`.
- Rate limiting com `@nestjs/throttler`.
