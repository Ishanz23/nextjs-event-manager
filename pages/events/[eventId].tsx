import { Fragment } from 'react'

import EventSummary from '../../components/events/EventSummary'
import EventLogistics from '../../components/events/EventLogistics'
import EventContent from '../../components/events/EventContent'
import ErrorAlert from '../../components/ui/ErrorAlert'
import { GetStaticPaths, GetStaticProps } from 'next'
import { objToArray } from '../../utils'

export default function EventDetailsPage({ event }) {
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(
    `https://nextjs-event-manager-default-rtdb.asia-southeast1.firebasedatabase.app/events/${params.eventId}.json`
  )
  let event = await res.json()

  return {
    props: {
      event,
    },
    revalidate: 15,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://nextjs-event-manager-default-rtdb.asia-southeast1.firebasedatabase.app/events.json')
  const eventsObj = await res.json()

  let events = objToArray(eventsObj)

  const paths = events.map((event) => ({ params: { eventId: event.id } }))
  return {
    paths,
    fallback: false,
  }
}
