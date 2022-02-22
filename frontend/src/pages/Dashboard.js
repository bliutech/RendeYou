import NavBar from '../components/NavBar'
import EventCard from '../components/EventCard'
import mockEvents from '../context/mockEvents'
import FriendsList from '../components/FriendsList'
import { BrowserRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Dashboard = (userData) => {
  {
  }
  return (
    <>
      {mockEvents.map((event) => {
        return <EventCard event={event} key={event.id} />
      })}
      <h1>This is Dashboard</h1>
      <Link to='/profile'>
        <button type='button'>Profile</button>
      </Link>
    </>
  )
}

export default Dashboard
