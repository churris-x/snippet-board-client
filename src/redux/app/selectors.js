export const selectIsLoading = state => state.app.isLoading;
export const selectMode = state => state.app.mode;
export const selectMessage = ({ app: { message, type, snackOpen } }) => ({ message, type, snackOpen });