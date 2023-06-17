import { useState } from 'react'
import { FormWrapper, TextInputField } from './../index'
import { sendRequest } from './helper'
import CircularProgress from '@mui/material/CircularProgress/CircularProgress'

export const PortContent = () => {
  const [prompt, setPrompt] = useState('')
  const [negPrompt, setNegPrompt] = useState('')
  const [src, setSrc] = useState<string | undefined>('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const inputItems: any[] = [
    { label: 'Prompt', handleChange: setPrompt },
    { label: 'Negative Prompt', handleChange: setNegPrompt }
  ]

  const handleSubmit = async() => {
    setLoading(true)
    const url = await sendRequest(prompt, negPrompt, setErr)
    setLoading(false)
    setSrc(url?.toString())
  }

  return (
    <>
      <FormWrapper
        formWidth='500px'
        fitHeight={true}
        children={
          inputItems.map((item, i) => <TextInputField label={item.label} handleChange={item.handleChange} key={item.label} error={i > 0 ? err : ''}/> )}
        handleSubmit={handleSubmit}
      />
      {loading ? <CircularProgress /> : <img src={src} />}
    </>
  )
}