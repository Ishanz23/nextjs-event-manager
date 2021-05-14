import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { GetStaticProps } from 'next'

import EventList from '../../components/events/EventList'
import EventsSearch from '../../components/events/EventsSearch'
import { getAllEvents } from '../../helpers/api-util'

export default function AllEventsPage({ events }) {
  const router = useRouter()

  function filterEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`

    router.push(fullPath)
  }

  return (
    <Fragment>
      <EventsSearch onSearch={filterEventsHandler} />
      <EventList events={events}></EventList>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const events = await getAllEvents()

  return {
    props: {
      events,
    },
    revalidate: 600,
  }
}
