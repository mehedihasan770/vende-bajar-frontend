<div align="center">
  <img src="public/favicon.ico" alt="Vende Bajar Logo" width="80" height="80" />
  <h1>🛒 Vende Bajar - Luxury E-commerce Platform</h1>
  <p>A high-end, conceptual E-commerce showcase built with Next.js, featuring an "Absurd Luxury" aesthetic and an ultra-modern UI.</p>

  <div>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="React Query" />
  </div>
</div>

---

## ✨ Core Features & Highlights

### 🎨 Premium UI / UX Design
- **"Absurd Luxury" Aesthetic:** A carefully crafted, minimalist design inspired by top-tier tech brands (like Apple) ensuring a highly premium feel.
- **Glassmorphism (Frosted Glass):** Extensive use of `backdrop-blur` on navigation bars, dropdowns, and floating cards.
- **Custom Auto-hiding Scrollbar:** A mobile-like, sleek auto-hiding custom scrollbar built with pure CSS that is always visible on hover but respects rounded container borders seamlessly.
- **Fluid Responsiveness:** Perfectly scales from tiny mobile screens up to **Super Ultrawide (32:9) Monitors**, utilizing modern `clamp()` and container query techniques to prevent UI breakage.

### 🎠 Dynamic Hero Section
- **Full-Screen Carousel:** A `100svh` auto-playing slider fetching dynamic data from the backend.
- **"BOLD GAZE" Watermark:** A massive, animated background watermark that smartly stops scaling on ultra-wide screens to maintain structural integrity.
- **Frosted Glass Cards:** Floating, interactive content cards on the hero slider for quick Call-to-Actions.
- **Animated Backgrounds:** Smooth transition effects between slide changes.

### 🛍️ Product Showcase & Interactions
- **3D Hover Cards:** Product cards featuring complex hover interactions (scale, slight rotation, shadow casting) while perfectly clipping images to their rounded boundaries using `transform-gpu` and `isolate`.
- **Skeleton Loaders:** Custom-built `animate-pulse` skeletons that mimic the exact geometry of the product cards for a seamless loading experience.
- **Discount & Rating Badges:** Clean, visually distinct badges for sales percentages and review scores.
- **Dynamic Wishlist:** Instantly add or remove products from favorites directly from the product cards.

### 🔐 Authentication & Security
- **Context-based Auth:** Robust `AuthProvider` managing user state across the entire application seamlessly.
- **Role-Based Access Control (RBAC):** Strict separation between `Admin` and `Customer` roles for routing and UI rendering.
- **Axios Interceptors:** Custom `publicAxios` and `privateAxios` instances to securely handle JWT tokens and authentication headers globally.

### 🛡️ Advanced Dashboard System
- **Admin Dashboard:** Comprehensive control panel for managing products, categories, users, and orders.
- **Customer Dashboard:** Personalized space for users to track orders, manage wishlists, and update profile settings.
- **Modular Dashboard Architecture:** Highly decoupled dashboard with distinct micro-components (`SidebarHeader`, `MobileSearchOverlay`, etc.) keeping the codebase maintainable.
- **Mobile-First Sidebar Drawer:** A flawlessly layered mobile drawer utilizing `100dvh` with fixed z-indexes to prevent overlap issues with input fields.

### 🛒 Shopping Experience
- **Smart Cart System:** Fully functional cart system (support for guest users via `localStorage` before login).
- **Interactive Search:** An elegant full-screen search overlay for mobile and an integrated desktop search bar.
- **Toast Notifications:** Beautiful, non-intrusive global alerts using `react-hot-toast` for cart actions, login success, and error handling.

### ⚙️ Under The Hood (Architecture)
- **App Router:** Fully utilizing Next.js 15 routing, layouts, and server/client component rendering.
- **TanStack Query (React Query):** For highly efficient data fetching, caching, background synchronization, and state management.
- **Centralized Configurations:** Navigation links and menus are decoupled into static configuration files (e.g., `menuItems.ts`).
- **Global Typescript Definitions:** Custom `global.d.ts` and strict typing across all components.

---

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4
* **Animations:** Framer Motion
* **State/Data Fetching:** React Query & Axios
* **Icons:** Lucide React
* **Notifications:** React Hot Toast

---

## 🚀 Getting Started

To run this project locally, follow these steps:

**1. Clone the repository and install dependencies:**
```bash
npm install
# or
yarn install
```

**2. Run the development server:**
```bash
npm run dev
# or
yarn dev
```

**3. Open the application:**
Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

> **Design Philosophy:** *"A website shouldn't just show products; it should make the user feel the luxury of the product before they even buy it."*
