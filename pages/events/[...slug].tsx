import { Fragment } from 'react'

import { useRouter } from 'next/router'

import { getFilteredEvents } from '../../dummy-data'

import EventList from '../../components/events/EventList'
import ResultsTitle from '../../components/events/ResultsTitle'
import ErrorAlert from '../../components/ui/ErrorAlert'
import Button from '../../components/ui/Button'

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
    return (
      <Fragment>
        <ErrorAlert>Invalid filters selected!</ErrorAlert>
        <div className='center'>Invalid Filters.</div>
        <div className='center'>
          <Button link='/events'>All Events</Button>
        </div>
      </Fragment>
    )
  }

  events = getFilteredEvents({ year: numYear, month: numMonth })

  if (!events || !events.length) {
    return (
      <Fragment>
        <ErrorAlert>No events found for the chosen filter!</ErrorAlert>
        <div className='center'>
          <Button link='/events'>All Events</Button>
        </div>
      </Fragment>
    )
  }

  const date = new Date(numYear, numMonth - 1)
  return (
    <Fragment>
      <ResultsTitle date={date}></ResultsTitle>
      <EventList events={events}></EventList>
    </Fragment>
  )
}
