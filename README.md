# ABD Wears — 2026 Fashion Store

Complete e-commerce website for ABD Wears. React + Tailwind + localStorage.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run locally
npm run dev

# Open http://localhost:5173
```

## 🔐 Admin Access

URL: `http://localhost:5173/#/admin/login` 

```
Username: admin
Password: abdwears2026
```

> ⚠️ Change these in `src/data/store.js` → ADMIN_CREDS

---

## 📦 Deploy to GitHub Pages (Free)

### Step 1 — Create GitHub Repo
1. Go to github.com → New Repository
2. Name it: `abd-wears` (or any name)
3. Set to Public
4. Don't add README (you have one)

### Step 2 — Push Code
```bash
git init
git add .
git commit -m "ABD Wears initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/abd-wears.git
git push -u origin main
```

### Step 3 — Update vite.config.js for GitHub Pages
Open `vite.config.js` and change base if your repo name isn't the root:
```js
// If deploying to: https://username.github.io/abd-wears/
base: '/abd-wears/',

// If using custom domain (recommended):
base: './',
```

### Step 4 — Deploy
```bash
npm run deploy
```

This builds and pushes to the `gh-pages` branch automatically.

### Step 5 — Enable GitHub Pages
1. Go to your repo → Settings → Pages
2. Source: Deploy from branch
3. Branch: `gh-pages` / root
4. Save → Wait 2-3 minutes
5. Your site: `https://YOUR_USERNAME.github.io/abd-wears/`

---

## 🌐 Add Custom Domain (e.g. abdwears.pk)

### Step 1 — Buy Domain
Get a domain from:
- **Namecheap** (recommended, affordable)
- **GoDaddy**
- **PKNIC** (for .pk domains)

### Step 2 — Add CNAME in GitHub Pages
1. Repo → Settings → Pages → Custom domain
2. Enter: `abdwears.pk` or `www.abdwears.pk`
3. Check "Enforce HTTPS"
4. GitHub will create a CNAME file automatically

### Step 3 — Configure DNS at your registrar
Add these DNS records:

**If using root domain (abdwears.pk):**
```
Type: A    Name: @    Value: 185.199.108.153
Type: A    Name: @    Value: 185.199.109.153
Type: A    Name: @    Value: 185.199.110.153
Type: A    Name: @    Value: 185.199.111.153
```

**If using www subdomain (www.abdwears.pk):**
```
Type: CNAME    Name: www    Value: YOUR_USERNAME.github.io
```

### Step 4 — Wait for DNS Propagation
- Takes 1-48 hours (usually under 1 hour with Namecheap)
- Check status: https://dnschecker.org

---

## 📁 Project Structure

```
abd-wears/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       — Navigation with cart/wishlist icons
│   │   ├── Footer.jsx       — Full footer with newsletter
│   │   └── ProductCard.jsx  — Product card with quick-add
│   ├── context/
│   │   └── StoreContext.jsx — Global state (cart, auth, products)
│   ├── data/
│   │   └── store.js         — Products, categories, admin creds
│   ├── pages/
│   │   ├── Home.jsx         — Hero slider, featured products
│   │   ├── Shop.jsx         — Product grid with filters
│   │   ├── ProductDetail.jsx — Single product page
│   │   ├── Cart.jsx         — Shopping cart
│   │   ├── Checkout.jsx     — 3-step checkout
│   │   ├── UserPages.jsx    — Wishlist, Login, Register, Account, Orders
│   │   └── admin/
│   │       └── AdminPages.jsx — All admin pages
│   ├── App.jsx              — Routes
│   ├── main.jsx             — Entry point
│   └── index.css            — Tailwind + custom styles
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## ✏️ Customization Guide

### Change Store Info (name, phone, email)
Edit `src/data/store.js` → STORE_INFO

### Change Admin Password
Edit `src/data/store.js` → ADMIN_CREDS

### Add/Edit Products
Either:
- Use Admin Panel at `/#/admin/products`
- Or directly edit `src/data/store.js` → INITIAL_PRODUCTS

### Change Colors/Theme
Edit `tailwind.config.js` → colors section

### Add New Category
Edit `src/data/store.js` → CATEGORIES array

---

## 💳 Payment Integration (Future)

Currently COD/manual. To add real payments:
- **JazzCash**: Use JazzCash Payment Gateway API
- **Stripe**: Add Stripe.js (needs backend)
- **PayFast PK**: Pakistani payment gateway

---

## 📊 Data Persistence

All data stored in localStorage:
- `abd_products` — Product catalog
- `abd_cart` — Shopping cart
- `abd_orders` — All orders
- `abd_users` — Registered users
- `abd_wishlist` — Wishlist items
- `abd_admin` — Admin session

> For production, replace with a real backend (Firebase, Supabase, or custom API).

---

**Built for ABD Wears — 2026 Fashion Collection 🛍️**
