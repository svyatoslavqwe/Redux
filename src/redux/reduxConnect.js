import { setLoading } from "./userReducer";

export const mapStateToProps = (state) => {
  return {
    reduxUser: state.user,
  };
};

export const mapDispatchToProps = {
  setLoading,
};
