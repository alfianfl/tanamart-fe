import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import axios from "axios";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/cardArtikel.css";
import Sliderslick from "react-slick";
import { Link } from "react-router-dom"


function ArtikelCard() {
  const [artikel, setArtikel] = useState([]);
  const [infinite, setInfinite] = useState(true)
  const settingsSlick = {
    infinite: infinite,
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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/getArtikel`)
      .then((response) => {
        setArtikel(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (artikel.length < 4) {
      setInfinite(false)
    } else {
      setInfinite(true)
    }
  }, [artikel.length])


  return (
    <div>
      <section id="artikel-terbaru">
        <h2 className="ml-5 mt-5"> Artikel terbaru</h2>
        <div className="container-fluid d-flex mb-5 justify-content-center">
          <Sliderslick {...settingsSlick} className="slickSlider">
            {artikel.map((a) => (
              <Link className="link" to={`/detailArtikel/${a.id_artikel}`} >
                <div className="d-flex justify-content-center mt-3" >
                  <div className="card mx-1" style={{ width: "18rem", minHeight: "300px" }}>
                    <img className="card-img-top" src={a.foto_artikel} alt="Card" />
                    <div className="card-body">
                      <h5 className="card-title font-weight-bold">
                        {a.judul_artikel}
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

export default ArtikelCard;
