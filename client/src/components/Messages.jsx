import React from 'react'
import styles from '../styles/Messages.module.css'

export const Messages = ({messages, name}) => {
  return (
    <div className={styles.messages}>
        {messages.map(({message, user}, i) => {
            const itsMe = user.name.toLowerCase() === name.trim().toLowerCase();
            const className = itsMe ? styles.me : styles.user;

        return(
            <div key={i} className={`${styles.message} ${className}`}>
                <span className={styles.user}>
                    {user.name}
                </span>
                
                
                <span className={styles.text}>
                    {message}
                </span>

               
                <span className={styles.text}>
                    {user.message}
                </span>
           
                
                
            </div>
           
        );   
        })}
    </div>
  )
}

export default Messages
