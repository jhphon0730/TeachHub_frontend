import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
	UserModel, 
	RequestLogin, RequestRegister, RequestUpdate,
	LoginFormModel, RegisterFormModel, UpdateFormModel
} from '@/lib/api/auth';

interface AuthState {
  user: UserModel | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  registrationSuccess: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  registrationSuccess: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: LoginFormModel) => {
    const response = await RequestLogin({ username, password });
		if (response.status !== 'success') {
			throw new Error(response.message);
		}
    return response;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }: RegisterFormModel) => {
    const response = await RequestRegister({ email, username, password });
		if (response.status !== 'success') {
			throw new Error(response.message);
		}
    return response;
  }
);

export const update = createAsyncThunk(
	'auth/update',
	async ({ username, email, bio, skills, password }: UpdateFormModel) => {
		const response = await RequestUpdate({ email, username, bio, skills, password });
		console.log(response)
		if (response.status !== 'success') {
			throw new Error(response.message);
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
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
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
        if (!action.payload.data || !action.payload.data.user || !action.payload.data.token) {
          state.error = 'Login failed';
          return;
        }
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        localStorage.setItem('user', JSON.stringify(action.payload.data.user));
        localStorage.setItem('token', action.payload.data.token);
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
      })
			.addCase(update.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(update.fulfilled, (state, action) => {
				state.loading = false;
				state.user = null;
				state.token = null;
				localStorage.removeItem('user');
				localStorage.removeItem('token');
			})
			.addCase(update.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Update failed';
			});
  },
});

export const { logout, resetRegistrationSuccess } = authSlice.actions;

export default authSlice.reducer;
