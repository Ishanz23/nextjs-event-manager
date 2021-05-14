import { GetStaticProps } from 'next'
import EventList from '../components/events/EventList'
import { objToArray } from '../utils'

export default function HomePage({ featuredEvents }) {
  return (
    <main>
      <EventList events={featuredEvents}></EventList>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch('https://nextjs-event-manager-default-rtdb.asia-southeast1.firebasedatabase.app/events.json')
  const featuredEventsObj = await res.json()

  let featuredEvents = objToArray(featuredEventsObj)

  if (featuredEvents && featuredEvents.length) {
    featuredEvents = featuredEvents.filter((event) => event.isFeatured)
  }

  return {
    props: {
      featuredEvents,
    },
    revalidate: 15,
  }
}
