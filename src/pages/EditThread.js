import React from 'react'
import '../assets/css/addThread.css'
import { useReducer, useState } from "react"
import { useHistory } from "react-router-dom"
import axios from 'axios'
import swal from "sweetalert"

const initialState = {
    judul: "",
    isi: "",
    gambar: null,
}

const reducer = (currentState, action) => {
    switch (action.type) {
        case "judul":
            return { ...currentState, judul: action.upload };
        case "isi":
            return { ...currentState, isi: action.upload };
        case "gambar":
            return { ...currentState, gambar: action.upload };
        default:
            return currentState;
    }
}

function EditThread(props) {
    // const localID = localStorage.getItem("id")
    const { id_thread } = props.match.params
    const id_thread_int = parseInt(id_thread)
    const [disable, setDisable] = useState(false);
    let history = useHistory();

    const [thread, dispatch] = useReducer(reducer, initialState)

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setDisable(true);
        const data = new FormData();
        data.append("id_threads", id_thread_int);
        // data.append("id_user", props.idUser);
        data.append("judul_threads", thread.judul);
        data.append("isi_threads", thread.isi);
        data.append("foto_threads", thread.gambar);
        console.log(id_thread_int)
        console.log(data)


        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/editThreads`, data)
            .then((response) => {
                setDisable(false);
                swal("Thread berhasil diedit")
                console.log(response)
                history.push("/forum")
            })
            .catch((err) => {
                swal({
                    title: "Gagal mengedit thread",
                    icon: "warning",
                    dangerMode: true,
                })
                console.log(err)
            })
    }

    return (
        <section id="add-thread">
            <div className="container-fluid py-5" style={{ backgroundColor: "#E5E5E5" }}>
                <h1 className="text-center">
                    <strong>Edit Thread</strong>
                </h1>
                <div className="form-add-thread w-100 mt-5">
                    <div className="d-flex flex-column">
                        <div className="form-group">
                            <label htmlFor="judul">Judul</label>
                            <input
                                disabled={disable}
                                name="judul"
                                type="text"
                                value={thread.judul}
                                onChange={(e) =>
                                    dispatch({ type: "judul", upload: e.target.value })
                                }
                                className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="isi">Isi</label>
                            <textarea
                                disabled={disable}
                                name="isi" id="isi" cols="30" rows="10"
                                value={thread.isi}
                                onChange={(e) =>
                                    dispatch({ type: "isi", upload: e.target.value })
                                }
                                className="form-control"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="judul">Gambar</label>
                            <input
                                disabled={disable}
                                name="gambar"
                                accept="image/*"
                                onChange={(e) =>
                                    dispatch({
                                        type: "gambar",
                                        upload: e.target.files[0],
                                    })
                                }
                                type="file"
                                className="form-control p-1 pl-5"
                            />
                        </div>
                        <button disabled={disable} onClick={onSubmitHandler} className="btn-buat-thread">Post</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditThread
