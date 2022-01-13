// import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { setToken, setUserId } from '../helpers/auth'
import { useNavigate } from 'react-router'
// import { getAxiosRequestConfig } from '../helpers/api'
import FormInput from './FormInput'
// import { login } from '../helpers/api'
import axios from 'axios'
// import App from '../App'
import Form from 'react-bootstrap/Form'
import Fade from 'react-reveal/Fade'


const Login = ({ setIsLoggedIn }) => {
  const [data, setData] = useState({
    username: '',
    password: '',
  })

  const [errorInfo, setErrorInfo] = useState({})
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()


  const handleSubmit = async (event) => {
    event.preventDefault()
    
    const config = {
      method: 'post',
      url: 'http://localhost:8000/api/auth/login/',
      headers: { 
        'Content-Type': 'application/json',
      },
      data: data,
    }
    
    try {
      const response = await axios(config).catch(handleError)
      setToken(response.data.token)
      console.log(response.data.token)
      setUserId(response.data.id[0])
      console.log(response.data.id[0])
      navigate('/')
      setIsLoggedIn(true)
      setIsError(false)
      window.location.reload(false)
    } catch (err) {
      console.log(err)
      setIsError(true)
    }
  }

  const handleError = (error) => {
    if (error.response) {
      setErrorInfo(error.response.data)
      setIsError(true)
    }
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
    console.log(data)
  }

  const formInputProps = { data, errorInfo, handleFormChange }
  
  return (
    <div>
      <h1>Login to SlackOverflow</h1>
      <Form onSubmit={handleSubmit} className="form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Fade right>
            <FormInput 
              placeholder="username" 
              type='text'
              name='username' 
              {...formInputProps} 
            />
          </Fade>
          <Fade right>
            <FormInput 
              placeholder="password" 
              type='password'
              name='password' 
              {...formInputProps} 
            />
          </Fade>
          <div>
            <Fade right>
              <Form.Control type="submit" value="Login" />
            </Fade>
          </div>
          {isError ? (
            <div className='error'>
              <p>Error. Please try again.</p>
            </div> 
          ) : (
            <></>
          )}
        </Form.Group>
      </Form>
    </div>
  )
}

export default Login