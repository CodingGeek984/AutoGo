import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../shared/axios";

const Bookings = () => {

    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchBookings = async () => {
            try {
                const response = await api.get("/autogo_api.php/bookings.json");

                if (response.data.success) {
                    setBookings(response.data.data || []);
                } else {
                    setError("Failed to load bookings.");
                }
            } catch (err) {
                console.error(err);
                setError("Backend is unavailable.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();

    }, []);

    return (

        <main>

            <section className="py-20">

                <div className="max-w-6xl mx-auto px-6">

                    <div className="mb-12 flex items-end justify-between gap-6">

                        <div>
                            <h1 className="text-4xl font-bold">
                                My Bookings
                            </h1>

                            <p className="text-gray-500 mt-3">
                                All your trips in one place.
                            </p>
                        </div>

                        <Link to="/cars" className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition">
                            Book a Car
                        </Link>

                    </div>

                    {error && (
                        <div className="mb-8 rounded-xl bg-red-50 border border-red-200 p-4 text-red-600">
                            {error}
                        </div>
                    )}

                    {loading && !error && (
                        <p className="text-gray-500">
                            Loading...
                        </p>
                    )}

                    {!loading && !error && bookings.length === 0 && (
                        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">

                            <p className="text-gray-500 mb-6">
                                You have no bookings yet.
                            </p>

                            <Link to="/cars" className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition">
                                Find a Car
                            </Link>

                        </div>
                    )}

                    {!loading && bookings.length > 0 && (

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {bookings.map((booking) => (
                                <article
                                    key={booking.id}
                                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition"
                                >

                                    <div className="flex items-start justify-between gap-4">

                                        <div>
                                            <p className="text-sm text-gray-400">
                                                Booking #{booking.id}
                                            </p>

                                            <h2 className="text-2xl font-bold mt-1">
                                                {booking.car_name}
                                            </h2>
                                        </div>

                                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                            {booking.status}
                                        </span>

                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-5 text-sm">

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-gray-400">Pickup</p>
                                            <p className="font-semibold">{booking.pickup_date}</p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-gray-400">Return</p>
                                            <p className="font-semibold">{booking.return_date}</p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-gray-400">Customer</p>
                                            <p className="font-semibold">{booking.customer_name}</p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-gray-400">Location</p>
                                            <p className="font-semibold">{booking.location}</p>
                                        </div>

                                    </div>

                                    <div className="flex items-center justify-between mt-6">

                                        <div>
                                            <p className="text-sm text-gray-400">Total</p>

                                            <p className="text-2xl font-bold">
                                                {booking.total} {booking.currency}
                                            </p>
                                        </div>

                                        <Link
                                            to={`/car-detail/${booking.car_id}`}
                                            className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition"
                                        >
                                            View Car
                                        </Link>

                                    </div>

                                </article>
                            ))}

                        </div>

                    )}

                </div>

            </section>

        </main>

    );

};

export default Bookings;
