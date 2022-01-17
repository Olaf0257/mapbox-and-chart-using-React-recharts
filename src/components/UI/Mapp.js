import React, { useState, useContext } from 'react';
import { MAPBOX_KEY } from '../config/config'
import ReactMapGL, { Marker, Popup, NavigationControl, FullscreenControl, Source, Layer } from 'react-map-gl';
import PointOfInterest from '../Modals/Poi'
import { API_URL } from '../config/config'
import RightButtons from './RightButtons'
import LeftButtons from './LeftButtons '
import { RouteContext } from '../config/RouteContext'
import { ReactComponent as MarkerIcon } from '../assets/currentPosition.svg'
import { ReactComponent as StartIcon } from '../assets/start_icon.svg'
import { ReactComponent as EndIcon } from '../assets/end_icon.svg'



const Mapp = () => {

    const { routes, currentMaker } = useContext(RouteContext)

    const [viewport, setViewport] = useState({
        height: "80vh",
        latitude: routes.startingPoint.latitude,
        longitude: routes.startingPoint.longitude,
        fitBounds: 'center',
        zoom: 12.5,

    });



    const [currentPlace, setCurrentPlace] = useState(null)
    const [mapS, setMapS] = useState('mapbox://styles/mapbox/streets-v11')


    const fullscreenControlStyle = {
        top: 0,
        right: 0,
        marginRight: 0,
        marginTop: 40,
        padding: '10px'
    };

    const handleMarkerClick = name => {
        setCurrentPlace(name)
    }

    const changeMapStyle = () => {

        if (mapS === "mapbox://styles/mapbox/streets-v11") {
            setMapS('mapbox://styles/mapbox/satellite-streets-v11')
        } else { setMapS('mapbox://styles/mapbox/streets-v11') }

    }

    const bounds = [[routes.geoJson.coordinates[0][1], routes.geoJson.coordinates[0][0]], [routes.geoJson.coordinates[routes.geoJson.coordinates.length - 1][1], routes.geoJson.coordinates[routes.geoJson.coordinates.length - 1][0]]]


    return (
        <React.Fragment>

            <ReactMapGL {...viewport} width={"100%"} mapboxApiAccessToken={MAPBOX_KEY} onViewportChange={nextViewport => setViewport(nextViewport)} mapStyle={mapS} fitBounds={bounds}>
                <RightButtons mapStyle={changeMapStyle} >
                    <FullscreenControl style={fullscreenControlStyle} />
                    <NavigationControl showCompass={false} />
                </RightButtons>
                <LeftButtons />

                {
                    currentMaker.length > 0 ? (
                        <Marker latitude={currentMaker[1]} longitude={currentMaker[0]} offsetLeft={-20} offsetTop={-10}>

                            <MarkerIcon />
                        </Marker>
                    ) : null
                }

                {/* STARTING POINT */}
                <Marker latitude={routes.geoJson.coordinates[0][1]} longitude={routes.geoJson.coordinates[0][0]} offsetLeft={-20} offsetTop={-10}>
                    <StartIcon style={{ width: "45px", maxWidth: "45px", height: 70, transform: "translate3d(0,-60%,0)" }} />
                </Marker>

                {/* ENDING POINT */}
                <Marker latitude={routes.geoJson.coordinates[routes.geoJson.coordinates.length - 1][1]} longitude={routes.geoJson.coordinates[routes.geoJson.coordinates.length - 1][0]} offsetLeft={-20} offsetTop={-10}>
                    <EndIcon style={{ width: "45px", maxWidth: "45px", height: 70, transform: "translate3d(-5px,-60%,0)" }} />
                </Marker>


                {
                    routes && routes.pointsOfInterest.map(p => (
                        <React.Fragment key={p["@id"]}>
                            <Marker latitude={p.latitude} longitude={p.longitude} offsetLeft={-20} offsetTop={-10}>
                                <img src={`${API_URL}${p.type.mapIcon.contentUrl}`} alt='point-of-interest-marker' style={{ width: "45px", maxWidth: "45px", transform: "translate3d(0,-50%,0)", zIndex: -1, cursor: "pointer" }} onClick={() => handleMarkerClick(p.name)} />
                            </Marker>
                            {p.name === currentPlace && (
                                <Popup latitude={p.latitude} longitude={p.longitude} closeButton={false} closeOnClick={true} anchor="left">
                                    <PointOfInterest name={p.name} subname={p.type.name} description={p.description} image={p.image.contentUrl} icon={p.type.icon.contentUrl} close={() => setCurrentPlace(null)} />
                                </Popup>
                            )}
                        </React.Fragment>
                    ))
                }

                <Source id='route' type='geojson' data={routes && routes.geoJson} />
                <Layer
                    id='route'
                    type='line'
                    source='route'
                    layout={{
                        'line-join': 'round',
                        'line-cap': 'round'
                    }}
                    paint={{
                        'line-color': '#051B45',
                        'line-width': 8
                    }}
                />


            </ReactMapGL >
        </React.Fragment>
    )
};

export default Mapp;