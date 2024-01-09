"use client"

import Header from "../components/Header"
import Footer from "./Footer";


const Layout = ({ children, setViewPort }) => {


    return (
        <div className="w-full mt-16">
            <Header setViewPort={setViewPort} />
            {children}
        </div>
    );
}

export default Layout;