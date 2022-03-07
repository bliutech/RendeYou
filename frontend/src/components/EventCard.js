import classes from './EventCard.module.css';
import { getFriend } from './Util';
const EventCard = ({ event, handlerName, handler }) => {
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
        <tr>
          <td>{event.title}</td>
          <td>{event.hostUser.firstName + ' ' + event.hostUser.lastName}</td>
        </tr>
        <tr>
          <td>
            <p>{event.description}</p>
          </td>
          <td>
            <tr>{date.toLocaleDateString('en-US', options)}</tr>
            <tr>
              {date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </tr>
          </td>
        </tr>
        <td>
          <p>{event.location}</p>
        </td>
        <tr>
          <td>
            <button
              className={classes.button}
              onClick={async () => handler(event['id'])}
            >
              {handlerName}
            </button>
          </td>
          <td>
            <p>{event.memberNames?.join(', ')}</p>
          </td>
        </tr>
      </div>
    </>
  );
};

export default EventCard;
//TODO: make this adapt to users timezone
//TODO: link host to profile
//TODO: talk to backend about date format
