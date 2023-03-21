import { initializeApp } from 'firebase/app'
import { getDatabase } from "firebase/database"
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  databaseURL: "https://need-code-default-rtdb.firebaseio.com",
  projectId: "need-code",
}

export const app = initializeApp(firebaseConfig)

// init database
export const db = getDatabase()

// init auth
export const auth = getAuth(app)
