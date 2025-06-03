# URL Shortener App

A modern, full-stack URL shortening application built with React, Redux Toolkit, TypeScript, and Tailwind CSS. Features user authentication, analytics, responsive design, dark mode, and a sleek UI with charts.

---

## Features

- **Quick URL shortening** with validation using Zod schema  
- **User Authentication** with login, signup, and protected routes  
- **Dashboard** displaying analytics including browser/device breakdown pie charts  
- **Copy to clipboard** functionality for shortened URLs  
- **Responsive and accessible UI** with dark and light theme toggle  
- **Redux Toolkit** for global state management  
- **React Router** for navigation  
- **Reusable components** like Navbar, Footer, URL Cards, and forms  
- **Loading and error handling** with toast notifications  

---

## Tech Stack

- React + TypeScript  
- Redux Toolkit  
- React Router DOM  
- Tailwind CSS (Dark Mode support)  
- Zod + React Hook Form (form validation)  
- Recharts (analytics visualization)  
- Axios (API calls)  
- UAParser.js (User agent parsing for analytics)  
- Sonner (toast notifications)  
- Lucide-react (icons)  

---

## Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener 
   ```
2. Install Dependencies:
    ```bash
   npm install
   ```
3. Run the development server:
    ```bash
   npm run dev
   ```


## **Usage**
   - Access the app at http://localhost:3000
   - Sign up or log in to create short URLs
   - View your URLs and their click stats on the dashboard
   - Toggle dark/light mode via the theme switcher
   - Use the copy button on short URLs for quick sharing

## **Project Structure**
```
FRONTEND/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   └── store.ts
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── ui/
│   │   ├── Card.tsx
│   │   ├── ClicksLineChart.tsx
│   │   ├── ClicksTable.tsx
│   │   ├── DeviceBreakdownPieChart.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── ToggleTheme.tsx
│   │   ├── UrlCard.tsx
│   │   └── UrlShorten.tsx
│   ├── config/
│   │   └── api.ts
│   ├── features/
│   │   ├── auth_schemas/
│   │   │   ├── loginSchema.ts
│   │   │   └── signupSchema.ts
│   │   ├── urlShortener_schemas/
│   │   │   └── urlShema.ts
│   │   ├── reduxLogic/
│   │   │   └── authSlice.ts
│   │   │    ├── theme/
│   │   │       └── themeSlice.ts
│   │   │    ├── urlRedux/
│   │   │       └── urlSlice.ts
│   │   │
│   ├── layouts/
│   │   └── Layout.tsx
│   ├── lib/
│   ├── pages/
│   │   ├── AnalyticPage.tsx
│   │   ├── DashBoardPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RedirectPage.tsx
│   │   └── SignupPage.tsx
│   ├── utils/
│   │   ├── getClicksByDate.ts
│   │   └── getUrl.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env
├── .env.example
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
└── tailwind.config.ts
```


## **Future Improvements**
   - Add link expiration & password protection
   - User profile management
   - More detailed analytics (geolocation, time-based stats)


If you find this project helpful, feel free to ⭐ star it on GitHub!