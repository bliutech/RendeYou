import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ children, ...attributes }) => {
  const isUser = false
  return (
    <Route
      {...attributes}
      render={() => {
        return isUser ? children : <Redirect to='/login' />
      }}
    ></Route>
  )
}

export default PrivateRoute
