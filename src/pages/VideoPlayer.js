import React from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import "../assets/css/videoPlayer.css";

const Videoplayer = (props) => {
  const { id } = props.match.params;
  const localIdUser = localStorage.getItem("id");
  const buttonToko = () => {
    if (localIdUser) {
      window.location.href = "/toko";
    } else {
      swal({
        title: "Kamu Harus Login Terlebih Dahulu",
        icon: "warning",
        dangerMode: true,
      });
    }
  };

  return (
    <div style={{ backgroundColor: "#E5E5E5" }} className="py-5">
      <section id="video-player">
        <div className="container-fluid p-0 ">
          <div className="row mx-lg-3 mx-0">
            <div className="col-12 col-lg-9 order-1 ">
              <div className="  video-player mb-3 mt-lg-0 mt-5 ">
                <iframe
                  title={id}
                  className="video-iframe"
                  src={`https://www.youtube.com/embed/${id}`}
                />
                {/* <h5>{title}</h5> */}
              </div>
            </div>
            <div className="col-12 col-lg-3 order-2">
              <div className="thumb-button  px-2">
                <Link to="/videoPage">
                  <button className="btn btn-lg btn-back">Kembali</button>
                </Link>

                <button
                  onClick={buttonToko}
                  className="btn btn-lg btn-buat-toko"
                >
                  Buat Toko
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="desc-video mt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="thumb-content px-1 px-lg-5 py-5">
                <h1>Deskripsi and Benefit </h1>
                <p>
                  Bukan hal yang mudah untuk memulai perusahaan startup. Para
                  praktisi startup mengatakan: “Only Crazy People, Who Can Make
                  The Startup Work.” Tak sedikit dari startup tersebut yang
                  muncul kemudian harus kandas di tengah jalan. Ada banyak
                  penyebabnya. Mulai dari ide yang kurang kuat, sampai salah
                  asuh startup. Nah, Luarsekolah.com kali ini membuka Kelas
                  Online: Kelas Startup Founder yang di dalam kelasnya
                  mengajarkan kamu gimana memulai perusahaan startup. Fokus
                  kelas ini adalah menimbulkan pemahaman kamu dalam bersikap,
                  berpikir dan mengambil keputusan sebagai seorang Founder dari
                  Startup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Videoplayer;
