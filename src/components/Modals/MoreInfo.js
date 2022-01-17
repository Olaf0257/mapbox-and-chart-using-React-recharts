import React, { useContext } from 'react'
import { Close } from '@material-ui/icons'
import { API_URL } from '../config/config'
import { RouteContext } from '../config/RouteContext'
import { MoreInfoDiv } from './StyledComponents'
import styled from '../Style/MoreInfo.module.css'

import { ReactComponent as Gpx } from '../assets/MoreInfo/gpxicon.svg'
import { ReactComponent as Descriptive } from '../assets/MoreInfo/descriptive.svg'



import { ReactComponent as Clock } from '../assets/MoreInfo/time.svg'
import { ReactComponent as Distance } from '../assets/MoreInfo/distance.svg'
import { ReactComponent as Up } from '../assets/MoreInfo/updist.svg'
import { ReactComponent as Down } from '../assets/MoreInfo/downdist.svg'


const MoreInfo = (props) => {
    const { routes } = useContext(RouteContext)
    return (
        <div className={styled['card-more-info']}>
            <MoreInfoDiv imageUrl={`${API_URL}${routes.images[0].contentUrl}`}>
                <button className={styled["back-more-info"]}>
                    <Close onClick={props.close} cursor="pointer" />
                </button>
                <div className={styled["etq-more-info"]}>
                    <div className={styled["logo-more-info"]}>{routes.provider.name}</div>
                    <div className={styled["level-more-info"]}>{routes.routeActivities[0].level.name}</div>
                </div>
            </MoreInfoDiv>

            <div className={styled["icon-text-more-info"]}>
                <div className={`${styled["stats-more-info"]} ${styled['first-more-info']}`}>
                    <div className={styled["icon-more-info"]}>
                        <Clock />
                    </div>
                    <div className={styled["type-more-info"]}>{routes.routeActivities[0].duration} min</div>
                </div>
                <div className={`${styled["stats-more-info"]} ${styled["border-more-info"]}`}>
                    <div className={styled["icon-more-info"]}>
                        <Distance />
                    </div>
                    <div className={styled["type-more-info"]}>21 km</div>
                </div>
                <div className={`${styled["stats-more-info"]} ${styled["border-more-info"]} ${styled["left-more-info"]}`}>
                    <div className={styled["icon-more-info"]}>
                        <Up />
                    </div>
                    <div className={styled["type-more-info"]}>1240 m</div>
                </div>
                <div className={styled["stats-more-info"]}>
                    <div className={styled["icon-more-info"]}>
                        <Down />
                    </div>
                    <div className={styled["type-more-info"]}>250 m</div>
                </div>
            </div>

            <div className={`${styled["informations-more-info"]} ${styled["text-more-info"]}`}>
                <div className={styled["heading-more-info"]}>
                    <h1>{routes.name}</h1>
                    <h2>{routes.provider.name}</h2>
                </div>
                <p className={styled["p-more-info"]}>
                    {routes.description}
                </p>
            </div>
            <div className={styled["buttons-more-info"]}>
                <button className={styled["purple-more-info"]}>
                    <Gpx style={{ marginRight: "2%" }} />
                    {/* <ArrowForward style={{ color: "#00ab84" }} /> */}
                    Telecharger le GPX
                </button>

                <a href={`${API_URL}${routes.gpx.contentUrl}`} className={styled["fwd-more-info"]}>
                    Page complete descriptive
                    <Descriptive />
                </a>
            </div>
        </div >
    )

}

export default MoreInfo;


