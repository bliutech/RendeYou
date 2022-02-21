const EventCard = ({ event, joinHandler, ...attributes }) => {
  return (
    <>
      <header>
        <h2>{event.title}</h2>
        <div>
          <h4>{event.host}</h4>
          <h4>{event.date}</h4>
        </div>
      </header>
      <p>{event.description}</p>
      <div>
        <h2>at: {event.location}</h2>
        <h2>{event.time}</h2>
      </div>
      <div>
        <h5>{event.members}</h5>
        <button onClick={joinHandler}>Join</button>
      </div>
    </>
  )
}

export default EventCard
//TODO: make this adapt to users timezone
//TODO: link host to profile
//TODO: talk to backend about date format
