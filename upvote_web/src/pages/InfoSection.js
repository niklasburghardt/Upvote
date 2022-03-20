import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import IconButton from '../components/stateful_components/IconButton'
import IconLabelButton from '../components/stateful_components/IconLabelButton'
import MyUser from '../components/stateful_components/MyUser'
import MainButton from '../components/stateless_components/MainButton'
import AuthContext from '../context/AuthContext'
function InfoSection() {
    const { userInfo } = useContext(AuthContext)
    return (
        <Container>

            <UserHeader>
                <div className='items'>
                    <div className='current-upvotes item'>
                        <IconLabelButton icon="bi-arrow-up-square" value={392} color="white" hover='var(--main-grey-color)' />
                    </div>
                    <div className='notifications item'>
                        <IconLabelButton icon="bi-bell" value={392} color="white" hover='var(--main-grey-color)' />

                    </div>
                    <div className='chat item'>
                        <IconLabelButton icon="bi-chat" value={392} color="white" hover='var(--main-grey-color)' />

                    </div>
                </div>
                <Profile>
                    {userInfo ? <MyUser username="niklas" first_name="Niklas" last_name="Burghardt" /> : <Link to={"/login"}><MainButton label={"Login"} /></Link>}

                </Profile>
            </UserHeader>
            <Widgets>

            </Widgets>
        </Container>
    )
}
const Container = styled.div`
    
    margin-left: 20px;
    flex: 0.4;
`
const UserHeader = styled.div`
    padding-top: 8px;
    background-color: rgba(0, 9, 18, 0.9);

    position: sticky;
    top: 0px;
    display:flex ;
    align-items: center;
    justify-content: space-around;
    .item{
        margin-right:12px ;
    }
    .items{
        display: flex;
    }
`
const Widgets = styled.div`

`
const Profile = styled.div`

`
const ProfilePicture = styled.img`
    border-radius: 50%;
    width: 56px;
    height:56px ;
`
export default InfoSection