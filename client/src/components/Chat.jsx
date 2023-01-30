import React from 'react'
import io from 'socket.io-client'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import Messages from './Messages'

import icon from '../images/emoji.svg'
import styles from '../styles/Chat.module.css'

const socket = io.connect('http://localhost:5000')

const Chat = () => {
  const navigate = useNavigate();
  const [state, setState] = useState([]);
  const { search } = useLocation();
  const [params, setParams] = useState({ room: "", user: ""});
  const [message, setMessage] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit('join', searchParams);

    return() => {
      socket.off();
    };
  }, [search]);

  useEffect(() => {
    socket.on('message', ({ data }) => {
      setState((_state) => [..._state, data]);
    });
   }, []);
  
    useEffect(() => {
    socket.on('room', ({ data: { users } }) => {
      setUsers(users.length);
    });
    
  }, []);

  const leftRoom = () => {
    socket.emit('leftRoom', { params });
    navigate('/'); 
  };

  const handleChange = ({target: {value}}) => setMessage(value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!message) return;

    socket.emit('sendMessage', { message, params });
    setMessage("");
  };

  const onEmojiClick = ({emoji}) => setMessage(`${message} ${emoji}`)


  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
      <div className={styles.title}>
        {params.room}
      </div>
      <div className={styles.users}>
        {users} users in this room
      </div>
      <button className={styles.left} onClick={leftRoom}>
        Left Room
      </button>
      </div>
      <div className={styles.messages}>
      <Messages messages={state} name={params.name} />
      </div>
     <form className={styles.form} onSubmit={handleSubmit}>
     <div className={styles.input}>
        
        <input 
            type="text" 
            name="message" 
            value={message} 
            placeholder='Your message'         
            onChange={handleChange}
            autoComplete="off"
            required
            />   
        </div>
        <div className={styles.emoji}>
          <img src={ icon } alt="" onClick={() => setOpen(!isOpen)} />
            {isOpen && (
              <div className={styles.emojies}>
              <EmojiPicker onEmojiClick={onEmojiClick} />            
              </div>
            )}
          </div>
          <div className={styles.button}>
            <input type="submit" onSubmit={ handleSubmit } value="Send a message" />
          </div>
     </form>
    </div>
  ) 
}

export default Chat