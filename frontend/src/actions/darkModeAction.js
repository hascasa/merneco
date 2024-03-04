
// Import the DARK_MODE action type from dark mode constants
import { DARK_MODE } from '../constants/darkModeConstants'
// Action creator for handling dark mode toggle
export const handledarkMode = (e) => async (dispatch) => {
  localStorage.setItem('darkmode', e)
  dispatch({
    type: DARK_MODE,
    payload: e,
  })
}
