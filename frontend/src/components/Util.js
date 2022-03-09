import settings from '../settings';

export default function backend(endpoint) {
  let ip;
  if (settings.ENV === 'dev') ip = 'http://localhost:8000';
  else if ((settings.ENV = 'production')) ip = settings.BACKEND_IP;

  return ip + endpoint;
}

//Use this function to update firstName, lastName, email and friendsList
//The input value should be a json object with the values your changing (don't include anything else just those values)
export const addUserData = async (data) => {
  const res = await fetch(backend('/user/me'), {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (res.status >= 400) {
    alert('Registration failed');
    return;
  }
};

//Call this to get the data of the user currently logged in
export const getUserData = async () => {
  const res = await fetch(backend('/user/me'), {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const user = await res.json();
  if (user.friends.length !== 0) {
    const res2 = await fetch(backend('/user?ids=' + user.friends), {
      method: 'GET',
    });

    const friends = await res2.json();
    let friendNames = [];
    friends.forEach((member) => {
      friendNames.push(member.firstName + ' ' + member.lastName);
    });
    user.friendNames = friendNames;
  }

  return user;
};

// returns true if session is active, returns false if session has expired
export async function checkSession() {
  const res = await fetch(backend('/check-session'), {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const res_j = await res.json();
  return res_j;
}

export async function getEvent(id) {
  const res = await fetch(backend('/event/' + id), {
    method: 'GET',
    credentials: 'include',
    id: id,
  });
  let event = await res.json();
  if (res.status >= 400) {
    alert('ERROR: Could not get user.');
    return;
  }
  if (event.members.length !== 0) {
    const res2 = await fetch(backend('/user?ids=' + event.members), {
      method: 'GET',
    });

    const members = await res2.json();
    let memberNames = [];
    members.forEach((member) => {
      memberNames.push(member.firstName + ' ' + member.lastName);
    });
    event.memberNames = memberNames;
  }
  return event;
}
// updateData is the function frontend uses to refresh data with backend. Always pass in from UserDataProvider
export const deleteEvent = async (id, updateData) => {
  const res = await fetch(backend('/event/' + id), {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.status === 403) {
    await updateData();
    return;
  } else if (res.status === 404) {
    alert('Event not found');
    return;
  }
  await updateData();
};

// This is for joining and unjoining events
export const joinEvent = async (id, updateData) => {
  const res = await fetch(backend('/event/' + id + '/subscribe'), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    id: id,
  });
  if (res.status === 403) {
    await updateData();
    return;
  } else if (res.status === 404) {
    alert('Event not found');
    return;
  } else if (res.status === 409) {
    alert('Already subscribed');
    return;
  }
  await updateData();
};

export const leaveEvent = async (id, updateData) => {
  const res = await fetch(backend('/event/' + id + '/unsubscribe'), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    id: id,
  });
  if (res.status === 403) {
    await updateData();
    return;
  } else if (res.status === 404) {
    alert('Event not found');
    return;
  } else if (res.status === 409) {
    alert('Already unsubscribed');
    return;
  }
  await updateData();
};
//This gets a list of users from a list of ids
export async function getUsers(ids) {
  const res = await fetch(backend('/user/?ids=' + ids), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const users = await res.json();

  return users;
}

export async function removeFriend(id, updateData) {
  const user = await getUserData();
  let index = user.friends.indexOf(id);
  user.friends.splice(index, 1);
  await addUserData(user);
}

export const getFriend = async (id) => {
  const res = await fetch(backend('/user/' + id), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const user = await res.json();
  if (res.status >= 400) {
    return;
  }
  if (user.friends.length !== 0) {
    const res2 = await fetch(backend('/user?ids=' + user.friends), {
      method: 'GET',
    });

    const friends = await res2.json();
    let friendNames = [];
    friends.forEach((member) => {
      friendNames.push(member.firstName + ' ' + member.lastName);
    });
    user.friendNames = friendNames;
  }

  return user;
};
// formats date string to confirm with React's yyyy-MM-dd format
export function formatDate(date_str) {
  let date = new Date(date_str);
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  let year = date.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
}

//Adapted from https://www.freecodecamp.org/news/how-to-add-search-to-frontend-app/
export const searchFriendByName = async (
  inputData,
  setResult,
  setLoading,
  user
) => {
  setResult([]);
  if (inputData === null || inputData === '') return;
  setLoading(true);
  const res = await fetch(backend('/user?username=' + inputData), {
    method: 'GET',
  });
  if (res.status >= 400) {
    alert('ERROR: Could not get user.');
    return;
  }
  let users = await res.json();
  users = users.filter((a) => {
    return a.username !== user.username;
  });
  setLoading(false);
  setResult(users);
};
export const getUsersFromIds = async (ids) => {
  const res = await fetch(backend('/user?ids=' + ids), {
    method: 'GET',
  });
  const users = await res.json();
  return users;
};

export const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
