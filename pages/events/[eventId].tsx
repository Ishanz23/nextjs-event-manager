import { Fragment } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import EventSummary from '../../components/events/EventSummary'
import EventLogistics from '../../components/events/EventLogistics'
import EventContent from '../../components/events/EventContent'
import ErrorAlert from '../../components/ui/ErrorAlert'
import { getEvent, getFeaturedEvents } from '../../helpers/api-util'

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
  const event = await getEvent(params.eventId as string)
  return {
    props: {
      event,
    },
    revalidate: 30,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getFeaturedEvents()

  const paths = events.map((event) => ({ params: { eventId: event.id } }))
  return {
    paths,
    fallback: true,
  }
}
