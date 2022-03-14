import styled from 'styled-components'
import React from 'react'
import { useQuery } from 'react-query'
import api from '../../../axios/AxiosInstance'
import Comment from '../../../components/stateful_components/Comment'

function Comments(props) {
    const loadComments = async () => {
        const result = await api.get(`votables/${props.id}/comments/`)
        console.log("results", result)
        return result.data
    }
    const { data, status } = useQuery("comments", loadComments)
    if (status === "loading") {
        return <div>Loading...</div>
    }

    return (
        <Container>
            {data ? data.results.map((comment) => {
                return <Comment content={comment.content} user={comment.user} first_name={comment.first_name} last_name={comment.last_name} created={comment.created} updated={comment.updated} likes={comment.likes} liked={comment.liked}></Comment>
            }) : <div>Be the first to comment</div>}
        </Container>
    )
}
const Container = styled.div`

`
export default Comments