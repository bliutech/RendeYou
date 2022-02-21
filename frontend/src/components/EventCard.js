const EventCard = ({
  id,
  date, //format dd/mm/yyyy
  title,
  description,
  time, //format hh:ss PM
  location, //TODO: link with google maps
  host,
  members,
}) => {
  return (
    <>
      <header>
        <h2>{title}</h2>
        <div>
          <h4>{host}</h4>
          <h4>{date}</h4>
        </div>
      </header>
      <p>description</p>
    </>
  )
}

export default EventCard
//TODO: make this adapt to users timezone
//TODO: link host to profile
//TODO: talk to backend about date format
