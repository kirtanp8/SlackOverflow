import React from 'react'
import axios from 'axios'
import React from 'react'
// import { getAxiosRequestConfig } from '../helpers/api'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import FormInput from './FormInput'
import { getToken, getUserId } from '../helpers/auth'

const PostEdit = () => {
  const [data, setData] = useState({
    text: '',
    author: parseInt(`${getUserId()}`),
  })

  const [errorInfo, setErrorInfo] = useState({})
  const [isError, setIsError] = useState(false) 
  
  const navigate = useNavigate()

  const handleError = (error) => {
    if (error.response) {
      setErrorInfo(error.response.data)
      setIsError(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(getToken())
    const config = {
      method: 'post',
      url: '/api/posts/',
      headers: { 
        Authorization: `Bearer ${getToken()}`, 
        'Content-Type': 'application/json',
      },
      data: data,
    }
    
    console.log(data)

    try {
      const response = await axios(config).catch(handleError)
      console.log(response.data)
      setIsError(false)
      navigate('/posts')
    } catch (err) {
      console.log(err)
      setIsError(true)
    }
    window.location.reload(false)
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
    <Form className="form" onSubmit={handleSubmit}>
      <Form.Control type="submit" value="Edit Post" />
        {isError ? (
          <div className="error">
            <p>Error. Please try again</p>
          </div>
          ) : (
            <></>
        )}
    </Form>
    </div>
  )
}

export default PostEdit
