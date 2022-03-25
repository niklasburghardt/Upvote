import React, { useContext, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import api from '../../axios/AxiosInstance'
import IconLabelButton from '../../components/stateful_components/IconLabelButton'
import FollowButton from '../../components/stateless_components/FollowButton'
import MainButton from '../../components/stateless_components/MainButton'
import StatisticShow from '../../components/stateless_components/StatisticShow'
import UnfollowButton from '../../components/stateless_components/UnfollowButton'
import AuthContext from '../../context/AuthContext'
import UserPosts from './UserDetail/UserPosts'

function UserDetail() {
    const { username } = useParams()
    const { tokens } = useContext(AuthContext)
    console.log(username)
    const getUser = async () => {
        const response = await api.get("users/" + username + "/details", tokens.access && {
            headers: {
                "Authorization": "Bearer " + tokens.access
            }
        })
        return response.data
    }
    const { data, status, refetch } = useQuery("userinfo" + username, getUser)
    if (status === "loading") {
        return <div>
            Loading...
        </div>
    }
    console.log("ata", data)
    return (
        <Container>
            <User>
                <UserHeader>
                    <ProfilePicture src='/images/obama.jpg' />
                    <LeftHeader>
                        <Names>
                            <div className='names'>
                                <div className='full-name'>{data.first_name} {data.last_name}</div>
                                <div className="username">@{data.username}</div>
                            </div>
                            {data.is_followed ? <UnfollowButton user={data.id} refetch={refetch} /> : <FollowButton user={data.id} refetch={refetch} />}
                        </Names>
                        <Stats>
                            <StatisticShow label="Followers" value={data.followers} />
                            <StatisticShow label="Followed" value={data.followed} />
                            <StatisticShow label="Upvotes" value={data.upvotes} />

                        </Stats>
                    </LeftHeader>
                </UserHeader>
                <UserInfo>
                    <IconLabelButton icon="bi-calendar" value={data.date_joined.substring(0, 10)} />
                    <div className="bio">{data.bio}</div>
                </UserInfo>
            </User>
            <UserPosts username={username} />
        </Container>
    )
}
const Container = styled.div`

`
const User = styled.div`
    margin-bottom: 40px;
`
const Names = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .full-name{
        font-size: 24px;
    }
    .follow{
        margin-left: 40px;
    }
    .names{
        display:flex ;
    }
    
    .username{
        margin-left: 8px;
        font-size: 24px;
        color: var(--main-grey-color)
    }
`
const Stats = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 200px;
    
`
const UserHeader = styled.div`
    display: flex;
    margin-bottom: 16px;
`
const LeftHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    
    justify-content: space-between;
`
const ProfilePicture = styled.img`
    border-radius:50% ;
    width: 100px;    
`
const UserInfo = styled.div`

`
export default UserDetail