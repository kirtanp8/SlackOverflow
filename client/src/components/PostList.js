import { useState, useEffect } from 'react'
import axios from 'axios'
import PostAdd from './PostAdd'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const PostList = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('/api/status/') 
      console.log(res.data)
      setPosts(res.data)
    }
    getData()
  }, [])

  console.log(posts)

  return (
    <div className='post'>
      <ul>
        {posts.map((post, index) => (
          <>
            <li key={index}>
              <div className='date'>
                <div className='border-line-left'></div>
                <div className='date-div'>
                  {post.created_on.split('T')[0].split('-')[2]}-{post.created_on.split('T')[0].split('-')[1]}-{post.created_on.split('T')[0].split('-')[0]}
                </div>
                <div className='border-line-right'></div>
              </div>
              <div className='username-profile'>
                <img className='user-profile-image' src={post.author.image} />
                <p className='username'>{post.author.username}</p>
                <p className='time'>{post.created_on.split('T')[1].split(':')[0]}:{post.created_on.split('T')[1].split(':')[1]}</p> 
              </div>
              <p>{post.text}</p>
              {post.image.length > 3 ? 
                <img className="post-image" src={post.image} /> :
                <></>
              }
              <div className="bottom-border"></div>
            </li>
            <Button variant="warning" className="button">
              <Link className="link" to={`/posts/${post.id}`}>Check Replies</Link>
            </Button>
          </>
        ))}
      </ul>
      <PostAdd />
    </div>
  )


}

export default PostList
