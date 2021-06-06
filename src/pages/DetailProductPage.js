import React, { useState, useEffect } from "react";
import "../assets/css/detailProdukPage.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
function DetailProductPage(props) {
  const localId = localStorage.getItem("id");
  let history = useHistory();
  const { id_barang } = props.match.params;
  const [count, setCount] = useState(1);
  const [value, setValue] = useState(0);
  const [detailBarang, setDetailBarang] = useState("");
  const [toko, setToko] = useState(null);
  const minHandler = () => {
    if (count === 1) {
      setCount(count - 0);
    } else {
      setCount(count - 1);
    }
    console.log(count);
  };
  const plusHandler = () => {
    if (count + 1 > detailBarang.qty) {
      swal(`maks pembelian produk ini = ${detailBarang.qty} buah`);
    } else {
      setCount((prevCount) => prevCount + 1);
    }
    console.log(count);
  };
  const inputHandler = (e) => {
    setValue(e.target.value);
    setCount((prevCount) => prevCount + value - 1);
  };

  useEffect(() => {
    console.log(props.idUser);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/productDetails/${id_barang}`)
      .then((response) => {
        console.log(response.data);
        setDetailBarang(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/tokoDetails/${detailBarang.id_toko}`)
      .then((response) => {
        setToko(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    localStorage.setItem("qty", JSON.stringify(detailBarang.qty));
  }, [id_barang, detailBarang.qty, detailBarang.id_toko, props.idUser]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const payload = {
      id_barang: id_barang,
      id_user: props.idUser,
      qty: count,
      status: 1,
    };
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/addCart`, payload, { withCredentials: true })
      .then((response) => {
        console.log(response.status);
        if (localId || localId != null) {
          if (response.status === 200) {
            swal("Lengkapi Dulu Biodata Sebelum Membeli").then((value) => {
              window.location.href = `/profile`;
            });
          } else if (response.status === 201) {
            swal({
              title: "Lets checkout!",
              text: "Product added to your cart!",
              icon: "success",
              button: "Aww yiss!",
            });
            history.push("/checkout");
          }
        } else {
          swal("Kamu Harus Login Dulu");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ backgroundColor: "#f1f1f1" }}>
      {detailBarang ? (
        <div className="container-fluid pt-5">
          <section id="detail-produk">
            <div className="row">
              <div className="col-12 ">
                <div className="container-produk px-sm-0  py-3 px-lg-3 d-flex  flex-wrap">
                  <div className="thumb-image-produk">
                    <div className="gambar-produk">
                      <img
                        src={detailBarang.foto}
                        alt="produk"
                        height="330px"
                        width="100%"
                      />
                    </div>
                  </div>
                  <div className="deskripsi-produk ml-lg-3 ml-sm-0 ">
                    <div className="px-1">
                      <h4>{detailBarang.nama_barang}</h4>
                      <p>
                        <strong>Rp {detailBarang.harga_barang.toLocaleString()}</strong>
                      </p>
                      <div>
                        <strong>Stok : {detailBarang.qty - count}</strong>
                      </div>
                    </div>
                    <div
                      className="thumb-checkout justify-content-end d-flex px-1 flex-column "
                      style={{ height: "70%" }}
                    >
                      <div className="my-2">
                        <h4>Kuantitas</h4>
                        <button className="btn-kuantitas" onClick={minHandler}>
                          -
                        </button>
                        <input
                          type="number"
                          className="kuantitas"
                          value={count}
                          onChange={inputHandler}
                          disabled
                        />
                        <button className="btn-kuantitas" onClick={plusHandler}>
                          +
                        </button>
                      </div>
                      <div className="d-flex my-4 w-100 justify-content-between">
                        <button
                          onClick={onSubmitHandler}
                          className="btn-beli mb-3"
                        >
                          Tambah Ke Keranjang
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="deskripsi-produk">
            <div className="row my-3">
              <div className="col-lg-7 col-sm-12 mb-3">
                <div
                  className="thumb-deskripsi p-3"
                  style={{ height: "500px" }}
                >
                  <h3>Deskripsi Produk</h3>
                  <p>{detailBarang.deskripsi}</p>
                </div>
              </div>
              {toko ? (
                <div className="col-lg-5 col-sm-12">
                  <div className=" thumb-toko d-flex flex-column align-items-center p-3">
                    <div className="toko-img">
                      <img
                        src={toko.foto_toko}
                        alt="toko"
                        width="100%"
                        height="100%"
                        style={{ borderRadius: "50%" }}
                      />
                    </div>
                    <div>{toko.nama_toko}</div>
                    <div>Online</div>
                    <a
                      href={`https://api.whatsapp.com/send/?phone=${toko.kontak_toko}?&app_absent=0`}
                    >
                      <button className="btn-beli w-100 mt-5 mb-3 mt-auto">
                        Hubungi penjual
                      </button>
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

export default DetailProductPage;
