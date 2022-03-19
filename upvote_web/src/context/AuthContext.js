import { createContext, useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {

    let [user, setUser] = useState(() => localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null)
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null)
    let [loading, setLoading] = useState(true)
    let [userInfo, setUserInfo] = useState()

    const history = useNavigate()
    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'username': e.target.username.value,
                'password': e.target.password.value,
            })
        })
        let data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            let userInfo = await fetch("http://localhost:8000/api/users/self/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + data.access
                }
            })
            let userData = await userInfo.json()
            if (userInfo.status === 200) {
                setUserInfo(userData.results[0])
            }
        } else {
            alert("Something went wrong")
            return
        }

    }
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        setUserInfo(null)

    }

    let updateToken = async () => {
        console.log("TOKEN UPDATED...")
        let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'refresh': authTokens?.refresh
            })
        })
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            let userInfo = await fetch("http://localhost:8000/api/users/self/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + data.access
                }
            })
            let userData = await userInfo.json()
            if (userInfo.status === 200) {
                console.log("info", userData.results[0])
                setUserInfo(userData.results[0])
            }
        } else {
            logoutUser()
        }
        if (loading) {
            setLoading(false)
        }
    }
    let contextData = {
        user: user,
        tokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        userInfo: userInfo

    }
    useEffect(() => {
        if (loading) {
            updateToken()
        }
        const fourMinutes = 1000 * 60 * 4
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}