import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { GetStaticProps } from 'next'

import EventList from '../../components/events/EventList'
import EventsSearch from '../../components/events/EventsSearch'
import { objToArray } from '../../utils'

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
  const res = await fetch('https://nextjs-event-manager-default-rtdb.asia-southeast1.firebasedatabase.app/events.json')
  const eventsObj = await res.json()

  let events = objToArray(eventsObj)

  return {
    props: {
      events,
    },
    revalidate: 15,
  }
}
