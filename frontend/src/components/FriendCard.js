import { Link } from 'react-router-dom';
import classes from './FriendCard.module.css';

const FriendCard = ({ person, handler, handlerName }) => {
  return (
    <tr>
      <td>
        <div className={classes.item}>
          <Link to={'/user/' + person.id}>
            <img
              className={classes.image}
              src='https://cdn.iconscout.com/icon/free/png-256/person-1767893-1502146.png'
              alt='Profile Picture'
            />
          </Link>
          <div>
            <p className={classes.largebody}>
              {person.firstName} {person.lastName} ({person.username})
            </p>
            <p className={classes.bodytext}>{person.email}</p>
          </div>
          <button onClick={async () => handler(person.id)} className={classes.button}>
              {handlerName}
            </button>
        </div>
      </td>
    </tr>
  );
};

export default FriendCard;
