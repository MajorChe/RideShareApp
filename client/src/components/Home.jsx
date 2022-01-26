import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Intro } from "./Intro";
import { Services } from "./Services";
import { Aboutus } from "./Aboutus";

function Home() {
  return (
    <>
    <Navbar />
    <Intro/>
    <Services/>
    <Aboutus/>
    <Footer/>
    </>
  );
}

export default Home;
