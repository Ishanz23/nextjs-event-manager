import { GetStaticProps } from 'next'
import EventList from '../components/events/EventList'
import { getFeaturedEvents } from '../helpers/api-util'

export default function HomePage({ featuredEvents }) {
  return (
    <main>
      <EventList events={featuredEvents}></EventList>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const featuredEvents = await getFeaturedEvents()

  return {
    props: {
      featuredEvents,
    },
    revalidate: 600,
  }
}
