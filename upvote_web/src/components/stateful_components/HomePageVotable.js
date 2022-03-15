import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import React, { useContext, useState } from 'react'
import { useMutation } from 'react-query'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import api from '../../axios/AxiosInstance'
import AuthContext from '../../context/AuthContext'
import IconButton from './IconButton'
import IconLabelButton from './IconLabelButton'
TimeAgo.addDefaultLocale(en)

function HomePageVotable(props) {
    const navigator = useNavigate()
    const { tokens } = useContext(AuthContext)
    const [comments, setComments] = useState(null)
    const [inputComment, setInputComment] = useState(null)
    const [noComments, setNoComments] = useState(null)
    const timeAgo = new TimeAgo()

    const commentUpvote = useMutation(() => {
        const options = {
            'method': "POST",
            'headers': {
                "Authorization": "Bearer" + tokens.access,
                "Content-Type": "application/json"
            },
            'body': JSON.stringify({
                "content": "sfef",
                "votable": 21
            })
        }
        console.log(tokens.access)
        return fetch("http://localhost:8000/api/votables/21/comments/", options)
    })
    const deleteUpvote = async () => {
        props.delete({ id: props.id })
    }
    const loadComments = async () => {
        api.get(`/votables/${props.id}/comments/`).then(result => {
            if (result.status === 200) {
                setComments(result.data.results)
            }
            console.log(result)
        })
    }
    const comment = async () => {
        const options = {
            'method': "POST",
            'headers': {
                "Authorization": `Bearer ${tokens.access}`,
                "Content-Type": "application/json"
            },
            'body': JSON.stringify({
                "content": "Cool",
                "votable": 21
            })
        }
        let nice = await api.post("http://localhost:8000/api/votables/56/comments/", options)

    }
    const getCreated = () => {
        const time = Date()
        return " time.toLocalTimeString()"
    }
    const navigate = () => {
        return navigator("votable/" + props.id)

    }
    return (

        <Container >
            <Header>
                <Link className='username' to={"" + props.username}><ProfilePicture src="/images/obama.jpg" /></Link>

                <div className='user-info'>
                    <div className='upper-header'>
                        <Link to={"" + props.username}><span className='full-name'>{props.first_name} {props.last_name} </span>

                            <span className='username'> ⤴ {timeAgo.format(Date.now() - 398423)}</span>
                            {props.updated != props.created ? <span className='username'> (edited ⤴ {timeAgo.format(Date.now() - 32342)})</span> : <span></span>}</Link>
                        <IconButton icon='bi-three-dots' />
                    </div>
                    <div className='lower-header'>
                        <Link className='username' to={"" + props.username}>@{props.username}</Link>
                    </div>
                </div>

            </Header>
            <Body onClick={navigate}>
                {props.content}
                <Image src="/images/grand.jpg" />
            </Body>
            <Actions>
                <IconLabelButton value={props.upvotes ? props.upvotes : 0} icon="bi-arrow-up-square" onClick={deleteUpvote} hover="white" />
                <IconLabelButton value={props.comments} icon="bi-chat" hover="var(--comment-color)" />
                <IconLabelButton value={props.shared ? props.shared : 0} icon="bi-link" hover="var(--share-color)" />
                <IconLabelButton value={props.stories ? props.stories : 0} icon="bi-arrow-return-right" hover="var(--repost-color)" />
            </Actions>
            {/* <div>
                <button onClick={deleteUpvote} className='hover:bg-blue-100 hover:rounded transition-all bg-white p-2 focus:bg-blue-300'>Delete</button>
                <button onClick={loadComments} className='hover:bg-blue-100 hover:rounded transition-all bg-white p-2 focus:bg-blue-300'>Show</button>
                <input type="text" onChange={(e) => setInputComment(e.target.value)} />
                <button onClick={commentUpvote.mutate} className='hover:bg-blue-100 hover:rounded transition-all bg-white p-2 focus:bg-blue-300'>Comment</button>
            </div> */}

        </Container >

    )
}

const Container = styled.div`
    padding: 16px;
    margin-bottom: 12px;
    border-radius: 10px;
    background-color: var(--second-background);
    min-width: 600px;
    transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    &:hover{
        background-color: var(--hover-background)
    }
`
const Header = styled.div`
    display: flex;
    align-items: center;
    .user-info{
        margin-left: 4px;
        width: 100%;
    }
    .full-name{
        font-size: 16px;
    }
    .username{
        font-size: 16px;
        color: var(--main-grey-color);
        &:hover{
            text-decoration:underline ;
        }
        
        
    }
    .upper-header{
        display: flex;
        justify-content: space-between;
        i{
            font-size: 1.3rem;
        }
    }
`
const ProfilePicture = styled.img`
    width: 56px;
    height: 56px;
    border-radius: 50%;
    
`
const Body = styled.div`
    font-size: 16px;
    margin-top: 8px;

`
const Actions = styled.div`
    margin: 16px 20px 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Image = styled.img`
    display: block;
    width: 100%;
    border-radius: 10px;
    margin-top: 8px;
`



export default HomePageVotable