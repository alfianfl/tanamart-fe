import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/cardProduct.css";
import Sliderslick from "react-slick";
import BannerHome from "../components/BannerHome";
import youtubeAPI from "../API/youtubeAPI";
import "../assets/css/videoPlayer.css";

import { Link } from "react-router-dom";

const settingsSlick = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
      dots: false,
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
      dots: false,
    },
  ],
};
function VideoPage() {
  const [videosUbi, setVideosUbi] = useState([]);
  const [videosJagung, setVideosJagung] = useState([]);
  const [videosPaprika, setVideosPaprika] = useState([]);

  useEffect(() => {
    youtubeAPI
      .get("/search", {
        params: {
          q: "tutorial menanam jagung",
        },
      })
      .then((response) => {
        console.log(response.data.items);
        setVideosJagung(response.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
    youtubeAPI
      .get("/search", {
        params: {
          q: "tutorial menanam Ubi",
        },
      })
      .then((response) => {
        console.log(response.data.items);
        setVideosUbi(response.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
    youtubeAPI
      .get("/search", {
        params: {
          q: "tutorial menanam Paprika",
        },
      })
      .then((response) => {
        console.log(response.data.items);
        setVideosPaprika(response.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <section id="marketplace-product" className="my-5">
        <div className="ml-lg-3 ml-0">
          <h1>Video menanam jagung</h1>
        </div>
        <div className="container-fluid d-flex justify-content-center pb-5">
          <Sliderslick {...settingsSlick} className="slickSlider">
            {videosJagung.map((v) => (
              <Link className="link-video" to={`/videoPlayer/${v.id.videoId}`}>
                <div className="d-flex justify-content-center">
                  <div
                    key={v.id.videoId}
                    className="card mx-1"
                    style={{ width: "25rem", height: "400px" }}
                  >
                    <img
                      className="card-img-top"
                      src={v.snippet.thumbnails.high.url}
                      alt="Card"
                      height="250px"
                    />

                    <div className="card-body">
                      <h5 className="card-title font-weight-bold">
                        {v.snippet.title}
                      </h5>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Sliderslick>
        </div>
        <div className="ml-lg-3 ml-0">
          <h1>Video menanam Ubi</h1>
        </div>
        <div className="container-fluid d-flex justify-content-center">
          <Sliderslick {...settingsSlick} className="slickSlider">
            {videosUbi.map((v) => (
              <Link className="link-video" to={`/videoPlayer/${v.id.videoId}`}>
                <div className="d-flex justify-content-center">
                  <div
                    key={v.videoId}
                    className="card mx-1"
                    style={{ width: "18rem", height: "400px" }}
                  >
                    <img
                      className="card-img-top"
                      src={v.snippet.thumbnails.high.url}
                      alt="Card"
                      height="250px"
                    />

                    <div className="card-body">
                      <h5 className="card-title font-weight-bold">
                        {v.snippet.title}
                      </h5>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Sliderslick>
        </div>
        <BannerHome />
        <div className="ml-lg-3 ml-0 mt-5">
          <h1>Video menanam Paprika</h1>
        </div>
        <div className="container-fluid d-flex justify-content-center pb-5">
          <Sliderslick {...settingsSlick} className="slickSlider">
            {videosPaprika.map((v) => (
              <Link className="link-video" to={`/videoPlayer/${v.id.videoId}`}>
                <div className="d-flex justify-content-center">
                  <div
                    key={v.videoId}
                    className="card mx-1"
                    style={{ width: "18rem", height: "400px" }}
                  >
                    <img
                      className="card-img-top"
                      src={v.snippet.thumbnails.high.url}
                      alt="Card"
                      height="250px"
                    />

                    <div className="card-body">
                      <h5 className="card-title font-weight-bold">
                        {v.snippet.title}
                      </h5>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Sliderslick>
        </div>
      </section>
    </div>
  );
}

export default VideoPage;
