import classes from './FriendsList.module.css';
const FriendCard = ({ person, handler, handlerName }) => {
  return (
    <tr>
      <td>
        <div className={classes.item}>
          <img
            className={classes.image}
            src='https://reactnative.dev/img/tiny_logo.png'
            alt='React Native Logo'
          />
          <div>
            <p className={classes.largebody}>
              {person.firstName} {person.lastName}
            </p>
            <p className={classes.bodytext}>{person.email}</p>
            <button onClick={async () => handler(person.id)}>
              {handlerName}
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default FriendCard;
