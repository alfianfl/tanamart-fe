import { Link } from "react-router-dom"
import ReactTimeAgo from 'react-time-ago'

function ListArtikel(props) {
  const date = props.tanggal
  const dt = new Date(date)
  return (
    <Link className="link" to={`/detailArtikel/${props.id}`} >
      <div className="row mt-5">
        <div className="col-12">
          <div className="list-artikel px-3 mt-2 w-100 d-flex">
            <div className="thumb-image w-40">
              <img className="img-fluid" width="150px" alt="petani" src={props.gambar} />
            </div>
            <div className="artikel-title ml-2 w-50">
              <strong>
                {props.judul}
              </strong>
              <br></br>
              <strong className="d-none d-sm-block" style={{ color: "grey" }}>
              <ReactTimeAgo date={dt} locale="en-US"/>
              </strong>
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
}

export default ListArtikel;
