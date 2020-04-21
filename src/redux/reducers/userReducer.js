const initialState = {
  user: {
    signedIn: false
  }
}

const UPDATE_USER = 'UPDATE_USER';
const LOGOUT = 'LOGOUT';

export function updateUser(userObj){
  return {
    type: UPDATE_USER,
    payload: userObj
  }
}

export function logout(){
  return {
    type: LOGOUT,
    payload: null
  }
}

export default function userReducer( state = initialState, action ){
  const { type, payload } = action;

  switch(type){
    case UPDATE_USER:
      return { ...state, user: { ...payload, signedIn: true }};
    case LOGOUT:
      return { ...state, user: { signedIn: false }};
    default:
      return state;
  }
}