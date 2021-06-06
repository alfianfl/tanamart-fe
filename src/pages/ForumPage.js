import React, { useState, useEffect } from "react";
import "../assets/css/forum.css";
import ForumCard from "../components/ForumCard";
import axios from "axios";
import swal from "sweetalert";

function ForumPage() {
  const [thread, setThread] = useState([]);
  const localIdUser = localStorage.getItem("id");
  const [idbio, setIdBio] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/biodataByUser/${localIdUser}`)
      .then((response) => {
        setIdBio(response.data.id_bio);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/getThreads`)
      .then((response) => {
        setThread(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localIdUser]);

  const buttonAddThread = () => {
    if (localIdUser || localIdUser != null) {
      if (idbio === false) {
        swal("Lengkapi Dulu Biodata Sebelum Membuat Forum").then((value) => {
          window.location.href = `/profile`;
        });
      } else {
        window.location.href = "/addThread";
      }
    } else {
      swal({
        title: "Kamu Harus Login Terlebih Dahulu",
        icon: "warning",
        dangerMode: true,
      });
    }
  };

  const deleteHandler = (id_thread) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this thread!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`${process.env.REACT_APP_BACKEND_URL}/deleteThreads/${id_thread}`, {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response);
            const utas = [...thread];
            const index = utas.findIndex(
              (list) => list.id_thread === id_thread
            );
            console.log(index)
            utas.splice(index, 1);
            setThread(utas);
          })
          .catch((error) => {
            console.log(error);
          });
        swal("Poof! This thread has been deleted!", {
          icon: "success",
        });
      } else {
        swal("This thread is safe!");
      }
    });
  }

  return (
    <section id="forum">
      <div
        style={{
          backgroundColor: "#F1F1F1",
          height: "100%",
          minHeight: "100vh",
        }}
      >
        <div className="container-fluid py-5 px-5">
          <div className="row flex-row-reverse d-flex justify-content between">
            <div className="col-lg-4 col-sm-2 col-12">
              <button onClick={buttonAddThread} className="btn-buat-thread">
                Buat Thread
              </button>
              {/* <div className="trend">
                <div className="mt-3">
                  <h4>Yang lagi ngetrend</h4>
                </div>
                {thread.slice(0, 4).map((thread) => (
                  <TrendCard judul={thread.judul_threads}></TrendCard>
                ))}
              </div> */}
            </div>
            <div className="col-lg-8 col-sm-10 col-12  ">
              {thread
                .slice(0)
                .reverse()
                .map((thread) => (
                  <ForumCard
                    idThreads={thread.id_threads}
                    judul={thread.judul_threads}
                    gambar={thread.foto_threads}
                    isi={thread.isi_threads}
                    id={thread.id_user}
                    deleteButton={() => deleteHandler(thread.id_threads)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForumPage;
