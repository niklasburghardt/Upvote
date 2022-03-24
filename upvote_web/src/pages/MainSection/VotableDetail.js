import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import api from '../../axios/AxiosInstance'
import AuthContext from '../../context/AuthContext'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import IconButton from '../../components/stateful_components/IconButton'
import IconLabelButton from '../../components/stateful_components/IconLabelButton'
import Comments from './VotableDetail/Comments'
import VotableHeader from '../../components/stateful_components/VotableHeader'
import { InputField } from '../../components/stateful_components/InputField'
import UpvoteCreatedPost from '../../components/stateful_components/UpvotePost'
import CommentPost from '../../components/stateful_components/CommentPost'
TimeAgo.addDefaultLocale(en)

function VotableDetail() {
    const { tokens } = useContext(AuthContext)
    const { id } = useParams()
    const timeAgo = new TimeAgo()
    const [upvote, setUpvote] = useState()
    const [comment, setComment] = useState()

    const loadVotable = async () => {
        const response = await api.get("votables/" + id, tokens && {
            headers: {
                "Authorization": "Bearer " + tokens.access
            }
        })
        return response.data
    }
    const { data, status } = useQuery("votable", loadVotable)
    if (status === "loading") {
        console.log(data)
        return <div>Loading... ... ...</div>
    }
    if (status === "error") {
        return <div>Eroor .</div>
    }
    console.log(data)
    return (
        <Container>
            <VotableHeader first_name={data.first_name} last_name={data.last_name} username={data.user} created={data.created} updated={data.updated} />

            <Body>
                {data.content}
                <Image src="/images/grand.jpg" />

            </Body>
            <Actions>
                <IconLabelButton value={data.upvotes.paid__sum ? data.upvotes.paid__sum : 0} icon="bi-arrow-up-square" hover="white" onClick={() => !data.upvoted && setUpvote(true)} color={data.upvoted ? "white" : "var(--main-grey-color)"} />
                <IconLabelButton value={data.comments} icon="bi-chat" hover='var(--comment-color)' onClick={() => setComment(true)} />
                <IconLabelButton value={data.shares} icon="bi-link" hover='var(--share-color)' />
                <IconLabelButton value={data.stories} icon="bi-arrow-return-right" hover='var(--repost-color)' />
            </Actions>

            <Comments id={id} />
            <InputField page={<UpvoteCreatedPost id={data.id} content={data.content} username={data.user} first_name={data.first_name} last_name={data.last_name} created={data.created} updated={data.updated} image={data.image} dismiss={() => setUpvote(false)} />} open={upvote} />
            <InputField page={<CommentPost id={data.id} content={data.content} username={data.user} first_name={data.first_name} last_name={data.last_name} created={data.created} updated={data.updated} image={data.image} dismiss={() => setComment(false)} />} open={comment} />
        </Container>
    )
}
const Container = styled.div`
    min-width:600px ;
    padding: 16px;
    
    border-radius: 10px;
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
    font-size: 20px;
    margin-top: 8px;
    

`
const Actions = styled.div`
    margin: 16px 20px 40px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

`
const Image = styled.img`
    display: block;
    width: 100%;
    border-radius: 10px;
    margin-top: 16px;
`
export default VotableDetail