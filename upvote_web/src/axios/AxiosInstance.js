import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 1000,
    headers: {
        "Content-Type": "application/json"
    }
})

const likeComment = async (comment, auth) => {
    const options = {
        headers: {
            "Authorization": "Bearer " + auth
        },
        body: JSON.stringify({
            "comment": 32
        })
    }

    console.log("auth", options)
    const response = await api.post(`votables/comments/${comment}/likes`, options)
    console.log("respone", response)
    return response.status
}

export default api
export { likeComment }