# Book Management Frontend

This project is a web application for managing a collection of books. It's built with Next.js for the frontend and connects to a NestJS backend with MongoDB.

## Features

- User authentication with Keycloak
- CRUD operations for books (Create, Read, Update, Delete)
- Responsive design with Tailwind CSS
- TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- A running instance of the backend API

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/book-management-frontend.git
   cd book-management-frontend
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following content:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
   Replace the URL with your backend API URL if different.

4. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Environment Variables

- `NEXT_PUBLIC_API_URL`: URL of the backend API