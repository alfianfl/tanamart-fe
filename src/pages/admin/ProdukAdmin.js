import React, { useState, useEffect } from 'react'
import axios from "axios"
import swal from "sweetalert"

function ProdukAdmin() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/product`)
            .then((response) => {
                setProducts(response.data);
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const deleteHandler = (id_barang) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary product!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios
                    .delete(`${process.env.REACT_APP_BACKEND_URL}/deleteProduct/${id_barang}`, {
                        withCredentials: true,
                    })
                    .then((response) => {
                        console.log(response);
                        const product = [...products];
                        const index = product.findIndex(
                            (list) => list.id_barang === id_barang
                        );
                        console.log(index)
                        product.splice(index, 1);
                        setProducts(product);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
        console.log("produk")
        console.log(products);
        console.log(id_barang)
    }

    return (
        <div id="content">
            <div className="d-flex flex-column mr-5">
                {/* <button className="btn-buat-thread" style={{ width: "300px" }}>Buat Artikel Baru</button> */}

                <div className="cart-header">
                    <div className="row d-flex">
                        <div className="col-1">No</div>
                        <div className="col-4 text-left">Nama toko</div>
                        <div className="col-4 text-left">Nama produk</div>
                        <div className="col-2">Aksi</div>
                    </div>
                </div>

                {products.length !== 0 ? (
                    <div className="cart-body mt-2">
                        {products.map((produk, index) => (
                            <div className="row d-flex pb-2">
                                <div className="col-1">{index + 1}</div>
                                <div className="col-4 text-left">{produk.toko.nama_toko}</div>
                                <div className="col-4 text-left">{produk.nama_barang}</div>
                                <div className="col-2">
                                    <button onClick={() => deleteHandler(produk.id_barang)} className="btn-hapus">Hapus</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : null}

            </div>
        </div>
    )
}

export default ProdukAdmin
