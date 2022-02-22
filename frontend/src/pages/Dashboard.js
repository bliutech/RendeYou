import NavBar from '../components/NavBar'
import EventCard from '../components/EventCard'
import mockEvents from '../context/mockEvents'
import FriendsList from '../components/FriendsList'

const Dashboard = () => {
  {
  }
  return (
    <>
      {mockEvents.map((event) => {
        return <EventCard event={event} />
      })}
      <h1>This is Dashboard</h1>
      <FriendsList/>
    </>
  )
}

export default Dashboard
