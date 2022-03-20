import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import AuthContext from '../../context/AuthContext'
import IconButton from './IconButton'


function MyUser(props) {
    const { userInfo, logoutUser } = useContext(AuthContext)
    console.log("myuser", userInfo)
    return (
        <Header>
            <Link className='username' to={"/" + userInfo.username}><ProfilePicture src="/images/obama.jpg" /></Link>

            <div className='user-info'>
                <div className='upper-header'>
                    <Link to={"/" + userInfo.username}><span className='full-name'>{userInfo.first_name} {userInfo.last_name} </span></Link>




                </div>
                <div className='lower-header'>
                    <Link className='username' to={"/" + userInfo.username}>@{userInfo.username}</Link>
                </div>
            </div>
            <IconButton icon="bi-three-dots" onClick={logoutUser} />

        </Header>
    )
}
const Header = styled.div`
    display: flex;
    align-items: center;
    min-width: 250px;
    
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

export default MyUser