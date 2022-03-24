import React, { useContext, useRef, useState } from 'react'
import styled from 'styled-components'
import { CircularProgress } from '@mui/material';
import { postVotable, upvoteVotable } from '../../axios/AxiosInstance';
import AuthContext from '../../context/AuthContext';
import VotableHeader from './VotableHeader'
import VotableSmallBody from './VotableSmallBody';
import IconButton from './IconButton';

function UpvotePost(props) {
    const [upvotes, setUpvotes] = useState(0);
    const [loading, setLoading] = useState(false);
    const { tokens, userInfo } = useContext(AuthContext)

    const post = async (e) => {
        e.preventDefault()

        const upvote = await upvoteVotable(tokens.access, props.id, upvotes)
        props.dismiss()
    }
    const increment = (num) => {
        if (upvotes + num >= 0) {
            setUpvotes(upvotes + num);
            console.log(upvotes)
        }
    }
    const changeUpvotes = (e) => {
        if (userInfo.upvotes - e.target.value < 0) {
            return
        }
        if (e.target.value === "" || e.target.value < 0) {
            setUpvotes(0);
            return;
        }
        let amount = parseInt(e.target.value);
        try {
            setUpvotes(parseInt(amount))
        } catch {
            setUpvotes(upvotes)
        }

    }

    return (
        <Container>
            <form action="">
                <VotableHeader first_name={props.first_name} last_name={props.last_name} username={props.username} created={props.created} updated={props.updated} dismiss={props.dismiss} />
                <VotableSmallBody content={props.content} navigate={props.navigate} />
                <Upvote>
                    <CurrentUpvotes>
                        <div className='current'>
                            <IconButton icon="bi-arrow-up-square" />
                            <span>{userInfo && userInfo.upvotes}</span>
                        </div>
                        <div className='current'>
                            <IconButton icon="bi-arrow-return-right" />
                            {userInfo && userInfo.upvotes - upvotes}
                        </div>
                    </CurrentUpvotes>
                    <UpvoteCount onChange={changeUpvotes} inputMode='numeric' value={upvotes}>
                    </UpvoteCount>
                    <UpvoteActions>
                        <div onClick={() => increment(upvotes > 9 ? 10 : 1)}>
                            <i className='bi-plus-lg' />
                        </div>
                        <div onClick={() => increment(upvotes > 19 ? -10 : -1)}>
                            <i className='bi-dash-lg' />
                        </div>
                    </UpvoteActions>
                </Upvote>
                <div className='actions'>
                    <PostButton onClick={post}>
                        {!loading ? <p>POST</p> : <CircularProgress />}
                    </PostButton>
                </div>
            </form>
        </Container >
    )
}
const Container = styled.div`
    
    .actions{
        position: absolute;
        right: 0px;
        bottom: 0px;
        margin: 18px;
    }
    
`
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .cancle-button{
            cursor: pointer;
            transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
            :hover{
                background-color: var(--second-background);
                border-radius: 50%;
            }
        }
`
const PostButton = styled.button`
    background-color: var(--main-color);
    color: var(--white);
    outline: none;
    border: none;
    padding: 5px 30px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    :hover{
        background: var(--second-color)
    }
`
const Upvote = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    
`
const UpvoteCount = styled.input`
    background: none;
    border:none;
    color: white;
    font-family: var(--upvote-font);
    font-size: 50px;
    
    max-width: 400px;
    text-align: center;
    outline: none;
`
const UpvoteActions = styled.div`
    div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        cursor:pointer ;
    }
`
const CurrentUpvotes = styled.div`
    
    .current{
        margin: 10px;
        font-size: 16px;
        display: flex;
        align-items: center;
        i{
            margin-right: 8px;
        }
    }
`

export default UpvotePost
