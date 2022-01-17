import '../Style/RightButtons.css'

const RightButtons = (props) => {

    return (

        <div className="right" >
            {props.children}
            <button className="btn first">3D</button>
            <button className="btn" onClick={props.mapStyle}>Sattelite</button>
            <button className="btn">GPX</button>
            <button className="btn">Mobile</button>
        </div>
    )
}

export default RightButtons;