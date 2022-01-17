import { Close } from '@material-ui/icons'
import { API_URL } from '../config/config'
import style from '../Style/Poi.module.css'
import { StyleImage } from './StyledComponents'

const PointOfInterest = props => {

    return (
        <div className={style.container}>
            <StyleImage imageUrl={`${API_URL}${props.image}`}>
                <button className={style.close}>
                    <Close onClick={props.close} cursor="pointer" />
                </button>
            </StyleImage>
            <article>
                <div className={style.element}>
                    <div className={style.heading}>
                        <h1> {props.name} </h1>
                        <h2> {props.subname} </h2>
                    </div>
                    <div className={style.diviconpoi}>
                        <img src={`${API_URL}${props.icon}`} alt='point-of-interest' className={style.iconpoi} />
                    </div>
                </div>
                <p> {props.description} </p>
            </article>
        </div >
    )
}

export default PointOfInterest;