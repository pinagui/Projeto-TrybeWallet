import { LOGIN_SUCESS } from '../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_SUCESS:
    return {
      email: action.email,
      password: action.password,
    };
  default:
    return state;
  }
};

export default user;
