import styled from 'styled-components'
import React from 'react'


function IconLabelButton({ icon, value, onClick, color, hover = "white" }) {

    return (
        <Container onClick={onClick} hoverc={hover} normalc={color}>

            <i className={icon} />

            <span className='label'>{value}</span>
        </Container>
    )
}
const Container = styled.div`
    cursor: pointer;
    color: var(--main-grey-color);
    display: flex;
    align-items: center;
    fill: var(--main-grey-color);
    transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    .label{
        margin-left: 16px;
    }
    i{
        font-size: 1.3rem;
    }
    color: ${props => (props.normalc)};

    &:hover{
        color: ${props => (props.hoverc)};
    }
    
`

export default IconLabelButton