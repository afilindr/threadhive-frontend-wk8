import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import authReducer from '../reducers/authSlice.js'
import commentReducer from '../reducers/commentSlice.js'
import currentThreadReducer from '../reducers/currentThreadSlice.js'
import subredditReducer from '../reducers/subredditSlice.js'
import themeReducer from '../reducers/themeSlice.js'
import threadReducer from '../reducers/threadListSlice.js'
import App from '../App.jsx'

export const createTestStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      threads: threadReducer,
      currentThread: currentThreadReducer,
      comments: commentReducer,
      theme: themeReducer,
      subreddits: subredditReducer,
    },
    preloadedState: {
      auth: {
        token: 'test-token',
        user: { _id: 'user-1', name: 'Ada Lovelace' },
        login: { status: 'idle', error: null },
        registration: { status: 'idle', error: null },
      },
    },
  })

export const renderApp = (path = '/home') => {
  window.history.pushState({}, '', path)
  localStorage.setItem('token', 'test-token')
  localStorage.setItem('user', JSON.stringify({ _id: 'user-1', name: 'Ada Lovelace' }))

  const store = createTestStore()
  const result = render(
    <Provider store={store}>
      <App />
    </Provider>,
  )

  return { ...result, store }
}
