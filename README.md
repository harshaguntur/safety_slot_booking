# 🛡️ Safety Slot Booking System

A modern web application built with Next.js that helps organizations manage and streamline safety slot bookings efficiently.  
This system ensures that workers, contractors, and users can book time slots in a controlled and organized manner, improving safety compliance and reducing overcrowding.

---

## 🚀 Overview

The Safety Slot Booking System is designed to solve a real-world problem:  
**managing limited access safely and efficiently.**

It provides:
- User authentication
- Slot booking system
- Contractor registration
- Admin dashboard capabilities
- Backend powered by Sanity CMS

This makes it ideal for industries, campuses, or workplaces where safety and scheduling matter.

---

## 🧩 Features

### 🔐 Authentication
- Secure login/signup system using NextAuth
- Password hashing with bcrypt
- Session-based authentication

### 📅 Slot Booking
- Users can book available safety slots
- Prevents overbooking
- Stores booking data in backend

### 👷 Contractor System
- Dedicated contractor signup
- Separate data handling for contract workers

### 📊 Dashboard
- Centralized interface for managing:
  - Users
  - Bookings
  - Contractors

### 🧠 Backend (Sanity CMS)
- Structured content storage
- Real-time data management
- Scalable and flexible schema system

---

## 🛠️ Tech Stack

**Frontend**
- Next.js 15
- React 19
- Tailwind CSS
- Styled Components

**Backend / CMS**
- Sanity.io

**Authentication**
- NextAuth.js
- bcrypt

**Other Tools**
- TypeScript
- ESLint

---

## 📁 Project Structure

```
app/
 ├── api/
 │    ├── auth/                # Authentication routes
 │    ├── bookSlot/            # Slot booking API
 │    ├── user_signup/         # User registration
 │    ├── user_login/          # Login system
 │    ├── contract_emp_signup/ # Contractor signup
 │    └── dashboard/           # Dashboard logic
 │
 ├── context/
 │    └── UserContext.tsx      # Global user state
 │
 ├── layout.tsx               # Root layout
 ├── page.tsx                 # Home page
 └── providers.tsx            # App providers

sanity/
 ├── schemaTypes/
 │    ├── user.ts
 │    ├── slotbooking.ts
 │    ├── bookedslots.ts
 │    └── contract_worker.ts
 │
 └── lib/
      ├── client.ts
      └── write-client.ts
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/safety_slot_booking.git
cd safety_slot_booking
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables

Create a `.env.local` file and add:

```
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=your_dataset
SANITY_API_TOKEN=your_token
```

---

### 4. Run the development server
```bash
npm run dev
```

App will run on:
```
http://localhost:3000
```

---

## 🔄 API Routes

| Route | Description |
|------|-------------|
| `/api/auth` | Authentication (NextAuth) |
| `/api/bookSlot` | Book a slot |
| `/api/user_signup` | Register user |
| `/api/user_login` | Login user |
| `/api/contract_emp_signup` | Contractor registration |
| `/api/dashboard` | Dashboard data |

---

## 📌 Use Cases

- Industrial safety scheduling
- Workplace shift control
- Campus lab booking systems
- Event crowd management

---

## ⚠️ Limitations

- UI is minimal and can be improved
- No advanced admin role management yet
- Needs validation improvements on forms
- Error handling can be more robust

---

## 🔮 Future Improvements

- Role-based access control (Admin/User/Contractor)
- Real-time slot availability updates
- Notifications (Email/SMS)
- Better UI/UX design
- Analytics dashboard

---

## 🤝 Contributing

Contributions are welcome. Feel free to:
- Fork the repo
- Create a new branch
- Submit a pull request

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 💡 Final Note

This project is not just a booking system —  
it’s a **safety-first approach to managing people and time efficiently**.

Every organization needs structured safety systems, and this app is a step toward that.
