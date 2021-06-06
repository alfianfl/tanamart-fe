import Slider from "infinite-react-carousel";
import jumbotron from "../assets/img/jumbotron.png";
import "../assets/css/sliderHome.css";

function SliderHome() {
  const settings = {
    arrows: true,
    arrowsBlock: true,
    duration: 5,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <section id="slider-home">
      <div className="container-fluid  mb-5 p-0">
        <Slider {...settings}>
          <div className="carousel-thumb">
            <div
              className="jumbotron"
              style={{ backgroundImage: `url(${jumbotron})` }}
            >
              <h1>TANAMART</h1>
            </div>
          </div>
          <div className="carousel-thumb">
            <div
              className="jumbotron"
              style={{
                backgroundImage: `url("https://p4.wallpaperbetter.com/wallpaper/837/220/1005/vegetables-fruits-tomatoes-fresh-apples-cucumber-garlic-healthy-food-wallpaper-preview.jpg")`,
                backgroundSize: "cover",
              }}
            >
              <h1>TANAMART</h1>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
}

export default SliderHome;
