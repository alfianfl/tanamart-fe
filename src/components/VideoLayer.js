import "../assets/css/contentVideo.css";
import vidio from "../assets/video/sayurbox.mp4";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import UseAos from "../hook/UseAos";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
function VideoLayer() {
  const { setAos } = UseAos();
  useEffect(() => {
    setAos();
  }, [setAos]);
  return (
    <section data-aos="fade-right" id="video-layer">
      <div className="container-fluid px-lg-5 px-sm-0">
        <div className="row content ">
          <div className="col-lg-5 col-sm-12 py-4 d-flex justify-content-start">
            <div className="thumb-video">
              <Video
                autoPlay
                loop
                style={{ width: "100%", height: "300px" }}
                muted
                controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
                poster="http://sourceposter.jpg"
                onCanPlayThrough={() => {
                  // Do stuff
                }}
              >
                <source src={vidio} type="video/webm" />
                <track
                  label="English"
                  kind="subtitles"
                  srcLang="en"
                  src="http://source.vtt"
                  default
                />
              </Video>
            </div>
          </div>
          <div className="col-lg-7 col-sm-12 py-4">
            <div className="video-desc">
              <h1>TANAMART</h1>
              <p>
                Panen dan belanja ribuan produk buah murah, sayur segar dan
                makanan sehat lainnya langsung dari petani lokal menggunakan
                TanaMart™.
                <br></br> <br></br>
                Lewat TanaMart™ kamu tidak perlu lagi ribet keluar rumah buat
                belanja apalagi sampai panas-panasan ke pasar tradisional, toko
                buah dan antri di Supermarket. Bahkan dengan TanaMart™ kamu juga
                bisa mulai hidup sehat dengan harga terjangkau!
              </p>
              <div>
                <Link to="/videoPage">
                  <button className="btn btn-video">Video lainnya</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoLayer;
