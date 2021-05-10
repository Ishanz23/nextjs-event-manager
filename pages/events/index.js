import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { getAllEvents } from '../../dummy-data'

import EventList from '../../components/events/EventList'
import EventsSearch from '../../components/events/EventsSearch'

export default function AllEventsPage() {
  const router = useRouter()
  const events = getAllEvents()

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
