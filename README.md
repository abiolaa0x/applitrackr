# AppliTrackr

AppliTrackr is a modern job application tracking web app built with React and Tailwind CSS.  
It helps users manage applications, track updates, and identify when follow-ups are needed.

---

## ✨ Features

### 📌 Application Management
- Add, edit, and delete job applications
- Track company, role, location, salary, and job type
- Update application status (Applied, Interviewing, Offer, Rejected)

### 🕒 Activity Timeline
- Add updates to applications
- Visual timeline with activity history
- Smart UI interactions (conditional buttons, clean indicators)

### 🔔 Follow-Up Reminders
- Automatically detects applications with no activity for 7+ days
- Helps prevent forgotten opportunities
- Clean, actionable table layout

### 📊 Modern UI
- Built with Tailwind CSS
- Responsive layout
- Custom select dropdown styling
- Reusable components (Modal, StatusBadge, Layout)

### 🚧 Upcoming
- Contacts management system (Coming Soon)
- Enhanced metrics and analytics
- Customizable follow-up thresholds

---

## 🧠 Follow-Up Logic

An application appears in the **Follow-Ups** page if:

- It has **no updates**, OR  
- Its latest update is **7 or more days old**

This helps users quickly identify stagnant applications that may require outreach or action.

---

## 🛠 Tech Stack

- React
- React Router
- Zustand (state management)
- Tailwind CSS
- Local storage persistence

---

## 📂 Project Structure
src/
│
├── components/
│ ├── layouts/
│ ├── applications/
│ └── ui/
│
├── pages/
│ ├── Applications.jsx
│ ├── ApplicationDetails.jsx
│ ├── FollowUps.jsx
│ └── Contacts.jsx
│
├── store/
│ └── useApplicationStore.js
│
└── utils/
└── formatDate.js


---

## 🚀 Getting Started

### 1. Clone the repository
git clone https://github.com/yourusername/applitrackr.git


### 2. Install dependencies
npm install


### 3. Start development server
npm run dev


---

## 🎯 Purpose

AppliTrackr was built as a capstone-style project to demonstrate:

- Clean component architecture
- State management patterns
- UX-focused thinking
- Real-world product logic implementation

---

## 📜 License

This project is open-source and available under the MIT License.

---

Built with intention.