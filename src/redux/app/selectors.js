export const selectIsLoading = state => state.app.isLoading;
export const selectMode = state => state.app.mode;
export const selectMessage = ({ app: { message, type, description, snackOpen } }) => ({
    message,
    type,
    description,
    snackOpen,
});
