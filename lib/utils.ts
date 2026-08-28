import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { techMap } from '@/constants/techMap'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDeviconClassName = (techName: string) => {
  const normalizedTechName = techName.replace(/[ .]/g, '').toLowerCase()

  return techMap[normalizedTechName]
    ? `${techMap[normalizedTechName]} colored `
    : 'devicon-devicon-plain '
}

export const getTimeStamp = (date: Date | string): string => {
  const diff = Date.now() - new Date(date).getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return `${seconds} sec ago`
  }

  if (minutes < 60) {
    return `${minutes} min ago`
  }

  if (hours < 24) {
    return `${hours} hr ago`
  }

  return `${days} day${days !== 1 ? 's' : ''} ago`
}
