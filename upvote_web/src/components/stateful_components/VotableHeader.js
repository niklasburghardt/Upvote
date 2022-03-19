import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import IconButton from './IconButton'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

function VotableHeader(props) {
    const timeAgo = new TimeAgo()

    return (
        <Header>
            <Link className='username' to={"/" + props.username}><ProfilePicture src="/images/obama.jpg" /></Link>

            <div className='user-info'>
                <div className='upper-header'>
                    <Link to={"/" + props.username}><span className='full-name'>{props.first_name} {props.last_name} </span>

                        <span className='username'> ⤴ {timeAgo.format(Date.now() - 398423)}</span>
                        {props.updated != props.created ? <span className='username'> (edited ⤴ {timeAgo.format(Date.now() - 32342)})</span> : <span></span>}</Link>
                    <IconButton icon={props.dismiss ? 'bi-x' : 'bi-three-dots'} onClick={props.dismiss} />
                </div>
                <div className='lower-header'>
                    <Link className='username' to={"/" + props.username}>@{props.username}</Link>
                </div>
            </div>

        </Header>
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