import type { NextApiRequest, NextApiResponse } from 'next'
import ical from 'ical-generator'
import { getEvent } from '@/lib/eventStorage'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query
  const eventData = getEvent(id as string)

  if (!eventData) {
    return res.status(404).json({ error: 'Evento não encontrado' })
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

  res.setHeader('Content-Type', 'text/calendar')
  res.setHeader('Content-Disposition', 'attachment; filename=event.ics')
  res.status(200).send(icsContent)
}

