import React from 'react'
import styles from '../styles/Chat.module.css'

export const Messages = ({messages, name}) => {
  return (
    <div className={styles.messages}>
        {messages.map(({user, message}, i) => {
            const itsMe = user.name.toLowerCase() === name.trim().toLowerCase();
            const className = itsMe ? styles.me : styles.user;

        return(
            <div key={i} className={`${styles.message} ${className}`}>
                <span className={styles.user}>
                    {user.name}
                </span>

                <div className={styles.text}>{user.message}</div>
            </div>
        );   
        })}
    </div>
  )
}

export default Messages
