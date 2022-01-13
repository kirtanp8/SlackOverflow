export const getToken = () => {
  return window.localStorage.getItem('token')
}

export const setToken = (token) => {
  return window.localStorage.setItem('token', token)
}

export const removeToken = () => {
  window.localStorage.removeItem('token')
}

export const getUserId = () => {
  return window.localStorage.getItem('id')
}

export const setUserId = (id) => {
  window.localStorage.setItem('id', id)
}

export const removeUserId = () => {
  return window.localStorage.removeItem('id')
}

// export const getPayload = () => {
//   const token = getToken()
//   if (!token) return false
//   const split = token.split('.')[1]
//   const payload = JSON.parse(atob(split))
//   console.log(payload)
//   return payload.sub 
// }