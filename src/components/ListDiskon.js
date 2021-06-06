import dis1 from "../assets/img/discount1.png";
import dis2 from "../assets/img/discount2.png";
import dis3 from "../assets/img/discount3.png";
import "../assets/css/list_diskon.css";

function ListDiskon() {
  return (
    <div>
      <section id="diskon-produk">
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-12">
              <h1 className="ml-lg-4 ml-sm-0">Diskon Termurah</h1>
              <div className="content-diskon w-100 d-flex justify-content-around">
                <div
                  className="thumb-diskon"
                  style={{ backgroundImage: `url(${dis1})` }}
                >
                  <div className="text-discount">
                    <strong>Kangkung arab super</strong>
                    <p>Diskon 70%</p>
                  </div>
                </div>
                <div
                  className="thumb-diskon"
                  style={{ backgroundImage: `url(${dis2})` }}
                >
                  <div className="text-discount">
                    <strong>Kol Cina KW Ultra</strong>
                    <p>Diskon 69,9%</p>
                  </div>
                </div>
                <div
                  className="thumb-diskon"
                  style={{ backgroundImage: `url(${dis3})` }}
                >
                  <div className="text-discount">
                    <strong>Wortel Alaska Turbo Mega</strong>
                    <p>Diskon 50%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ListDiskon;
