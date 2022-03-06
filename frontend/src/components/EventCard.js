const EventCard = ({ event, joinHandler }) => {
  const date = new Date(event.date);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <>
      <div>
        <div>
          <p>{event.title}</p>
          <p>{event.hostUser.firstName + ' ' + event.hostUser.lastName}</p>
        </div>
        <div>
          <div>
            <p>{event.description}</p>
          </div>
          <div>
            <p>{date.toLocaleDateString('en-US', options)}</p>
            <p>
              {date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
        <div>
          <button onClick={async () => joinHandler(event['id'])}>Join</button>
          <p>{event.members.join(' ')}</p>
        </div>
      </div>
    </>
  );
};

export default EventCard;
//TODO: make this adapt to users timezone
//TODO: link host to profile
//TODO: talk to backend about date format
