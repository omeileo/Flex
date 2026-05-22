## Overview

This document outlines the deployment pipeline for the Template Project API development environment.

## Environment Configuration

### Environment Files

- .env - Base environment
- .env.local - Local environment
- .env.docker - Docker environment

## Development Deployment Pipeline

1. Developer pulls latest dev branch from [GitHub](https://github.com/App-Shop-Apps/Template-Project-API)
2. Developer creates feature branch from dev
3. Developer pushes feature branch
4. Developer creates pull request
5. GitHub Actions run automated checks:
   - lint check (checks for lint errors)
   - test check (checks for test errors)
6. Once checks pass and reviewer approves PR, developer merges feature branch to dev branch and triggers the following:
   - migrate-and-seed
     - Migrate deploy
     - If migration fails, then try reset
     - Seed database
7. [Digital Ocean App Platform](https://cloud.digitalocean.com/apps/8356b6f6-895f-4d1a-91ac-f76fa98c629c?i=2e1705) automatically:
   - Detects change to dev branch
   - Runs [Dockerfile](./Dockerfile)
   - Uses environment variables defined in Digital Ocean `Environment Variables` for the `template-project-api` 'component'
8. Once build succeeds, application is available at the domain specified at Domain (under App Settings) - `dev.template-project.appshop.biz/api`
