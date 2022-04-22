export const selectToken = state => state.user.token;
export const selectUser = ({ user: { email, name } }) => ({ email, name });