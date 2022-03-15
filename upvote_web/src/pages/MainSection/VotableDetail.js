import React, { useContext } from 'react'
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
TimeAgo.addDefaultLocale(en)

function VotableDetail() {
    const { tokens } = useContext(AuthContext)
    const { id } = useParams()
    const timeAgo = new TimeAgo()

    const loadVotable = async () => {
        const response = await api.get("votables/" + id)
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
            <Header>
                <Link className='username' to={"/" + data.user}><ProfilePicture src="/images/obama.jpg" /></Link>

                <div className='user-info'>
                    <div className='upper-header'>
                        <Link to={"/" + data.user}><span className='full-name'>{data.first_name} {data.last_name} </span>

                            <span className='username'> ⤴ {timeAgo.format(Date.now() - 398423)}</span>
                            {data.updated != data.created ? <span className='username'> (edited ⤴ {timeAgo.format(Date.now() - 32342)})</span> : <span></span>}</Link>
                        <IconButton icon='bi-three-dots' />
                    </div>
                    <div className='lower-header'>
                        <Link className='username' to={"/" + data.user}>@{data.user}</Link>
                    </div>
                </div>

            </Header>
            <Body>
                {data.content}
                <Image src="/images/grand.jpg" />

            </Body>
            <Actions>
                <IconLabelButton value={data.upvotes.paid__sum ? data.upvotes.paid__sum : 0} icon="bi-arrow-up-square" hover="white" />
                <IconLabelButton value={data.comments} icon="bi-chat" hover='var(--comment-color)' />
                <IconLabelButton value={data.shares} icon="bi-link" hover='var(--share-color)' />
                <IconLabelButton value={data.stories} icon="bi-arrow-return-right" hover='var(--repost-color)' />
            </Actions>

            <Comments id={id} />
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