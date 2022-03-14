import { Backdrop } from '@mui/material';

import React, { useState } from 'react'

import styled from 'styled-components'
import CreatePost from './components/CreatePost';
import NavigationElement from './components/NavigationElement'
function Navigation() {
    const [postOpen, openPost] = useState(false);
    const handleTogglePost = () => {
        openPost(!postOpen);
    }
    const logOut = (e) => {
        e.preventDefault();
    }
    return (
        <Container>
            <div className="make-sticky">
                <Header>
                    <a onClick={logOut}>
                        <img src="/icons/upvote-main-icon.svg" alt="" />
                        <h1>Upvote</h1>
                    </a>

                </Header>
                <NavigationSection>
                    <NavigationElement title="Main Page" icon="/icons/upvote-icon.svg" page="" />
                    <NavigationElement title="Followed" icon="/icons/ear.svg" page="followed" />
                    <NavigationElement title="Explore" icon="/icons/hash.svg" page="explore" />
                    <NavigationElement title="Trending" icon="/icons/bar-chart.svg" page="trending" />
                    <NavigationElement title="Messages" icon="/icons/chat.svg" page="messages" />
                    <NavigationElement title="Notifications" icon="/icons/bell.svg" page="notifications" />
                    <NavigationElement title="Profile" icon="/icons/person.svg" page={`user/1`} />
                </NavigationSection>
                <PostButton onClick={handleTogglePost}>POST</PostButton>
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={postOpen}>
                    <CreatePost dismiss={handleTogglePost} />
                </Backdrop>
            </div>
        </Container>
    )
}
const Container = styled.div`
    flex: 0.2;
    background: var(--main-background);
    color: var(--white);
    .make-sticky{
    position: sticky;
    top: 0px;
    }
    @media screen and (max-width: 600px){
            display: none;
        }

    
`
const Header = styled.div`

    a {
        display: flex;
        align-items: center;
        text-decoration: none;
    }
    h1{
        color: var(--white);
        font-family: var(--header-font);
        margin-left: 8px;
    }
`

const NavigationSection = styled.div`
    margin-top: 100px;
    //background: var(--second-background);
    padding: 20px;
    border-radius: 20px;
    width: fit-content;
`
const PostButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--main-color);
    padding: 20px 0px;
    margin: 0 20px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 20px;
    font-weight: 500;
    transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    :hover{
        background: var(--second-color);
    }
    `


export default Navigation










