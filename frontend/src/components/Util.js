export default function backend(endpoint) {
  return 'http://localhost:8000' + endpoint;
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
