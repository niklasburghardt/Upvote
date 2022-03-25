import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { respondComment } from '../../axios/AxiosInstance'
import AuthContext from '../../context/AuthContext'
import MainButton from '../stateless_components/MainButton'
function ResponseInput({ commentId, refetch }) {
    const [text, setText] = useState("")
    const { tokens } = useContext(AuthContext)
    const sendResponse = async (e) => {
        e.preventDefault()
        const response = await respondComment(tokens.access, commentId, text)
        setText("")
        refetch()
    }
    return (
        <Container>
            <form onSubmit={sendResponse}>
                <TextInputField spellCheck="false" placeholder="What do you think about that?" onChange={(e) => setText(e.target.value)} value={text} />
                <Button onClick={sendResponse} >Respond</Button>

            </form>
        </Container>
    )
}

const Container = styled.div`
    form{
    display: flex;
    align-items: flex-end;
    margin-bottom: 8px;
    }
`
const TextInputField = styled.input`
    margin-left: 8px;
    width: 100%;
    color: white;
    background: none;
    outline: none;
    border: none;
    font-size: 20px;
    font-family: "Segoe UI";
    
    
    resize: none;
    

`
const Button = styled.div`
    background-color: var(--main-color);
    border-radius: 10px;
    padding: 4px;
    cursor: pointer;
    transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    &:hover{
        background-color: var(--second-color)
    }
`
export default ResponseInput