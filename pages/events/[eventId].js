import { useRouter } from 'next/router'
import { Fragment } from 'react'

import { getEventById } from '../../dummy-data'

import EventSummary from '../../components/events/EventSummary'
import EventLogistics from '../../components/events/EventLogistics'
import EventContent from '../../components/events/EventContent'

export default function EventDetailsPage() {
  const router = useRouter()
  const event = getEventById(router.query.eventId)

  if (!event) {
    return <p>No Event Found</p>
  }

  return (
    <Fragment>
      <EventSummary title={event.title}></EventSummary>
      <EventLogistics date={event.date} address={event.location} image={event.image}></EventLogistics>
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  )
}
