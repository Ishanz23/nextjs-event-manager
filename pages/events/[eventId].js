import { useRouter } from 'next/router'
import { Fragment } from 'react'

import { getEventById } from '../../dummy-data'

import EventSummary from '../../components/events/EventSummary'

export default function EventDetailsPage() {
  const router = useRouter()
  const event = getEventById(router.query.eventId)

  if (!event) {
    return <p>No Event Found</p>
  }

  return (
    <Fragment>
      <EventSummary title={event.title}></EventSummary>
    </Fragment>
  )
}
