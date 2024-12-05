import { NextRequest, NextResponse } from 'next/server'
import ical from 'ical-generator'
import { getEvent } from '@/lib/eventStorage'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const eventData = getEvent(id)

  if (!eventData) {
    return NextResponse.json({ error: 'Evento não encontrado' }, { status: 404 })
  }

  const calendar = ical({ name: 'Meu Calendário' })
  
  const event = calendar.createEvent({
    start: new Date(eventData.startDate),
    end: new Date(eventData.endDate),
    summary: eventData.summary,
    description: eventData.description,
    location: eventData.location,
  })

  if (eventData.meetingLink) {
    event.url(eventData.meetingLink)
    event.description(`${eventData.description}\n\nLink da reunião: ${eventData.meetingLink}`)
  }

  const icsContent = calendar.toString()

  return new NextResponse(icsContent, {
    headers: {
      'Content-Type': 'text/calendar',
      'Content-Disposition': 'attachment; filename=event.ics',
    },
  })
}

