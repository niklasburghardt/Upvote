import React from 'react'
import styled from 'styled-components'

function StatisticShow({ value, label }) {
    return (
        <Container>
            <Number className='num'>{value}</Number>
            <Label className='label'>{label}</Label>
        </Container>
    )
}
const Container = styled.div`
    display: flex;
    flex-direction:column ;
    align-items: center;
    &:hover{
        .num{
            color: white;
        }
       
    }
`
const Number = styled.div`
    font-size: 24px;
    font-family: var(--upvote-font);
    font-weight:300 ;
    color: var(--main-grey-color);
    transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    
`
const Label = styled.div`
    font-size: 16px;
    transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `
export default StatisticShow