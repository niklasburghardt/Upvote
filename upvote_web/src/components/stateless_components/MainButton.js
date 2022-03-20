import React from 'react'
import styled from 'styled-components'

function MainButton({ onClick, label }) {
    return (
        <PostButton onClick={onClick}>{label}</PostButton>
    )
}
const PostButton = styled.div`
    
    background: var(--main-color);
    padding: 10px 20px;
    
    border-radius: 10px;
    cursor: pointer;
    font-size: 20px;
    font-weight: 500;
    transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    :hover{
        background: var(--second-color);
    }
    `
export default MainButton