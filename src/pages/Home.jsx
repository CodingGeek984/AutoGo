import React from "react";
import { Link } from "react-router-dom";

const Home = () => {


    return (

        <main>


            <section className="py-20 mb-20">
                
                
                <div className="max-w-6xl mx-auto px-6">


                    <div className="text-center mb-10">

                        
                        <h3 className="text-4xl font-bold text-gray-900 mb-6">
                            Your journey starts here.
                        </h3>

                        <p className="text-3xl font-semibold text-gray-900">
                            Rent a car quickly and easily.
                            Choose your car, book your trip,
                            and enjoy the road.
                        </p>
                        <br /><br /><br />
                        <Link to='/cars' className="px-12 py-6 rounded-3xl text-white bg-blue-600 hover:bg-blue-800 transition">
                            Find a Car 
                        </Link>


                    </div>


                </div>


            </section>

            <section className="py-20 bg-gray-100">
                

                <div className="max-w-6xl mx-auto px-6">


                    <h3 className="text-center text-4xl font-bold text-gray-900 mb-15">Why AutoGo?</h3>

                    <div className="grid grid-cols-3 gap-8">


                        <article className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

                            <div className="text-3xl text-blue-600 font-semibold mb-4">
                                Simple 
                            </div>

                            <p className="text-gray-600 mb-6">
                                Easy booking <br />
                                process.
                            </p>

                        </article>

                        <article className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

                            <div className="text-3xl text-blue-600 font-semibold mb-6">
                                Flexible 
                            </div>

                            <p className="text-gray-600 mb-6">
                                Choose your <br />
                                own schedule.
                            </p>

                        </article>

                        <article className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

                            <div className="text-3xl text-blue-600 font-semibold mb-6">
                                Reliable 
                            </div>

                            <p className="text-gray-600 mb-6">
                                Clear <br />
                                pricing.
                            </p>

                        </article>

                    </div>

                </div>


            </section>

            <section className="py-20 mb-10">
                
                <div className="max-w-6xl mx-auto px-6">

                    <h3 className="text-center text-4xl font-bold text-gray-900 mb-15">
                        Ready to start your trip?
                    </h3>
                    
                    <div className="flex justify-center">

                        <Link to='/cars' className="px-12 py-6 rounded-3xl bg-blue-600 hover:bg-blue-800 transition text-white">Find a Car</Link>

                    </div>

                </div>

            </section>                                                                                                                                                                                               


        </main>

    );


};

export default Home;
