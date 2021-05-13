import Button from '../../ui/Button'

import classes from './ResultsTitle.module.css'

export default function ResultsTitle({ date }) {
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button link='/events'>Show All Events</Button>
    </section>
  )
}
