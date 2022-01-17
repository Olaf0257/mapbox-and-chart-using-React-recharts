import React, { useEffect, useState } from 'react'
import Mapp from '../UI/Mapp'
import { HEADERS } from '../config/config'
import axios from 'axios'
// import Elevation from './Chart'
import ElevationProfile from "../Profiler/ElevationProfile";
import { RouteContext } from '../config/RouteContext'


import '../Style/Card.css'

const Container = () => {
    const [routes, setRoutes] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [currentMaker, setCurrentMarker] = useState([])

    useEffect(() => {
        axios.get('https://api.guidos.fun/routes/977b8024-4166-4aa5-a146-422f51a95353', { headers: HEADERS })
            .then(res => {
                setRoutes(res.data)
                setLoading(false)
            })
    }, [])


    if (isLoading) {
        return (
            <h2 style={{ fontSize: '30px', fontWeight: 800 }}>Loading...</h2>
        )
    }

    if (!isLoading) {
        console.log('all routes', routes)
    }



    return (

        <RouteContext.Provider value={{ routes, currentMaker, setCurrentMarker }}>
            <Mapp />
            <ElevationProfile />
            {/* <Elevation /> */}
        </RouteContext.Provider>
    )
}

export default Container;