import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface Props {
url: string
}

export default function BlogContentMarkdown ({ url }: Props) {
  const [source, setSource] = useState<string>('Loading...')

  const getSource = async (url: string): Promise<string> => {
    const res = await fetch(url)
    return await res.text()
  }

  useEffect(() => {
    getSource(url)
      .then(r => setSource(r))
  }, [])

  return (
    <ReactMarkdown source={source} />
  )
}
