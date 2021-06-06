import plant from "../assets/img/ri_plant-fill.svg";
import "../assets/css/list_kategori.css";
import { useState } from "react";

function ListKategori() {
  const [kategori] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  return (
    <div>
      <section id="list-kategori" className="pt-3 pb-5 mt-5 px-3">
        <h2>Kategori</h2>
        <div className="kategori d-flex justify-content-center flex-wrap">
          {kategori.map(() => (
            <div className="thumb-kategori pt-3 pb-2 d-flex justify-content-center flex-column mx-2 mt-3">
              <img src={plant} alt="logo" />
              <p className="text-center text-kategori">Tanaman Hias</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ListKategori;
