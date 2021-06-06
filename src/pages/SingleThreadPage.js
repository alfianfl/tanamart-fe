import React, { useState, useEffect } from "react";
import "../assets/css/singleforum.css";
import axios from "axios";
import CommentCard from "../components/CommentCard";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";

function SingleThreadPage(props) {
  const { idThreads } = props.match.params;
  const [user, setUser] = useState([]);
  const [single, setSingle] = useState([]);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const localIdUser = localStorage.getItem("id");
  const [idbio, setIdBio] = useState(false);
  let history = useHistory();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/threadsDetails/${idThreads}`)
      .then((response) => {
        setSingle(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/biodataByUser/${single.id_user}`
      )
      .then((response) => {
        setUser(response.data.nama);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/getCommentByThreads/${idThreads}`
      )
      .then((response) => {
        setAllComments(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idThreads, single.id_user]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/biodataByUser/${localIdUser}`)
      .then((response) => {
        setIdBio(response.data.id_bio);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const inputHandler = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (localIdUser || localIdUser != null) {
      if (idbio === false) {
        swal("Lengkapi Dulu Biodata Sebelum Membuat Forum").then((value) => {
          window.location.href = `/profile`;
        });
      } else {
        const data = {
          id_user: props.idUser,
          id_threads: idThreads,
          isi_comment: comment,
        };

        console.log(data);

        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/addComment`, data)
          .then((response) => {
            console.log(response);
            window.location.reload(false);
          })
          .catch((err) => {
            swal({
              title: "Harap Login Terlebih Dahulu",
              icon: "warning",
              dangerMode: true,
            });
            console.log(err);
          });
      }
    } else {
      swal({
        title: "Kamu Harus Login Terlebih Dahulu",
        icon: "warning",
        dangerMode: true,
      });
    }
  };

  const buttonAddThread = () => {
    if (localIdUser) {
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

  const id_user_int = parseInt(localIdUser);

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
          .delete(
            `${process.env.REACT_APP_BACKEND_URL}/deleteThreads/${id_thread}`,
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            console.log(response);
            history.push("/forum");
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
  };

  const deleteComment = (id_comment) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(
            `${process.env.REACT_APP_BACKEND_URL}/deleteComment/${id_comment}`,
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            console.log(response);
            const komen = [...allComments];
            const index = komen.findIndex(
              (list) => list.id_comment === id_comment
            );
            console.log(index);
            komen.splice(index, 1);
            setAllComments(komen);
          })
          .catch((error) => {
            console.log(error);
          });
        swal("Poof! This comment has been deleted!", {
          icon: "success",
        });
      } else {
        swal("This comment is safe!");
      }
    });
  };

  const date = single.timestamp;
  const dt = new Date(date);
  const dateString = dt.toDateString();
  const hour = dt.getHours();
  const minute = dt.getMinutes();

  return (
    <section id="forum" style={{ backgroundColor: "#F1F1F1" }}>
      <div>
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
              </div> */}
            </div>
            <div className="col-lg-8 col-sm-10 col-12  ">
              <section id="forum-card">
                <div className="thread-body">
                  <div>
                    <h5>{single.judul_threads}</h5>
                  </div>
                  <div className="d-flex" style={{ color: "grey" }}>
                    <p>Penulis: {user} |</p>
                    <p>&nbsp;{dateString} |</p>
                    <p className="d-flex">
                      &nbsp;
                      {hour < 10 ? (
                        <div>{" 0" + hour}</div>
                      ) : (
                        <div>{" " + hour}</div>
                      )}
                      :
                      {minute < 10 ? (
                        <div>{" 0" + minute}</div>
                      ) : (
                        <div>{" " + minute}</div>
                      )}
                    </p>
                  </div>
                  {single.foto_threads ? (
                    <div>
                      <img
                        className="thumb-forum"
                        src={single.foto_threads}
                        alt="forum"
                      />
                    </div>
                  ) : null}
                  {single.isi_threads ? (
                    <div>
                      <p>{single.isi_threads}</p>
                    </div>
                  ) : null}
                </div>

                <div className="d-flex">
                  {id_user_int === single.id_user ? (
                    <Link
                      className="link d-flex align-items-center ml-3"
                      to={`/editThread/${single.id_threads}`}
                    >
                      <h6>Edit</h6>
                    </Link>
                  ) : null}

                  {id_user_int === single.id_user ? (
                    <div
                      onClick={() => deleteHandler(single.id_threads)}
                      className="m-2 hapus-thread ml-4"
                    >
                      <h6>Hapus</h6>
                    </div>
                  ) : null}
                </div>
              </section>

              <div className="komentar-body">
                <h5>Tambah Komentar</h5>
                <form className="form d-flex" onSubmit={onSubmitHandler}>
                  <input
                    type="text"
                    value={comment}
                    onChange={inputHandler}
                    className="form-control align-self-center"
                  />
                  <button type="submit" className="btn-send">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              </div>
              {allComments
                // .slice(0)
                // .reverse()
                .map((isi) => (
                  <CommentCard
                    idUser={isi.id_user}
                    isiComment={isi.isi_comment}
                    deleteButton={() => deleteComment(isi.id_comment)}
                    tanggal={isi.timestamp}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleThreadPage;
