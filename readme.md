# AdonisJS 6 Crash Course

This repository contains code and examples from an AdonisJS 6 crash course. AdonisJS is a fully-featured Node.js framework that provides a robust set of features for web application development.

## Overview

AdonisJS is a MVC framework for Node.js that comes with a lot of built-in functionality including:

- Authentication system
- ORM for database interactions
- Validation
- Routing
- Middleware support
- And much more

## Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/adonisjs6-crash-course.git

# Navigate to the project directory
cd adonisjs6-crash-course

# Install dependencies
npm install
# or
yarn install
```

### Configuration

1. Copy `.env.example` to `.env` and update the configuration values:

```bash
cp .env.example .env
```

2. Generate a new application key:

```bash
node ace generate:key
```

3. Update your `.env` file with the generated key

### Running Migrations

```bash
node ace migration:run
```

### Starting the Server

```bash
# Development mode
node ace serve --watch

# Production mode
node ace build
node server.js
```

## Features Covered

- Routing and Controllers
- Database operations with Lucid ORM
- Authentication and Authorization
- Form validation
- File uploads
- API development
- Middleware implementation

## License

This project is licensed under the MIT License - see the LICENSE file for details.
