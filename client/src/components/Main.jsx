import React from 'react'
import styles from '../styles/Main.module.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const FIELDS = {
    USERNAME: "username",
    ROOM: "room",
}

export const Main = () => {

    const { USERNAME, ROOM} = FIELDS;
    const [values,setValues] = useState({ [USERNAME]: "", [ROOM]: ""});
    const handleChange = ({ target: {value, name}}) => {
        setValues({...values, [name]: value});
    }
    const handleClick = (e) => {
        const isDisabled = Object.values(values).some(value => !value);
        
        if(isDisabled) e.preventDefault();
    }


  return (
<div className={styles.wrap}>
    <div className={styles.container}>

            <h1 className={styles.heading}>Join</h1>

    <form className={styles.form}>
<div className={styles.group}>
        
        <input 
            type="text" 
            name="username" 
            value={values[USERNAME]} 
            placeholder='Username'
            className={styles.input} 
            onChange={handleChange}
            autoComplete="off"
            required
            />
            
        </div>
<div className={styles.group}>
        
        <input 
            type="text" 
            name="room" 
            value={values[ROOM]} 
            placeholder='Room'
            className={styles.input} 
            onChange={handleChange}
            autoComplete="off"
            required
            />
            
        </div>

        <Link 
        className={styles.group} 
        onClick={handleClick}
        to={`/chat?name=${values[USERNAME]}&room=${values[ROOM]}`}>
           
<button type="submit" className={styles.button}>
Sign In
</button>
        </Link>
        </form>


</div>
    </div>
  )
};
export default Main;