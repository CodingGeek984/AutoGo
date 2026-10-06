import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../shared/axios";

const CarDetail = () => {

    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchCar = async () => {

            try {
                const response = await api.get(`/autogo_api.php/cars.json?id=${id}`);

                if (response.data && response.data.id) {
                    setCar(response.data);
                } else {
                    setCar(null);
                }
            } catch (err) {
                console.error(err);
                setCar(null);
            } finally {
                setLoading(false);
            }

        };

        fetchCar();

    }, [id]);


    return (

        <main>

            <section className="py-20">

                <div className="max-w-6xl mx-auto px-6">

                    {loading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : !car ? (
                        <div>
                            <p className="text-gray-500 mb-6">Car not found.</p>

                            <Link to="/cars" className="rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-3 text-white transition">
                                Back to Cars
                            </Link>
                        </div>
                    ) : (

                        <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                            <div className="grid grid-cols-1 lg:grid-cols-2">

                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-80 lg:h-full object-cover"
                                />

                                <div className="p-8">

                                    <div className="flex items-start justify-between gap-4">

                                        <div>
                                            <h1 className="text-3xl font-bold">
                                                {car.name}
                                            </h1>

                                            <p className="text-gray-500 mt-1">
                                                {car.brand}
                                            </p>
                                        </div>

                                        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                                            ⭐ {car.rating}
                                        </span>

                                    </div>

                                    <p className="mt-4 text-gray-600">
                                        {car.category} · {car.location}
                                    </p>

                                    <p className="mt-4 text-gray-600">
                                        {car.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-3 mt-6 text-sm">

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-gray-400">
                                                Year
                                            </p>
                                            <p className="font-semibold">
                                                {car.year}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-gray-400">
                                                Seats
                                            </p>
                                            <p className="font-semibold">
                                                {car.seats}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-gray-400">
                                                Transmission
                                            </p>
                                            <p className="font-semibold">
                                                {car.transmission}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-gray-400">
                                                Fuel
                                            </p>
                                            <p className="font-semibold">
                                                {car.fuel}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-gray-400">
                                                Doors
                                            </p>
                                            <p className="font-semibold">
                                                {car.doors}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-gray-400">
                                                Available
                                            </p>
                                            <p className="font-semibold">
                                                {car.available ? "Yes" : "No"}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="flex items-center justify-between mt-8">

                                        <div>
                                            <p className="text-sm text-gray-400">
                                                From
                                            </p>

                                            <p className="text-2xl font-bold">
                                                {car.price} {car.currency}
                                                <span className="text-sm font-normal text-gray-400">
                                                    {" "} / day
                                                </span>
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4">

                                            <Link to="/cars" className="rounded-xl border border-gray-200 px-5 py-3 text-gray-600 hover:bg-gray-50 transition">
                                                Back
                                            </Link>

                                            {car.available ? (
                                                <Link to={`/booking/${car.id}`} className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition">
                                                    Book Car
                                                </Link>
                                            ) : (
                                                <span className="rounded-xl bg-gray-300 px-5 py-3 text-white cursor-not-allowed">
                                                    Unavailable
                                                </span>
                                            )}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </article>

                    )}

                </div>

            </section>

        </main>

    );

};

export default CarDetail;
