import settings from "../settings"

export default function backend(endpoint) {
  let ip;
  if (settings.ENV === "dev")
    ip = "http://localhost:8000";
  else if (settings.ENV = "production")
    ip = settings.BACKEND_IP;

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
  return user;
};

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
  const event = await res.json();
  if (res.status >= 400) {
    alert('ERROR: Could not get user.');
    return;
  }
  return event;
}

//This gets a list of users from a list of ids
export async function getUsers(ids) {
  const res = await fetch(backend('/user'), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ids: ids.join(','),
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
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const user = await res.json();
  if (res.status >= 400) {
    return;
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
