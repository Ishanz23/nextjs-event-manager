import { useRouter } from 'next/router'

import { getFilteredEvents } from '../../dummy-data'

import EventList from '../../components/events/EventList'

export default function FilteredEventsPage() {
  let events = []
  const router = useRouter()

  const filters = router.query.slug

  if (!filters) {
    return <div className='center'>Loading...</div>
  }

  const numYear = +filters[0]
  const numMonth = +filters[1]

  if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
    return <div className='center'>Invalid Filters.</div>
  }

  events = getFilteredEvents({ year: numYear, month: numMonth })
  console.log(events)
  console.log(filters)
  return <EventList events={events}></EventList>
}
