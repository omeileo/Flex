## Overview

This document outlines the local deployment setup for the Hourrier API.

## Environment Configuration

### Environment Files

- .env - Base environment
- .env.local - Local environment
- .env.docker - Docker environment

## Local Environment Deployment

### Completely using Docker

1. Open Docker Desktop
2. Run `npm run docker:run`
3. Application will be available at `http://localhost:3005`
4. Database will be available at `http://localhost:3006`
5. If you need to reset the database, start the Docker database container manually and run `npm run db:reset`

### Using a docker db only (faster refreshes)

1. Open Docker Desktop
2. Run `npm run dev`
3. Application will be available at `http://localhost:3005`
4. Database will be available at `http://localhost:3006`
5. If you need to reset the database, run `npm run dev:reset-database`
6. If you need to reseed the database, run `npm run dev:reseed-database`
7. If you need to reset and reseed the database and then run the app, run `npm run dev:clean-and-run`
