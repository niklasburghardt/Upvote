import { createContext, useState } from "react";
import AuthContext from "./AuthContext";

const PopUpContext = createContext()

export default PopUpContext

export const PopUpProvider = ({ children }) => {
    const [upvote, setUpvote] = useState(false)
    const [comment, setComment] = useState(false)
    const [story, setStory] = useState(false)

    const [uDetail, setUDetail] = useState(null)
    const [cDetail, setCDetail] = useState(null)
    const [sDetail, setSDetail] = useState(null)

    const openUpvote = (props) => {
        if (upvote == true) {
            setUpvote(false)
            return
        }
        setUpvote(true)
        setUDetail(props)
    }
    const openComment = (props) => {
        if (comment == true) {
            setComment(false)
            return
        }
        setComment(true)
        setCDetail(props)

    }
    const openStory = (props) => {
        if (comment == true) {
            setComment(false)
            return
        }
        setStory(true)
        setSDetail(props)


    }

    let contextData = {
        upvote: upvote,
        uDetail: uDetail,
        setUpvote: openUpvote,
        comment: comment,
        cDetail: cDetail,
        setComment: openComment,
        story: story,
        sDetail: sDetail,
        setStory: openStory
    }

    return (
        <PopUpContext.Provider value={contextData}>
            {children}
        </PopUpContext.Provider>
    )
}
