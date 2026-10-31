# ThreadHive Frontend

## Architecture

- This is a Vite-powered React SPA. `src/main.jsx` mounts `App` inside React Strict Mode and the Redux provider. `src/App.jsx` defines the React Router routes and shared page layout; `PrivateRoute` protects the home, profile, and thread pages using the auth token in Redux.
- Screens live in `src/pages/` and reusable UI in `src/components/`. Global state is managed by Redux Toolkit: slices live in `src/reducers/` and the registered reducers are combined in `src/store/store.js`.
- Async thunks in slices call API functions in `src/services/`. Services use the shared Axios instance in `src/api/axiosInstance.js`, endpoint paths are centralized in `src/config/apiConfig.js`, and responses use the backend's `data.data` envelope. Protected service requests read the token from local storage.
- Authentication and theme state are initialized from local storage. The theme slice persists the preference, and `App` applies dark mode through the document's `data-theme` attribute; styles use the app's CSS variables alongside Bootstrap/React Bootstrap.

## Build, lint, and test

- `npm install` — install dependencies.
- `npm run dev` — start the Vite development server.
- `npm run build` — create the production build in `dist/`.
- `npm run preview` — preview the production build.
- `npm run lint` — lint the project with ESLint.
- `npx eslint src/pages/User/Home.jsx` — lint one file; replace the path to target another file.
- No test runner, test script, or test files are currently configured, so there is no single-test command.

## Conventions

- Keep endpoint paths in `src/config/apiConfig.js` and HTTP calls in service modules rather than issuing requests from components.
- Follow the Redux Toolkit flow used by the feature slices: define async work with `createAsyncThunk`, call the corresponding service, and use `handleApiError` with `rejectWithValue` for API failures. Keep request status and feature data in the slice and have components access it through React Redux hooks.
- When adding a reducer, register it in `src/store/store.js` so components can access its state.
- Keep feature styles with their page or component CSS files; use the existing CSS variables and `data-theme` behavior for theme-aware styling.

#### State Management (Redux Toolkit)
1. All global state is managed with Redux Toolkit. The store is configured
in `src/store/store.js`.
2. Each feature has its own slice in `src/reducers/` (e.g., `authSlice.js`,
`threadListSlice.js`).
3. Use `useSelector` to read state and `useDispatch` to dispatch actions.
Never import the store directly in components.
4. For API calls, use `createAsyncThunk`. Each thunk calls a function from
`src/services/`.
5. Handle loading, success, and error states in `extraReducers` using the
builder pattern:
- `.addCase(thunk.pending, ...)` → set loading true, clear error
- `.addCase(thunk.fulfilled, ...)` → update state with payload, set
loading false
- `.addCase(thunk.rejected, ...)` → set loading false, store error from
payload
6. Never access `localStorage` directly in components — always use Redux
actions (`loginUser`, `logout`, `setUser`).
7. Use `handleApiError` from `src/utils/handleApiError.js` in thunk catch
blocks for consistent error handling.
