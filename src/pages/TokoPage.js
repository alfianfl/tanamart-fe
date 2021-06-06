import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProdukCostumer from "../components/ProdukCostumer";
import "../assets/css/profile_toko.css";
import axios from "axios";
import swal from "sweetalert";
function TokoPage(props) {
  const [idToko, setIdToko] = useState(null);
  const [tokoUser, setTokoUser] = useState(null);
  const buttonAdd = () => {
    if (idToko != null) {
      window.location.href = "/addProduk";
    } else {
      swal({
        title: "Kamu Harus Buat Toko Terlebih Dahulu",
        icon: "warning",
        dangerMode: true,
      });
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/tokoByUser/${props.idUser}`)
      .then((response) => {
        setIdToko(response.data.id_toko);
        setTokoUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/tokoDetails/${idToko}`)
      .then((response) => {
        setTokoUser(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.idUser, idToko]);

  return (
    <div style={{ backgroundColor: "#E5E5E5" }} className="pb-5">
      <section id="profile-toko">
        <div className="container-fluid py-5 px-lg-5 px-md-3 px-sm-0">
          <div className="row ml-sm-0">
            <div className=" col-lg-12 d-flex justify-content-between">
              {tokoUser ? (
                <div className="d-flex flex-wrap">
                  <div className="thumb-img ">
                    <img
                      src={tokoUser.foto_toko}
                      alt="profile"
                      width="100%"
                    />
                  </div>
                  <div className=" ml-4 d-flex flex-column justify-content-around ">
                    <div className="user-profile">
                      <strong>{tokoUser.nama_toko}</strong> <br />
                      {/* <p className="mt-2">
                        4.6 <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </p> */}
                      <p>
                        <strong>{tokoUser.deskripsi_toko}</strong>
                      </p>
                    </div>
                    <div className="button-edit">
                      <Link to="/editToko">
                        <button className="btn btn-edit-profile">
                          Edit Toko
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="d-flex flex-wrap">
                  <div
                    className="thumb-img "
                    style={{
                      backgroundImage:
                        "url(https://image000.flaticon.com/png/512/126/126122.png)",
                      backgroundSize: "120px",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* <img
                      src="https://image000.flaticon.com/png/512/126/126122.png
"
                      alt="profile"
                      width="100%"
                      height="700%"
                      className="img-fluid"
                    /> */}
                  </div>
                  <div className=" ml-4 d-flex flex-column justify-content-around ">
                    <div className="user-profile">
                      <strong>Toko ....</strong> <br />
                      <p>
                        <strong>Produk ...</strong>
                      </p>
                    </div>
                    <div className="button-edit">
                      <Link to="/editToko">
                        <button className="btn btn-edit-profile">
                          Buat Toko
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              <div className="button-add-produk ">
                <button onClick={buttonAdd} className="btn btn-sm btn-produk">
                  <strong style={{ textDecoration: "none", color: "white" }}>
                    Tambah Produk
                  </strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProdukCostumer idToko={idToko} />
    </div>
  );
}

export default TokoPage;
