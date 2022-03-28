import styled from 'styled-components'
import React from 'react'
import { Backdrop } from '@mui/material'
import VotableHeader from './VotableHeader'
import StoryHeader from './StoryHeader'
import LittleVotable from './LittleVotable'
import StoryComment from './StoryComment'
import { useNavigate } from 'react-router-dom'

function StoryView(props) {
    const navigator = useNavigate()

    const navigate = () => {
        return navigator("/votable/" + props.votable)

    }
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={props.open}>
            <Container>
                <div className='post-head'>
                    <StoryHeader first_name={props.first_name} last_name={props.last_name} user={props.username} created={props.created} updated={props.updated} />
                    <img className="cancle-button" src='/icons/x.svg' onClick={props.dismiss} />
                </div>
                <LittleVotable first_name={"nice"} last_name={"shosh"} user={"neveragain"} created={Date.now()} content={"This is my content"} image="https://source.unsplash.com/1600x900/?beach" onClick={navigate} />
                <StoryComment comment={"This is my text. I want it to get to 140 characters just like twitter. Please let it be 1000. Okay scary this is almost already it. Now? Yes"} />
            </Container>
        </Backdrop>
    )
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 33%;
    min-width: 400px;
    height: 700px;
    background: var(--main-background);
    border-radius: 20px;
    position: relative;
    left: 0;
    padding: 20px;
    .post-head{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 16px;
        .cancle-button{
            cursor: pointer;
            transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
            :hover{
                background-color: var(--second-background);
                border-radius: 50%;
            }
        }
    }
    .progress{
        color: white;
    }
`
export default StoryView