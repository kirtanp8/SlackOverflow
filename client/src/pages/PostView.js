import React from 'react'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import axios from 'axios'





const PostView = () => {
  const [postText, setPostText] = useState([])
  const [time, setTime] = useState([])
  const [postAuthorFirst, setPostAuthorFirst] = useState([])
  const [postAuthorLast, setPostAuthorLast] = useState([])
  const [postAuthorImage, setPostAuthorImage] = useState([])
  const [postReplies, setPostReplies] = useState([])
  const [postImage, setPostImage] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`/api/status/${id}/`) 
      console.log(res.data)
      setPostReplies(res.data.status)
      res.data.image ? setPostImage(res.data.image) : false
      setPostText(res.data.text)
      setTime(res.data.created_on)
      res.data.author.first_name ?  setPostAuthorFirst(res.data.author.first_name) : false
      res.data.author.last_name ? setPostAuthorLast(res.data.author.last_name) : false
      res.data.author.image ? setPostAuthorImage(res.data.author.image) : false
    }
    getData()
  }, [])
  
  console.log(time)

  return (
    <>
      <div>
        {postAuthorImage ? <img src={postAuthorImage} /> : <></> } 
        <p>{postText}</p>
        {postImage ? <img src={postImage} /> : <></> } 
        <p>{postAuthorFirst ? <p>{postAuthorFirst}</p> : <></> } {postAuthorLast ? <p>{postAuthorLast}</p> : <></> }</p>
      </div>
      <div>  
        <div className='reply-container'>
          {postReplies?.map((reply, index) => (
            <ul key={index}>
              <li><img src={reply.author.image} /></li>
              <li><p>{reply.author.first_name} {reply.author.last_name}</p></li>
              <li>{reply.message_sent}</li>
              <li>{reply.created_on.split('T')[0].split('-')[2]}-{reply.created_on.split('T')[0].split('-')[1]}-{reply.created_on.split('T')[0].split('-')[0]} @ {reply.created_on.split('T')[1].split(':')[0]}:{reply.created_on.split('T')[1].split(':')[1]}
              </li>
              <li>

              </li>
            </ul>
          ))}
        </div>
      </div>
    </>
  )
}

export default PostView
