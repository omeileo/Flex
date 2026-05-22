# Auth Flow — Screen Specifications

Sign in, sign up, and email verification. Mobile: 390×844. Entry: Landing → **Log in** / **Create account**, or post-sign-up → **Verify email**.

## Shared shell

- Background: `$background` (`#F7F8FA`)
- Top brand block: **Flex** wordmark (28px bold) + 32×4px accent bar (`$accent-energy`)
- Optional tagline on sign-in/sign-up only (14px `$text-secondary`)
- Form fields: `$surface` fill, `$border` stroke, 12px radius, 16px horizontal padding, 48px height
- Labels: 14px semibold `$text-primary`, 8px gap above field
- Primary CTA: full-width black pill (`$accent-cta`), 52px height — reuse **PrimaryButton**
- Secondary action: centered text link, 14px `$text-secondary` with `$text-primary` emphasis span
- Error text: 12px `$error` below field or above CTA
- Nav: system header with back on verify; sign-in/sign-up may use stack titles "Log in" / "Sign up"

---

## Screen 1: Sign in

**Title:** Welcome back  
**Tagline:** Pick up your plan where you left off.

| Field | Type | Notes |
|-------|------|-------|
| Email | email | Placeholder `you@example.com` |
| Password | secure | Placeholder `Your password` |

**Actions**

- Primary: **Log in**
- Secondary link: "Need an account? **Sign up**"

**States**

- Default (empty fields)
- Validation error (inline under field)
- Submitting (CTA loading)
- API error banner above CTA

---

## Screen 2: Sign up

**Title:** Create your account  
**Tagline:** Build a plan tailored to your goals and equipment.

| Field | Type | Notes |
|-------|------|-------|
| First name | text | |
| Last name | text | |
| Email | email | |
| Password | secure | Hint: "At least 8 characters" |

**Actions**

- Primary: **Sign up**
- Secondary link: "Already have an account? **Log in**"

**Flow:** Success → navigate to Verify email with email prefilled (read-only).

---

## Screen 3: Verify email

**Title:** Verify your email  
**Subtitle:** Enter the 6-character code we sent to **you@example.com**.

| Field | Type | Notes |
|-------|------|-------|
| Email | email | Read-only when arriving from sign-up |
| Code | OTP | Six single-character boxes (design); maps to one input in app |

**Actions**

- Primary: **Verify email**
- Text link: **Resend code**
- Text link: **Back to log in**

**States**

- Default (empty code boxes)
- Code partial / complete (filled boxes with accent border)
- Resend success info message (12px `$text-secondary`)
- Invalid code error

---

## Transitions

```
Landing ──Log in──► Sign in ──Sign up link──► Sign up
Landing ──Create account──► Sign up ──success──► Verify email
Sign up ──Log in link──► Sign in
Verify ──success──► FlexBootstrap / Onboarding
```

## Components (new / reused)

- **PrimaryButton** — CTA
- **FormTextField** — label + input + error
- **VerificationCodeInput** — 6-box OTP row (design + preview)
- **AuthBrandHeader** — Flex mark + optional tagline
