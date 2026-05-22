# Authentication

JWT sign-up and login via Express template. Mobile stores Bearer token in Keychain and sends `Authorization` header on Flex API calls.

## Entry points

- App launch when unauthenticated
- Session expiry

## API dependencies

| Step | Method | Path |
|------|--------|------|
| Sign up | POST | `/auth/sign-up` |
| Login | POST | `/auth/login` |
