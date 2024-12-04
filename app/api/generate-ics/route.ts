import { NextResponse } from 'next/server'
import ical from 'ical-generator'

export async function POST(req: Request) {
  const { summary, description, location, startDate, endDate } = await req.json()

  const calendar = ical({ name: 'Meu Calendário' })
  
  calendar.createEvent({
    start: new Date(startDate),
    end: new Date(endDate),
    summary: summary,
    description: description,
    location: location,
  })

  const icsContent = calendar.toString()

  return new NextResponse(icsContent, {
    headers: {
      'Content-Type': 'text/calendar',
      'Content-Disposition': 'attachment; filename=event.ics',
    },
  })
}
