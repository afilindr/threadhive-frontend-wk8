import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../services/authService";
import { handleApiError } from "../utils/handleApiError";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user") || null,
  login: {
    status: "idle",
    error: null,
  },
  registration: {
    status: "idle",
    error: null,
  },
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {  
    try {
      const data = await login(credentials);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(handleApiError(err));
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, thunkAPI) => {
    try {
      return await register(formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(handleApiError(err));
    }
  },
);

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  dispatch(authSlice.actions.logout());
};

export const saveUser = (userData) => (dispatch) => {
  localStorage.setItem("user", JSON.stringify(userData));
  dispatch(authSlice.actions.setUser(userData));
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.login = {
        status: "idle",
        error: null,
      };
      state.registration = {
        status: "idle",
        error: null,
      };
    },
    clearAuthState: (state) => {
      state.login.error = null;
      state.login.status = "idle";
      state.registration.error = null;
      state.registration.status = "idle";
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.login.status = "pending";
        state.login.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        state.user = user;
        state.token = token;
        state.login.status = "fulfilled";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.status = "rejected";
        state.login.error = action.payload;
        console.log("login error: ", action.payload);
      })
      // register
      .addCase(registerUser.pending, (state) => {
        state.registration.status = "pending";
        state.registration.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registration.status = "fulfilled";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registration.status = "rejected";
        state.registration.error = action.payload;
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;

