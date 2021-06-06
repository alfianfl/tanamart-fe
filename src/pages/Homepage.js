import ArtikelCard from "../components/ArtikelCard";
import ProductCard from "../components/ProductCard";
import BannerHome from "../components/BannerHome";
import SliderHome from "../components/SliderHome";
import VideoLayer from "../components/VideoLayer";

function Homepage(props) {
  return (
    <section id="homepage">
      {/* Home slider */}
      <SliderHome />

      {/* component untuk video pada home */}
      <VideoLayer />

      {/* card marketplace berupa slick */}
      <h2 className="ml-lg-5 ml-sm-0 mt-5"> Marketplace</h2>
      <ProductCard idUser={props.idUser} />

      {/* banner pada home */}
      <BannerHome />

      {/*card artikel berupa slick */}
      <ArtikelCard />
    </section>
  );
}

export default Homepage;
