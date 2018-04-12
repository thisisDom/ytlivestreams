import * as CONST from './constants'

export const user = (state = null, action) => {
  switch(action.type){
    case CONST.SET_USER:
      return action.user;
    default:
      return state;
  }
}

export const livestream =  (state = null, action) => {
  switch(action.type){
    case CONST.VIEW_STREAM:
      return action.stream;
    default:
      return state;
  }
}
