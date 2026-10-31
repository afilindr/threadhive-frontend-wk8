# ThreadHive Frontend

A modern, responsive React single-page application for collaborative discussion threads built with Vite, Redux Toolkit, and React Bootstrap.

## Overview

ThreadHive is a frontend application that enables users to create, browse, and participate in discussion threads. The application features user authentication, dynamic theme switching, and a responsive design that works seamlessly across desktop and mobile devices.

## Features

- **User Authentication**: Secure login and registration with token-based authentication
- **Discussion Threads**: Create, view, and interact with discussion threads
- **User Profiles**: Personalized user profiles with profile management
- **Dark Mode**: Theme switching with persistent user preference
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Redux State Management**: Centralized global state for predictable data flow
- **Accessibility**: WCAG compliance audit included (see ACCESSIBILITY_AUDIT.md)

## Tech Stack

### Core Dependencies
- **React** ^19.0.0 - UI library
- **React Router** ^7.6.3 - Client-side routing
- **Redux Toolkit** ^2.8.2 - State management
- **React Redux** ^9.2.0 - React bindings for Redux
- **React Bootstrap** ^2.10.10 - Bootstrap component library
- **Bootstrap** ^5.3.7 - CSS framework
- **Bootstrap Icons** ^1.13.1 - Icon library
- **Axios** ^1.10.0 - HTTP client

### Development Tools
- **Vite** ^6.3.1 - Build tool and dev server
- **Vitest** ^5.0.5 - Unit testing framework
- **ESLint** ^9.22.0 - Code linting
- **React Testing Library** ^16.3.3 - Testing utilities
- **Mock Service Worker** ^3.0.3 - API mocking

## Project Structure

```
src/
├── api/                    # Axios instance and HTTP configuration
├── assets/                 # Static assets (images, fonts, etc.)
├── components/             # Reusable UI components
│   ├── Header/
│   ├── Footer/
│   ├── Sidebar/
│   └── PrivateRoute/
├── config/                 # Configuration files (API endpoints)
├── pages/                  # Page components organized by feature
│   ├── Auth/               # Login and Register pages
│   └── User/               # Home, ThreadPage, Profile pages
├── reducers/               # Redux slices for state management
├── services/               # API service functions
├── store/                  # Redux store configuration
├── test/                   # Test setup and utilities
├── utils/                  # Utility functions
├── App.jsx                 # Main app component with routing
├── main.jsx                # Application entry point
├── index.css               # Global styles
└── App.css                 # App layout styles
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/afilindr/threadhive-frontend-wk8.git
cd threadhive-frontend-wk8
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (Vite's default port).

## Available Scripts

### Development
- `npm run dev` - Start the Vite development server with hot module replacement
- `npm run preview` - Preview the production build locally

### Building
- `npm run build` - Create an optimized production build in the `dist/` directory

### Code Quality
- `npm run lint` - Run ESLint to check code quality
- `npx eslint src/pages/User/Home.jsx` - Lint a specific file (replace path as needed)

### Testing
- `npm test` - Run the test suite (Vitest)
- `npm run test:watch` - Run tests in watch mode with automatic re-runs

## State Management

ThreadHive uses Redux Toolkit for centralized state management. All global state is organized into feature slices:

### Redux Architecture
- **Store**: Configured in `src/store/store.js`
- **Slices**: Each feature has its own slice in `src/reducers/` (e.g., `authSlice.js`, `threadListSlice.js`)
- **Thunks**: Async operations use `createAsyncThunk` for API calls
- **Hooks**: Components use `useSelector` to read state and `useDispatch` to dispatch actions

### Key Principles
1. All global state is managed through Redux—avoid using `localStorage` directly in components
2. API errors are handled consistently using `handleApiError` utility
3. Loading, success, and error states are managed in slice `extraReducers`
4. Services are called from async thunks, not directly from components

## API Integration

The application communicates with a backend API through service modules:

- **API Instance**: `src/api/axiosInstance.js` - Shared Axios configuration
- **Endpoints**: Centralized in `src/config/apiConfig.js`
- **Services**: API functions organized by feature in `src/services/`

All API responses follow the backend's `data.data` envelope pattern. Protected requests automatically include the authentication token from local storage.

## Styling

The application uses a combination of CSS and Bootstrap for styling:

- **CSS Variables**: Theme-aware colors and values
- **Dark Mode**: Toggle via `data-theme` attribute on the document element
- **Bootstrap Utilities**: Bootstrap 5 utility classes for responsive layouts
- **Component Styles**: Feature-specific CSS files co-located with components and pages

## Authentication

- User authentication is managed by Redux with token-based approach
- Tokens are stored in local storage and automatically included in protected API requests
- Protected routes use the `PrivateRoute` component to restrict access to authenticated users
- Login and registration pages are available at `/login` and `/register`

## Routing

Routes are defined in `src/App.jsx` with React Router:

- `/login` - User login page
- `/register` - User registration page
- `/home` - Dashboard (protected)
- `/thread/:threadId` - Individual thread view (protected)
- `/profile` - User profile page (protected)

All routes except login and register require authentication.

## Contributing

1. Follow the existing code structure and conventions
2. Keep endpoint paths in `src/config/apiConfig.js`
3. Place HTTP calls in service modules, not components
4. Use Redux Toolkit patterns for state management
5. Maintain responsive design with Bootstrap's grid system
6. Run `npm run lint` before committing

## Accessibility

This project includes an accessibility audit covering WCAG standards. See [ACCESSIBILITY_AUDIT.md](./ACCESSIBILITY_AUDIT.md) for detailed findings and recommendations.

## License

This project is part of the McCombs Certificate Program and is intended for educational purposes.

## Support

For issues or questions, please refer to the project's GitHub repository.
