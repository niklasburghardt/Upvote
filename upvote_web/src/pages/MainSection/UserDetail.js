import React from 'react'
import { useParams } from 'react-router-dom'

function UserDetail() {
    const { username } = useParams()
    return (
        <div>{username}</div>
    )
}

export default UserDetail