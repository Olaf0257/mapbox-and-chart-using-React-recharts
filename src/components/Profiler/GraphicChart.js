/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */
import React, { useContext, useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Album } from '@material-ui/icons'
import { RouteContext } from '../config/RouteContext'
import * as turf from '@turf/turf'
import '../Style/Tooltip.css'

const CustomizedDot = (props) => {
    const { cx, isShow = false, payload: { image }} = props;
    if (isShow) {
        return (<image x={cx} y={0} width={30} height={30} xlinkHref={`https://api.guidos.fun/${image}`} alt="" />);
    } else 
        return (<></>);
}

const GraphicChart = props => {
    const { routes, setCurrentMarker } = useContext(RouteContext)
    const [currentIndex, setCurrentIndex] = useState(null)
    const [leftKm, setLeftKm] = useState('')
    const [totalLen, setTotalLen] = useState(0)

    //Remaining distance
    useEffect((dataNew) => {
        const calcDist = () => {
            const geoSlice = [...routes.geoJson.coordinates]
            if (currentIndex > -1 && currentIndex <= geoSlice.length) {
                dataNew = [...geoSlice.splice(0, geoSlice.length - (currentIndex - 1))]
                const line = turf.lineString(dataNew);
                const totallength = turf.lineDistance(line, 'kilometers')
                setLeftKm(totallength.toFixed(2))
                setTotalLen(parseFloat(totallength.toFixed(0)))
                if (totalLen > 0) {
                }
            }
        }
        calcDist()
    }, [currentIndex])// eslint-disable-line react-hooks/exhaustive-deps

    //Near poi in geojson
    //Get all poi
    const geodata = [];
    for (const dataa of routes.geoJson.coordinates) {
        geodata.push({
            lat: dataa[2],
            lon: dataa[1],
        })
    }

    const getCurrentPoiIndex = (line, pt, snapped) => {
        const poiData = []
        for (const poi of routes.pointsOfInterest) {
            poiData.push([poi.longitude, poi.latitude, poi.type.mapIcon.contentUrl])
        }
        line = turf.lineString(routes.geoJson.coordinates);
        for (const points of poiData) {
            pt = turf.point([points[0], points[1]]);
            snapped = turf.nearestPointOnLine(line, pt, { units: 'kilometers' });
            geodata.push({
                lat: Number(snapped.properties.index),     
                lan: 0,
                image: points[2]         
            });
        }
    }
    getCurrentPoiIndex()

    let mark = []
    const dotChart = {
        r: 10,
        stroke: "white",
        strokeWidth: 5,
        onClick: (event, data) => {
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

    const sortGeoData = geodata.sort((a, b) => a.lat - b.lat);

    return (
        <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={sortGeoData} margin={{ top: 30, left: 20, right: 30, bottom: 20 }} >
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
                <CartesianGrid opacity={0.3} vertical={false} horizontal={true} />
                <XAxis dataKey="lon" axisLine={true} tickLine={true} tickCount={totalLen} tickFormatter={item => `${Number(item).toFixed() / 2.3 / 4 / 5} km`} />

                <YAxis axisLine={true} tickLine={false} tickCount={5} tickFormatter={number => `${number} m`} />

                <Tooltip position={{ y: -20 }} content={< CustomTooltip />} />

                <Area type="monotone" dataKey="lat" stroke="url(#line)" strokeWidth={2} fill="url(#color)" activeDot={{ ...dotChart }}
                    dot={(params) => {
                        return <CustomizedDot 
                            {...params} 
                            isShow={!!params.payload.image}
                        />
                    }}
                />
            </AreaChart>
        </ResponsiveContainer >
    );
}
export default GraphicChart;