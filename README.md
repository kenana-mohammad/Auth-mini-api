# 🔐 Auth Mini API

A minimal Express + MongoDB REST API for practicing Authentication 

---

## 📦 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- argon2 (password hashing)
- jsonwebtoken (JWT)
- cookie-parser (httpOnly cookies)
- express-rate-limit (rate limiting)
- express-validator (input validation)
- xss-clean (XSS protection)

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGOOSE_URL=mongodb://localhost:27017/===
JWT_SECRET=
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Create .env file (see above)

# 3. Seed admin user
node ./src/Scripts/createAdmin.js

# 4. Start the server
npm run dev
```

---

## 👤 Create Admin User

Run the seed script to create an admin account:

```bash
node ./src/Scripts/createAdmin.js
```

Default admin credentials:
```
email:    
password: 
```

---

## 📡 API Endpoints

### Auth Routes — `/api/v1/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register new user | ❌ |
| POST | `/login` | Login + set cookie | ❌ |
| POST | `/logout` | Clear auth cookie | ✅ |
| GET | `/profile` | Get current user | ✅ |

### Protected Routes

| Method | Endpoint | Description | user | admin |
|--------|----------|-------------|------|-------|
| GET | `/api/v1/me/welcome` | Welcome message | ✅ 200 | ✅ 200 |
| GET | `/api/v1/me/account-summary` | Account info | ✅ 200 | ✅ 200 |
| GET | `/api/v1/admin/overview` | Fake dashboard stats | ❌ 403 | ✅ 200 |
| GET | `/api/v1/admin/users` | List all users | ❌ 403 | ✅ 200 |
| DELETE | `/api/v1/admin/users/:id` | Delete a user | ❌ 403 | ✅ 200 |

---

## 🧪 Testing in Postman


## 🔒 Rate Limiting

| Route | Limit | Window |
|-------|-------|--------|
| POST `/login` | 3 requests | 1 hour |
| POST `/signup` | 10 requests | 15 minutes |
| All routes | 10,000 requests | 15 minutes |



[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/30469576/2sBXwsKVPP)