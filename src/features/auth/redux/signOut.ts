import { AUTH_SIGN_OUT } from "./constants";

const signOut = () => {
  return {
    type: AUTH_SIGN_OUT
  };
};

export function reducer(state: any, action: any) {
  switch (action.type) {
    case AUTH_SIGN_OUT:
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return state.merge({
        token: null,
        role: null
      });
    default:
      return state;
  }
}

export { signOut };
