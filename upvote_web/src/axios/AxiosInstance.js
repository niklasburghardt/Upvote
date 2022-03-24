import axios from "axios";
import { useIsFetching } from "react-query";

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 1000,
    headers: {
        "Content-Type": "application/json"
    }
})

const likeComment = async (comment, auth) => {
    const options = {

        method: "POST",
        headers: {
            "Authorization": "Bearer " + auth,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "comment": comment,
        })

    }

    const response = await fetch("http://localhost:8000/api/votables/comments/32/likes", options)
    console.log("mynice", response)
    return response
}
const postVotable = async (auth, content, image, upvotes) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + auth,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "content": content,
            "upvotes": upvotes,

        })
    }
    const response = await fetch("http://localhost:8000/api/votables/", options)
    return response.json()
}
const postComment = async (auth, content, image, votable) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + auth,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "content": content,
            "votable": votable,
        })
    }
    const response = await fetch("http://localhost:8000/api/votables/" + votable + "/comments/", options)
    return response.json()
}
const upvoteVotable = async (auth, votable, amount) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + auth,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "paid": amount,
            "upvote_score": 0,
            "active": true,
            "votable": votable,
            "sold": null,
        })
    }
    const response = await fetch("http://localhost:8000/api/votables/" + votable + "/upvote/", options).then(result => console.log("rese", result.ok))
    return response
}
const followUser = async (auth, followed) => {
    const options = {
        "method": "POST",
        headers: {
            "Authorization": "Bearer " + auth,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "followed": followed,
            "follower": 1
        })
    }
    const response = await fetch("http://localhost:8000/api/users/" + followed + "/follow", options)
    return response.json()
}
export default api
export { likeComment, postVotable, upvoteVotable, postComment, followUser }