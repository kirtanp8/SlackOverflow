// import React from 'react'
// import Message from './Message'
// import axios from 'axios'
// import { Route } from 'react-router'
// import { useEffect, useState } from 'react'

// const DirectMessages = () => {
//   const [users, setUsers] = useState([]) 
//   // const [messages, setMessages] = useState()

//   useEffect(() => {
//     const getData = async () => {
//       const res = await axios.get('/api/auth/') 
//       console.log(res.data)
//       setUsers(res.data)
//     }
//     getData()
//   }, [])



//   // useEffect(() => {
//   //   const getData = async () => {
//   //     const res = await axios.get('/api/chats/message_detail/') 
//   //     setMessages(res.data)
//   //   }
//   //   getData()
//   // }, [])
  
//   return (
//     <>
//       {users.map((user, index) => (
//         <Route key={index + 1} path={`/${user.username}/${index + 1}`}   element={<Message />} />
//       ))
//       }
//     </>
//   )
// }


// export default DirectMessages

