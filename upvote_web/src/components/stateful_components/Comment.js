import styled from 'styled-components'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import IconButton from './IconButton'
import IconLabelButton from './IconLabelButton'
import AuthContext from '../../context/AuthContext'
import api, { likeComment } from '../../axios/AxiosInstance'
import { useInfiniteQuery } from 'react-query'
import CommentResponse from './CommentResponse'
import ResponseInput from './ResponseInput'

TimeAgo.addDefaultLocale(en)

function Comment(props) {
    const timeAgo = new TimeAgo()

    const { tokens } = useContext(AuthContext)
    const [showComments, setComments] = useState(false)

    const loadResponses = async (pageParam = `votables/comments/${props.id}/response`) => {
        const result = await api.get(pageParam, tokens && {
            headers: {
                "Authorization": "Bearer " + tokens.access
            }
        })
        console.log("response", result)
        return result.data
    }

    const { data, status, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery("responses" + props.id, ({ pageParam = `votables/comments/${props.id}/response`
    }) => loadResponses(pageParam), {
        getNextPageParam: (lastPage, allPages) => lastPage.next,

    })

    const toggleLiked = async () => {

        const result = await likeComment(props.id, tokens.access).then(props.refetch())
        props.refetch()


    }
    console.log("responses", props.responses)


    return (
        <Container>
            <div className='hor'></div>

            <Header>
                <Link className='username' to={"/" + props.user}><ProfilePicture src="/images/obama.jpg" /></Link>

                <div className='user-info'>
                    <div className='upper-header'>
                        <Link to={"/" + props.user}><span className='full-name'>{props.first_name} {props.last_name} </span>

                            <span className='username'> ⤴ {timeAgo.format(Date.now() - 398423)}</span>
                            {props.updated != props.created ? <span className='user'> (edited ⤴ {timeAgo.format(Date.now() - 32342)})</span> : <span></span>}</Link>
                        <IconButton icon='bi-three-dots' />
                    </div>
                    <div className='lower-header'>
                        <Link className='username' to={"/" + props.user}>@{props.user}</Link>
                    </div>
                </div>

            </Header>
            <Body>
                {props.content}
                <Actions>
                    <IconLabelButton value={props.likes} icon={props.liked ? "bi-heart-fill" : "bi-heart"} hover="var(--like-color)" color={props.liked ? "var(--like-color)" : ""} onClick={toggleLiked} />
                    <IconLabelButton value={props.responses ? props.responses : 0} icon="bi-chat" hover="var(--comment-color)" onClick={() => setComments(!showComments)} />


                </Actions>
            </Body>
            <Responses>
                {showComments && <ResponseInput commentId={props.id} refetch={refetch} />}
                {data && showComments && data.pages.map((group, i) => (
                    <React.Fragment key={i}>
                        {group.results.map(response => (<CommentResponse content={response.content} user={response.user} first_name={response.first_name} last_name={response.last_name} created={response.created} updated={response.updated} likes={response.likes} liked={response.liked} responses={response.responses} id={response.id}></CommentResponse>))}
                    </React.Fragment>
                ))}
                {showComments && <IconLabelButton onClick={fetchNextPage} icon="bi-arrow-down" value={"Load more responses"} />}
            </Responses>

        </Container>
    )
}
const Container = styled.div`
    
    .hor{
        width: 100%;
        height: 1px;
        background-color: var(--main-grey-color);
    }
`
const Header = styled.div`
    display: flex;
    align-items: center;
    margin-top: 8px;
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
    
    margin-bottom: 8px;;

`
const Responses = styled.div`
    margin-left: 20px;

`
const Actions = styled.div`
    margin: 16px 20px 8px 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    div{
        margin-left: 20px;
    }
`
const Image = styled.img`
    display: block;
    width: 100%;
    border-radius: 10px;
    margin-top: 8px;
`
export default Comment