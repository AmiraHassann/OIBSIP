# Login Authentication System

## Oasis Infobyte Internship

**Internship:** Oasis Infobyte – Web Development & Designing Internship  
**Level:** Level 2  
**Task:** Task 4  
**Project:** Login Authentication System

---

## Project Overview

This project is a client-side Login Authentication System built using HTML5, CSS3, and Vanilla JavaScript.

The application allows users to:

- Register a new account
- Log in using registered credentials
- Access a protected dashboard
- Maintain a login session using localStorage
- Log out securely from the current session

For educational purposes, passwords are hashed using the Web Crypto API (SHA-256) before being stored in localStorage.

---

## Features

### Registration

- Username/Email input
- Password input
- Required field validation
- Password validation
  - Minimum 8 characters
  - At least one number
- Duplicate username/email detection
- Success and error messages

### Login

- Username/Email validation
- Password validation
- Generic invalid credentials message
- User authentication using hashed passwords

### Security & Authentication

- SHA-256 password hashing using Web Crypto API
- Passwords are not stored in plain text
- Client-side session management using localStorage
- Protected dashboard access
- Automatic redirect for unauthenticated users
- Logout functionality

### User Experience

- Form validation
- Responsive interface
- Accessible labels and form controls
- aria-live support for feedback messages
- No inline onclick handlers
- Event handling with addEventListener

---

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Browser localStorage
- Web Crypto API (SHA-256)

---

## Project Structure

```text
WebDev-L2-Task4-LoginAuthentication/
│
├── index.html
├── register.html
├── dashboard.html
├── style.css
├── script.js
└── README.md
```

---

## How to Run

### Option 1: Open Directly

1. Download or clone the project.
2. Open the project folder.
3. Open `index.html` in your browser.

### Option 2: VS Code Live Server

1. Open the project folder in Visual Studio Code.
2. Install the Live Server extension.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

---

## How It Works

### Registration Flow

1. User enters a username/email and password.
2. Input fields are validated.
3. Password rules are checked.
4. Existing users are checked to prevent duplicates.
5. Password is hashed using SHA-256.
6. User data is saved in localStorage.

### Password Validation

The registration form requires:

- At least 8 characters
- At least one numeric digit

### Password Hashing

Before a user record is stored:

1. The password is processed using the Web Crypto API.
2. SHA-256 hashing is applied.
3. Only the resulting hash is stored.

Example stored structure:

```json
{
  "id": "unique-id",
  "username": "user@example.com",
  "passwordHash": "hashed-value"
}
```

### Login Flow

1. User enters username/email and password.
2. The entered password is hashed.
3. The generated hash is compared with the stored hash.
4. If authentication succeeds, a session is created.
5. The user is redirected to the dashboard.

### Session Creation

After successful login:

```json
{
  "userId": "unique-id"
}
```

is stored in localStorage using a session key.

### Protected Dashboard

When `dashboard.html` loads:

- The application checks for a valid session.
- Users without a valid session are redirected to `index.html`.
- Authenticated users 

## Internship Requirements Checklist

- [x] Registration page
- [x] Login page
- [x] Protected Dashboard page
- [x] Logout functionality
- [x] Username/Email input
- [x] Password input
- [x] Password validation
- [x] Minimum 8 characters requirement
- [x] At least one number requirement
- [x] Duplicate username/email detection
- [x] Form validation
- [x] Generic invalid credentials message
- [x] SHA-256 password hashing using Web Crypto API
- [x] localStorage user storage
- [x] localStorage session management
- [x] Protected dashboard access
- [x] Redirect unauthenticated users to login
- [x] Responsive interface
- [x] Semantic HTML
- [x] Accessible labels and controls
- [x] aria-live feedback messages
- [x] addEventListener usage
- [x] No inline onclick handlers
- [x] No eval()

---

## Live Demo

🔗 https://amirahassann.github.io/OIBSIP/WebDev-L2-Task4-LoginAuthentication/

## Author

**Amira AbdElhafeez**  
Oasis Infobyte - Web Development & Designing Internship  
Level 2 - Task 4