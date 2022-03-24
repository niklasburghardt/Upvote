import styled from 'styled-components'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import api from '../../../axios/AxiosInstance'
import Comment from '../../../components/stateful_components/Comment'
import AuthContext from '../../../context/AuthContext'

function Comments(props) {
    const { tokens } = useContext(AuthContext)
    const loadComments = async () => {
        const result = await api.get(`votables/${props.id}/comments/`, tokens && {
            headers: {
                "Authorization": tokens.access
            }
        })
        console.log("results", result)
        return result.data
    }
    const { data, status, refetch } = useQuery("comments", loadComments, {
        //refetchInterval: 5000,
    })
    if (status === "loading") {
        return <div>Loading...</div>
    }
    const doRefetch = () => {
        refetch()
    }

    return (
        <Container>

            {data ? data.results.map((comment) => {
                return <Comment refetch={doRefetch} content={comment.content} user={comment.user} first_name={comment.first_name} last_name={comment.last_name} created={comment.created} updated={comment.updated} likes={comment.likes} liked={comment.liked} id={comment.id}></Comment>
            }) : <div>Be the first to comment</div>}

        </Container >
    )
}
const Container = styled.div`

`
export default Comments