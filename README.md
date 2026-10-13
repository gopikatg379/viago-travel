# Viago Travel Website

A full-stack Next.js App Router travel website with a public storefront, dynamic package pages, MySQL + Prisma, admin authentication, package CRUD, image uploads, enquiries, WhatsApp links and SEO routes.

## 1. Install

```bash
npm install
cp .env.example .env
```

Update `DATABASE_URL`, `AUTH_SECRET`, WhatsApp number and company contact information in `.env`.

## 2. Create the MySQL database

Create a database named `viago`, then run:

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
```

The seed admin defaults to `admin@viago.in` / `ChangeMe123!` unless changed in `.env`. Change these values before production.

## 3. Start

```bash
npm run dev
```

Open `http://localhost:3000` and `http://localhost:3000/admin/login`.

## Image uploads

The included uploader saves to `public/uploads`, which is suitable for local development or persistent Node hosting. On serverless deployments such as Vercel, replace `lib/uploads.js` with cloud object storage (Cloudinary, S3, R2, etc.) because the local filesystem is not durable.

## Production checklist

- Use a long random `AUTH_SECRET`.
- Change the seeded admin credentials.
- Use managed MySQL with TLS/backups.
- Replace local uploads with persistent object storage.
- Set the real site URL, phone, email, office address and WhatsApp number.
- Add your real Google Maps iframe and social links.
- Run `npm run build` before deployment.
