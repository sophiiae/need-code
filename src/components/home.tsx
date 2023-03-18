import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { writeData, getData, deleteUserData } from '../firebase/useDatabase'
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

  const handleRemove = () => {
    // delete user
  }
 
  return (
    <>
      <button onClick={handleWrite} disabled>
        write data
      </button>
      <button onClick={handleGet} disabled>
        get data
      </button>
      <button onClick={handleRemove} disabled>
        remove user
      </button>
    </>
  )
}
