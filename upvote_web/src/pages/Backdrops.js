import React, { useContext } from 'react'
import { InputField } from '../components/stateful_components/InputField'
import StoryView from '../components/stateful_components/StoryView'
import PopUpContext from '../context/PopUpContext'
import UpvotePost from '../components/stateful_components/UpvotePost'
import CommentPost from '../components/stateful_components/CommentPost'

function Backdrops() {
    const { upvote, uDetail, setUpvote, comment, cDetail, setComment, story, sDetail, setStory, } = useContext(PopUpContext)
    return (
        <div>
            {sDetail && <StoryView open={story} dismiss={setStory} id={sDetail.id} content={sDetail.content} username={sDetail.user} first_name={sDetail.first_name} last_name={sDetail.last_name} created={sDetail.created} updated={sDetail.updated} image={sDetail.image} />}
            {uDetail && <InputField page={<UpvotePost id={uDetail.id} content={uDetail.content} username={uDetail.user} first_name={uDetail.first_name} last_name={uDetail.last_name} created={uDetail.created} updated={uDetail.updated} image={uDetail.image} dismiss={setUpvote} />} open={upvote} />}
            {cDetail && <InputField page={<CommentPost id={cDetail.id} content={cDetail.content} username={cDetail.user} first_name={cDetail.first_name} last_name={cDetail.last_name} created={cDetail.created} updated={cDetail.updated} image={cDetail.image} dismiss={setComment} />} open={comment} />}
        </div>
    )
}

export default Backdrops