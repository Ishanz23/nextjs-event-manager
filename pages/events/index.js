import { getAllEvents } from '../../dummy-data'
import EventList from '../../components/events/EventList'

export default function AllEventsPage() {
  return <EventList events={getAllEvents()}></EventList>
}
