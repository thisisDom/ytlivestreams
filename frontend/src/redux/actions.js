import * as CONST from './constants'

export const setUser = (user) => ({
  type: CONST.SET_USER,
  user: user
})

export const viewStream = (stream) => ({
  type: CONST.VIEW_STREAM,
  stream: stream
})
