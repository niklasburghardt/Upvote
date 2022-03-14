import styled from '@emotion/styled'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


function Header() {
    let { user, logoutUser } = useContext(AuthContext)
    user ? console.log(user) : console.log("no user")
    return (
        <div className='py-8 px-4'>
            {!user ? <Link to={"/login"} className="">Login</Link> : <p onClick={logoutUser}>Logout</p>}

            <Link to={"/"}>Home</Link>
            <hr />
            {user ? (<span>---Hello {user["user_id"]}</span>) : (<span>Please Log IN</span>)}

        </div>
    )
}


export default Header