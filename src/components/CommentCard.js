import React, { useState, useEffect } from 'react'
import axios from "axios"
import ReactTimeAgo from 'react-time-ago'

function CommentCard(props) {
    const [nama, setNama] = useState()
    const localIdUser = localStorage.getItem("id");
    const id_user = parseInt(localIdUser)
    const date = props.tanggal
    const dt = new Date(date)

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/biodataByUser/${props.idUser}`)
            .then((response) => {
                setNama(response.data.nama)
            })
            .catch((err) => {
                console.log(err)
            })
    })

    return (
        <div className="komentar-body">
            <div className="d-flex justify-content-between">
                <h6 style={{ fontSize: "14px" }}>{nama}</h6>
                <h6 style={{color: "grey", fontSize: "12px" }}><ReactTimeAgo date={dt} locale="en-US"/></h6>
            </div>
            <h6>{props.isiComment}</h6>
            {id_user === props.idUser ? (
                <div onClick={props.deleteButton} className="hapus-thread pt-3" style={{ fontSize: "12px" }}>
                    <p>Hapus</p>
                </div>
            ) : null}
        </div>
    )
}

export default CommentCard
