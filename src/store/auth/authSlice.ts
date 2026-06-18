import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { AuthState, User } from './auth.types'

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state)=> {
        state.loading = true
        state.error= null
    },
    loginSuccess: (
          state,
          action: PayloadAction<{ user: User; token: string }>
        ) => {
          state.user = action.payload.user
          state.token = action.payload.token
          state.isLoggedIn = true
          state.loading = false   
          state.error = null     
        },

    loginError: (state, action: PayloadAction<string>)=> {
        state.error= action.payload
        state.loading = false
    },

    logout: (state) => {
      state.user = null
      state.token = null
      state.isLoggedIn = false
    }
  }
})

export const { loginStart,loginSuccess, loginError, logout } = authSlice.actions
export default authSlice.reducer




