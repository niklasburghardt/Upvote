import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import React, { useContext, useState } from 'react'
import { useMutation } from 'react-query'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import api, { upvoteVotable } from '../../axios/AxiosInstance'
import AuthContext from '../../context/AuthContext'
import IconButton from './IconButton'
import IconLabelButton from './IconLabelButton'
import VotableHeader from './VotableHeader'
import VotableBody from './VotableBody'
import UpvotePost from './UpvotePost'
import CommentPost from './CommentPost'
import { InputField } from './InputField'
import PopUpContext from '../../context/PopUpContext'
TimeAgo.addDefaultLocale(en)

function LittleVotable(props) {
    const navigator = useNavigate()
    const { tokens } = useContext(AuthContext)
    const [comments, setComments] = useState(null)
    const [inputComment, setInputComment] = useState(null)
    const [noComments, setNoComments] = useState(null)


    const timeAgo = new TimeAgo()

    const { upvote, setUpvote, setComment } = useContext(PopUpContext)

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
                setComments(result.props.results)
            }
            console.log(result)
        })
    }
    console.log(props.upvoted, props.id)
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
        return navigator("/votable/" + props.id)

    }
    console.log(props)
    return (

        <Container >
            {/* <Header>
                <Link className='username' to={"" + props.user}><ProfilePicture src="/images/obama.jpg" /></Link>

                <div className='user-info'>
                    <div className='upper-header'>
                        <Link to={"" + props.user}><span className='full-name'>{props.first_name} {props.last_name} </span>

                            <span className='username'> ⤴ {timeAgo.format(Date.now() - 398423)}</span>
                            {props.updated != props.created ? <span className='username'> (edited ⤴ {timeAgo.format(Date.now() - 32342)})</span> : <span></span>}</Link>
                        <IconButton icon='bi-three-dots' />
                    </div>
                    <div className='lower-header'>
                        <Link className='username' to={"" + props.user}>@{props.user}</Link>
                    </div>
                </div>

            </Header> */}
            <VotableHeader first_name={props.first_name} last_name={props.last_name} user={props.user} created={props.created} updated={props.updated} />
            {/* <Body onClick={navigate}>
                {props.content}
                <Image src="/images/grand.jpg" />
            </Body> */}

            <Body onClick={navigate}>
                {props.content}
                {props.image && <Image src={props.image} />}

            </Body>


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
    margin-bottom: 20px;
    border-radius: 10px;
    background-color: var(--second-background);
    
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

const Actions = styled.div`
    margin: 16px 20px 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Body = styled.div`
    font-size: 16px;
    margin-top: 0px;

`
const Image = styled.img`
    display: block;
    object-fit: contain;
    
    border-radius: 10px;
    margin-top: 8px;
    
    max-width:100%;
    max-height:100%;
    
`


export default LittleVotable