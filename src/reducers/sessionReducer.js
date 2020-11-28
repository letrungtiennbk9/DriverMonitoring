import * as actionTypes from 'actions';

const initialState = {
  loggedIn: true,
  user: {
    first_name: 'Pika',
    last_name: 'Chu',
    email: 'pikachu@gmail.com',
    avatar: '',
    bio: 'Pikachuuu',
    role: 'ADMIN', // ['GUEST', 'USER', 'ADMIN']
  },
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_LOGIN: {
      return {
        ...initialState,
      };
    }

    case actionTypes.SESSION_LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        user: {
          role: 'GUEST',
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
