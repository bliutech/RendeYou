import NavBar from '../components/NavBar'
import EventCard from '../components/EventCard'
import mockEvents from '../context/mockEvents'

const Dashboard = () => {
  {
  }
  return (
    <>
      {mockEvents.map((event) => {
        return <EventCard event={event} />
      })}
    </>
  )
}

export default Dashboard
