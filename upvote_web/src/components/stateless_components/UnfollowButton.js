import React, { useContext } from 'react'
import styled from 'styled-components'
import { followUser } from '../../axios/AxiosInstance'
import AuthContext from '../../context/AuthContext'

function UnfollowButton({ user, refetch }) {
    const { tokens } = useContext(AuthContext)
    const unfollow = async () => {
        if (tokens.access == null) {
            return
        }
        const response = await followUser(tokens.access, user)
        refetch()

    }
    return (
        <Container onClick={unfollow}>
            <FollowIcon className='bi-check' />
            <div className='text'>Followed</div>
        </Container>
    )
}
const Container = styled.div`
cursor: pointer;
    display: flex;
    align-items: center;
    background-color: var(--second-background);
    padding: 4px;
    border-radius: 10px;
    color: var(--main-grey-color);
    .text{
        
    }
`
const FollowIcon = styled.i`
    font-size: 1.3rem;
    
`
export default UnfollowButton