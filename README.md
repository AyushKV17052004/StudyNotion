# 🎓 StudyNotion — Premium Ed-Tech Platform

StudyNotion is a fully functional, modern, and highly interactive ed-tech platform. It allows instructors to create, manage, and sell courses, while students can enroll, consume video lectures, track their progress, write reviews, and manage their profiles.

To enhance the visual journey, we've integrated custom **Marvel-themed cinematic elements** alongside smooth animations and micro-interactions.

---

## ⚡ Key Premium Features

*   **🎬 Spider-Man Session Loader**: A cinematic introductory animation that triggers once per browser session.
*   **🕷️ Avengers Dynamic Banner**: Home-page slider featuring inspiring rotating quotes from Iron Man, Spider-Man, Captain America, Thor, and Black Panther.
*   **🔴 Iron Man Accent Bar**: A glowing red-and-gold animated shimmer bar sitting atop the navigation header.
*   **🎓 Infinite Reviews Carousel**: A double-row, continuous-loop reviews display featuring real student reviews combined with simulated ones.
*   **⚙️ Smart Profile & Course Management**: Clean, beautiful forms for updating profile pictures, credentials, and uploading/managing course structures (sections and sub-sections).
*   **🛡️ Robust JWT Authentication**: Integrated middleware checks for role-based path protection (Student vs. Instructor).
*   **💸 Secure Payment Flow**: Complete course purchasing integration with Razorpay.

---

## 🛠️ Technology Stack

*   **Frontend**: React (V19), Vite, TailwindCSS (v4), Redux Toolkit, Framer Motion, React Icons.
*   **Backend**: Node.js, Express.js, MongoDB (Mongoose ODM).
*   **Utilities**: Nodemailer (OTP verification), Cloudinary (media upload), Razorpay (payments).

---

## 🚀 Deployment Guide

### 1. Backend Deployment (Render)

We have configured `render.yaml` at the root of the project to enable **Infrastructure as Code (IaC)** deployment.

#### Manual setup on Render:
1.  Sign in to **Render** and click **New +** -> **Web Service**.
2.  Connect your Git repository.
3.  Set the following configuration:
    *   **Name**: `studynotion-backend`
    *   **Runtime**: `Node`
    *   **Root Directory**: `Server`
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
4.  Add the **Environment Variables** listed below in the Render dashboard.

### 2. Frontend Deployment (Vercel)

The frontend is built at the root of the repository. We've added `vercel.json` to handle client-side routing.

#### Setup on Vercel:
1.  Sign in to **Vercel** and click **Add New** -> **Project**.
2.  Import your Git repository.
3.  Vercel will auto-detect the Vite project. Keep the default settings:
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
4.  Add the **Environment Variables** in the Vercel dashboard.

---

## 🔑 Environment Variables Checklist

Ensure these variables are set in your deployment dashboards (do NOT commit these to Git):

### 🔴 Backend Environment Variables (Render)

| Variable | Description / Value |
| :--- | :--- |
| `PORT` | `4000` (Render will automatically assign a dynamic port if not defined) |
| `DB_URL` | Your MongoDB Atlas connection string (e.g. `mongodb+srv://...`) |
| `JWT_SECRET` | A secure random secret key |
| `CLIENT_URL` | Your deployed Vercel frontend URL (e.g., `https://your-app.vercel.app`) |
| `FOLDER_NAME` | Cloudinary folder name (e.g., `STUDYNOTION-Backend`) |
| `MAIL_HOST` | SMTP server host (e.g., `smtp.gmail.com`) |
| `MAIL_USER` | Your SMTP sender email account |
| `MAIL_PASS` | Your SMTP app password (16 characters, no spaces) |
| `RAZORPAY_KEY` | Your Razorpay API Key ID |
| `RAZORPAY_SECRET` | Your Razorpay API Secret |
| `API_KEY` | Your Cloudinary API Key |
| `API_SECRET` | Your Cloudinary API Secret |
| `CLOUD_NAME` | Your Cloudinary Cloud name |

### 🔵 Frontend Environment Variables (Vercel)

| Variable | Description / Value |
| :--- | :--- |
| `VITE_API_BASE_URL` | Your deployed Render backend API URL (e.g., `https://your-api.onrender.com/api/v1`) |

---

## 📦 Local Installation & Running

1.  Clone the repository:
    ```bash
    git clone <your-repo-url>
    cd StudyNotion
    ```
2.  Install dependencies:
    ```bash
    # Install frontend dependencies
    npm install
    
    # Install backend dependencies
    cd Server && npm install
    cd ..
    ```
3.  Run both servers concurrently in development mode:
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:5173` in your browser.
