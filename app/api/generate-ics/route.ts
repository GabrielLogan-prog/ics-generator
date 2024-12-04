import { NextResponse } from 'next/server'
import ical from 'ical-generator'

export async function POST(req: Request) {
  const { summary, description, location, meetingLink, startDate, endDate } = await req.json()

  const calendar = ical({ name: 'Meu Calendário' })
  
  const event = calendar.createEvent({
    start: new Date(startDate),
    end: new Date(endDate),
    summary: summary,
    description: description,
    location: location,
  })

  if (meetingLink) {
    event.url(meetingLink)
    event.description(`${description}\n\nLink da reunião: ${meetingLink}`)
  }

  const icsContent = calendar.toString()

  return new NextResponse(icsContent, {
    headers: {
      'Content-Type': 'text/calendar',
      'Content-Disposition': 'attachment; filename=event.ics',
    },
  })
}

