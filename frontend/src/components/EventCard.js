import { getFriend } from './Util';
import React from 'react';
import classes from './EventCard.module.css';

const EventCard = ({ event, handlerName, handler }) => {
  const date = new Date(event.date);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formatted_time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  const formatted_date = date.toLocaleDateString('en-US', options);

  return (
    <>
      <div className={classes.eventCard}>
        <h3>
          <span className={classes.eventTitle}>{event.title}</span>
          <span className={classes.eventHost}>
            by {event.hostUser.firstName} {event.hostUser.lastName}
          </span>
        </h3>
        <div>
          <p><span className={classes.eventDetail}>When:</span> {formatted_time} on {formatted_date}</p>
          <p><span className={classes.eventDetail}>Where:</span> {event.location}</p>
          <p><span className={classes.eventDetail}>Description:</span> {event.description}</p>
          <p><span className={classes.eventDetail}>Who's going:</span> {event.memberNames?.join(', ')}</p>
          <button
            className={classes.button}
            onClick={async () => handler(event['id'])}
          >
            {handlerName}
          </button>
        </div>
      </div>
    </>
  );
};

export default EventCard;
//TODO: make this adapt to users timezone
//TODO: link host to profile
//TODO: talk to backend about date format
