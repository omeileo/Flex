## Overview

This document outlines the deployment pipeline for the Hourrier API production environment.

## Environment Configuration

### Environment Files

- .env - Base environment
- .env.local - Local environment
- .env.docker - Docker environment

## Production Deployment Pipeline

1. Once changes are tested in development, developer pulls latest production branch
2. Developer creates production release branch by branching from production and pulling in the latest dev changes (e.g. production-release-0.1.0)
3. Developer updates `package.json` version to latest release version
4. Developer pushes production release branch
5. Developer creates pull request from production release branch
6. GitHub Actions run automated checks:
   - lint check
   - test check
7. Once checks pass and reviewer approves PR, developer with owner status merges release branch to production
   - migrate-and-seed
     - Gets the IP address of the GitHub Actions runner
     - Adds the IP address and the tag for the production App Platform to DigitalOcean database firewall (trusted sources)
     - Migrate deploy
     - Removes the IP address from the DigitalOcean database firewall (trusted sources)
     - Seed database
8. [Digital Ocean App Platform](https://cloud.digitalocean.com/apps/8356b6f6-895f-4d1a-91ac-f76fa98c629c?i=2e1705) automatically:
   - Detects change to production branch
   - Runs [Dockerfile](./Dockerfile)
   - Uses environment variables defined in Digital Ocean `Environment Variables` for the `hourrier-api` 'component'
9. Once build succeeds, application is available at the domain specified at Domain (under App Settings) - `hourrier.com/api`
