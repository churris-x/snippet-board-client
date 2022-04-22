export const selectToken = state => state.user.token;
export const selectUser = ({ user }) => { user.email, user.name };