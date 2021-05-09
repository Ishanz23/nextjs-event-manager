import EventItem from '../EventItem'

import classses from './EventList.module.css'

export default function EventList({ events }) {
  return (
    <ul className={classses.list}>
      {events.map(({ id, title, location, image, date }) => (
        <EventItem key={id} id={id} title={title} location={location} image={image} date={date}></EventItem>
      ))}
    </ul>
  )
}
