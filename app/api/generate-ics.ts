import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'
import { addEvent } from '@/lib/eventStorage'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const eventData = req.body
    const id = uuidv4()
    
    addEvent(id, eventData)

    const url = `webcal://${req.headers.host}/api/serve-ics/${id}`

    res.status(200).json({ url })
  } catch (error) {
    console.error('Erro ao gerar ICS:', error)
    res.status(500).json({ error: 'Falha ao gerar o arquivo ICS' })
  }
}

