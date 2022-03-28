import styled from 'styled-components'
import React, { useContext, useState } from 'react'
import VotableHeader from './VotableHeader'
import VotableSmallBody from './VotableSmallBody'
import PostInput from './PostInput'
import PostOptions from './PostOptions'
import { postVotable, postComment } from '../../axios/AxiosInstance'
import AuthContext from '../../context/AuthContext'

function CommentPost(props) {
    const [text, setText] = useState("")
    const { tokens } = useContext(AuthContext)
    const post = async (e) => {

        const result = await postComment(tokens.access, text, "", props.id)
        props.dismiss()
    }
    return (
        <Container>
            <VotableHeader first_name={props.first_name} last_name={props.last_name} user={props.username} created={props.created} updated={props.updated} dismiss={props.dismiss} />
            <VotableSmallBody content={props.content} navigate={props.navigate} image={props.image} />
            <div className='divider' />

            <PostInput text={text} setText={setText} spellCheck="false" autoFocus />
            <PostOptions text={text} post={post} postText="COMMENT" />
        </Container>
    )
}
const Container = styled.div`
    .divider{
        width: 100%;
        height: 1px;
        background-color: var(--main-grey-color);
        margin: 10px 0px;
    }
`

export default CommentPost