import styled from 'styled-components'
import React from 'react'
import IconButton from '../components/stateful_components/IconButton'
import { useParams } from 'react-router-dom'

function MainSection({ title, page }) {
    const { username } = useParams()
    if (!title) {
        title = "@" + username
    }
    return (
        <Container>
            <div className="main-divider"></div>
            <div>
                <HeaderContainer>


                    <Header className='darken'>
                        <h1>{title}</h1>
                    </Header>

                    <IconButton icon="bi-gear" />



                </HeaderContainer>
                <Body>
                    {page}
                </Body>
            </div>
            <div className="main-divider"></div>

        </Container>
    )
}
const Container = styled.div`
    flex: 0.4;
    padding: 0px 0px;
    display: flex;
    
    
    
    .main-divider{
        width: 1px;
        background-color: var(--main-grey-color);
        height: 100%;
        margin: 0px 16px;
        min-height: 100vh;
    }
    
`
const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    width: 100%;
    font-size: 14px;
    
    position: sticky;
    top: 0px;
    background-color: rgba(0, 9, 18, 0.9);
`
const Header = styled.div`

    width: 100%;
    display: flex;
    align-items:center ;
    justify-content: space-between;
    
`
const Body = styled.div`
    margin-top: 0px;
    width: 100%;
`
export default MainSection