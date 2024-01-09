"use client"


import Footer from "./Footer";

const AdminLayout = ({ children }) => {

    return (
        <div className={`w-full`}>
            {children}
            <div className="fixed bottom-0 w-screen">
                <Footer />
            </div>
        </div>
    );
};

export default AdminLayout;
