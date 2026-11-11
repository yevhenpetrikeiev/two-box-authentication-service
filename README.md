# Two-Box Authentication Service

Authentication and identity management microservice for **Two-Box**, a microservices-based online marketplace inspired by platforms like OLX.

The service is responsible for managing user identities and providing secure authentication mechanisms for the Two-Box ecosystem.

> **Project status**: Early development. Basic registration and login functionality, password hashing, and request validation have been implemented. JWT authentication, token management, and additional security features are under development.

## Overview

Two-Box Authentication Service is an independent backend service designed to handle authentication and identity-related operations across the Two-Box Marketplace platform.

It follows a microservice architecture and is maintained in a dedicated repository as part of a polyrepo development approach.

The service is built with NestJS and TypeScript, uses PostgreSQL for persistent storage, and Flyway for database schema versioning and migrations.

### Responsibilities

The service is intended to provide:

- User registration and account management.
- User authentication and authorization.
- Password hashing and secure credential management.
- JWT-based authentication.
- OAuth 2.0 authentication flows.
- Access and refresh token management.
- Identity-related functionality for other marketplace services.

## Technology Stack

| Technology           | Purpose                                      |
| -------------------- | -------------------------------------------- |
| TypeScript           | Programming language                         |
| NestJS               | Backend application framework                |
| Node.js              | Runtime environment                          |
| PostgreSQL           | Relational database                          |
| node-postgres (`pg`) | PostgreSQL connectivity                      |
| Flyway               | Database schema versioning and migrations    |
| bcrypt               | Password hashing                             |
| class-validator      | Request validation                           |
| class-transformer    | Object transformation                        |
| Vitest               | Testing framework                            |
| Supertest            | HTTP endpoint testing                        |
| Docker Compose       | Local infrastructure and migration execution |
| Prettier             | Code formatting                              |
| Oxlint               | Static analysis and linting                  |

## Architecture

Two-Box follows a **microservice architecture with a polyrepo strategy**.

Each microservice has its own repository, responsibilities, application lifecycle, and data persistence.

The Authentication Service is responsible for identity and authentication concerns. Other services should rely on its authentication mechanisms rather than implementing their own credential management.

### Database

The service uses PostgreSQL as its primary data store.

Database access is implemented using the `pg` driver, without an ORM.

Database schema changes are managed through Flyway migrations, allowing database evolution to be version-controlled and reproducible across environments.

## Planned Features

The following features represent the development roadmap.

- [x] User registration.
- [x] User login with email and password.
- [x] Password hashing with bcrypt.
- [ ] Password change and reset.
- [ ] JWT access tokens.
- [ ] Refresh token management.
- [ ] Token revocation and logout.
- [ ] OAuth 2.0 authentication.
- [x] Input validation and error handling.
- [ ] Authentication guards and authorization mechanisms.
- [ ] Unit and end-to-end tests.
- [ ] Docker-based deployment configuration.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Docker and Docker Compose
- PostgreSQL (if running the database outside Docker)

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd two-box-authentification-service
```

Install dependencies:

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the project root.

Add the required application and database configuration as in **example.env** file.

> Environment variable names are illustrative and should be aligned with the actual application configuration.

Never commit real credentials, secrets, or environment-specific configuration to the repository.

### Database Migrations

Database schema migrations are managed through Flyway and Docker Compose.

Run migrations using:

```bash
npm run migrate
```

This executes the `auth-flyway` service defined in the Docker Compose configuration.

### Running the Application

Development mode:

```bash
npm run start:dev
```

Production build:

```bash
npm run build
npm run start:prod
```

## Available Scripts

| Command               | Description                    |
| --------------------- | ------------------------------ |
| `npm run build`       | Build the application          |
| `npm run start`       | Start the application          |
| `npm run start:dev`   | Start in watch mode            |
| `npm run start:debug` | Start in debug mode            |
| `npm run start:prod`  | Run the production build       |
| `npm run migrate`     | Execute database migrations    |
| `npm run format`      | Format TypeScript source files |
| `npm run lint`        | Run Oxlint                     |
| `npm test`            | Run tests                      |
| `npm run test:watch`  | Run tests in watch mode        |
| `npm run test:cov`    | Run tests with coverage        |
| `npm run test:e2e`    | Run end-to-end tests           |

## Testing

The project uses Vitest as its testing framework and Supertest for HTTP-level testing.

Run the test suite:

```bash
npm test
```

Run end-to-end tests:

```bash
npm run test:e2e
```

Generate a test coverage report:

```bash
npm run test:cov
```

## Security Considerations

Security is a core responsibility of this service.

The planned security approach includes:

- Password hashing using bcrypt.
- JWT-based authentication.
- Secure access and refresh token handling.
- OAuth 2.0 authentication flows.
- Input validation and sanitization.
- Secure handling of credentials and application secrets.
- Authentication and authorization controls.

These mechanisms will be documented in greater detail as their implementations are introduced.

## Development Philosophy

The service follows several architectural principles:

- **Single Responsibility:** Authentication and identity management remain isolated from marketplace business logic.
- **Database Ownership:** The service owns its PostgreSQL database and controls its schema evolution.
- **Independent Deployment:** The service can be developed, tested, and deployed independently.
- **Explicit Contracts:** Communication with other microservices should use well-defined API contracts.
- **Security by Design:** Authentication and credential management are treated as first-class architectural concerns.

## Part of the Two-Box Ecosystem

Two-Box is a full-stack online marketplace project inspired by OLX.

The platform is developed using a microservice architecture, a polyrepo repository strategy, and a multi-database approach.

Each service owns a specific business capability and its corresponding data.

---

**Two-Box Authentication Service**  
Identity and authentication infrastructure for the Two-Box Marketplace.
