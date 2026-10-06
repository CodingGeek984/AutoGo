import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {


    return (

            <nav className="bg-white border-b border-gray-200 mb-20">

                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                    
                    <div className="text-xl font-bold text-gray-900">
                        AutoGo 
                    </div>

                    <div className="flex items-center gap-8">

                        <Link to='/' className="text-gray-600 hover:text-black transition">Home</Link>
                        <Link to='/cars' className="text-gray-600 hover:text-black transition">Cars</Link>
                        <Link to='/bookings' className="text-gray-600 hover:text-black transition">Bookings</Link>

                    </div>


                </div>

            </nav>

    );
    

};

export default Navbar;