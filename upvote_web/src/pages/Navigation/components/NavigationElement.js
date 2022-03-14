import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function NavigationElement({ title, icon, page, selected }) {
    return (
        <Container>
            <Link to={`/${page}`}>
                <img src={icon} alt="" />
                <h2>{title}</h2>
            </Link>
        </Container>
    )
}

const Container = styled.div`
    transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: 5px;
    padding: 0px 10px;
    :hover{
        background: var(--second-background);
        border-radius: 20px;
    }
    a{
        @media screen and (max-width: 1000px){
            margin: 40px;
        }
        display: flex;
        align-items: center;
        text-decoration: none;
        h2{
            color: var(--white);
            margin-left: 8px;
            @media screen and (max-width: 1000px){
                display: none;
            }
        }
    }
    img{
        width: 28px;
        height: 28px;
    }
`
export default NavigationElement
