import { useEffect, useState } from "react";
import api from "../shared/axios";
import { Link } from "react-router-dom";

const CATEGORIES = ["All", "Sedan", "SUV", "Sport", "Electric", "Hatchback"];

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("");

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);

            try {
                const params = new URLSearchParams({ limit: "12" });

                if (search.trim()) params.set("search", search.trim());
                if (category !== "All") params.set("category", category);
                if (sort) params.set("sort", sort);

                const response = await api.get(
                    `/autogo_api.php/cars.json?${params.toString()}`
                );

                if (response.data.success) {
                    setCars(response.data.data || []);
                    setError("");
                } else {
                    setError("Failed to load cars.");
                }
            } catch (err) {
                console.error("API ERROR:", err);
                setError("Backend is unavailable.");
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(fetchCars, 400);

        return () => clearTimeout(timer);
    }, [search, category, sort]);

    return (
        <main>
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6">

                    <div className="mb-12">
                        <h1 className="text-4xl font-bold">
                            Find a Car
                        </h1>

                        <p className="text-gray-500 mt-3">
                            Choose the perfect car for your next trip.
                        </p>
                    </div>

                    <div className="mb-10 flex flex-col md:flex-row gap-4">

                        <input
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search by name, brand or category..."
                            className="flex-1 rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <select
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                            className="rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {CATEGORIES.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>

                        <select
                            value={sort}
                            onChange={(event) => setSort(event.target.value)}
                            className="rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Default sort</option>
                            <option value="price_asc">Price: low to high</option>
                            <option value="price_desc">Price: high to low</option>
                            <option value="rating">Top rated</option>
                        </select>

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

                    {!loading && !error && cars.length === 0 && (
                        <p className="text-gray-500">
                            No cars found.
                        </p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {cars.map((car) => (
                            <article
                                key={car.id}
                                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition"
                            >

                                <div className="relative">
                                    <img
                                        src={car.image}
                                        alt={car.name}
                                        className="w-full h-52 object-cover"
                                    />

                                    {!car.available && (
                                        <span className="absolute top-4 left-4 rounded-full bg-red-600 px-3 py-1 text-xs text-white">
                                            Unavailable
                                        </span>
                                    )}
                                </div>

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
                                        {car.category}
                                    </p>

                                    <div className="grid grid-cols-2 gap-3 mt-5 text-sm">

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

                                    </div>

                                    <div className="flex items-center justify-between mt-6">

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

                                        <Link to={`/car-detail/${car.id}`} className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition">
                                            View Car
                                        </Link>

                                    </div>

                                </div>
                            </article>
                        ))}

                    </div>

                </div>
            </section>
        </main>
    );
};

export default Cars;