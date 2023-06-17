import { useState } from 'react'
import { FormWrapper, TextInputField } from './../index'
import { sendRequest } from './helper'

export const PortContent = () => {
  const [prompt, setPrompt] = useState('')
  const [negPrompt, setNegPrompt] = useState('')
  const [src, setSrc] = useState<string | undefined>('')

  const inputItems: any[] = [
    { label: 'Prompt', handleChange: setPrompt },
    { label: 'Negative Prompt', handleChange: setNegPrompt }
  ]

  const handleSubmit = async() => {
    const url = await sendRequest(prompt, negPrompt)
    setSrc(url?.toString())
  }

  return (
    <>
      <FormWrapper
        formWidth='500px'
        fitHeight={true}
        children={
          inputItems.map(item => <TextInputField label={item.label} handleChange={item.handleChange} key={item.label}/>)}
        handleSubmit={handleSubmit}
      />
      <img src={src ? src : ''} />
    </>
  )
}