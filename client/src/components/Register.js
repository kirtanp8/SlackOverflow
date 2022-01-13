import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
// import { getAxiosRequestConfig } from '../helpers/api'
import { setToken } from '../helpers/auth'
import FormInput from './FormInput'
import Fade from 'react-reveal/Fade'
import Form from 'react-bootstrap/Form'
// import ImageUpload from './ImageUpload'

const Register = () => {
  const navigate = useNavigate()
  const [isError, setIsError] = useState(false)

  const [data, setData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
    image: '',
  })

  

  const [errorInfo, setErrorInfo] = useState({})


  const handleSubmit = async (event) => {
    event.preventDefault()
    
    const config = {
      method: 'post',
      url: 'http://localhost:8000/api/auth/register/',
      headers: { 
        'Content-Type': 'application/json',
      },
      data: data,
    }
    
    try {
      const response = await axios(config).catch(handleError)
      setToken(response.data.token)
      setIsError(false)
      navigate('/login')
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


  const handleImageUrl = (url) => {
    setData({ ...data, image: url })
  }


  const formInputProps = { data, errorInfo, handleFormChange, handleImageUrl }

  return (
    <section className='form-section'>
      <div className='form-box'>
        <h1>Sign Up</h1>
        <Form onSubmit={handleSubmit} className='form'>
          <div>
            <Fade right>
              <FormInput
                placeholder='username'
                type='text'
                name='username'
                {...formInputProps}
              />
            </Fade>
          </div>
          <div>
            <Fade right>
              <FormInput
                placeholder='email@email.com'
                type='text'
                name='email'
                {...formInputProps}
              />
            </Fade>
          </div>
          <div>
            <Fade right>
              <FormInput
                placeholder='first name'
                type='text'
                name='first_name'
                {...formInputProps}
              />
            </Fade>
          </div>
          <div>
            <Fade right>
              <FormInput
                placeholder='last name'
                type='text'
                name='last_name'
                {...formInputProps}
              />
            </Fade>
          </div>
          <div>
            <Fade right>
              <FormInput
                placeholder='password'
                type='password'
                name='password'
                {...formInputProps}
              />
            </Fade>
          </div>
          <div>
            <Fade right>
              <FormInput
                placeholder='password confirmation'
                type='password'
                name='password_confirmation'
                {...formInputProps}
              />
            </Fade>
          </div>
          <div>
            <Fade right>
              <Form.Control type="submit" value="Register" />
            </Fade>
          </div>
          {isError ? (
            <div className='error'>
              <p>Error. Please try again.</p>
            </div> 
          ) : (
            <></>
          )}
        </Form>
      </div>  
    </section>
  )
}

export default Register


