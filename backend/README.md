# 🔗 URL Shortener Backend

This is the **backend** of a full-stack URL Shortener application, built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**. It provides RESTful APIs for user authentication, URL shortening, redirection, and analytics tracking.

> ⚙️ Deployed on [Render](https://render.com)

---

## 🚀 Features

- ✅ JWT-based Authentication (Signup, Login)
- 🔐 Protected Routes (e.g., create short URL, view analytics)
- 📉 URL Click Analytics (IP, Country, User-Agent, Timestamp)
- 🌍 GeoIP Location Tracking (via `ip-api.com`)
- 🔗 Unique Short Link Generation using `nanoid`
- 🧾 MongoDB Models for Users & URLs
- 📤 User-Specific URL Tracking

---

## 📦 Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Zod** for validation
- **Bcrypt** for password hashing
- **Axios** for IP-based geolocation
- **Helmet**, **CORS** for security & cross-origin support

---

## 🌐 API Endpoints

### 🧑‍💼 Auth Routes

| Method | Endpoint     | Description               |
|--------|--------------|---------------------------|
| POST   | `/api/signup` | Register a new user       |
| POST   | `/api/login`  | Login, returns JWT token  |
| GET    | `/api/me`     | Get logged-in user info   |

### 🔗 URL Routes

| Method | Endpoint                  | Description                                   |
|--------|---------------------------|-----------------------------------------------|
| POST   | `/api/short`              | Create a new short URL (protected)            |
| GET    | `/:shortId`               | Redirect to original URL & log analytics      |
| GET    | `/api/analytics/:shortId` | View analytics for a short URL (protected)    |

---

## 🛠️ Project Structure



```
backend/
│
├── controllers/ # Logic for users and URLs
├── routes/ # Auth and URL-related routes
├── models/ # Mongoose models for User & URL
├── validations/ # Zod-based input schemas
├── middlewares/ # Auth middleware
├── utils/ # Helper functions (geo IP, ID gen)
├── config/ # DB connection
├── types/ # Custom Express types
├── app.ts # Main Express app
└── .env.example # Env variable example
```





## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/satyajit741055/UrlShortener.git
cd UrlShortener
npm install
```

### 🧪 Sample `.env`

Create a `.env` file in the root of the `backend` folder with:

```env
MONGOOSE_URL=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Run the development server
```bash
npm run dev
```


### 🧪 Sample Request – Shorten a URL
```POST /api/short
Authorization: Bearer <token>
Content-Type: application/json

{
  "url": "https://example.com"
}
```
## 📤 Deployment
This backend is deployed using Render.

Example base URL:
https://urlshortener-fc5z.onrender.com

## 🔒 Security
1. **All sensitive routes use JWT verification**
2. **Passwords are hashed with bcrypt before storage**
3. **Zod ensures validation of incoming payloads**


## ✅ Future Improvements (Optional Ideas)
1. **Rate limiting & anti-spam features**

2. **Admin dashboard for monitoring analytics**

3. **Support for custom aliases in URLs**

4. **Password-protected short links**

### 👨‍💻 Author
Made with ❤️ by Satyajit 


