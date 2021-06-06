import { useState } from "react";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useReducer } from "react";
import axios from "axios";
import swal from "sweetalert";

const initialState = {
  nama: "",
  alamat: "",
  profile_pict: null,
  no_hp: "",
  deskripsi: "",
  rekening: "",
};
const reducer = (currentState, action) => {
  switch (action.type) {
    case "nama":
      return { ...currentState, nama: action.payload };
    case "alamat":
      return { ...currentState, alamat: action.payload };
    case "profile_pict":
      return { ...currentState, profile_pict: action.payload };
    case "no_hp":
      return { ...currentState, no_hp: action.payload };
    case "deskripsi":
      return { ...currentState, deskripsi: action.payload };
    case "rekening":
      return { ...currentState, rekening: action.payload };
    default:
      return currentState;
  }
};
function EditToko(props) {
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [toko, dispatch] = useReducer(reducer, initialState);
  const [disable, setDisable] = useState(false);

  const handleChange = (e) => {
    dispatch({ type: "profile_pict", payload: e.target.files[0] });
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  let history = useHistory();
  const submitToko = (e) => {
    e.preventDefault();
    setDisable(true);
    const idUser = props.idUser;
    const data = new FormData();
    data.append("id_user", idUser);
    data.append("nama_toko", toko.nama);
    data.append("alamat_toko", toko.alamat);
    data.append("foto_toko", toko.profile_pict);
    data.append("kontak_toko", toko.no_hp);
    data.append("deskripsi_toko", toko.deskripsi);
    data.append("rekening", toko.rekening);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/addToko`, data)
      .then((response) => {
        setDisable(false);
        window.location.href = "/toko";
        swal("Upload berhasil");
      })
      .catch((err) => {
        alert("Upload gagal, jangan ada data yang kosong");
        window.location.href = "/editToko";
      });
  };

  return (
    <section id="edit-toko">
      <div className="container-fluid pb-5">
        <div className="row">
          <div className="col-12 ">
            <div className="content-1-profile w-100 d-flex flex-column mt-3">
              {image.preview ? (
                <div className="thumb-img m-auto">
                  <img
                    src={image.preview}
                    alt="dummy"
                    width="300"
                    height="300"
                  />
                </div>
              ) : (
                <div className="thumb-img m-auto"
                  style={{
                    backgroundImage:
                      "url(https://image000.flaticon.com/png/512/126/126122.png)",
                    backgroundSize: "120px",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}>
                  {/* <img src="#" alt="dummy" width="300" height="300" /> */}
                </div>
              )}
              <div className="button-edit mx-auto mt-2">
                <label htmlFor="upload-button">
                  <div className="btn btn-sm btn-edit-profile"> Upload</div>
                </label>
                <input
                  disabled={disable}
                  type="file"
                  id="upload-button"
                  hidden
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-section px-lg-5 px-sm-0">
              <form className="d-flex flex-column">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    <strong>Nama Toko</strong>
                  </label>
                  <input
                    disabled={disable}
                    onChange={(e) =>
                      dispatch({ type: "nama", payload: e.target.value })
                    }
                    type="text"
                    className="form-control"
                    id="exampleInputNama"
                    aria-describedby="Name"
                    placeholder="Enter Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    <strong>Alamat Toko</strong>
                  </label>
                  <input
                    disabled={disable}
                    onChange={(e) =>
                      dispatch({ type: "alamat", payload: e.target.value })
                    }
                    type="text"
                    className="form-control"
                    id="exampleInputAlamat"
                    aria-describedby="Alamat"
                    placeholder="Enter Address"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    <strong>Nomor Rekening</strong>
                  </label>
                  <input
                    disabled={disable}
                    onChange={(e) =>
                      dispatch({ type: "rekening", payload: e.target.value })
                    }
                    type="text"
                    className="form-control"
                    id="exampleInputNama"
                    aria-describedby="Name"
                    placeholder="Enter No Rekening"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    <strong>Kontak Toko</strong>
                  </label>
                  <input
                    disabled={disable}
                    onChange={(e) =>
                      dispatch({ type: "no_hp", payload: e.target.value })
                    }
                    type="number"
                    className="form-control"
                    id="exampleInputNo"
                    aria-describedby="NoTelp"
                    placeholder="Enter No Telp"
                  />
                </div>
                <div className="form-group">
                  <label>
                    <strong>Deskripsi</strong>
                  </label>
                  <textarea
                    disabled={disable}
                    onChange={(e) =>
                      dispatch({ type: "deskripsi", payload: e.target.value })
                    }
                    type="text"
                    className="form-control"
                    id="exampleInputNo"
                    aria-describedby="deskripsi"
                    placeholder="Enter deskripsi"
                  />
                </div>
                <div className=" align-self-end button-edit mt-2">
                  <button
                    disabled={disable}
                    onClick={submitToko}
                    className="btn btn-sm btn-edit-profile"
                    type="button"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default EditToko;
