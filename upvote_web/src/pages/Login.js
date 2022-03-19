import React, { useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'

function Login() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    let { loginUser } = useContext(AuthContext)
    const logIn = async (e) => {
        e.preventDefault()
        const url = "http://localhost:8000/api/token/"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }
        console.log(options)
        if (username && password) {
            let response = await fetch(url, options).then(async (result) => {
                console.log(result.status)
                let json = await result.json()
                console.log(json)
            })
        }

    }
    return (
        <div className='flex-wrap' >
            <form onSubmit={loginUser}>
                <input type="text" name='username' onChange={(e) => setUsername(e.target.value)} className="border rounded shadow-sm focus:bg-blue-50" />
                <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} className="border rounded shadow-sm focus:bg-blue-50" />
                <button type="submit">Login</button>
            </form>
        </div >
    )
}

export default Login