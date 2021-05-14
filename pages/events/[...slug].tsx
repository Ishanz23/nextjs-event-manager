import { Fragment } from 'react'
import { GetServerSideProps } from 'next'

import EventList from '../../components/events/EventList'
import ResultsTitle from '../../components/events/ResultsTitle'
import ErrorAlert from '../../components/ui/ErrorAlert'
import Button from '../../components/ui/Button'
import { objToArray } from '../../utils'

export default function FilteredEventsPage({ filteredEvents, error, year, month }) {
  if (!filteredEvents) {
    return <div className='center'>Loading...</div>
  }

  if (error) {
    return (
      <Fragment>
        <ErrorAlert>{error}</ErrorAlert>
        <div className='center'>
          <Button link='/events'>All Events</Button>
        </div>
      </Fragment>
    )
  }

  if (!filteredEvents || !filteredEvents.length) {
    return (
      <Fragment>
        <ErrorAlert>No events found for the chosen filter!</ErrorAlert>
        <div className='center'>
          <Button link='/events'>All Events</Button>
        </div>
      </Fragment>
    )
  }

  const date = new Date(year, month - 1)
  return (
    <Fragment>
      <ResultsTitle date={date}></ResultsTitle>
      <EventList events={filteredEvents}></EventList>
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params.slug || params.slug.length !== 2) {
    return {
      props: {
        filteredEvents: [],
        error: `Params provided: ${params.slug.length}, required 2.`,
      },
    }
  }
  const year = +params.slug[0]
  const month = +params.slug[1]
  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    return {
      props: {
        filteredEvents: [],
        error: 'Invalid Filters',
      },
    }
  }

  const res = await fetch('https://nextjs-event-manager-default-rtdb.asia-southeast1.firebasedatabase.app/events.json')
  const eventsObj = await res.json()

  let events = objToArray(eventsObj)

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date)
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
  })

  if (!filteredEvents) {
    return {
      props: {
        filteredEvents: [],
        year,
        month,
      },
    }
  }

  return {
    props: {
      filteredEvents,
      year,
      month,
    },
  }
}
