export default function backend(endpoint) {
  return 'http://localhost:8000' + endpoint
}

export async function getUserData() {
  const res = await fetch(backend('/user/me'), {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (res.status >= 400) {
    return {}
  }

  const user = await res.json()
  return user
}
