import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { addEvent } from '@/lib/eventStorage'

export async function POST(req: NextRequest) {
  try {
    const eventData = await req.json()
    const id = uuidv4()
    
    addEvent(id, eventData)

    // Usando o protocolo 'webcal://' para compatibilidade com aplicativos de calendário
    const url = `webcal://${req.headers.get('host')}/api/serve-ics/${id}`

    return NextResponse.json({ url })
  } catch (error) {
    console.error('Erro ao gerar ICS:', error)
    return NextResponse.json({ error: 'Falha ao gerar o arquivo ICS' }, { status: 500 })
  }
}

