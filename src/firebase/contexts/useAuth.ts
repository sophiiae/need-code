import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth"

import { auth } from '../config'

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid
    console.log('user: ', uid)
    // ...
  } else {
    // User is signed out
    // ...
    console.log('signed out')
  }
})

export const signUp = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user
    // ...
  })
  .catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    // ..
  })
}

export const login = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
  })
}
