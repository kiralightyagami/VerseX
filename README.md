# VerseX - 2D Metaverse Platform

> **A vibrant 2D virtual universe where users can connect, collaborate, and create extraordinary experiences.**

VerseX is a comprehensive 2D metaverse application built with modern web technologies, enabling real-time multiplayer interactions, custom virtual spaces, and seamless communication through integrated video calls.

## 🎥 Demo

[![VerseX Demo](https://img.youtube.com/vi/AERnmOy0_Ng/0.jpg)](https://youtu.be/AERnmOy0_Ng)

**[Watch the Demo Video](https://youtu.be/AERnmOy0_Ng)**

## ✨ Features

### 🌐 Virtual Spaces
- **Custom 2D Environments**: Create and customize your own virtual spaces with interactive elements
- **Real-time Multiplayer**: Connect with users in shared virtual environments
- **Interactive Elements**: Place and interact with various objects and decorations
- **Space Management**: Full CRUD operations for managing your virtual spaces

### 👥 Social Features  
- **Real-time Communication**: WebSocket-powered instant messaging and interactions
- **Video Calling**: Integrated WebRTC for voice and video communication within spaces
- **Custom Avatars**: Personalize your virtual identity with custom avatar systems
- **User Management**: Secure authentication and user role management

### 🎮 Gaming Experience
- **Phaser.js Integration**: Smooth 2D game rendering and physics
- **Cross-platform**: Works seamlessly across desktop and mobile browsers
- **Responsive Design**: Optimized UI for all screen sizes

## 🏗️ Architecture

This project is built as a **Turborepo monorepo** with the following structure:

### 📱 Applications (`/apps`)

- **`frontend/`** - React + Vite client application
  - 🔧 **Tech Stack**: React 19, TypeScript, Tailwind CSS, Phaser.js
  - 🎨 **Features**: Game canvas, user management, space creation
  
- **`ws/`** - WebSocket server for real-time communication
  - 🔧 **Tech Stack**: Node.js, WebSocket, JWT authentication
  - 🚀 **Purpose**: Real-time multiplayer interactions and messaging

- **`http/`** - REST API server
  - 🔧 **Tech Stack**: Node.js, Express/Fastify
  - 🛠️ **Purpose**: User authentication, space management, data operations

- **`webrtc/`** - WebRTC signaling server
  - 🔧 **Tech Stack**: Node.js, MediaSoup
  - 📹 **Purpose**: Video/voice communication infrastructure

### 📦 Packages (`/packages`)

- **`@repo/db`** - Database layer with Prisma ORM
- **`@repo/ui`** - Shared UI components library
- **`@repo/eslint-config`** - Shared ESLint configuration
- **`@repo/typescript-config`** - Shared TypeScript configuration

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **pnpm** 9.0.0+
- **PostgreSQL** database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd VerseX
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env files for each app
   cp apps/frontend/.env.example apps/frontend/.env
   cp apps/ws/.env.example apps/ws/.env
   cp apps/http/.env.example apps/http/.env
   cp apps/webrtc/.env.example apps/webrtc/.env
   ```

4. **Set up the database**
   ```bash
   cd packages/db
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start development servers**
   ```bash
   # Start all services
   pnpm dev
   
   # Or start individual services
   pnpm dev --filter=frontend
   pnpm dev --filter=ws
   pnpm dev --filter=http
   pnpm dev --filter=webrtc
   ```

## 📋 Available Scripts

### Root Level Commands

```bash
# Development
pnpm dev              # Start all apps in development mode
pnpm build            # Build all apps and packages
pnpm lint             # Lint all projects
pnpm format           # Format code with Prettier
pnpm check-types      # Type-check all TypeScript projects
```

### Individual App Commands

```bash
# Frontend
cd apps/frontend
pnpm dev              # Start Vite dev server
pnpm build            # Build for production
pnpm start            # Preview production build

# Backend Services
cd apps/ws            # WebSocket server
cd apps/http          # HTTP API server  
cd apps/webrtc        # WebRTC signaling server
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
```

## 🗄️ Database Schema

The application uses **PostgreSQL** with **Prisma ORM**. Key entities include:

- **Users**: Authentication and profile management
- **Spaces**: Virtual environments with customizable dimensions
- **Elements**: Interactive objects that can be placed in spaces
- **Avatars**: User representation in the virtual world
- **Maps**: Predefined space templates

## 🔧 Development

### Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Phaser.js
- **Backend**: Node.js, WebSocket, WebRTC, JWT
- **Database**: PostgreSQL, Prisma ORM
- **Build Tool**: Turborepo for monorepo management
- **Package Manager**: pnpm

### Code Quality

- **TypeScript** for type safety across all projects
- **ESLint** for code linting with shared configurations
- **Prettier** for consistent code formatting
- **Turbo** for optimized build caching and task running

## 🌟 Key Features in Detail

### Real-time Multiplayer
- WebSocket connections for instant communication
- Synchronized player movements and interactions
- Real-time space updates and element placement

### Video Communication  
- WebRTC integration for peer-to-peer communication
- In-space voice and video calls
- Screen sharing capabilities

### Customizable Spaces
- Drag-and-drop space editor
- Custom space dimensions and layouts
- Interactive element placement system
- Space templates and themes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Useful Links

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Phaser.js Documentation](https://phaser.io/learn)
- [Prisma Documentation](https://www.prisma.io/docs)
- [WebRTC Documentation](https://webrtc.org/getting-started/)

---

**Built with ❤️ by Asvin Shirvas for the future of virtual collaboration**
