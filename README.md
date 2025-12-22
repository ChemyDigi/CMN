# CMN - Comprehensive Mechanical Solutions

![CMN Logo](cmn/public/images/CMN_logo.png) <!-- Assuming logo path -->

A modern, responsive web application built with Next.js for CMN, a leading provider of mechanical solutions including air conditioning, tools, and specialized services.

## 🚀 Features

- **Responsive Design**: Fully responsive website optimized for all devices
- **Admin Panel**: Secure admin dashboard for managing products and content
- **Product Management**: Dynamic product pages for AC-Ref and Tools categories
- **Service Pages**: Dedicated pages for AirDoot and CMN services
- **Client Portal**: Showcase of clients, partners, and testimonials
- **Contact Integration**: Interactive contact forms with EmailJS
- **Firebase Integration**: Backend services for data management
- **Animations**: Smooth animations powered by Framer Motion
- **SEO Optimized**: Built with Next.js for optimal performance and SEO

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons
- **Forms**: EmailJS for contact forms
- **State Management**: React Hooks
- **Linting**: ESLint
- **Build Tool**: Webpack (via Next.js)

## 📁 Project Structure

```
cmn/
├── app/                          # Next.js App Router pages
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── about/                   # About page
│   ├── admin/                   # Admin panel
│   │   ├── (auth)/              # Authentication routes
│   │   └── (panel)/             # Admin dashboard
│   ├── api/                     # API routes
│   ├── clients/                 # Clients page
│   ├── contact/                 # Contact page
│   ├── home/                    # Home page (alternative route)
│   ├── products/                # Product categories
│   │   ├── ref-ac/              # AC-Ref products
│   │   └── tools/               # Tools products
│   └── services/                # Service pages
│       ├── airdoot/             # AirDoot service
│       └── cmn/                 # CMN services
├── components/                  # Reusable React components
│   ├── Footer.tsx               # Site footer
│   ├── Navbar.tsx               # Navigation bar
│   ├── AboutUsComponents/       # About page components
│   ├── AC-Ref/                  # AC-Ref product components
│   ├── AdminPanel/              # Admin panel components
│   ├── AirDoot/                 # AirDoot service components
│   ├── Clients/                 # Client page components
│   ├── CmnServices/             # CMN services components
│   ├── Contact/                 # Contact page components
│   ├── HomeComponents/          # Home page components
│   └── Tools/                   # Tools product components
├── data/                        # Static data files
│   ├── carousel-data.json       # Carousel content
│   └── hero-sections-data.json  # Hero section data
├── lib/                         # Utility libraries
│   ├── firebase.ts              # Firebase configuration
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
│   └── images/                  # Image assets
├── eslint.config.mjs            # ESLint configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── postcss.config.mjs           # PostCSS configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## 🏁 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd cmn
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Firebase and EmailJS configurations:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

The application can be deployed to any platform that supports Node.js applications, such as:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication, Firestore, and Storage as needed
3. Add your Firebase config to `.env.local`

### EmailJS Setup

1. Create an account at [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create a service and email template
3. Add your EmailJS credentials to `.env.local`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

## 📄 License

This project is private and proprietary to CMN.

## 📞 Contact

For questions or support, please contact the development team or visit our contact page.

## 🔄 Updates

- Version 0.1.0: Initial release with core features
- Built with Next.js 16 and React 19 for optimal performance
- Responsive design with Tailwind CSS
- Firebase integration for backend services
- Admin panel for content management

---

Built with ❤️ by the AlchemIT Team
