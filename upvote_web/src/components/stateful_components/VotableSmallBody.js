import styled from 'styled-components'
import React from 'react'

function VotableSmallBody({ image, content }) {
    if (typeof (content) === "string") {
        const len = content.length
        content = content.substring(0, 140)
        content += len > 140 ? "..." : ""

    }
    return (
        <Body >
            <Image src={image} />
            {content}
        </Body>
    )
}
const Body = styled.div`
    font-size: 16px;
    margin-top: 8px;
    display: flex;
    justify-content: flex-start;
`
const Image = styled.img`
    display: block;
    margin-right: 8px;
    height: 60px;
    border-radius: 10px;
    margin-top: 8px;
`
export default VotableSmallBody