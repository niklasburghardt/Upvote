import React, { useState } from 'react'
import styled from 'styled-components'
function PostInput({ text, setText }) {

    return (
        <Container>
            <hr />
            <form action="">
                <div className='post-head'>
                    <UserPicture src="/images/obama.jpg" />
                    <TextInputField rows="5" placeholder="Comment here" onChange={(e) => setText(e.target.value)} />

                </div>


            </form>
        </Container>
    )
}

const Container = styled.div`
    margin-top: 10px;
    hr{
       background-color: var(--main-grey-color); 
    }
    form{
        max-height: 200px;
    }
`


const UserPicture = styled.img`
    width: 56px;
    height: 56px;
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
    min-height: 100px;
    max-height: 150px;

`

export default PostInput