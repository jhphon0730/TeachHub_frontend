import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	InitialStudentDashboardModel, GetInitialStudentDashboard,
	InitialInstructorDashboardModel, GetInitialInstructorDashboard
} from '@/lib/api/dashboard';


interface DashboardState {
	/** Initial */
	initial_student: InitialStudentDashboardModel | null;
	initial_instructor: InitialInstructorDashboardModel | null;
	lasted_updated: string;

  loading: boolean;
  error: string | null;
}

export const initialState: DashboardState = {
	initial_student: null,
	initial_instructor: null,
	lasted_updated: '',

	loading: false,
	error: null,
};

export const getInitialStudentDashboard = createAsyncThunk(
	'dashboard/getInitialStudentDashboard',
	async () => {
		const response = await GetInitialStudentDashboard();
		if (response.status !== 'success') {
			throw new Error(response.message);
		}
		return response;
	}
);

export const getInitialInstructorDashboard = createAsyncThunk(
	'dashboard/getInitialInstructorDashboard',
	async () => {
		const response = await GetInitialInstructorDashboard();
		if (response.status !== 'success') {
			throw new Error(response.message);
		}
		return response;
	}
);

const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
		setLastedUpdated: (state, action) => {
			state.lasted_updated = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(getInitialStudentDashboard.pending, (state, action) => {
			state.loading = true;
			state.error = null;
		})
		.addCase(getInitialStudentDashboard.fulfilled, (state, action) => {
			state.loading = false;
			state.initial_student = action.payload.data;
			state.initial_instructor = null;
			state.lasted_updated = new Date().toISOString();
		})
		.addCase(getInitialStudentDashboard.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || 'Get initial student dashboard failed';
		})
		.addCase(getInitialInstructorDashboard.pending, (state, action) => {
			state.loading = true;
			state.error = null;
		})
		.addCase(getInitialInstructorDashboard.fulfilled, (state, action) => {
			state.loading = false;
			state.initial_instructor = action.payload.data;
			state.initial_student = null;
			state.lasted_updated = new Date().toISOString();
		})
		.addCase(getInitialInstructorDashboard.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message || 'Get initial instructor dashboard failed';
		})
	}
});

export const { setLastedUpdated } = dashboardSlice.actions;

export default dashboardSlice.reducer;
