import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import swal from "sweetalert";
import "../assets/css/invoicePenjual.css";

function TokoInvoice(props) {
  const [invoiceToko, setInvoiceToko] = useState([]);
  const [idToko, setIdToko] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/tokoByUser/${props.idUser}`)
      .then((response) => {
        setIdToko(response.data.id_toko);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/tokoInvoice/${idToko}`)
      .then((response) => {
        console.log(response.data);
        setInvoiceToko(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.idUser, idToko]);

  const onSubmitHandler = (id) => {
    console.log(id);
    swal({
      title: "Anda Sudah Yakin Barang Siap Untuk Dikirim?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const payload = {
          id_order: id,
        };
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/sendProduct`, payload)
          .then((response) => {
            console.log(response);
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        swal("Persiapkan Dulu Barangnya Ya Sebelum Kamu Kirim!");
      }
    });
  };
  return (
    <section id="invoice-penjual">
      <div
        className="container-fluid p-0 py-5 px-lg-5 px-0"
        style={{ marginBottom: "5%" }}
      >
        <div className="ml-0">
          <h1>Tabel Invoice Penjual</h1>
        </div>
        <div className="table-invoice" style={{ overflow: "scroll" }}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Nama</th>
                <th scope="col">Alamat</th>
                <th scope="col">Barang</th>
                <th scope="col">Qty</th>
                <th scope="col">Total Harga</th>
                <th scope="col">Status Pesanan</th>
              </tr>
            </thead>
            <tbody>
              {invoiceToko.map((order) => (
                <tr>
                  <td>{order.nama}</td>
                  <td>{order.alamat}</td>
                  <td>{order.nama_barang}</td>
                  <td>{order.qty}</td>
                  <td>Rp {order.total_price.toLocaleString()}</td>
                  <td>
                    {order.status === 2 ? (
                      <button
                        style={{ color: "white" }}
                        className="btn btn-warning"
                        onClick={() => onSubmitHandler(order.id_order)}
                      >
                        Kirim Barang
                      </button>
                    ) : order.status === 3 ? (
                      <button
                        style={{ color: "white" }}
                        disabled
                        className="btn btn-warning"
                      >
                        Terkirim
                      </button>
                    ) : (
                      <button
                        style={{ color: "white" }}
                        disabled
                        className="btn btn-success"
                      >
                        Barang Diterima
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <h1 className="ml-lg-5 ml-0">Produk Pilihan</h1>
      <ProductCard />
    </section>
  );
}

export default TokoInvoice;
