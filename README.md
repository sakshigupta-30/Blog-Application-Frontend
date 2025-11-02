# MERN Blog Application

A full-stack blog application built with **MERN** (MongoDB, Express, React, Node.js) stack, featuring TypeScript, a WYSIWYG editor, ShadCN UI components, and user authentication.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete blog posts
- **User Authentication**: Register and login functionality with JWT
- **Rich Text Editor**: TipTap WYSIWYG editor for composing blog posts
- **ShadCN UI Components**: Beautiful, accessible UI components
- **TypeScript**: Full type safety throughout the application
- **MongoDB**: Persistent data storage with Mongoose ODM
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite (build tool)
- React Router
- TipTap (WYSIWYG editor)
- ShadCN UI
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (Authentication)
- bcryptjs (Password hashing)
- TypeScript

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas URI)

## Getting Started

### 1. Clone or Extract the Project

```bash
cd "Blog Application"
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd server
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `server` directory by copying the example:

```bash
cp server/.env.example server/.env
# then edit server/.env and fill in real values
```

#### Start the Backend Server

```bash
npm run dev
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies

```bash
cd ../client
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `client` directory by copying the example:

```bash
cp client/.env.example client/.env
# then edit client/.env and set VITE_API_URL
```

#### Start the Frontend Development Server

```bash
npm run dev
```

The app will run on `http://localhost:3000`

## Project Structure

```
Blog Application/
├── server/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── middleware/       # Auth middleware
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API routes
│   │   ├── types/            # TypeScript types
│   │   └── index.ts          # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── client/
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ui/           # ShadCN UI components
│   │   │   ├── Navbar.tsx
│   │   │   └── RichTextEditor.tsx
│   │   ├── pages/            # Page components
│   │   ├── lib/              # Utilities
│   │   ├── types/            # TypeScript types
│   │   ├── App.tsx           # Main app
│   │   └── main.tsx          # Entry point
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── README.md
```

## Authentication Flow

1. **Register**: Create a new account with username, email, and password
2. **Login**: Authenticate and receive a JWT token
3. **Protected Routes**: Only authenticated users can create, edit, or delete posts
4. **Token Storage**: JWT token is stored in localStorage

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Blog Posts

- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:id` - Get a single blog post
- `POST /api/blogs` - Create a new blog post (protected)
- `PUT /api/blogs/:id` - Update a blog post (protected)
- `DELETE /api/blogs/:id` - Delete a blog post (protected)

## UI Components Used

- Button
- Card
- Input
- Label
- Textarea
- Dialog
- Rich Text Editor (TipTap)

## Workflow

1. Users can view all blog posts on the home page
2. Unregistered users can only read posts
3. Registered users can:
   - Create new blog posts with rich text content
   - Edit their own blog posts
   - Delete their own blog posts
   - Add featured images to posts
4. Blog posts display author information and creation date

## Routing

### Frontend Routes

- `/` - Home page (all blog posts)
- `/blog/:id` - View single blog post
- `/create` - Create new blog post (protected)
- `/edit/:id` - Edit blog post (protected)
- `/login` - Login page
- `/register` - Register page

## Build for Production

### Backend

```bash
cd server
npm run build
npm start
```

### Frontend

```bash
cd client
npm run build
npm run preview
```

## Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB is running locally or check your Atlas connection string
- Verify the URI in `.env` file

### CORS Issues

- Check that the backend CORS configuration matches your frontend URL
- Update in `server/src/index.ts` if needed

### Port Already in Use

- Backend: Change PORT in `.env` (default: 5000)
- Frontend: Vite will prompt to use a different port

## Challenge Faced

Issue: On refreshing any protected route (like /blog/:id or /create), the app showed a 404 Not Found error.

## Cause: React Router manages routes on the client-side, but when reloading, the browser directly requests the path from the server. Since the backend doesn’t define those routes, it returns 404.
