import { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { writeData, getData } from '../firebase/useDatabase'
import { problems } from '../assets/problems'

export const Home = () => {
  const { state, dispatch } = useContext(AuthContext)

  const handleWrite = () => {
    writeData(state.user.uid, { problems })
  }

  const handleGet = () => {
    getData(state.user.uid)
    console.log(state.user)
  }

  return (
    <>
      <button onClick={handleWrite}>
        write data
      </button>
      <button onClick={handleGet}>
        get data
      </button>
    </>
  )
}
