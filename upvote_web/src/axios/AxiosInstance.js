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
const postVotable = async (auth, content, upvotes) => {
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
export default api
export { likeComment, postVotable, upvoteVotable }