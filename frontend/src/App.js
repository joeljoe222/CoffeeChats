import logo from './logo.svg';
import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'

function App() {
      {/* useState for dynamic UI, temp storage for validation*/} 

  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [posts, setPosts] = useState([])

  useEffect(() => {
    (async() => {
      const result = await axios.get('/posts')
      setPosts(result.data.posts)
    })()
  }, [])


  const submit = async event => {
    {/* submit causes reload, stoping that and using axios instead*/} 
    event.preventDefault() 
    {/* formdata object can handle files being sent better than json*/} 
    
    const data = new FormData() 
    data.append('image',file)
    data.append('description',description)
   const result = await axios.post('/posts', data)
   console.log(result)
    }
  return (
    <div className="App">
      <header>
        <h1>Coffee Chats</h1>
      </header>
      <form onSubmit={submit}> {/* form to send input to server*/} 
        <input
          filename={file} 
          onChange={e => setFile(e.target.files[0])} 
          type="file" 
          accept="image/*"
        ></input>
        <input
          onChange={e => setDescription(e.target.value)} 
          type="text"
        ></input>
        <button type="submit">Submit</button>
      </form>
      <main>
        {posts.map(post => (
          <figure key={post.id}>
            <img src={post.image_url}></img>
            <figcaption>{post.description}</figcaption>
          </figure>
        ))}
      </main>
    </div>
  )
}

export default App;