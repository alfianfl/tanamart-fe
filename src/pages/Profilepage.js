import { useState, useEffect } from "react";
import "../assets/css/profilePage.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Profilepage(props) {
  const [bioUser, setBioUser] = useState([]);
  const [idBio, setIdBio] = useState(null);
  const localEmail = localStorage.getItem("email");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/biodataByUser/${props.idUser}`)
      .then((response) => {
        setIdBio(response.data.id_bio);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/biodataDetails/${idBio}`)
      .then((response) => {
        setBioUser(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.idUser, idBio]);

  return (
    <section
      id="profile-page"
      style={{ marginBottom: "150px", backgroundColor: "white" }}
    >
      {bioUser ? (
        <div className="container-fluid py-5 px-lg-5 px-md-3 px-sm-0">
          <div className="row ml-lg-5 ml-sm-0">
            <div className="col-sm-6 col-lg-2">
              <div className="thumb-img ">
                <img
                  src={bioUser.profile_pict}
                  alt="profile"
                  width="100%"
                />
              </div>
            </div>
            <div className="col-sm-6 col-lg-10 d-flex flex-column  ">
              <div className="user-profile">
                <strong>{bioUser.nama}</strong> <br />
              </div>
              <div className="button-edit">
                <Link to="/editprofile">
                  <button className="btn btn-edit-profile mt-2">
                    Edit profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="row ml-lg-5 ml-sm-0 mt-5 ">
            <div className="col-12 ">
              <div className="detail-profile">
                <div className="alamat">
                  <strong>Alamat</strong>
                  <p>{bioUser.alamat}</p>
                </div>
                <div className="email">
                  <strong>Email</strong>
                  <p>{localEmail}</p>
                </div>
                <div className="no-telp mb-5">
                  <strong>No HP</strong>
                  <p>{bioUser.no_hp}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid py-5 px-lg-5 px-md-3 px-sm-0">
          <div className="row ml-lg-5 ml-sm-0">
            <div className="col-sm-6 col-lg-2">
              <div className="thumb-img ">
                <img
                  src="https://image000.flaticon.com/png/512/2948/2948035.png"
                  alt="profile"
                />
              </div>
            </div>
            <div className="col-sm-6 col-lg-10 d-flex flex-column  ">
              <div className="user-profile">
                <strong>...</strong> <br />
              </div>
              <div className="button-edit">
                <Link to="/editprofile">
                  <button className="btn btn-edit-profile">Buat profile</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="row ml-lg-5 ml-sm-0 mt-5">
            <div className="col-12">
              <div className="detail-profile">
                <div className="alamat">
                  <strong>Alamat</strong>
                  <p>...</p>
                </div>
                <div className="email">
                  <strong>Email</strong>
                  <p>{localEmail}</p>
                </div>
                <div className="no-telp mb-5">
                  <strong>No HP</strong>
                  <p>...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Profilepage;
