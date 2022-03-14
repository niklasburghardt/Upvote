import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { CircularProgress } from '@mui/material';

function UpvoteCreatedPost({ dismiss, back, text }) {
    const [upvotes, setUpvotes] = useState(0);
    const [loading, setLoading] = useState(false);
    const post = (e) => {
        console.log("post")

    }
    const increment = (num) => {
        setUpvotes(upvotes + num);
        console.log(upvotes)
    }
    const changeUpvotes = (e) => {
        if (e.target.value === "") {
            setUpvotes(0);
            return;
        }
        let amount = parseInt(e.target.value);
        try {
            setUpvotes(parseInt(amount))
        } catch {
            setUpvotes(upvotes)
        }

    }

    return (
        <Container>
            <form action="">
                <Header>
                    <img src="/icons/chevron-left.svg" alt="" onClick={back} className='cancle-button' />
                    <h3>Upvote your post</h3>
                    <img src="/icons/x.svg" alt="" onClick={() => { back(); dismiss() }} className='cancle-button' />

                </Header>
                <Upvote>
                    <UpvoteCount onChange={changeUpvotes} inputMode='numeric' value={upvotes}>
                    </UpvoteCount>
                    <UpvoteActions>
                        <div className='increase'>
                            <img src="/icons/chevron-double-up.svg" alt="" onClick={() => increment(10)} />
                            <img src="/icons/chevron-up.svg" alt="" onClick={() => increment(1)} />
                        </div>
                        <div className='decrease'>
                            <img src="/icons/chevron-down.svg" alt="" onClick={() => increment(-1)} />
                            <img src="/icons/chevron-double-down.svg" alt="" onClick={() => increment(-10)} />
                        </div>
                    </UpvoteActions>
                </Upvote>
                <div className='actions'>
                    <PostButton onClick={post}>
                        {!loading ? <p>POST</p> : <CircularProgress />}
                    </PostButton>
                </div>
            </form>
        </Container>
    )
}
const Container = styled.div`
    width: 33%;
    height: 400px;
    min-width: 600px;
    background: var(--main-background);
    border-radius: 20px;
    position: relative;
    left: -90px;
    padding: 20px;
    .actions{
        position: absolute;
        right: 0px;
        bottom: 0px;
        margin: 18px;
    }
    
`
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .cancle-button{
            cursor: pointer;
            transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
            :hover{
                background-color: var(--second-background);
                border-radius: 50%;
            }
        }
`
const PostButton = styled.button`
    background-color: var(--main-color);
    color: var(--white);
    outline: none;
    border: none;
    padding: 5px 30px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    :hover{
        background: var(--second-color)
    }
`
const Upvote = styled.div`
    display: flex;
    justify-content: center;
    
    
`
const UpvoteCount = styled.input`
    background: none;
    border:none;
    color: white;
    font-family: var(--upvote-font);
    font-size: 100px;
    font-weight: lighter;
    max-width: 400px;
    text-align: center;
    outline: none;
`
const UpvoteActions = styled.div`
    div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

    }
`
export default UpvoteCreatedPost
