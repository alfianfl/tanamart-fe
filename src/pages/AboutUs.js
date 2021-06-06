import React from 'react'
import '../assets/css/about.css'
import fahrul from '../assets/img/fahrul.jpg'
import egy from '../assets/img/egy.jpg'
import fariz from '../assets/img/fariz.jpg'
import daniel from '../assets/img/daniel.jpg'
import pop from '../assets/img/pop.jpg'

function AboutUs() {
    return (
        <div className="container-fluid pt-5 pb-5" style={{ backgroundColor: "#F1F1F1", height: "100%", minHeight: "100vh" }}>
            <div className="card-container">
                <div className="title d-flex justify-content-center">
                    <h1>Meet Our Team</h1>
                </div>

                {/* fahrul */}
                <div className="card-about">
                    <div className="row">
                        <div className="col-sm-5">
                            <img className="d-block w-100" src={fahrul} alt="fahrul" />
                        </div>
                        <div className="col-sm-7 d-flex flex-column justify-content-between" style={{paddingTop: "2%", }}>
                            <div className="card-block-about details">
                                <h5>Muhamad Fahrul Azimi</h5>
                                <h6>Project Manager</h6>
                                <p>Aku suka roti</p>
                            </div>
                            <div className="pb-4"><a href="https://www.linkedin.com/in/muhamad-fahrul-azimi-6035b8206/" className="btn btn-about">About me</a></div>
                        </div>
                    </div>
                </div>

                {/* pop */}
                <div class="card-about">
                    <div class="row ">
                        <div class="col-sm-7 d-flex flex-column justify-content-between" style={{ paddingTop: "2%", paddingLeft: "4%"}}>
                            <div className="card-block-about details" >
                                <h5>Alfian Fadhil Labib</h5>
                                <h6>Frontend Developer</h6>
                                <p>Lagi makan roti</p>
                            </div>
                            <div className="pb-4"><a href="https://www.linkedin.com/in/alfian-fadhil-21a6b8202/" className="btn btn-about">About me</a></div>
                        </div>
                        <div class="col-sm-5">
                            <img class="d-block w-100" src={pop} alt="pop" />
                        </div>
                    </div>
                </div>

                {/* fariz */}
                <div className="card-about">
                    <div className="row">
                        <div className="col-sm-5">
                            <img className="d-block w-100" src={fariz} alt="fariz" />
                        </div>
                        <div className="col-sm-7 d-flex flex-column justify-content-between" style={{paddingTop: "2%", }}>
                            <div className="card-block-about details">
                                <h5>Falah Rizqi Abdullah Fairuz</h5>
                                <h6>Frontend Developer</h6>
                                <p>Dipanggil Fariz</p>
                            </div>
                            <div className="pb-4"><a href="https://www.linkedin.com/in/fariz-af/" className="btn btn-about">About me</a></div>
                        </div>
                    </div>
                </div>

                {/* egy */}
                <div class="card-about">
                    <div class="row ">
                        <div class="col-sm-7 d-flex flex-column justify-content-between" style={{ paddingTop: "2%", paddingLeft: "4%"}}>
                            <div className="card-block-about details" >
                                <h5>Ahmad Egy Aranda</h5>
                                <h6>Backend Developer</h6>
                                <p>Love to learn new things. Especially about Back End Engineering</p>
                            </div>
                            <div className="pb-4"><a href="https://www.linkedin.com/in/egy-aranda-11814115a/" className="btn btn-about">About me</a></div>
                        </div>
                        <div class="col-sm-5">
                            <img class="d-block w-100" src={egy} alt="egy" />
                        </div>
                    </div>
                </div>

                {/* daniel */}
                <div className="card-about">
                    <div className="row">
                        <div className="col-sm-5">
                            <img className="d-block w-100" src={daniel} alt="daniel" />
                        </div>
                        <div className="col-sm-7 d-flex flex-column justify-content-between" style={{paddingTop: "2%", }}>
                            <div className="card-block-about details">
                                <h5>Daniel Rama Hiskia</h5>
                                <h6>Backend Developer</h6>
                                <p>Penyuka pisang</p>
                            </div>
                            <div className="pb-4"><a href="https://www.linkedin.com/in/danielramahiskia/" className="btn btn-about">About me</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
