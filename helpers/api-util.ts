import { objToArray } from '../utils'

export const getAllEvents = async () => {
  const res = await fetch('https://nextjs-event-manager-default-rtdb.asia-southeast1.firebasedatabase.app/events.json')
  const data = await res.json()

  const events = objToArray(data)

  return events
}

export const getFeaturedEvents = async () => {
  const res = await fetch(
    'https://nextjs-event-manager-default-rtdb.asia-southeast1.firebasedatabase.app/events.json?orderBy="isFeatured"&equalTo=true'
  )
  const filteredEventsObj = await res.json()

  const filteredEvents = objToArray(filteredEventsObj)

  return filteredEvents
}

export const getEvent = async (id: string) => {
  const res = await fetch(
    `https://nextjs-event-manager-default-rtdb.asia-southeast1.firebasedatabase.app/events/${id}.json`
  )
  const event = await res.json()
  return event
}
