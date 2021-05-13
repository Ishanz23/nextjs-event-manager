import EventList from '../components/events/EventList'
import { getFeaturedEvents } from '../dummy-data'

const events = getFeaturedEvents()

export default function HomePage() {
  return (
    <main>
      <EventList events={events}></EventList>
    </main>
  )
}
