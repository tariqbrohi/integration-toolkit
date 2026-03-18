# 📚 Unified Technical Guide: @devcodebotx/integration-toolkit

One package to handle all your integrations! This guide provides technical details on how to install and use the **@tariqbrohi/integration-toolkit**.

---

## 📦 Installation Options

Choose your preferred package manager to install the entire toolkit.

```bash
# Using npm
npm install @devcodebotx/integration-toolkit

# Using yarn
yarn add @devcodebotx/integration-toolkit

# Using pnpm
pnpm add @devcodebotx/integration-toolkit
```

---

## ⚡ Quick Usage Patterns

The toolkit exports various service classes that encapsulate all common logic.

### 💳 Payments Integration
```typescript
import { StripeService, PayPalService, LemonSqueezyService, SquareService } from '@devcodebotx/integration-toolkit';

const stripe = new StripeService({ apiKey: 'sk_test_...' });
const square = new SquareService({ accessToken: '...', environment: 'sandbox' });
```

### 🤖 AI (Artificial Intelligence) Integration
```typescript
import { OpenAIService, GeminiService, DeepSeekService } from '@devcodebotx/integration-toolkit';

const ai = new OpenAIService({ apiKey: '...' });
const content = await ai.createChatCompletion([{ role: 'user', content: 'Hello!' }]);
```

### 📧 Email Integration
```typescript
import { SMTPMailer, ResendService, MailgunService } from '@devcodebotx/integration-toolkit';

const resend = new ResendService({ apiKey: '...' });
await resend.sendEmail('from@me.dev', 'to@user.com', 'Subject', '<h1>Body</h1>');
```

---

## 🧠 Core Structure

This package is designed to be **tree-shakeable**, meaning you only include the code you actually use in your bundle.

- **`payments/`**: Stripe, PayPal, LemonSqueezy logic.
- **`ai/`**: OpenAI, Google Gemini, DeepSeek (Chinese AI) clients.
- **`emails/`**: SMTP, Resend, Mailgun SDKs.
- **`storage/`**: AWS S3, Cloudinary, Supabase storage access.
- **`states/`**: Redux Toolkit & Zustand configurations.

---

## 🏗️ Development

If you are contributing to this toolkit, run the following commands to build the package from source:

```bash
# Build the TypeScript files into 'dist/'
npm run build
```

---

*Crafted by Antigravity AI* 🚀
