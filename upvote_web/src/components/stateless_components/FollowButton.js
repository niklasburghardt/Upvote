import React, { useContext } from 'react'
import styled from 'styled-components'
import api from '../../axios/AxiosInstance'
import { followUser } from '../../axios/AxiosInstance'
import AuthContext from '../../context/AuthContext'

function FollowButton({ user, refetch }) {
    const { tokens } = useContext(AuthContext)
    const follow = async () => {
        if (tokens.access == null) {
            return
        }
        const response = await followUser(tokens.access, user)
        refetch()

    }
    return (
        <Container onClick={follow}>
            <FollowIcon className='bi-plus' />
            <div className='text'>Follow</div>
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
    color: white;
    .text{
        
    }
    transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    &:hover{
        background-color: var(--hover-background);
    }
`
const FollowIcon = styled.i`
    font-size: 1.3rem;
    
`
export default FollowButton