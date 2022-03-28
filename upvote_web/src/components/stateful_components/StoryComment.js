import styled from 'styled-components'
import React from 'react'

function StoryComment({ comment }) {
    return (
        <Container>
            {comment}
        </Container>
    )
}
const Container = styled.div`
    width: 100%;
    text-align: center;
    line-height: 2rem;
    font-size: 20px;

`
export default StoryComment