# Async ToDo List (React + Node.js)

A full-stack To-Do application featuring a simulated asynchronous background worker for task deletion, built with **React**, **TypeScript**, and **Express**.

## 🚀 Features

- **Asynchronous Deletion:** Implements a BullMQ-style background worker simulation using an array-based queue and a `setInterval` worker.
- **Type Safety:** Strict end-to-end TypeScript implementation for both Frontend and Backend.
- **Data Validation:** Backend request validation powered by **Zod** to ensure payload integrity.
- **Responsive UI:** Styled with **Tailwind CSS** components for a clean, mobile-first experience.
- **Error Handling:** Basic error boundaries and catch blocks for fetch requests.

---

## 🛠️ Technical Decisions

### Backend (Express + TypeScript)
- **Queue Simulation:** To mimic high-scale job processing (like BullMQ), the `DELETE` route does not immediately remove data. Instead, it pushes the ID to a `deletionQueue`. A separate interval worker processes these jobs every 1000ms (for the sake of demonstration, should be lower).
- **Zod Validation:** Used to validate the structure of incoming `POST` and `PATCH` requests, ensuring that optional fields like `completed` are handled safely.
- **State Management:** Data is stored in a simple in-memory array to demonstrate the queue's interaction with the data source without the overhead of a database setup.

### Frontend (React + Tailwind)
- **Atomic Components:** UI is broken into reusable components (`Button`, `Input`, `TaskItem`) to keep the main `TodoList` logic clean.
- **Optimistic State Updates:** For a snappy user experience, the UI filters out deleted tasks immediately, while the server processes the deletion asynchronously in the background.
