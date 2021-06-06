import { useReducer, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const initialState = {
  nama_barang: "",
  harga_barang: null,
  qty: null,
  foto_barang: null,
  deskripsi: "",
};
const reducer = (currentState, action) => {
  switch (action.type) {
    case "namabarang":
      return { ...currentState, nama_barang: action.payload };
    case "hargabarang":
      return { ...currentState, harga_barang: action.payload };
    case "qty":
      return { ...currentState, qty: action.payload };
    case "fotobarang":
      return { ...currentState, foto_barang: action.payload };
    case "deskripsi":
      return { ...currentState, deskripsi: action.payload };
    default:
      return currentState;
  }
};

function AddProduk(props) {
  let history = useHistory();
  const [idToko, setIdToko] = useState(null);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/tokoByUser/${props.idUser}`)
      .then((response) => {
        setIdToko(response.data.id_toko);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.idUser]);
  const [products, dispatch] = useReducer(reducer, initialState);
  const onSubmitHandeler = (e) => {
    e.preventDefault();
    setDisable(true);
    console.log(props.idToko);
    const data = new FormData();
    data.append("id_toko", idToko);
    data.append("nama_barang", products.nama_barang);
    data.append("harga_barang", products.harga_barang);
    data.append("rating_barang", 5);
    data.append("foto", products.foto_barang);
    data.append("qty", products.qty);
    data.append("deskripsi", products.deskripsi);

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/addProduct`, data)
      .then((response) => {
        setDisable(false);
        console.log(response);
        window.location.href = "/toko";
        swal("Upload berhasil");
      })
      .catch((err) => {
        swal("Upload gagal, jangan ada data yang kosong");
        window.location.href = "/addProduk";
        console.log(err);
      });
  };

  return (
    <div>
      <div
        className="container-fluid py-5"
        style={{ backgroundColor: "#E5E5E5" }}
      >
        <h1 className="text-center">
          <strong>Tambah Produk</strong>
        </h1>
        <div className="row">
          <div className="col-12 px-lg-5 px-sm-0">
            <div className=" align-self-end button-edit mt-5">
              <Link to="toko">
                <button className="btn btn-sm btn-edit-profile">Back</button>
              </Link>
            </div>
            <div className="form-add-product  w-100 mt-5 ">
              <form className="d-flex flex-column">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    <strong>Nama Produk</strong>
                  </label>
                  <input
                    disabled={disable}
                    name="namabarang"
                    onChange={(e) =>
                      dispatch({ type: "namabarang", payload: e.target.value })
                    }
                    value={products.nama_barang}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    <strong>Deskripsi Produk</strong>
                  </label>
                  <textarea
                    disabled={disable}
                    name="deskripsi"
                    onChange={(e) =>
                      dispatch({ type: "deskripsi", payload: e.target.value })
                    }
                    value={products.deskripsi}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    <strong>Harga Barang</strong>
                  </label>
                  <input
                    disabled={disable}
                    name="hargabarang"
                    onChange={(e) =>
                      dispatch({ type: "hargabarang", payload: e.target.value })
                    }
                    value={products.harga_barang}
                    type="number"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    <strong>QTY</strong>
                  </label>
                  <input
                    disabled={disable}
                    name="qty"
                    onChange={(e) =>
                      dispatch({ type: "qty", payload: e.target.value })
                    }
                    value={products.qty}
                    type="number"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    <strong>Foto</strong>
                  </label>
                  <input
                    disabled={disable}
                    name="fotobarang"
                    accept="image/*"
                    onChange={(e) =>
                      dispatch({
                        type: "fotobarang",
                        payload: e.target.files[0],
                      })
                    }
                    type="file"
                    className="form-control"
                  />
                </div>
                <button
                  disabled={disable}
                  style={{ backgroundColor: "#184D47", color: "white" }}
                  onClick={onSubmitHandeler}
                  type="submit"
                  className="btn "
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduk;
