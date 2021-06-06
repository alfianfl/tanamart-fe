import React from 'react'
import '../assets/css/cardForum.css'
import { Link } from "react-router-dom"

function ForumCard(props) {
    const localID = localStorage.getItem("id")
    const userId = props.id
    const userIdString = userId.toString()
    console.log(props.idThreads)

    return (
        <section id="forum-card">
            <div>
                <Link
                    className="link"
                    to={`/singleThread/${props.idThreads}`}>
                    {props.judul ? (
                        <div>
                            <h5>{props.judul}</h5>
                        </div>
                    ) : null}
                </Link>
                <Link
                    className="link"
                    to={`/singleThread/${props.idThreads}`}>
                    {props.gambar ? (
                        <div>
                            <img className="thumb-forum" src={props.gambar} alt="forum" />
                        </div>
                    ) : null}
                </Link>
                <Link
                    className="link"
                    to={`/singleThread/${props.idThreads}`}>
                    {props.isi ? (
                        <div>
                            <p className="isi-forum">{props.isi}</p>
                        </div>
                    ) : null}
                </Link>

                <div className="d-flex">
                    <Link
                        className="link"
                        to={`/singleThread/${props.idThreads}`}>
                        <div className="m-2">
                            <h6>Komentar</h6>
                        </div>
                    </Link>

                    {localID === userIdString ? (
                        <Link className="link d-flex align-items-center ml-3" to={`/editThread/${props.idThreads}`} >
                            <h6>Edit</h6>
                        </Link>
                    ) : null}

                    {localID === userIdString ? (
                        <div onClick={props.deleteButton} className="m-2 hapus-thread ml-4" >
                            <h6>Hapus</h6>
                        </div>
                    ) : null}
                </div>
            </div>


        </section>
    )
}

export default ForumCard
