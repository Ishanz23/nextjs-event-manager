import Link from 'next/link'

import Button from '../../ui/Button'

import ArrowRightIcon from '../../icons/ArrowRightIcon'
import AddressIcon from '../../icons/AddressIcon'
import DateIcon from '../../icons/DateIcon'

import classes from './EventItem.module.css'

export default function EventItem({ title, image, date, location, id }) {
  const humanDate = new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
  const formattedAddress = location.replace(', ', '\n')
  const exploreLink = `/events/${id}`
  return (
    <li key={id} className={classes.item}>
      <img src={`/${image}`} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <span className={classes.icon}>
              <DateIcon />
            </span>
            <time>{humanDate}</time>
          </div>
          <div className={classes.address}>
            <span className={classes.icon}>
              <AddressIcon />
            </span>
            <address>{formattedAddress}</address>
          </div>
          <div className={classes.actions}>
            <Button link={exploreLink}>
              <span>Explore Event</span>
              <span className={classes.icon}>
                <ArrowRightIcon />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </li>
  )
}
