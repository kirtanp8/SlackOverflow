import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { getUserId } from '../helpers/auth'
import FormInput from './FormInput'
import { getToken } from '../helpers/auth'
import { useParams } from 'react-router'

const Message = () => {
  const id = getUserId()
  // const [users, setUsers] = useState() 
  const [messagesSent, setMessagesSent] = useState()
  const [messagesReceived, setMessageReceived] = useState()
  // const [combinedMessages, setCombinedMessages] = useState()
  const [userMessaged, setUserMessaged] = useState() 
  const params = useParams()
  const userToMessageId = params[1]

  useEffect(() => {
    const getUserMessaged = async () => {
      const config = {
        method: 'get',
        url: `/api/chats/message_detail/sent/${userToMessageId}/${id}/`,
        headers: { 
          Authorization: `Bearer ${getToken()}`, 
          'Content-Type': 'application/json',
        },
        data: data,
      }

      try {
        const response = await axios(config).catch(handleError)
        setUserMessaged(response.data[0].sent_to)
        console.log(userMessaged)
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    }
    getUserMessaged()
  }, [params, userMessaged])



  



  useEffect(() => {
    const getMessagesSent = async () => {

      const config = {
        method: 'get',
        url: `/api/chats/message_detail/sent/${userToMessageId}/${id}/`,
        headers: { 
          Authorization: `Bearer ${getToken()}`, 
          'Content-Type': 'application/json',
        },
        data: data,
      }

      try {
        const response = await axios(config).catch(handleError)
        setMessagesSent(response.data)
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    }
    getMessagesSent()
  }, [params])


  useEffect(() => {
    const getReceivedData = async () => {
      const config = {
        method: 'get',
        url: `/api/chats/message_detail/received/${userToMessageId}/${id}/`,
        headers: { 
          Authorization: `Bearer ${getToken()}`, 
          'Content-Type': 'application/json',
        },
        data: data,
      }

      try {
        const response = await axios(config).catch(handleError)
        setMessageReceived(response.data)
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    }
    getReceivedData()
  }, [params])



  const [data, setData] = useState({
    text: '',
    // author: parseInt(`${id}`),
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


  const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
    console.log(data)
  }

  // useEffect(() => {
  //   if (messagesSent && messagesReceived) {
  //     setCombinedMessages(messagesSent.concat(messagesReceived))
  //   } else if (messagesSent && !messagesReceived) {
  //     setCombinedMessages(messagesSent)
  //   } else if (messagesReceived && !messagesSent) {
  //     setCombinedMessages(messagesReceived)
  //   } else {
  //     setCombinedMessages(['Do Nothing', 'Cat'])
  //   }
  
  // }, [params])




  
  // console.log(combinedMessages)
  console.log(messagesReceived)
  console.log(messagesSent)



  const handleSubmit = async (event) => {
    event.preventDefault()
    const config = {
      method: 'post',
      url: `/api/chats/message_detail/send_message/${userToMessageId}/`,
      headers: { 
        Authorization: `Bearer ${getToken()}`, 
        'Content-Type': 'application/json',
      },
      data: data,
    }

    try {
      const response = await axios(config).catch(handleError)
      console.log(response)
      setIsError(false)
    } catch (err) {
      setIsError(true)
    }
    window.location.reload(true)
  }

  console.log(messagesReceived)
  console.log(messagesSent)


  const formInputProps = { data, errorInfo, handleFormChange }

  return (
    <div className='messages-container'>
      <form className='message-box' onSubmit={handleSubmit}>
        <h1>Hello World</h1>  
        {messagesSent?.sort(((a, b) => a.created_on > b.created_on && 1 || -1)).map((message, index) => (
          <ul className='message-div' key={index}>
            <li className='text-message'>{message.text}</li> 
            <li className='text-message-date'>{message.created_on.split('T0')[0]}</li>
            <li className='text-message-time'>{message.created_on.split('T0')[1]}</li> 
            <li className='text-message-time'>{message.author.username}</li>
          </ul>
        ))}
        {  
          userMessaged === userToMessageId ? messagesReceived?.sort(((a, b) => a.created_on > b.created_on && 1 || -1)).map((message, index) => (
            <ul className='message-div' key={index}>
              <li className='text-message'>{message.text}</li> 
            </ul>
          )) 
            :
            <></>
        }
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
