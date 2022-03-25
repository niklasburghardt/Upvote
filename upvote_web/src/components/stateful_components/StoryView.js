import styled from 'styled-components'
import React from 'react'
import { Backdrop } from '@mui/material'

function StoryView(props) {
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={props.open}>
            <Container>
                Nice
            </Container>
        </Backdrop>
    )
}
const Container = styled.div`
    width: 33%;
    min-width: 400px;
    height: 700px;
    background: var(--main-background);
    border-radius: 20px;
    position: relative;
    left: 0;
    padding: 20px;
    .post-head{
        display: flex;
        align-items: flex-start;
        min-height: 360px;
        .cancle-button{
            cursor: pointer;
            transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
            :hover{
                background-color: var(--second-background);
                border-radius: 50%;
            }
        }
    }
    .progress{
        color: white;
    }
`
export default StoryView