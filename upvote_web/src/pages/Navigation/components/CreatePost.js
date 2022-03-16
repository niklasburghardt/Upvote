import { Backdrop } from '@mui/material';
import React, { useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import styled from 'styled-components'
import UpvoteCreatedPost from './UpvoteCreatedPost';

function CreatePost({ dismiss }) {


    const [upvoteOpen, openUpvote] = useState(false);
    const [text, setText] = useState("");
    const post = (e) => {
        e.preventDefault();

        openUpvote(true)
    }
    const toggleUpvote = (e) => {
        openUpvote(!upvoteOpen);
    }
    return (
        <Container>
            <form action="">
                <div className='post-head'>
                    <UserPicture src="/images/obama.jpg" />
                    <TextInputField rows="5" placeholder="What do you want to tell the world?" onChange={(e) => setText(e.target.value)} />
                    <img className="cancle-button" src='/icons/x.svg' onClick={dismiss} />
                </div>

                <Actions>
                    <div className='text-actions'>
                        <Action src="/icons/image.svg" />
                        <Action src="/icons/hash.svg" />
                        <Action src="/icons/at.svg" />

                    </div>
                    <div className="end">
                        <Progress>{text.length}</Progress>
                        <PostButton onClick={post}>
                            NEXT
                        </PostButton>
                    </div>
                </Actions>
            </form>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 2 }} open={upvoteOpen}>
                <UpvoteCreatedPost dismiss={dismiss} back={toggleUpvote} text={text} />
            </Backdrop>
        </Container>
    )
}
const Progress = styled.div`
    
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  clip: rect(0px, 100px, 100px, 50px);

`
const Container = styled.div`
    width: 33%;
    min-width: 600px;
    height: 400px;
    background: var(--main-background);
    border-radius: 20px;
    position: relative;
    left: -90px;
    padding: 20px;
    .post-head{
        display: flex;
        align-items: flex-start;
        min-height: 360px;
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
const UserPicture = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
`
const TextInputField = styled.textarea`
    margin-left: 8px;
    width: 100%;
    color: white;
    background: none;
    outline: none;
    border: none;
    font-size: 20px;
    font-family: "Segoe UI";
    resize: none;
    min-height: 300px;
    max-height: 360px;

`
const PostButton = styled.button`
    background-color: var(--main-color);
    color: var(--white);
    outline: none;
    border: none;
    padding: 15px 30px;
    border-radius: 20px;
    margin-left: 4px;
    cursor: pointer;
    transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    :hover{
        background: var(--second-color)
    }
`
const Actions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .text-actions{
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
    .end{
        display: flex;
    }
`
const Action = styled.img`
    cursor: pointer;
    transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    :hover{
        height: 1.8rem;
    }
`
export default CreatePost
