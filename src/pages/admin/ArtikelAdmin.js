import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import swal from "sweetalert"

function ArtikelAdmin() {
    const [artikel, setArtikel] = useState([])

    const deleteHandler = (id_artikel) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this article!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios
                    .delete(`${process.env.REACT_APP_BACKEND_URL}/deleteArtikel/${id_artikel}`, {
                        withCredentials: true,
                    })
                    .then((response) => {
                        console.log(response);
                        const atk = [...artikel];
                        const index = atk.findIndex(
                            (list) => list.id_artikel === id_artikel
                        );
                        console.log(index)
                        atk.splice(index, 1);
                        setArtikel(atk);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                swal("Poof! This article has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("This article is safe!");
            }
        });
    }


    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/getArtikel`)
            .then((response) => {
                setArtikel(response.data);
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    return (
        <div id="content">
            <div className="d-flex flex-column mr-5">
                <Link to="/dashboard/artikel/add">
                    <button className="btn-buat-thread" style={{ width: "300px" }}>Buat Artikel Baru</button>
                </Link>

                <div className="cart-header">
                    <div className="row d-flex">
                        <div className="col-1">No</div>
                        <div className="col-7 text-left">Judul Artikel</div>
                        <div className="col-3">Aksi</div>
                    </div>
                </div>

                {artikel.length !== 0 ? (
                    <div className="cart-body mt-2">
                        {artikel.map((hasil, index) => (
                            <div className="row d-flex">
                                <div className="col-1">{index + 1}</div>
                                <div className="col-7 text-left">{hasil.judul_artikel}</div>
                                <div className="col-3">
                                    <Link to={`/editArtikel/${hasil.id_artikel}`} >
                                        <button className="btn-edit">Edit</button>
                                    </Link>
                                    <span> </span>
                                    <button onClick={() => deleteHandler(hasil.id_artikel)} className="btn-hapus">Hapus</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : null}

            </div>
        </div>
    )
}

export default ArtikelAdmin
