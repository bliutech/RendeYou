import classes from './SuggestedFriendCard.module.css';
import { Link } from 'react-router-dom';
const SuggestedFriendCard = ({ person, handler, handlerName }) => {
  return (
    <tr>
      <td>
        <div className={classes.item}>
          <Link to={'/user/' + person.id}>
            <img
              className={classes.image}
              src='https://cdn.iconscout.com/icon/free/png-256/person-1767893-1502146.png'
              alt='React Native Logo'
            />
          </Link>
          <div>
            <p className={classes.largebody}>
              {person.firstName} {person.lastName}
            </p>
            <p>{person.email}</p>
            <p className={classes.mutualFriends}>
              <strong>Mutual Friends: </strong>
              {person.mutualFriend.join(', ')}
            </p>
            <button
              onClick={async () => handler(person.id)}
              className={classes.button}
            >
              {handlerName}
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default SuggestedFriendCard;
