import { useState } from 'react'
import { FormWrapper, PortContent, TextInputField } from '../index'

const FORM_WIDTH = '500px'
/**
 * It's temporary page for private test use only
 * TODO: remove when it's done.
 * @returns 
 */
export const Port = () => {
  const [token, setToken] = useState<string>('')
  const [isValid, setIsValid] = useState(false)
  const [error, setError] = useState<string>('')

  const handleVerify = () => {
    if (token === process.env.REACT_APP_PORT_TOKEN) {
      setError('')
      setIsValid(true)
    } else {
      setError('Error: invalid token. Please enter a valid token.')
    }
  }

  return (
    <>
      {isValid
        ? <PortContent />
        : <FormWrapper
          formWidth={FORM_WIDTH}
          fitHeight={false}
          children={<TextInputField label='Token' handleChange={setToken} error={error} />}
          handleSubmit={handleVerify}
        />
      }
    </>
  )
}
