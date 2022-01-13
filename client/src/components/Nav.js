import React from 'react'
import { Link } from 'react-router-dom'
import { removeToken, removeUserId } from '../helpers/auth'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getUserId } from '../helpers/auth'
// import Login from './Login'
// import SideBarMessages from './SideBarMessages'
export const Nav = ({ isLoggedIn, setIsLoggedIn, id }) => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  console.log()

  const handleLogout = () => {
    removeToken() 
    removeUserId()
    setIsLoggedIn(false)
    navigate('/login')
  }

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/auth/') 
      console.log(res.data)
      setUsers(res.data)
    }
    getData()
  }, [])
  
  id = getUserId()

  return (
    <div className='nav-bar'>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to='/posts'>SlackOverflow</Link>
              </li>
              {/* <li>
                <Link to='/posts/:id'>PostShow</Link>
              </li> */}
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
              {users.map((user, index) => (
                <li key={index + 1}>
                  <Link userToMessageId={index + 1} to={`/${id}/${user.username}`}>{user.username}</Link>
                </li>
              ))}
            </>
          ) : ( 
            <>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/register'>Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Nav
