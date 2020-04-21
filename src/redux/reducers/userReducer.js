const initialState = {
  user: {
    signedIn: false
  }
}

// Actions go here
const UPDATE_USER = 'UPDATE_USER';
const LOGOUT = 'LOGOUT';

// Dispatchers
export function updateUser(userObj){
  console.log(userObj);
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

export default function reducer( state = initialState, action ){
  const { type, payload } = action;

  console.log(payload);

  switch(type){
    case UPDATE_USER:
      return { ...state, user: { ...payload, signedIn: true } }
    case LOGOUT:
      return { ...state, user: { signedIn: false } }
    default:
      return state;
  }
}