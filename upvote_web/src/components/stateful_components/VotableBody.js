import React from 'react'
import styled from 'styled-components'

function VotableBody({ content, image, navigate }) {
    return (
        <Body onClick={navigate}>
            {content}
            <Image src="/images/grand.jpg" />
        </Body>
    )
}
const Body = styled.div`
    font-size: 16px;
    margin-top: 8px;

`
const Image = styled.img`
    display: block;
    width: 100%;
    border-radius: 10px;
    margin-top: 8px;
`
export default VotableBody