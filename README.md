# UrbanCart

UrbanCart is a modern, responsive, production-style fashion e-commerce web app built with React, Vite, Tailwind CSS, and Firebase.

## Tech Stack

- React + Vite
- Tailwind CSS
- Firebase Authentication
- Firebase Firestore
- React Router
- Context API (Cart + Auth)
- react-hot-toast (UX feedback)

## Features

- Sticky responsive navbar with cart item count
- Home page with hero CTA, featured products, and category highlights
- Shop page with category filter, price range slider, and sorting
- Product details page with image preview gallery and size validation
- Fully interactive cart with quantity updates, totals, and localStorage persistence
- Checkout with inline validation and Firebase order save
- Signup/Login with Firebase Auth and validation
- Loading skeletons/spinners and disabled button states
- Toast notifications and success modal for checkout

## Firebase Setup

1. Create a Firebase project.
2. Enable **Authentication** -> **Email/Password**.
3. Enable **Firestore Database**.
4. Create a `.env` file in project root:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Firestore Collections

- `products`
- `users` (optional for profile expansion)
- `orders`

## Sample Product Data

Use the objects in `src/firebase/sampleProducts.js` to seed your `products` collection.

Suggested product fields:

- `name` (string)
- `category` (string)
- `price` (number)
- `description` (string)
- `sizes` (array of strings)
- `images` (array of image URLs)
- `featured` (boolean)

## Local Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Deploy on Vercel

1. Push this project to GitHub.
2. Import repository in [Vercel](https://vercel.com/).
3. Framework preset: **Vite**.
4. Add all `VITE_FIREBASE_*` environment variables in Vercel project settings.
5. Deploy.

If routes return 404 on refresh, add `vercel.json` with SPA rewrite:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```
