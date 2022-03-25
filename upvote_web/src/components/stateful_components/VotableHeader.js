import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import IconButton from './IconButton'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import StoryView from './StoryView'
import { InputField } from './InputField'
import PopUpContext from '../../context/PopUpContext'

TimeAgo.addDefaultLocale(en)

function VotableHeader(props) {
    const timeAgo = new TimeAgo()

    const { upvote, setStory } = useContext(PopUpContext)

    const timeToMilliseconds = (dateString) => {
        const myDate = new Date(dateString)

        const milli = Date.now() - myDate
        if (milli) {
            return timeAgo.format(Date.now() - milli)
        }

        return "some day"
    }

    return (
        <>
            <Header>
                <ProfilePicture src="/images/obama.jpg" onClick={() => setStory(props)} />

                <div className='user-info'>
                    <div className='upper-header'>
                        <Link to={"/" + props.user}><span className='full-name'>{props.first_name} {props.last_name} </span>

                            <span className='username'> ⤴ {timeToMilliseconds(props.created)}</span>
                            {props.updated != props.created ? <span className='username'> (edited ⤴ {timeToMilliseconds(props.updated)})</span> : <span></span>}</Link>
                        <IconButton icon={props.dismiss ? 'bi-x' : 'bi-three-dots'} onClick={props.dismiss} />
                    </div>
                    <div className='lower-header'>
                        <Link className='username' to={"/" + props.user}>@{props.user}</Link>
                    </div>
                </div>

            </Header>


        </>
    )
}
const Header = styled.div`
    display: flex;
    align-items: center;
    .user-info{
        margin-left: 4px;
        width: 100%;
    }
    .full-name{
        font-size: 16px;
    }
    .username{
        font-size: 16px;
        color: var(--main-grey-color);
        &:hover{
            text-decoration:underline ;
        }
        
        
    }
    .upper-header{
        display: flex;
        justify-content: space-between;
        i{
            font-size: 1.3rem;
        }
    }
`
const ProfilePicture = styled.img`
    width: 56px;
    height: 56px;
    border-radius: 50%;
    
`

export default VotableHeader