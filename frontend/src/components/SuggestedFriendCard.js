import classes from './FriendsList.module.css';
import { Link } from 'react-router-dom';
const SuggestedFriendCard = ({ person, handler, handlerName }) => {
  return (
    <tr>
      <td>
        <div className={classes.item}>
          <Link to={'/user/' + person.id}>
            <img
              className={classes.image}
              src='https://reactnative.dev/img/tiny_logo.png'
              alt='React Native Logo'
            />
          </Link>
          <div>
            <p className={classes.largebody}>
              {person.firstName} {person.lastName}
            </p>
            <p className={classes.bodytext}>{person.email}</p>
            <p>{'Mutual Friends: ' + person.mutualFriend.join(', ')}</p>
            <button onClick={async () => handler(person.id)}>
              {handlerName}
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default SuggestedFriendCard;
