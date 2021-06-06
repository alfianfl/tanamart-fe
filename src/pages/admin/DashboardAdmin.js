import React, { useEffect, useState } from 'react'
import '../../assets/css/admin/artikelAdmin.css'
import axios from 'axios'


function DashboardAdmin() {
    const [orderList, setOrderList] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/showOrderAdmin/`, { withCredentials: true })
            .then((response) => {
                console.log(response)
                setOrderList(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div id="content">
            <div className="d-flex flex-column mr-5">

                <div className="cart-header">
                    <div className="row d-flex">
                        <div className="col-3 text-left">Nama pembeli</div>
                        <div className="col-2 text-left">Nama barang</div>
                        <div className="col-2 ">Toko</div>
                        <div className="col-1 ">Jumlah</div>
                        <div className="col-2 ">Status</div>
                        <div className="col-2">Total harga</div>
                    </div>
                </div>
                {orderList.errors ? (
                    <div className="cart-body mt-2"></div>
                ) : (
                    <div className="cart-body mt-2">
                        {orderList.map((order) => (
                            <div className="row d-flex pb-4">
                                <div className="col-3 text-left">{order.nama}</div>
                                <div className="col-2 text-left">{order.nama_barang}</div>
                                <div className="col-2 ">{order.nama_toko}</div>
                                <div className="col-1 ">{order.qty}</div>
                                <div className="col-2 ">
                                    {order.status === 2 ? (
                                        <div>Belum dikirim</div>
                                    ) : (
                                        <div>Terkirim</div>
                                    )}
                                </div>
                                <div className="col-2">
                                    Rp {order.total_price.toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default DashboardAdmin
