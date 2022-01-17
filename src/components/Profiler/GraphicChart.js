import React, { useContext, useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Album } from '@material-ui/icons'
import { RouteContext } from '../config/RouteContext'


import * as turf from '@turf/turf'
import '../Style/Tooltip.css'



const GraphicChart = props => {

    const { routes, setCurrentMarker } = useContext(RouteContext)



    const [currentIndex, setCurrentIndex] = useState(null)
    const [leftKm, setLeftKm] = useState('')
    //Remaining distance

    useEffect((dataNew) => {
        const calcDist = () => {
            const geoSlice = [...routes.geoJson.coordinates]

            if (currentIndex > -1 && currentIndex <= geoSlice.length) {
                dataNew = [...geoSlice.splice(0, geoSlice.length - (currentIndex - 1))]
                const line = turf.lineString(dataNew);
                const totallength = turf.lineDistance(line, 'kilometers')
                setLeftKm(totallength.toFixed(2))
            }
        }
        calcDist()
    }, [currentIndex])// eslint-disable-line react-hooks/exhaustive-deps


    //Near poi in geojson
    //Near poi in geojson
    //Near poi in geojson
    //Near poi in geojson
    var line = turf.lineString(routes.geoJson.coordinates);
    var pt = turf.point([routes.pointsOfInterest[4].latitude, routes.pointsOfInterest[4].longitude]);
    var snapped = turf.nearestPointOnLine(line, pt, { units: 'kilometers' });
    console.log(" ", snapped)
    console.log("index ", routes.geoJson.coordinates[1306])
    ////////////////////////////////////////////
    ////////////////////////////////////////////
    ////////////////////////////////////////////
    ////////////////////////////////////////////
    ////////////////////////////////////////////



    const geodata = [];

    for (const dataa of routes.geoJson.coordinates) {
        geodata.push({
            lat: dataa[2],
            lon: dataa[1],
        })

    }


    let mark = []
    const dotChart = {
        r: 10,
        stroke: "white",
        strokeWidth: 5,
        onClick: (event, data) => {
            // console.log(data)
            mark = [routes.geoJson.coordinates[data.index][0], routes.geoJson.coordinates[data.index][1]]
            if (mark !== "undefined") {
                setCurrentMarker(mark)
                setCurrentIndex(data.index)

            }
        }
    }


    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="border-tooltip">

                    <div className="btn-tooltip">
                        <Album style={{ fontSize: 10, color: "white", marginRight: 5 }} />
                        <a href="!#" className="bttn-tooltip"> 180 min</a>
                    </div>

                    <div className="btn-tooltip">
                        <Album style={{ fontSize: 10, color: "white", marginRight: 5 }} />
                        <a href="!#" className="bttn-tooltip">{leftKm}km</a>
                    </div>

                    <div className="btn-tooltip">
                        <Album style={{ fontSize: 10, color: "white", marginRight: 5 }} />
                        <a href="!#" className="bttn-tooltip">eff</a>
                        {/* <a href="!#" className="bttn-tooltip">{payload[0].value.toFixed(0)} m</a> */}
                    </div>

                    <div className="btn-tooltip last-tooltip">
                        <Album style={{ fontSize: 10, color: "white", marginRight: 5 }} />
                        <a href="!#" className="bttn-tooltip">240m</a>
                    </div>

                </div>
            );
        }

        return null;
    };


    return (
        <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={geodata} margin={{ top: 20, left: 20, right: 30, bottom: 20 }} >
                <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00AB84" stopOpacity={0.4} />
                        <stop offset="25%" stopColor="#00AB84" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="line" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="95%" stopColor="#00AB84" stopOpacity={1} />
                        <stop offset="1%" stopColor="#00AB84" stopOpacity={0.9} />
                    </linearGradient>
                </defs>
                <CartesianGrid opacity={0.3} vertical={true} strokeDasharray="1 2" />
                <XAxis dataKey="lon" axisLine={false} tickLine={false} tickFormatter={number => `${number.toFixed()} km`} />
                <YAxis axisLine={false} tickLine={false} tickCount={5} tickFormatter={number => `${number} m`} />
                <Tooltip position={{ y: -20 }} content={< CustomTooltip />} followPointer={true} />
                <Area type="monotone" dataKey="lat" stroke="url(#line)" strokeWidth={2} fill="url(#color)" activeDot={{ ...dotChart }}>
                    {/* <LabelList dataKey="poi" position="top" /> */}
                </Area>


                <ReferenceLine x={1306} strokeDasharray="5 5" />
                <ReferenceLine x={867} strokeDasharray="5 5" />
                <ReferenceLine x={867} strokeDasharray="5 5" />
            </AreaChart>
        </ResponsiveContainer >
    );

}
export default GraphicChart;