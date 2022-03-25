import React from 'react'
import styled from 'styled-components'

function VotableBody({ content, image, navigate }) {
    return (
        <Body onClick={navigate}>
            {content}
            {image && <Image src="/images/grand.jpg" />}
        </Body>
    )
}
const Body = styled.div`
    font-size: 16px;
    margin-top: 0px;

`
const Image = styled.img`
    display: block;
    object-fit: contain;
    
    border-radius: 10px;
    margin-top: 8px;
    max-height: 500px;
    min-height: 400px;
    max-width: 600px;
    
`
export default VotableBody