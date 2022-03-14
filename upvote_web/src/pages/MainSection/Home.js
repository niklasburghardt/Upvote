import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import HomePageVotable from '../../components/stateful_components/HomePageVotable'
import AuthContext from '../../context/AuthContext'
import api from '../../axios/AxiosInstance'
import { QueryClient, useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query'
import { BarLoader, BounceLoader, CircleLoader, MoonLoader, RotateLoader, SyncLoader } from 'react-spinners'

import styled from 'styled-components'

function Home() {
    const [myData, setData] = useState()
    const [loaded, setLoaded] = useState(false)
    const [nextUrl, setNextUrl] = useState("votables/")
    const { tokens } = useContext(AuthContext)

    const [page, setPage] = useState(0)
    const load = async (pageParam = "votables/") => {
        console.log(pageParam)
        const response = await api.get(pageParam)
        console.log(response)
        return response.data
    }
    const queryClient = useQueryClient()


    const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery('votables', ({ pageParam = "votables/" }) => load(pageParam),

        {
            getNextPageParam: (lastPage, allPages) => lastPage.next
        })

    const deleteVotable = useMutation(votable => {

        return api.delete(`/votables/${votable.id}`, {
            headers: {
                "Authorization": "Bearer " + tokens?.access
            }
        })

    })


    useEffect(() => {
        let fetching = false
        const onScroll = async (event) => {
            const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement
            if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {

                fetching = true
                await fetchNextPage();

                fetching = false
            }

        }
        document.addEventListener("scroll", onScroll)
        return () => {
            document.removeEventListener("scroll", onScroll)
        }
    }, []);

    if (status === "loading") {
        return <div>
            <SyncLoader className="mx-4" />
        </div>
    }


    if (status === "error") {
        return <div>
            Error...
        </div>
    }



    const loadNext = () => {
        api.get(nextUrl, {
            headers: {

                "Authorization": "Bearer " + tokens.access
            }
        }).then(result => {
            if (result.status === 200) {
                let newData = myData ? myData : []
                for (let i = 0; i < result.data.results.length; i++) {
                    newData.push(result.data.results[i])
                }
                setData(newData)
                setNextUrl(result.data.next)
                return result.data
            }
        }).catch(error => {
            console.log(error)
        })
    }
    const deleteFromData = (id) => {
        let data = myData
        data = data.filter(item => !(item.id == id))
        setData(data)
    }

    return (
        <Container className="App ">

            {/* <div>
                {data.results.map((result) => {
                    return <HomePageVotable delete={deleteFromData} last_name={result.last_name} first_name={result.first_name} username={result.user} content={result.content} created={result.created} id={result.id}></HomePageVotable>
                })}
                {page > 0 && (<button onClick={() => setPage(page - 1)}>Previous</button>)}
                <br></br>
                <button onClick={() => setPage(page + 1)}>Load</button>
            </div> */}
            <div>
                {data.pages.map((group, i) => (
                    <React.Fragment key={i}>
                        {group.results.map(result => (<HomePageVotable last_name={result.last_name} first_name={result.first_name} username={result.user} content={result.content} created={result.created} updated={result.updated} comments={result.comments} id={result.id} delete={deleteVotable.mutate}></HomePageVotable>))}
                    </React.Fragment>
                ))}
            </div>
            <div>
                <button onClick={() => fetchNextPage()} >{isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                        ? 'Load More'
                        : 'Nothing more to load'}</button>
            </div>
        </Container>
    );
}

const Container = styled.div`
    
    
`
export default Home