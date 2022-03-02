import React, { useContext } from 'react'
import { useState } from 'react'
import HomePageVotable from '../components/stateful_components/HomePageVotable'
import AuthContext from '../context/AuthContext'

function Home() {
    const [myData, setData] = useState()
    const [loaded, setLoaded] = useState(false)
    const [nextUrl, setNextUrl] = useState()
    const { tokens } = useContext(AuthContext)

    const rootUrl = "http://localhost:8000/api"
    const getData = () => {
        const getUrl = `${rootUrl}/votables/`
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokens.access
            },

        }
        fetch(getUrl, options).then(result => {

            console.log(result)
            return result.json()
        }).then((x) => {
            setData(x.results)
            console.log(x["results"])
            setNextUrl(x["next"])
            console.log(myData)
        })
    }
    const loadNext = () => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
        const getUrl = nextUrl
        fetch(getUrl, options).then(result => {

            console.log(result)
            return result.json()
        }).then((x) => {
            const newData = myData
            for (let i = 0; i < x.results.length; i++) {
                newData.push(x.results[i])
            }
            console.log("newdata", newData)
            setData(newData)
            console.log(x["results"])
            setNextUrl(x["next"])
            console.log(myData)
        })
    }
    const deleteFromData = (id) => {
        let data = myData
        data = data.filter(item => !(item.id == id))
        setData(data)
    }

    return (
        <div className="App ">
            <button onClick={getData}>Get Votables</button>
            <div>
                {myData && myData.map((result) => {
                    return <HomePageVotable delete={deleteFromData} last_name={result.last_name} first_name={result.first_name} username={result.user} content={result.content} created={result.created} id={result.id}></HomePageVotable>
                })}
                {myData && <button onClick={loadNext}>Next</button>}
            </div>
        </div>
    );
}

export default Home