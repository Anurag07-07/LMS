Perfect 👍 here’s the updated and complete **`README.md`** including a clear guide on **setting up email sending (NodeMailer + Gmail)** for your user registration and activation flow.
You can directly copy-paste this into your project root — it’s written in professional documentation style.

---

# 🧠 User Authentication API (Node.js + TypeScript + Express + MongoDB)

A backend API built using **Node.js**, **Express**, and **TypeScript**, featuring secure user registration, email verification via activation code, and structured error handling.

---

## 🚀 Features

* ✅ User Registration (with email verification)
* 🔐 JWT-based account activation tokens
* 📧 EJS templating for custom email messages
* 🧩 Modular MVC architecture (Controllers, Routes, Middleware)
* 🛡️ Global error handling middleware
* 🧱 MongoDB + Mongoose for database
* 🌍 CORS enabled
* 🍪 Cookie parser for secure cookie handling
* ⚙️ Environment variables using `dotenv`
* 💌 Gmail/SMTP integration using **NodeMailer**

---

## 🗂️ Folder Structure

```
📦 project-root
├── 📁 controllers
│   └── user.controller.ts          # Handles user registration and activation logic
├── 📁 models
│   └── userSchema.ts               # Mongoose user model with pre-save hooks
├── 📁 routes
│   └── user.route.ts               # Defines all user routes
├── 📁 middlewares
│   ├── catchAsyncError.ts          # Handles async errors
│   └── error.ts                    # Global error handler
├── 📁 utils
│   ├── ErrorHandler.ts             # Custom error class
│   ├── sendMail.ts                 # Email sending utility (NodeMailer)
│   └── ...                         # Other helper utilities
├── 📁 mails
│   └── activation-mail.ejs         # EJS template for activation email
├── 📁 db
│   └── dbConnect.ts                # MongoDB connection
├── app.ts                          # Main Express app setup
├── .env                            # Environment variables
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in your project root:

```env
PORT=5000
ORIGIN=http://localhost:3000
DATABASE_URL=mongodb://127.0.0.1:27017/YourDatabaseName
ACTIVATION_SECRET=your_jwt_secret_key

# Email (NodeMailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

> ⚠️ **Important:**
>
> * Do **not** use your regular Gmail password.
> * You must create a **Gmail App Password** (explained below).

---

## 💌 Setting Up Gmail / NodeMailer

### Step 1 — Enable 2-Step Verification

1. Go to [Google Account Settings → Security](https://myaccount.google.com/security)
2. Turn on **2-Step Verification**

### Step 2 — Create an App Password

1. Under “Signing in to Google”, select **App passwords**
2. Choose **Mail** as the app and **Other (Custom name)** → name it `NodeMailer`
3. Copy the **16-character password** shown — this is your **SMTP_PASS**

### Step 3 — Update `.env`

```env
SMTP_USER=youremail@gmail.com
SMTP_PASS=your_16_char_app_password
```

---

## 🧰 Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/yourproject.git
cd yourproject
```

### 2. Install dependencies

```bash
npm install
```

### 3. Build TypeScript

```bash
npm run build
```

### 4. Run in development mode

```bash
npm run dev
```

### 5. Start in production mode

```bash
npm start
```

---

## 🧩 API Endpoints

### **Base URL:**

```
http://localhost:5000/api/v1
```

---

### **POST /registration**

Registers a new user and sends an activation email.

#### Request Body:

```json
{
  "name": "Anurag Raj",
  "email": "anurag@example.com",
  "password": "yourpassword"
}
```

#### Example Response:

```json
{
  "success": true,
  "message": "Please check your email: anurag@example.com to activate your account",
  "activationToken": "eyJhbGciOiJIUzI1NiIsInR5..."
}
```

---

### **GET /test**

Test the API connection.

#### Response:

```json
{
  "success": true,
  "message": "Api is Working"
}
```

---

## 📧 Email Activation Flow

1. A user registers via `/registration`.
2. The server creates:

   * A **4-digit activation code**
   * A **JWT token** (expires in 5 minutes)
3. Sends an **activation email** with the code using the EJS template (`activation-mail.ejs`).
4. The user activates their account using that code (handled in a separate activation route).

---

## 🧱 Technologies Used

| Category         | Technology                      |
| ---------------- | ------------------------------- |
| Language         | TypeScript                      |
| Server Framework | Express.js                      |
| Database         | MongoDB + Mongoose              |
| Authentication   | JSON Web Token (JWT)            |
| Email            | NodeMailer + Gmail App Password |
| Templating       | EJS                             |
| Config           | Dotenv                          |
| Error Handling   | Custom Middleware               |

---

## 🔐 Security Best Practices

* Always store secrets and database URIs in `.env`
* Use **bcrypt** to hash passwords before saving
* Use **short-lived JWTs** for activation tokens
* Never expose activation codes or tokens in URLs publicly
* Use HTTPS in production

---

## 🧩 Example Activation Token Function

```ts
export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign({ user, activationCode }, process.env.ACTIVATION_SECRET as Secret, {
    expiresIn: "5m",
  });
  return { activationCode, token };
};
```

---

## 🧠 Common Issues

| Issue                                 | Cause                                      | Fix                                         |
| ------------------------------------- | ------------------------------------------ | ------------------------------------------- |
| `this.isModified` shows red underline | TypeScript doesn’t know Mongoose’s methods | Use `this: HydratedDocument<IUser>` in hook |
| Emails not sending                    | Gmail security blocks it                   | Enable 2FA + use App Password               |
| CORS error                            | Frontend origin not whitelisted            | Set `origin` in CORS config properly        |

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---