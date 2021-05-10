import { useRouter } from 'next/router'
import { Fragment } from 'react'

import { getEventById } from '../../dummy-data'

import EventSummary from '../../components/events/EventSummary'
import EventLogistics from '../../components/events/EventLogistics'
import EventContent from '../../components/events/EventContent'
import ErrorAlert from '../../components/ui/ErrorAlert'

export default function EventDetailsPage() {
  const router = useRouter()
  const event = getEventById(router.query.eventId)

  if (!event) {
    return (
      <Fragment>
        <ErrorAlert>No Event Found!</ErrorAlert>
      </Fragment>
    )
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
