# Full-Stack Application Setup Guide

## Project Overview
This is a full-stack web application built with React (Vite) for the frontend and a backend server (Node and Express).

## Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Git

## Frontend Setup

### Installation
1. Clone the repository
   ```bash
   git clone <your-repository-url>
   cd frontend-directory
   ```

2. Install dependencies
   ```bash
   npm install

### Environment Configuration
Create a `.env` file in the frontend root directory with the following variable:
```
VITE_BACKEND_URL=(eg:  http://localhost:5000)
```
- `VITE_BACKEND_URL`: The base URL of your backend server
  - For local development, typically `http://localhost:5000`
  - For production, use your deployed backend URL

### Running the Frontend
```bash
npm run dev
```

### For Production 
```bash
npm run build
```

### Backend Setup

### Installation

1. Install dependencies
   ```bash
   npm install
   ```

### Environment Configuration
Create a `.env` file in the backend root directory with the following variables:
```
PORT=3000
DB_URL=mongodb://localhost:27017/your-database-name
ORIGIN=http://localhost:5173
JWT_SECRET=your-very-long-and-secure-random-string
```

#### Environment Variables Explanation:
- `PORT`: The port on which your backend server will run
- `DB_URL`: MongoDB connection string
  - For local development: `mongodb://localhost:27017/your-database-name`
  - For production: Use your MongoDB Atlas or other database connection string
- `ORIGIN`: Frontend application URL
  - For local development: `http://localhost:5173`
  - Must match your frontend's running URL to enable CORS
- `JWT_SECRET`: A long, random string used for JWT token signing
  - Generate a secure random string
  - Keep this secret and never commit it to version control

### Running the Backend
```bash
npm run dev
# or
yarn dev
```

## Development Workflow
1. Start the backend server first
2. Start the frontend development server
3. Both should be running simultaneously during development

## Deployment Considerations
- Ensure all environment variables are properly set in your production environment
- Use environment-specific configurations
- Secure your JWT secret in production
- Configure CORS and other security settings appropriately

## Troubleshooting
- Ensure all dependencies are installed
- Check that environment variables are correctly set
- Verify database connection
- Check that ports are not in use

## Technologies Used
- Frontend: 
  - React
  - Vite
  - Redux
  - React Router
- Backend:
  - Node.js
  - Express
  - MongoDB
  - JWT for authentication

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
