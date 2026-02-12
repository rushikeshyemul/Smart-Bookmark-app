This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 🚧 Challenges Faced & How I Solved Them

---

## 1️⃣ Google Provider Not Enabled

**Error:**
Unsupported provider: provider is not enabled


**Cause:**  
The Google authentication provider was not enabled in Supabase.

**Solution:**  
- Navigated to:

Supabase → Authentication → Providers

- Enabled Google provider.
- Added Google Client ID and Client Secret from Google Cloud Console.

---

## 2️⃣ OAuth Redirect URI Mismatch

**Error:**
Error 400: redirect_uri_mismatch


**Cause:**  
The redirect URI configured in Google Cloud did not exactly match the Supabase callback URL.

**Solution:**  
- Copied the exact callback URL from:
Supabase → Authentication → Providers → Google

- Added it under:

- Ensured:
- Correct protocol (`https`)
- No extra slash
- Exact character match

---

## 3️⃣ Redirecting to Localhost After Deployment

**Problem:**  
After deploying the project, login redirected to:
http://localhost:3000

instead of the production URL.

**Cause:**  
Supabase Site URL was still set to localhost.

**Solution:**  
- Updated:

Supabase → Authentication → URL Configuration

- Changed Site URL to the deployed production domain.
- Added production URL to Redirect URLs.
- Updated Google OAuth Authorized JavaScript Origins with the production domain.

---

## 4️⃣ Local Development Server Not Running During OAuth Callback

**Problem:**
This site can’t be reached
localhost refused to connect


**Cause:**  
The local development server (`npm run dev`) was not running when Supabase redirected back after login.

**Solution:**  
- Restarted development server:
  ```bash
  npm run dev

