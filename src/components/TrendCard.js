import React from 'react'
import sayur from "../assets/img/image3.png"

function TrendCard(props) {
    return (
        <div className="container trend-card mb-2">
            <div className="row">
                <div className="col-6">
                    <img className="thumb-trend" src={sayur} alt="" />
                </div>
                <div className="col-6">{props.judul}</div>
            </div>
        </div>
    )
}

export default TrendCard
