'use client'



import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  summary: z.string().min(1, 'O Título é obrigatório'),
  description: z.string().optional(),
  location: z.string().optional(),
  meetingLink: z.string().url('O link da reunião deve ser uma URL válida').optional(),
  startDate: z.date({
    required_error: "A data de início é obrigatória",
  }),
  endDate: z.date({
    required_error: "A data de término é obrigatória",
  }),
})

export function ICSForm() {
 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      summary: '',
      description: '',
      location: '',
      meetingLink: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/generate-ics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'event.ics'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      } else {
        console.error('Falha ao gerar o arquivo ICS')
      }
    } catch (error) {
      console.error('Erro ao gerar o arquivo ICS:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Reunião de equipe" {...field} />
              </FormControl>
              <FormDescription>
                O título do seu evento.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detalhes sobre o evento..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Uma breve descrição do evento.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Localização</FormLabel>
              <FormControl>
                <Input placeholder="Sala de conferências" {...field} />
              </FormControl>
              <FormDescription>
                Onde o evento acontecerá.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="meetingLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link da Reunião</FormLabel>
              <FormControl>
                <Input placeholder="https://zoom.us/j/123456789" {...field} />
              </FormControl>
              <FormDescription>
                Link para a reunião virtual (ex: Google Meet, Zoom).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data e Hora de Início</FormLabel>
              <FormControl>
                <Calendar
                  value={field.value ? field.value.toISOString().slice(0, 16) : ''}
                  onSelect={(date) => field.onChange(date)}
                />
              </FormControl>
              <FormDescription>
                A data e hora de início do evento.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data e Hora de Término</FormLabel>
              <FormControl>
                <Calendar
                  value={field.value ? field.value.toISOString().slice(0, 16) : ''}
                  onSelect={(date) => field.onChange(date)}
                />
              </FormControl>
              <FormDescription>
                A data e hora de término do evento.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Gerar ICS</Button>
      </form>
    </Form>
  )
}

