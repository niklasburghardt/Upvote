import styled from 'styled-components'
import { Backdrop } from '@mui/material'
import React from 'react'

export const InputField = ({ open, page }) => {
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
            <Container>
                {page}
            </Container>
        </Backdrop>
    )
}
const Container = styled.div`
    width: 33%;
    min-width: 600px;
    height: 400px;
    background: var(--main-background);
    border-radius: 20px;
    position: relative;
    left: -90px;
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
