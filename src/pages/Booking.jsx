import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../shared/axios";
import Modal from "../components/Modal";

const Booking = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const [created, setCreated] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        customer_name: "",
        email: "",
        location: "Astana",
        pickup_date: "",
        return_date: "",
    });

    useEffect(() => {

        const fetchCar = async () => {

            try {
                const response = await api.get(`/autogo_api.php/cars.json?id=${id}`);

                if (response.data && response.data.id) {
                    setCar(response.data);
                } else {
                    setError("Car not found.");
                }
            } catch (err) {
                console.error(err);
                setError("Backend is unavailable.");
            } finally {
                setLoading(false);
            }

        };

        fetchCar();

    }, [id]);

    const today = new Date().toISOString().split("T")[0];

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const days = (() => {
        if (!form.pickup_date || !form.return_date) return 0;

        const pickup = new Date(form.pickup_date);
        const ret = new Date(form.return_date);
        const diff = Math.round((ret - pickup) / 86400000);

        return diff > 0 ? diff : 0;
    })();

    const total = car && days > 0 ? days * car.price : 0;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!car) return;

        if (days <= 0) {
            setError("Return date must be after pickup date.");
            return;
        }

        setSending(true);
        setError("");

        try {
            const response = await api.post("/autogo_api.php/bookings.json", {
                car_id: car.id,
                customer_name: form.customer_name,
                email: form.email,
                location: form.location,
                pickup_date: form.pickup_date,
                return_date: form.return_date,
            });

            if (response.data.success) {
                setCreated(response.data.data);
                setShowModal(true);
            } else {
                setError(response.data.message || "Failed to create booking.");
            }
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message ||
                    "Backend is unavailable."
            );
        } finally {
            setSending(false);
        }
    };

    return (

        <main>

            <section className="py-20">

                <div className="max-w-6xl mx-auto px-6">

                    <div className="mb-12">
                        <h1 className="text-4xl font-bold">
                            Book a Car
                        </h1>

                        <p className="text-gray-500 mt-3">
                            Fill in your details and confirm the trip.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-8 rounded-xl bg-red-50 border border-red-200 p-4 text-red-600">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : !car ? (
                        <div>
                            <p className="text-gray-500 mb-6">Car not found.</p>

                            <Link to="/cars" className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition">
                                Back to Cars
                            </Link>
                        </div>
                    ) : (

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            <article className="lg:col-span-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm h-fit">

                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-52 object-cover"
                                />

                                <div className="p-6">

                                    <div className="flex items-start justify-between gap-4">

                                        <div>
                                            <h2 className="text-2xl font-bold">
                                                {car.name}
                                            </h2>

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

                                    <div className="grid grid-cols-2 gap-3 mt-5 text-sm">

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-gray-400">Year</p>
                                            <p className="font-semibold">{car.year}</p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-gray-400">Seats</p>
                                            <p className="font-semibold">{car.seats}</p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-gray-400">Transmission</p>
                                            <p className="font-semibold">{car.transmission}</p>
                                        </div>

                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-gray-400">Fuel</p>
                                            <p className="font-semibold">{car.fuel}</p>
                                        </div>

                                    </div>

                                    <div className="mt-6 flex items-center justify-between">

                                        <div>
                                            <p className="text-sm text-gray-400">From</p>

                                            <p className="text-2xl font-bold">
                                                {car.price} {car.currency}
                                                <span className="text-sm font-normal text-gray-400">
                                                    {" "} / day
                                                </span>
                                            </p>
                                        </div>

                                        <span className={
                                            car.available
                                                ? "rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                                                : "rounded-full bg-red-100 px-3 py-1 text-sm text-red-600"
                                        }>
                                            {car.available ? "Available" : "Unavailable"}
                                        </span>

                                    </div>

                                </div>

                            </article>

                            <article className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

                                <h2 className="text-2xl font-bold mb-6">
                                    Your details
                                </h2>

                                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-2">
                                            Full name
                                        </label>

                                        <input
                                            type="text"
                                            name="customer_name"
                                            value={form.customer_name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Alex Johnson"
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-2">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="alex@example.com"
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-2">
                                            Pickup location
                                        </label>

                                        <input
                                            type="text"
                                            name="location"
                                            value={form.location}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-2">
                                            Pickup date
                                        </label>

                                        <input
                                            type="date"
                                            name="pickup_date"
                                            value={form.pickup_date}
                                            onChange={handleChange}
                                            min={today}
                                            required
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-500 mb-2">
                                            Return date
                                        </label>

                                        <input
                                            type="date"
                                            name="return_date"
                                            value={form.return_date}
                                            onChange={handleChange}
                                            min={form.pickup_date || today}
                                            required
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <p className="text-sm text-gray-400">Duration</p>

                                        <p className="font-semibold">
                                            {days > 0 ? `${days} day${days > 1 ? "s" : ""}` : "—"}
                                        </p>
                                    </div>

                                    <div className="md:col-span-2 flex items-center justify-between rounded-xl bg-blue-50 p-5">

                                        <div>
                                            <p className="text-sm text-gray-500">Total</p>

                                            <p className="text-3xl font-bold text-blue-700">
                                                {total} {car.currency}
                                            </p>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={sending || !car.available}
                                            className="rounded-xl bg-blue-600 px-8 py-4 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {sending ? "Booking..." : "Confirm Booking"}
                                        </button>

                                    </div>

                                </form>

                                <Link to={`/car-detail/${car.id}`} className="inline-block mt-6 text-gray-500 hover:text-black transition">
                                    ← Back to car
                                </Link>

                            </article>

                        </div>

                    )}

                </div>

            </section>

            {showModal && created && (
                <Modal
                    title="Booking confirmed"
                    message="Your trip is reserved. Here is your booking summary."
                    onClose={() => setShowModal(false)}
                >

                    <div className="rounded-xl bg-gray-50 p-5 text-sm">

                        <div className="flex justify-between py-1">
                            <span className="text-gray-500">Booking ID</span>
                            <span className="font-semibold">#{created.id}</span>
                        </div>

                        <div className="flex justify-between py-1">
                            <span className="text-gray-500">Car</span>
                            <span className="font-semibold">{created.car_name}</span>
                        </div>

                        <div className="flex justify-between py-1">
                            <span className="text-gray-500">Dates</span>
                            <span className="font-semibold">
                                {created.pickup_date} → {created.return_date}
                            </span>
                        </div>

                        <div className="flex justify-between py-1">
                            <span className="text-gray-500">Total</span>
                            <span className="font-semibold">
                                {created.total} {created.currency}
                            </span>
                        </div>

                    </div>

                    <div className="mt-6 flex items-center justify-end gap-4">

                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="rounded-xl border border-gray-200 px-5 py-3 text-gray-600 hover:bg-gray-50 transition"
                        >
                            Close
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/bookings")}
                            className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition"
                        >
                            My Bookings
                        </button>

                    </div>

                </Modal>
            )}

        </main>

    );

};

export default Booking;
