# Production Deployment Checklist

## Pre-Deployment

- [x] Create production branch: `git checkout -b production`
- [x] Protect production branch on GitHub

## Domain & DNS Setup

- [ ] Purchase domain `template-project.com`
- [ ] Update DNS records with Digital Ocean App Platform nameservers
- [ ] Configure CORS_ORIGIN in Template Project API to allow only `https://template-project.com`
- [ ] Set `APP_BASE_PATH=""` for production ROOT (to work with `https://template-project.com`)

## Production App Server Configuration

- [x] Create `App Platform` resource in Digital Ocean
- [x] Create `Template Project API` app

  - [ ] Determine Resource Allocation:
    - `2 GB RAM`
    - `1 Dedicated vCPU`
    - `300 GB bandwidth`
    - Minimum 1 container, Maximum 3 containers, 80% CPU Threshold
    - Cost: $39/month - $117/month
  - [x] Configure Resource Monitoring:
    - [x] Set up CPU usage alerts at 70%
    - [x] Set up Memory usage alerts at 80%
    - [ ] Monitor response times and error rates

- [x] Create `Template Project Web App` app

  - [x] Determine Resource Allocation:
    - `512 MB RAM`
    - `Shared vCPU`
    - `100 GB bandwidth`
    - Single container (no scaling needed)
    - Cost: $0/month
  - [ ] Configure Resource Monitoring:
    - [ ] Monitor CDN caching performance
    - [ ] Monitor static file delivery times
    - [ ] Track CDN bandwidth usage

## Production Database Specifications

- [ ] Configure database cluster size:

  - [x] `2 GB RAM`
  - [x] `1 Dedicated vCPU`
  - [x] `30 GB Storage`
  - [x] Cost: $30/month

- [ ] Configure database backups:

  - [ ] Enable daily automated backups
  - [ ] Set 7-day backup retention
  - [ ] Enable point-in-time recovery (PITR)
  - [ ] Document backup restoration process

- [ ] Configure database monitoring:

  - [x] Set up CPU usage alerts at 70%
  - [x] Set up Memory usage alerts at 80%
  - [ ] Monitor connection pool utilization
  - [ ] Track query performance metrics
  - [ ] Monitor disk space usage (alert at 85%)

- [ ] Security configuration:

  - [ ] Enable VPC network isolation
  - [x] Configure firewall rules to restrict access
  - [x] Set up SSL/TLS certificates
  - [ ] Implement IP whitelisting
  - [ ] Create restricted user roles and permissions

- [ ] Performance optimization:
  - [ ] Configure connection pooling
  - [ ] Optimize query performance
  - [ ] Configure appropriate cache settings
  - [ ] Set up database indexing strategy
  - [ ] Update database statistics regularly

**Note**: This configuration is optimized for initial launch with a small user group. Monitor usage patterns during the first month and scale resources as needed based on actual demand.

- **Adjustment Strategy**

Monitor these metrics for the first month:

- Response times
- Error rates
- CPU utilization
- Memory usage
- Container scaling frequency

Adjust resources if you observe:

- Response times > 500ms
- CPU utilization consistently > 70%
- Memory usage consistently > 80%
- Frequent container scaling events

This setup provides a good balance between cost and performance for a new production deployment, with room to scale as needed. The auto-scaling configuration will help handle traffic spikes while maintaining cost efficiency during lower-traffic periods.

## Production Database Configuration

- [x] Create `Managed Database` in Digital Ocean
- [x] Create database/schema: "template-project-db"
- [x] Verify database existence and accessibility
- [x] Configure database connection:

```env
DATABASE_URL=postgres://[username]:[password]@[host]:[port]/[database-name]
```

- [x] Verify database connection from application
- [x] Ensure database backups are configured
- [x] Configure database monitoring
- [x] Set up database access controls and user permissions
- [x] Document database connection details in secure location

## Security & Rate Limiting

- [ ] Configure rate limiting parameters:
  - [ ] `COMMON_RATE_LIMIT_WINDOW_MS`
  - [ ] `COMMON_RATE_LIMIT_MAX_REQUESTS`
- [ ] Set token expiry times:
  - [ ] `PASSWORD_RESET_TOKEN_EXPIRY`
  - [ ] `VERIFY_EMAIL_TOKEN_EXPIRY`
- [ ] Configure authentication limits:
  - [ ] `AUTH_LOGIN_MAX_ATTEMPTS`
- [ ] JWT Configuration:
  - [ ] Generate secure `JWT_SECRET_KEY`
  - [ ] Set `JWT_TOKEN_EXPIRATION`
  - [ ] Set `JWT_COOKIE_EXPIRATION_DAYS`

## Email Configuration

- [x] Setup SMTP server for `no-reply@appshop.biz`
      ~- [ ] Generate `app password` for `no-reply@appshop.biz`~

## Third-Party Services Setup

### Firebase Integration

- [ ] Intregrate production Firebase project

### Duffel Integration

- [ ] Configure production credentials:

```env
DUFFEL_API_URL=https://api.duffel.com/air
DUFFEL_ACCESS_TOKEN=duffel_[your-production-token]
```

### Oxylabs Configuration

- [ ] Configure production credentials:

```env
OXYLABS_API_URL=https://realtime.oxylabs.io/v1
OXYLABS_USERNAME=[production-username]
OXYLABS_PASSWORD=[production-password]
```

- [ ] Calculate how proposed Oxylab item update interval will affect quota usage [and cost]
- [ ] Configure `alerts_email_address` in `item_monitoring_system_configuration` to be `support@hurrier.com`

### Ship24 Integration

- [ ] Setup production account
- [ ] Configure production credentials:

```env
SHIP24_API_URL=https://api.ship24.com
SHIP24_API_KEY=[production-api-key]
SHIP24_WEBHOOK_SECRET=[production-webhook-secret]
```

### Stripe Integration

- [ ] Configure production credentials:

```env
STRIPE_API_VERSION=2024-06-20
STRIPE_SECRET_KEY=[production-secret-key]
STRIPE_WEBHOOK_SECRET=[production-webhook-secret]
```

- [ ] Configure Stripe Connect
  - [ ] Allow all countries

## Application Settings & Business Rules

### User Limits

- [ ] Confirm `MAXIMUM_DELIVERY_ADDRESSES_PER_USER=5`

### Payment Configuration

- [ ] Verify Stripe settings:

```env
STRIPE_MAIN_CURRENCY=USD
STRIPE_FEE_PERCENTAGE=0.049
STRIPE_FIXED_FEE_CENTS=0.3
```

### Delivery Fee Structure

- [ ] Confirm delivery fee settings:

```env
TRAVELER_BENEFIT_PERCENTAGE=0.7
DELIVERY_FEE_PERCENTAGE_OF_ITEM_PRICE_UNDER_300=0.25
DELIVERY_FEE_PERCENTAGE_OF_ITEM_PRICE_OVER_300=0.22
```

### Other Settings

- [ ] Set customs limit: `CUSTOMS_LIMIT_OFFSET=0`
- [ ] Configure flight parameters:

```env
FLIGHT_ITINERARY_PRICE_VARIANCE=20
FLIGHT_ITINERARY_STOPS_VARIANCE=0
```

## Monitoring & Alerts

- [ ] Integrate [Logtail Logging](https://marketplace.digitalocean.com/add-ons/logtail)

## Final Verification

- [ ] Test all API endpoints with production configuration
- [ ] Verify all third-party service connections
- [ ] Test payment processing end-to-end
- [ ] Verify email sending functionality
- [ ] Test rate limiting
- [ ] Verify authentication flows
      `
