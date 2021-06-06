import "../assets/css/banner_home.css";
import swal from "sweetalert";
import { useEffect } from "react";
import UseAos from "../hook/UseAos";

function BannerHome() {
  const localIdUser = localStorage.getItem("id");
  const { setAos } = UseAos();
  const buttonToko = () => {
    if (localIdUser || localIdUser != null) {
      window.location.href = "/toko";
    } else {
      swal({
        title: "Kamu Harus Login Terlebih Dahulu",
        icon: "warning",
        dangerMode: true,
      });
    }
  };
  useEffect(() => {
    setAos();
  }, [setAos]);

  return (
    <div>
      <section id="banner-home">
        <div className="banner mt-5  py-5">
          <h1>Anda punya produk?</h1>
          <p>Ingin menjual hasil tani?</p>

          <button onClick={buttonToko} className="btn btn-toko">
            Buat Toko
          </button>
        </div>
      </section>
    </div>
  );
}

export default BannerHome;
