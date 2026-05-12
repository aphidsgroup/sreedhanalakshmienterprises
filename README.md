# Sree Dhanalakshmi Enterprises — Website & Admin Dashboard

Production-ready Next.js 16 website + admin dashboard for a construction material supplier in Chennai.

---

## 🚀 Quick Setup

### 1. Prerequisites
- Node.js 18+ (v20 recommended)
- npm 10+
- Neon DB account: https://neon.tech (free)
- Cloudinary account: https://cloudinary.com (free)

### 2. Clone & Install
```bash
cd sde-enterprises
npm install
```

### 3. Configure Environment
```bash
cp .env.example .env
```
Edit `.env` with your credentials:
```env
DATABASE_URL="postgresql://..."        # From Neon dashboard
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="any-random-string-32chars"
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
```

### 4. Database Setup
```bash
npx prisma db push          # Push schema to Neon DB
npm run db:seed             # Seed demo data + admin user
```

### 5. Add Logo
Copy your logo file to:
```
public/logo.jpeg
```

### 6. Run Development Server
```bash
npm run dev
```
Open: http://localhost:3000

---

## 🔐 Admin Dashboard

URL: http://localhost:3000/admin/login

Default credentials:
- **Email:** admin@sde.com
- **Password:** Admin@1234

> ⚠️ Change password in Settings after first login!

### How to Update Daily Prices
1. Login to `/admin`
2. Click **Pricing** in sidebar
3. Filter by category (Cement, Steel, etc.)
4. Click **Update** next to any product
5. Enter new price → click **Save**
6. Price updates live on the website immediately

---

## 🌐 Vercel Deployment

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: SDE Enterprises website"
git remote add origin https://github.com/YOUR_USERNAME/sde-enterprises.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Add all environment variables from `.env`
4. Set `NEXTAUTH_URL` to your Vercel domain (e.g., `https://sde-enterprises.vercel.app`)
5. Click **Deploy**

### 3. After First Deployment
- Run `npx prisma db push` with production `DATABASE_URL`
- Run `npm run db:seed` to seed initial data

---

## 📁 Project Structure
```
app/
  (public)/          # Public website pages
    page.tsx         # Home
    about/
    contact/
    products/
    today-cement-price/
    today-steel-price/
    today-bricks-and-blocks-price/
    today-sand-and-aggregates-price/
  (admin)/admin/     # Admin dashboard (protected)
    login/
    page.tsx         # Overview
    pricing/         # Price management
    products/        # Product management
    categories/
    brands/
    content/
    media/
    settings/
  api/               # API routes
components/
  public/            # Site header, footer, etc.
  admin/             # Admin sidebar, topbar, etc.
lib/                 # Prisma, auth, cloudinary, utils
prisma/
  schema.prisma      # Database schema
  seed.ts            # Seed data (TypeScript)
  seed.js            # Seed runner (Windows-compatible)
public/
  logo.jpeg          # Your company logo
types/               # TypeScript types
proxy.ts             # Auth & Route protection (Next.js 16 style)
```

---

## 🛠️ Useful Commands
```bash
npm run dev          # Development server
npm run build        # Production build
npm run db:push      # Sync schema to DB
npm run db:seed      # Seed demo data
npm run db:studio    # Prisma Studio (DB GUI)
npx prisma generate  # Regenerate Prisma client
```

---

## ✅ Two Branches
| Branch | Address | Phone |
|--------|---------|-------|
| Kilpauk | No. 72, Kilpauk Garden Road, Chennai - 600010 | 90947 79299, 90940 18182 |
| Mangadu | No. 343, KK Nagar, Kundrathur Main Road, Chennai - 600122 | 73057 77117 |

Email: sdenterprise09@gmail.com
