export const sendRequest = async(prompt: string, negPrompt: string) => {
  const url = process.env.REACT_APP_MODEL_ENDPOINT
  const model_api_url = new URL(url ? url : '')
  const token = process.env.REACT_APP_MODEL_TOKEN

  if (!url) {
    console.log('invalid url')
    return
  }

  const data = {
    'inputs':{
			'task':'sd_v15',
			'parameters':{
			  'prompt': prompt,
        'negative_prompt': negPrompt
			}
    }
  }

  const response = await fetch(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Accept': 'image/png'
      },
      body: JSON.stringify({ inputs: data.inputs }),
    }
  )

  if (!response.ok) {
    throw new Error('Failed to generate image')
  }

  const blob = await response.blob()
  return URL.createObjectURL(blob)
}
