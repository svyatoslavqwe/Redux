const initialState = {
  user: null,
  loading: true,
};

export const setUser = (user) => ({
  type: "SET_USER",
  payload: user,
});

export const setLoading = (loading) => ({
  type: "SET_LOADING",
  payload: loading,
});

export const removeUserId = () => ({
  type: "REMOVE_USER_ID",
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "REMOVE_USER_ID":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default userReducer;
