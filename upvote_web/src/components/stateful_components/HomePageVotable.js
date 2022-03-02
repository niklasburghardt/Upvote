import React, { useContext } from 'react'
import styled from 'styled-components'
import AuthContext from '../../context/AuthContext'

function HomePageVotable(props) {
    const { tokens } = useContext(AuthContext)
    const deleteUpvote = async () => {
        const url = `http://localhost:8000/api/votables/${props.id}`
        const token = tokens ? tokens.access : ""
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        let response = await fetch(url, options)
        response.status == 204 ? props.delete(props.id) : alert("you dont have the permission to delete this")
        console.log(response)
    }
    return (
        <div className='p-4'>
            <div className=''>
                <span>{props.first_name} {props.last_name}</span> <span>@{props.username}</span> <span>{props.created}</span>
            </div>
            <div>
                {props.content}
            </div>
            <div>
                <button onClick={deleteUpvote} className='hover:bg-blue-100 hover:rounded transition-all bg-white p-2 focus:bg-blue-300'>Delete</button>
                <button className='hover:bg-blue-100 hover:rounded transition-all bg-white p-2 focus:bg-blue-300'>Comment</button>
            </div>
            <hr />
            <hr />
        </div>
    )
}



export default HomePageVotable