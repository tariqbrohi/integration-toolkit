# Integration Toolkit

### *One Package. Every Essential Integration.*

The **Integration Toolkit** is a unified, high-performance library providing production-ready TypeScript scripts for everything from Payments and AI to Storage and State Management.

---

## Why One-Package?

- **Single Installation**: One package for all your service needs.
- **Fully Typed**: Unified TypeScript support across all modules.
- **Optimized**: Tree-shakeable, so you only bundle what you use.
- **Plug & Play**: Simple class-based architecture.

---

## Installation

Install the entire toolkit with your favorite package manager:

```bash
# npm
npm install @devcodebotx/integration-toolkit

# yarn
yarn add @devcodebotx/integration-toolkit

# pnpm
pnpm add @devcodebotx/integration-toolkit
```

---

## How to Use

The toolkit is organized into logical namespaces. Here is how you can use them:

### 1. Payments (Stripe, PayPal, LemonSqueezy)
```typescript
import { StripeService, PayPalService } from '@devcodebotx/integration-toolkit';

const stripe = new StripeService({ apiKey: '...' });
const paypal = new PayPalService({ clientId: '...', clientSecret: '...', isLive: false });
```

### 2. Artificial Intelligence (OpenAI, Gemini, DeepSeek)
```typescript
import { OpenAIService, GeminiService, DeepSeekService } from '@devcodebotx/integration-toolkit';

// Option 1: Set default model during initialization
const ai = new OpenAIService({ apiKey: '...', defaultModel: 'gpt-4o' });

// Option 2: Pass model during request
const response = await ai.createChatCompletion(messages, 'gpt-4-turbo');
```

### 3. Emails (SMTP, Resend, Mailgun)
```typescript
import { SMTPMailer, ResendService } from '@devcodebotx/integration-toolkit';

const mailer = new SMTPMailer({ ...config });
const resend = new ResendService({ apiKey: '...' });
```

### 4. Storage (S3, Cloudinary, Supabase)
```typescript
import { S3Service, CloudinaryService } from '@devcodebotx/integration-toolkit';

const s3 = new S3Service({ ...config });
```

### 5. State Management (Redux, Zustand)
```typescript
import { store, useAppStore } from '@devcodebotx/integration-toolkit';
```

---

## Features At a Glance

- **Payments**: [Stripe](./src/payments/stripe.ts) • [PayPal](./src/payments/paypal.ts) • [LemonSqueezy](./src/payments/lemonsqueezy.ts) • [Square](./src/payments/square.ts)
- **AI**: OpenAI (GPT-5), Gemini (Pro), DeepSeek (Reasoning).
- **Emails**: SMTP (Nodemailer), Resend API, Mailgun SDK.
- **Storage**: AWS S3 (Signed URLs), Cloudinary (Transforms), Supabase.
- **State**: Redux Toolkit, Zustand (Persistent Hooks).

---

## Development & Building

To build the toolkit from source:
```bash
npm run build
```
