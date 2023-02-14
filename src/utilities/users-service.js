import * as usersAPI from './users-api'

export async function signUp(userData) {
    const token = await usersAPI.signUp(userData)

    // for right now
    localStorage.setItem('token', token)
    return getUser()
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJQYXVseSIsImVtYWlsIjoicGF1bEBtZS5jb20iLCJwYXNzd29yZCI6IiQyYiQwNiRDR2kuNmttRjZ2SXVreFFpZGlmWHB1bmJnM1lZb1hXSEFPRFJWSS41N1Y5MHlsb09HaUZIbSIsIl9pZCI6IjYzZWE1YmI2NzQ5ZWQ2NzRlYzkyMzU0OCIsImNyZWF0ZWRBdCI6IjIwMjMtMDItMTNUMTU6NDg6MDYuNzcyWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDItMTNUMTU6NDg6MDYuNzcyWiIsIl9fdiI6MH0sImlhdCI6MTY3NjMwMzI4NiwiZXhwIjoxNjc2Mzg5Njg2fQ.CVSMPJ7iqxrvM1x02xETfTUyvy7Xz2qDBZP7PV60pqY
// part 1 of JWT is the header, part 2 is the payload, part 3 is the signature; parts are divided by '.'
export function getToken() {
    // get the token from local storage
    const token = localStorage.getItem('token')
    if(!token) return null
    // get the token's payload
    const payload = token.split('.')[1]
    // JWTs are base64 encoded
    // we need to decode it to make it useable
    // JS has a built-in function for decoding base64 called atob()
    const decodedPayload = atob(payload)
    const parsedPayload = JSON.parse(decodedPayload)
    // check if the token has expired
    // JWT's exp is espressed in seconds, not milliseconds
    if (parsedPayload.exp < Date.now() / 1000) {
        // if token has expired, remove it
        localStorage.removeItem('token')
        return null
    } else {
        // if it hasn't, return the token
        return token
    }
}

export function getUser() {
    const token = getToken()
    // return token ? JSON.parse(atob(token.split('.')[1])).user : null
    // ^^ this will do the same thing as below but is less readable
    if (token) {
        const payload = token.split('.')[1]
        const decodedPayload = atob(payload)
        const parsedPayload = JSON.parse(decodedPayload)
        return parsedPayload.user 
    } else {
        return null
    }
    
}

export function logOut() {
    localStorage.removeItem('token')
}

export async function logIn(credentials) {
    const token = await usersAPI.logIn(credentials)
    localStorage.setItem('token', token)
    return getUser()
}

export function checkToken() {
    return usersAPI.checkToken()
        .then(dateStr => new Date(dateStr))
}