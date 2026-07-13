# 🌍 Global Chat Project

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.IO-4.x-010101?style=for-the-badge&logo=socketdotio&logoColor=white" />
  <img src="https://img.shields.io/badge/Real--Time-WebSockets-blueviolet?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Completed-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-success?style=for-the-badge" />
</p>

---

# 📖 Overview

**Global Chat Project** is a real-time messaging web application built using **Node.js**, **Express.js**, and **Socket.IO**.

The application demonstrates how modern web applications enable **instant two-way communication** between multiple connected users using **WebSockets**.

Users can join the chat with a custom username, exchange messages instantly, reply to previous messages, and experience live updates without refreshing the page.

The project focuses on understanding the fundamentals of:

- Client-Server Architecture
- Real-Time Communication
- WebSockets
- Event Driven Programming
- Socket.IO
- Frontend & Backend Integration
- Responsive User Interface Design

---

# 📸 Project Preview

<p align="center">

<img src="images/join-screen.png" width="850">

<br><br>

<img src="images/chat-screen.png" width="850">

<br><br>

<img src="images/reply-feature.png" width="850">

</p>

> **Note:** Replace the above images with actual screenshots from the project.

---

# ✨ Features

- 🌍 Real-time global messaging
- ⚡ Instant message broadcasting using Socket.IO
- 👤 Join chat with a custom username
- 💬 Reply to any previous message
- 📱 Responsive interface
- 🎨 Modern clean UI
- ⌨️ Send messages using Enter key
- 🖱️ Reply button on every message
- 📲 Long press reply support on mobile devices
- 🔄 Live synchronization across connected users
- 🚀 Lightweight Express backend
- 🔌 Persistent Socket.IO connection
- 📦 Simple project architecture
- 📚 Beginner friendly networking project

---

# 🛠 Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure of the application |
| CSS3 | Styling & Responsive Design |
| JavaScript (ES6) | Client-side functionality |
| Node.js | Backend Runtime |
| Express.js | HTTP Server |
| Socket.IO | Real-Time Communication |
| WebSockets | Instant Data Transfer |
| npm | Package Management |

---

# 📂 Project Structure

```text
global-chat-project/
│
├── images/
│   ├── join-screen.png
│   ├── chat-screen.png
│   └── reply-feature.png
│
├── app.js
├── index.html
├── style.css
├── server.js
├── package.json
├── package-lock.json
├── README.md
├── LICENSE
└── .gitignore
```

---

# 📄 File Description

| File | Description |
|------|-------------|
| `index.html` | Main user interface containing the Join Screen, Chat Window, Reply Box, and Input Area. |
| `style.css` | Responsible for the complete user interface including layouts, chat bubbles, responsive design, animations, reply box, join screen, and mobile support. |
| `app.js` | Client-side JavaScript that connects users to the Socket.IO server, sends messages, receives broadcasts, manages replies, and updates the interface dynamically. |
| `server.js` | Express + Socket.IO backend server responsible for handling client connections and broadcasting chat messages to every connected user. |
| `package.json` | Stores project information, scripts, and project dependencies. |
| `package-lock.json` | Automatically generated dependency lock file ensuring consistent package installation across environments. |
| `.gitignore` | Prevents unnecessary files such as `node_modules` from being uploaded to GitHub. |
| `LICENSE` | MIT License for open-source usage. |

---

# 🧩 Project Architecture

```text
                        +----------------------+
                        |     Browser User     |
                        +----------------------+
                                  │
                                  │
                           Socket.IO Client
                                  │
                                  ▼
                    +----------------------------+
                    |        Express Server       |
                    |       (Node.js Runtime)     |
                    +----------------------------+
                                  │
                        Socket.IO Event System
                                  │
               ┌──────────────────┼──────────────────┐
               │                  │                  │
               ▼                  ▼                  ▼
        User A Browser     User B Browser     User C Browser
```

---

# 🔄 Real-Time Communication Flow

```text
User A

   │
   │ Sends Message
   ▼

Socket.IO Client

   │
   ▼

Node.js Server

   │

Receives Event

   │

Broadcasts Event

   ▼

All Connected Users

   │
   ▼

Updated Chat Window
```

---

# ⚙️ How It Works

## 1️⃣ User Joins

When the application starts, users are presented with a **Join Screen**.

They simply enter a username and join the chat.

The username becomes their identity during the current session.

---

## 2️⃣ Socket Connection

Once inside the chat,

the client establishes a **persistent Socket.IO connection** with the Node.js server.

Unlike traditional HTTP requests,

this connection stays alive throughout the session.

---

## 3️⃣ Sending Messages

Whenever the user types a message,

the application emits a Socket.IO event containing:

- Username
- Message
- Reply information (if available)
- Message ID

The server receives this event immediately.

---

## 4️⃣ Broadcasting

The server broadcasts the message to every connected client.

Every browser instantly receives the event.

No refresh is required.

---

## 5️⃣ Rendering Messages

Each connected client:

- Creates a new chat bubble
- Displays sender name
- Displays message
- Displays reply preview (if replying)
- Automatically scrolls to latest message

All users remain synchronized.

---

## 6️⃣ Reply Feature

Users can reply to any message.

Desktop:

- Click Reply button

Mobile:

- Long press the message

The selected message appears above the input box,

allowing contextual conversations.

---

# ⚙️ Client–Server Workflow

```text
User

↓

Types Message

↓

JavaScript (app.js)

↓

Socket.IO Client

↓

Node.js Server

↓

Socket.IO Broadcast

↓

Connected Clients

↓

Chat Interface Updates
```

---

# 📡 Socket.IO Event Flow

```text
Client

socket.emit()

        │

        ▼

Server

socket.on()

        │

        ▼

io.emit()

        │

        ▼

All Connected Clients

socket.on()

        │

        ▼

Render Message
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/just-prem22/global-chat-project.git
```

---

## Navigate to Project

```bash
cd global-chat-project
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Server

```bash
node server.js
```

---

## Open Browser

Visit

```text
http://localhost:3000
```

Open multiple browser tabs to simulate multiple users.

---

# 💬 Reply System

The reply system allows users to reference previous messages.

Instead of sending only plain text,

each reply stores:

- Original Sender
- Original Message

When rendered,

the application displays a small preview above the new message,

creating threaded conversations similar to modern messaging applications.

---

# 📱 Responsive Design

The interface has been designed to work across multiple devices.

Desktop:

- Hover reply button
- Large chat window
- Optimized spacing

Mobile:

- Long press reply
- Larger touch targets
- Optimized message width
- Better scrolling behavior
