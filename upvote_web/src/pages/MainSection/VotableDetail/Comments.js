import styled from 'styled-components'
import React, { useContext, useEffect, useState } from 'react'
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query'
import api from '../../../axios/AxiosInstance'
import Comment from '../../../components/stateful_components/Comment'
import AuthContext from '../../../context/AuthContext'
import PopUpContext from '../../../context/PopUpContext'


function Comments(props) {
    const { tokens } = useContext(AuthContext)
    const { comment } = useContext(PopUpContext)
    const [writing, setWriting] = useState(false)

    const loadComments = async (pageParam = `votables/${props.id}/comments/`) => {
        const result = await api.get(pageParam, tokens && {
            headers: {
                "Authorization": "Bearer " + tokens.access
            }
        })
        console.log("ressdfults", result)
        return result.data
    }
    const queryClient = useQueryClient()

    const { data, status, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery("comments" + props.id, ({ pageParam = `votables/${props.id}/comments/` }) => loadComments(pageParam), {
        //refetchInterval: 5000,
        getNextPageParam: (lastPage, allPages) => lastPage.next,
    })

    useEffect(() => {
        let fetching = false
        const onScroll = async (event) => {
            const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement
            if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {

                fetching = true
                if (true) {
                    await fetchNextPage();
                }

                fetching = false
            }

        }
        document.addEventListener("scroll", onScroll)
        return () => {
            document.removeEventListener("scroll", onScroll)
        }
    }, []);
    if (status === "loading") {
        return <div>Loading...</div>
    }
    const doRefetch = () => {
        refetch()
    }

    console.log("nigger", data)
    return (
        <Container>

            {data.pages.map((group, i) => (
                <React.Fragment key={i}>
                    {group.results.map(comment => (<Comment refetch={doRefetch} content={comment.content} user={comment.user} first_name={comment.first_name} last_name={comment.last_name} created={comment.created} updated={comment.updated} likes={comment.likes} liked={comment.liked} responses={comment.responses} id={comment.id}></Comment>))}
                </React.Fragment>
            ))}

        </Container >
    )
}
const Container = styled.div`

`
export default Comments