import axios from 'axios'
import React from 'react'
// import { getAxiosRequestConfig } from '../helpers/api'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import FormInput from './FormInput'
import { getToken, getUserId } from '../helpers/auth'


const PostAdd = () => {
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
    <>
      <div className='add-a-post-top-border'></div>
      <form className='add-a-post' onSubmit={handleSubmit}>
        <div className='form-add-a-post'>
          <FormInput
            name="text"
            type="text"
            placeholder="Message the Group Here!"
            {...formInputProps}
          />
        </div>
        <div className='add-a-post-button'>
          <input type='submit' value='Add Post' />
        </div>
        {isError ? (
          <div className='error'>
            <p>Incorrect Details Provided</p>
          </div>
        ) : (
          <></>
        )}
      </form>
    </>
  )
}
export default PostAdd
