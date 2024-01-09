"use client"

import Layout from "@/components/Layout";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import ima1 from "../../public/ima1.webp"
import ima2 from "../../public/ima2.webp"
import ima3 from "../../public/ima3.webp"
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Link from "next/link";

const Home = () => {
  const [viewPort, setViewPort] = useState(null);

  const refs = {
    blogRef: useRef(null),
    contactRef: useRef(null),
    aboutRef: useRef(null)
  };

  useEffect(() => {
    refs[viewPort]?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [viewPort, refs]);

  const searchParams = useSearchParams()
  const view = searchParams.get('viewPort')

  useEffect(() => {
    if ("contactRef" === view) {
      setViewPort("contactRef")
    } else if ("aboutRef" === view) {
      setViewPort("aboutRef")
    }
  }, [])


  const images = [
    ima1,
    ima2,
    ima3
  ]


  return (
    <main>
      <Layout setViewPort={setViewPort}>
        <Blog ref={refs.blogRef} images={images} />
        <Contact ref={refs.contactRef} />
        <About ref={refs.aboutRef} />
        <div className="z-50 fixed bottom-10 right-10">
          <Link href={"/Admin"} className="px-4 py-2 flex gap-4 bg-slate-600 text-white">View Admin GUI <FaArrowAltCircleRight size={24} /></Link>
        </div>
      </Layout>
    </main>
  );
}

export default Home;
