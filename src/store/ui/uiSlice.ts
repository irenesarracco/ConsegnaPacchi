import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UIState = {
  message: string | null
  type: 'error' | 'success' | null
  isOffline: boolean
}

const initialState: UIState = {
  message: null,
  type: null,
  isOffline: false
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showError: (state, action: PayloadAction<string>) => {
      state.message = action.payload
      state.type = 'error'
    },
    showSuccess: (state, action: PayloadAction<string>) => {
      state.message = action.payload
      state.type = 'success'
    },
    clearUI: (state) => {
      state.message = null
      state.type = null
    },
    setOffline: (state, action: PayloadAction<boolean>) => {
      state.isOffline = action.payload
    }
  },
})

export const { showError, showSuccess, clearUI, setOffline } = uiSlice.actions
export default uiSlice.reducer