import React from 'react'
import styled from 'styled-components'

function IconButton({ onClick, icon, color }) {
    return (
        <Icon onClick={onClick} className={icon} />
    )
}

const Icon = styled.i`
    font-size: 1.3rem;
    cursor: pointer;
    transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    &:hover{
        color: var(--main-grey-color);
    }
`


export default IconButton