import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserModel, RequestLogin, RequestRegister, LoginFormModel, RegisterFormModel } from '@/lib/auth';

interface AuthState {
  user: UserModel | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  registrationSuccess: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
  registrationSuccess: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: LoginFormModel) => {
    const response = await RequestLogin({ email, password });
		if (response.Status !== 'success') {
			throw new Error(response.Message);
		}
    return response;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }: RegisterFormModel) => {
    const response = await RequestRegister({ email, username, password });
		if (response.Status !== 'success') {
			throw new Error(response.Message);
		}
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
    },
    resetRegistrationSuccess: (state) => {
      state.registrationSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload.Data || !action.payload.Data.user || !action.payload.Data.accessToken) {
          state.error = 'Login failed';
          return;
        }

        state.user = action.payload.Data.user;
        state.accessToken = action.payload.Data.accessToken;
        localStorage.setItem('user', JSON.stringify(action.payload.Data.user));
        localStorage.setItem('accessToken', action.payload.Data.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.registrationSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      });
  },
});

export const { logout, resetRegistrationSuccess } = authSlice.actions;

export default authSlice.reducer;
