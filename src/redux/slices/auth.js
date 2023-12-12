// redux/toolkit
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
//
import authAdapter from '../../adapters/authAdapter';

// Adding import for Cooperative Adapater 
import cooperativeAdapter from '../../adapters/cooperativeAdapter';
import { useDispatch } from 'react-redux';
//import { getOfficialCountries } from './countriesAdmin';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// Extra Reducer
export const fetchUser = createAsyncThunk('auth/login', async ({ email, password }) => {
  try {
    const data = { email, password };
    const response = await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/auth/login`, data);
    document.cookie = `Bearer ${response.data.token}; max-age=${3600}; path=/; samesite=strict`;
    // console.log(response.data);
    // console.log("url",import.meta.env.VITE_YVY_BACKEND_BASE_URL);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const fetchCooperative = createAsyncThunk('auth/loginCooperative', async ({ email, password }) => {
  try {
    const data = { email, password };
    const response = await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/auth/loginCooperative`, data);
    document.cookie = `Bearer ${response.data.token}; max-age=${3600}; path=/; samesite=strict`;
    // console.log(response.data);
    // console.log("url",import.meta.env.VITE_YVY_BACKEND_BASE_URL);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

// Fetch Admin User

export const fetchAdminUser = createAsyncThunk('auth/loginAdminUser', async ({ email, password }) => {
  try {
    const data = { email, password };
    const response = await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/auth/loginAdmin`, data);
    document.cookie = `Bearer ${response.data.token}; max-age=${3600}; path=/; samesite=strict`;
    
    // const dispatch = useDispatch();
    // dispatch(getOfficialCountries());
      // console.log(response.data);
    // console.log("url",import.meta.env.VITE_YVY_BACKEND_BASE_URL);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const registerUser = createAsyncThunk('auth/register', async (formData) => {

  try {
    const response = await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/auth/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    return response;
  } catch (error) {

    return Promise.reject(error);
  }
});

export const registerUserInsideCooperative = createAsyncThunk('auth/registerInsideCooperative', async (formData) => {

  try {
    const response = await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/auth/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    
    return response.data;
  } catch (error) {

    return Promise.reject(error);
  }
});

export const registerCooperative = createAsyncThunk('auth/registerCooperative', async (formData) => {

  try {
    const response = await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/cooperatives`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    return response;
  } catch (error) {

    return Promise.reject(error);
  }
});

export const acceptTermsConditions = createAsyncThunk('auth/acceptTermsConditions', async ({ id }) => {
  try {
    const data = { id };
    const response = await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/users/acceptTermsConditions`, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

// Added for Cooperatives
export const acceptTermsConditionsCooperative = createAsyncThunk('auth/acceptTermsConditionsCooperative', async ({ id }) => {
  try {
    const data = { id };
    const response = await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/cooperatives/acceptTermsConditionsCooperative`, data);

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});


export const recoveryPassword = createAsyncThunk('auth/forgot-password', async ({ email }) => {
  try {
    const data = { email };
    const response = await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/auth/forgot-password`, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const changePassword = createAsyncThunk('auth/change-password', async ({ password, token }) => {
  try {
    const data = { password, token };
    const response = await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/auth/recover-password`, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const UpdateUser = createAsyncThunk('auth/updateUser', async ({ userId, formData }) => {
  try {

    const response = await axios.put(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/users/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;

  } catch (error) {
    return Promise.reject(error);
  }
});

export const UpdateCooperative = createAsyncThunk('auth/updateCooperative', async ({ cooperativeId, formData }) => {
  try {

    const response = await axios.put(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/cooperatives/${cooperativeId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;

  } catch (error) {
    return Promise.reject(error);
  }
});

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async (userId) => {
    try {
      // Call the API endpoint to fetch user data
      const response = await axios.get(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const verifyEmail = createAsyncThunk('auth/verify-email', async ({ token, email, isCoop }) => {
  try {
    const data = { token, email, isCoop };
    const response = await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/auth/verify-email`, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const resendEmailVerification = createAsyncThunk('auth/resend-verification-email', async ({email, isCoop = false}) => {
  try {
    const data = { email, isCoop };
    const response = await axios.post(`${import.meta.env.VITE_YVY_BACKEND_BASE_URL}/auth/resend-verification-email`, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

// Added field for Cooperative Authentication
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  isLoading: false,
  error: false,
  user: null,
  cooperative: null,
  isCooperative: false,
  isAdmin: false,
};

const slice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    // START LOADING
    login(state, action) {
      const user = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        isInitialized: true,
        error: false,
        user,
      };
    },
    updateProfilePicture(state, action) {
      if (state.user) {

        console.log("Update ");
        state.user.profilePicture = action.payload;
      }
    },
    updateProfilePictureCooperative(state, action) {
      if (state.cooperative) {

        console.log("Update ");
        state.cooperative.profilePicture = action.payload;
      }
    },
    setUserNull(state) {
      return {
        ...state,
        isAuthenticated: false,
        isInitialized: true,
        isCooperative: false,
        isAdmin: false,
        user: null,
        cooperative: null,
      };
    },
    setCooperativeNull(state) {
      return {
        ...state,
        isAuthenticated: false,
        isInitialized: true,
        isCooperative: false,
        isAdmin: false,
        cooperative: null,
        user: null,
      };
    },
    startLoading(state) {
      return {
        ...state,
        isLoading: true,
      };
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      // state.isAuthenticated = false;
      // state.user = null;
      console.log(action.payload);
    },
    setUserData(state, action) {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: {
          ...state.user,
          firstName: action.payload.firstName,
          rol: action.payload.rol,
          lastName: action.payload.lastName,
          uid: action.payload.uid,
          email: action.payload.email,
          photoUrl: action.payload.photoUrl ? action.payload.photoUrl : '',
          acceptedTermsConditions: action.payload.acceptedTermsConditions ?? false,
          profilePicture: action.payload.profile_picture ? action.payload.profile_picture : '',
          description: action.payload.description ? action.payload.description : ''
        },
      };
    },
    setCooperativeData(state, action) {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        cooperative: {
          ...state.cooperative,
          name: action.payload.name,
          uid: action.payload.uid,
          email: action.payload.email,
          photoUrl: action.payload.photoUrl ? action.payload.photoUrl : '',
          acceptedTermsConditions: action.payload.acceptedTermsConditions ?? false,
          profilePicture: action.payload.profile_picture ? action.payload.profile_picture : '',
          description: action.payload.description ? action.payload.description : ''
        },
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isInitialized = false;
      state.error = false;
    });
    builder.addCase(fetchUser.fulfilled, (state, actions) => {
      const data = authAdapter(actions.payload);
      state.isLoading = false;
      state.isAuthenticated = true;
      state.isInitialized = true;
      state.user = data;
      state.isCooperative = false;
      state.isAdmin = false;
      state.cooperative = null;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isInitialized = true;
      state.error = action.payload;
      state.user = null;
      state.isCooperative = false;
      state.isAdmin = false;
      state.cooperative = null;
    });
    builder.addCase(registerUser.pending, state => {
      state.isLoading = true;
      state.isAuthenticated = false;
      state.isInitialized = false;
    });
    builder.addCase(registerUser.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isInitialized = false;
      state.user = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isInitialized = true;
      state.error = action.payload;
      state.user = null;
    });
    builder.addCase(acceptTermsConditions.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.isInitialized = true;
      state.user.acceptedTermsConditions = true;
      state.cooperative = null;
      state.isCooperative = false;
      state.isAdmin = false;
    });
    builder.addCase(acceptTermsConditions.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isInitialized = true;
      state.error = action.payload;
      // If it wasn't possible to register user acceptance, it is better to logout the user.
      state.user = null;
    });

    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      const data = authAdapter(action.payload);
      state.isLoading = false;
      state.isAuthenticated = true;
      state.isInitialized = true;
      state.user = data;
    });

    // Adding cases for Cooperatives

    // REGISTER 
    builder.addCase(registerCooperative.pending, state => {
      state.isLoading = true;
      state.isAuthenticated = false;
      state.isInitialized = false;
    });
    builder.addCase(registerCooperative.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isInitialized = false;
      state.user = null;
      state.cooperative = null;
    });
    builder.addCase(registerCooperative.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isInitialized = true;
      state.error = action.payload;
      state.user = null;
      state.cooperative = null;
    });

    // LOGIN 
    builder.addCase(fetchCooperative.pending, state => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isInitialized = false;
      state.error = false;
    });
    builder.addCase(fetchCooperative.fulfilled, (state, actions) => {
      const data = cooperativeAdapter(actions.payload);
      state.isLoading = false;
      state.isAuthenticated = true;
      state.isInitialized = true;
      state.user = null;
      state.cooperative = data;
      state.isCooperative = true;
      state.isAdmin = false;
    });
    builder.addCase(fetchCooperative.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isInitialized = true;
      state.error = action.payload;
      state.user = null;
      state.cooperative = null;
    });
    // TERMS AND CONDITIONS
    builder.addCase(acceptTermsConditionsCooperative.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.isInitialized = true;
      state.isCooperative = true;
      state.isAdmin = false;
      state.cooperative.acceptedTermsConditions = true;
    });
    builder.addCase(acceptTermsConditionsCooperative.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isInitialized = true;
      state.error = action.payload;
      // If it wasn't possible to register cooperative acceptance, it is better to logout the cooperative.
      state.user = null;
      state.cooperative = null;
    });


    // Adding cases for admin user 

    // LOGIN 
    builder.addCase(fetchAdminUser.pending, state => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isInitialized = false;
      state.error = false;
    });
    builder.addCase(fetchAdminUser.fulfilled, (state, actions) => {
      const data = authAdapter(actions.payload);
      state.isLoading = false;
      state.isAuthenticated = true;
      state.isInitialized = true;
      state.user = data;
      state.isCooperative = false;
      state.isAdmin = true;
      state.cooperative = null;
    });
    builder.addCase(fetchAdminUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isInitialized = true;
      state.error = action.payload;
      state.user = null;
      state.isCooperative = false;
      state.isAdmin = false;
      state.cooperative = null;
    });


  },
});
// Actions
// User
export const setUserData = data => dispatch => {
  dispatch(slice.actions.startLoading());
  dispatch(slice.actions.setUserData(data));
};
// Cooperative
export const setCooperativeData = data => dispatch => {
  dispatch(slice.actions.startLoading());
  dispatch(slice.actions.setCooperativeData(data));
};

// Reducer
export default slice.reducer;
export const { login, startLoading, hasError, setUserNull, setCooperativeNull ,updateProfilePicture, updateProfilePictureCooperative } = slice.actions;

// ----------------
