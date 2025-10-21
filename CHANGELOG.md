# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- README atualizado para refletir a arquitetura atual (`src/infrastructure/integration/sap/`), scripts do `package.json`, variáveis de ambiente e instruções de Docker.
- Correção/clarificação de portas e prefixos padrão (`PORT`, `API_PREFIX`) conforme `src/main.ts` e `docker-compose.yml`.
- Seções traduzidas e padronizadas (pt-BR) sem alterar exemplos de uso.

### Added
- Seção de Integração SAP no README com exemplo de uso do `SapService` e `SapCreateUserDto`.

## [1.0.0] - 2024-01-XX

### Added
- Initial project setup with NestJS
- TypeScript configuration with path aliases
- Prisma ORM with PostgreSQL
- JWT authentication with refresh tokens
- User management module
- Redis caching integration
- RabbitMQ messaging support
- Swagger API documentation
- Global error handling and logging
- Rate limiting and security headers
- Docker and docker-compose setup
- GitHub Actions CI/CD pipeline
- Unit and e2e tests with Jest
- ESLint and Prettier configuration
- Husky pre-commit hooks
- Comprehensive README and documentation

### Security
- bcrypt password hashing
- JWT token authentication
- Helmet for secure headers
- CORS configuration
- Input validation with class-validator
- Rate limiting with throttler
