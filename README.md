# OCR Web Application

A modern web application for Optical Character Recognition (OCR) built with React, TypeScript, and Vite.

## Features

- PDF and image file processing
- OCR text extraction
- Modern Material UI interface
- Responsive design
- Type-safe development with TypeScript
- State management with Zustand
- Form handling with React Hook Form
- API integration with React Query

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## Getting Started

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd ocr-app-new
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration.

4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types

## Project Structure

```
src/
├── components/     # Reusable components
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── services/      # API services
├── store/         # State management
├── types/         # TypeScript types
├── utils/         # Utility functions
└── App.tsx        # Root component
```

## Development Guidelines

1. **Code Style**
   - Use TypeScript for all new files
   - Follow ESLint and Prettier configurations
   - Write meaningful commit messages

2. **Testing**
   - Write tests for new features
   - Maintain test coverage above 80%
   - Use React Testing Library for component tests

3. **State Management**
   - Use Zustand for global state
   - Use React Query for server state
   - Keep components as pure as possible

4. **Performance**
   - Implement proper code splitting
   - Optimize images and assets
   - Monitor bundle size

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

MIT License - see LICENSE file for details 