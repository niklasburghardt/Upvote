import React from 'react'
import styled from 'styled-components'
import VotableBody from './VotableBody'
import VotableHeader from './VotableHeader'

function CommentResponse(props) {
    return (
        <Container>
            <div className='hor'></div>
            <VotableHeader user={props.user} first_name={props.first_name} last_name={props.last_name} created={props.created} updated={props.udated} />
            <VotableBody content={props.content} />

        </Container>
    )
}
const Container = styled.div`
    
    margin-bottom: 20px;
    .hor{
         margin-bottom: 8px;
        width: 100%;
        height: 1px;
        background-color: var(--main-grey-color);
    }
`
export default CommentResponse