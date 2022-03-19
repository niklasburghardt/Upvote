import React from 'react'
import styled from 'styled-components'

function PostOptions({ text, post, postText }) {
    return (
        <Actions>
            <div className='text-actions'>
                <input type="file" name='postImage' />
                <Action src="/icons/hash.svg" />
                <Action src="/icons/at.svg" />

            </div>
            <div className="end">
                <Progress>{text.length}</Progress>
                <PostButton onClick={post}>
                    {postText}
                </PostButton>
            </div>
        </Actions>
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

export default PostOptions