import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router'
import axios from 'axios'
import { useEffect } from 'react'
import { getUserId } from '../helpers/auth'
import FormInput from './FormInput'
import { getToken } from '../helpers/auth'

const Message = () => {
  const id = getUserId()
  const location = useLocation()
  const [users, setUsers] = useState() 
  const [userToMessage, setUserToMessage] = useState()
  const [userToMessageId, setUserToMessageId] = useState() 
  const [messagesSent, setMessagesSent] = useState()
  const [messagesReceived, setMessageReceived] = useState()
  const [combinedMessages, setCombinedMessages] = useState()
  const [count, setCount] = useState(0)

  useEffect(() => {
    setUserToMessage(location.pathname.split('/')[location.pathname.split('/').length - 1])
  }, [location])


  console.log(userToMessage)
  console.log(userToMessageId)

  useEffect(() => {

    const getData = async () => {
      const res = await axios.get('/api/auth/') 
      console.log(res.data)
      setUsers(res.data)

      for (let i = 0; i < users.length; i++) {
        if (users[i].username === `${userToMessage}`) {
          setUserToMessageId(i + 1)
          console.log(userToMessageId)
        } else {
          console.log('Do Nothing')
        }
      }
    }
    setInterval(() => {
      getData()
    }, 500)
    
  }, [location])

  

  useEffect(() => {
    const getMessagesSent = async () => {

      const config = {
        method: 'get',
        url: `/api/chats/message_detail/sent/${id}/${userToMessageId}/`,
        headers: { 
          Authorization: `Bearer ${getToken()}`, 
          'Content-Type': 'application/json',
        },
        data: data,
      }

      try {
        const response = await axios(config).catch(handleError)
        console.log(response.data)
        setMessagesSent(response.data)
        console.log(messagesSent)
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    }
    getMessagesSent()


  }, [location, count])

  useEffect(() => {
    const getReceivedData = async () => {
      const config = {
        method: 'get',
        url: `/api/chats/message_detail/received/${id}/${userToMessageId}`,
        headers: { 
          Authorization: `Bearer ${getToken()}`, 
          'Content-Type': 'application/json',
        },
        data: data,
      }

      try {
        const response = await axios(config).catch(handleError)
        console.log(response.data)
        setMessageReceived(response.data)
      } catch (err) {
        console.log(err)
        setIsError(true)
      }

      if (messagesSent && messagesReceived) {
        setCombinedMessages(messagesSent.concat(messagesReceived))
        console.log('hey')
      } else if (messagesSent && !messagesReceived) {
        setCombinedMessages(messagesSent)
        console.log('heya')
      } else if (messagesReceived && !messagesSent) {
        setCombinedMessages(messagesReceived)
        console.log('heya p')
      } else {
        setCombinedMessages(['Do Nothing', 'Cat'])
      }


    }

    getReceivedData()
  }, [location, count])


  const [data, setData] = useState({
    text: '',
    author: parseInt(`${id}`),
  })

  const [errorInfo, setErrorInfo] = useState({})
  const [isError, setIsError] = useState(false) 
  

  const handleError = (error) => {
    if (error.response) {
      setErrorInfo(error.response.data)
      setIsError(true)
      console.log(isError)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(getToken())
    setCount(count + 1)
    const config = {
      method: 'post',
      url: `/api/chats/message_detail/send_message/${userToMessageId}/`,
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
    } catch (err) {
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
      <form onSubmit={handleSubmit}>
        <h1>Hello World</h1>
        {combinedMessages?.sort(((a, b) => a.created_on > b.created_on && 1 || -1)).map((message, index) => (
          <ul key={index}>
            <li className='text-message'>{message.text}</li>
            {/* <li className='text-message-date'>{message.created_on.split('T0')[0]}</li>
            <li className='text-message-time'>{message.created_on.split('T0')[1]}</li> */}
            {/* <li className='text-message-time'>{message.author.username}</li> */}
          </ul>
        ))}
        <FormInput
          placeholder='send a message'
          type='text'
          name='text'
          {...formInputProps}
        />
        <div>
          <input type='submit' value='Send Message' />
        </div>
      </form>
    </div>
  )
}

export default Message
