import React, { useState, useEffect } from 'react'
import axios from "axios"
import swal from "sweetalert"

function UserAdmin() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/getUser`, {
                withCredentials: true,
            })
            .then((response) => {
                setUsers(response.data);
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const deleteHandler = (id_user) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios
                    .delete(`${process.env.REACT_APP_BACKEND_URL}/deleteUser/${id_user}`, {
                        withCredentials: true,
                    })
                    .then((response) => {
                        console.log(response);
                        const user = [...users];
                        const index = user.findIndex(
                            (list) => list.id_user === id_user
                        );
                        console.log(index)
                        user.splice(index, 1);
                        setUsers(user);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                swal("Poof! This user has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("This user is safe!");
            }
        });
    }

    return (
        <div id="content">
            <div className="d-flex flex-column mr-5">

                <div className="cart-header">
                    <div className="row d-flex">
                        <div className="col-1">No</div>
                        <div className="col-2 text-left">Id user</div>
                        <div className="col-6 text-left">Email user</div>
                        <div className="col-2">Aksi</div>
                    </div>
                </div>

                {users.errors ? (
                    <div className="cart-body mt-2"></div>
                ) : (
                    <div className="cart-body mt-2">
                        {users.map((list, index) => (
                            <div>
                                {list.role !== 1 ? (
                                    <div className="row d-flex pb-2">
                                        <div className="col-1">{index + 1}</div>
                                        <div className="col-2 text-left">{list.id_user}</div>
                                        <div className="col-6 text-left">{list.email}</div>
                                        <div className="col-2">
                                            <button onClick={() => deleteHandler(list.id_user)} className="btn-hapus">Hapus</button>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}

export default UserAdmin
