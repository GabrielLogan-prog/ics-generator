"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"

export interface CalendarProps {
  onSelect?: (date: Date) => void
  className?: string
  value?: string
}

export function Calendar({ className, onSelect, ...props }: CalendarProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value)
    if (onSelect) {
      onSelect(date)
    }
  }

  return (
    <Input
      type="datetime-local"
      className={className}
      onChange={handleChange}
      {...props}
    />
  )
}

