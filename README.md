<<<<<<< HEAD
# CodeXAppBuilder
=======
# CodexAI App Builder

## Overview

CodexAI App Builder is an AI-driven platform that allows users to create, manage, and develop projects in real-time. It offers a modern UI/UX, live code preview, and full project management capabilities.

## Features

- **Project Creation**: Start new projects with AI-suggested stacks and generated project structures.
- **Project Import**: Import existing projects and continue development.
- **Real-Time Code Preview**: View code as it's generated in real-time in the sidebar.
- **Interactive Features**: Copy, edit, and regenerate code snippets directly in the chat.
- **Real-Time Updates**: Stay updated with real-time communication between the frontend and backend.
- **Download Updated Projects**: Download your project at any stage as a ZIP file.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd codexai-app-builder
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the environment variables:<br />
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   Ensure that the `.env` file is properly configured. Example:
   ```bash
   SECRET_KEY=my_super_secret_key
   NODE_ENV=development
   NEXT_PUBLIC_PORT=3001
   MONGO_URI=mongodb://localhost:27017/codexai
   JWT_SECRET=my_super_secret_key
   ```
5. Start the server:
   ```bash
   npm start
   ```

## Usage

- Access the application via your browser at `http://localhost:3001`.
- Interact with the AI to create, import, or continue projects.
- View real-time code previews and download the project as needed.

## Dependencies

- **Node.js**
- **Express**
- **Socket.io** for real-time updates
- **Chakra UI** for frontend design
- **MongoDB** (for persistent storage)

## License

This project is licensed under the MIT License.
>>>>>>> f2b93dc (all)
