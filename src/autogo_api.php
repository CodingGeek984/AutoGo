<?php
/*
 * AutoGo API
 * Simple PHP backend for React + Tailwind frontend
 *
 * Endpoints:
 *   GET  /autogo_api.php/reset.json
 *   GET  /autogo_api.php/cars.json
 *   GET  /autogo_api.php/cars.json?id=1
 *   GET  /autogo_api.php/bookings.json
 *   GET  /autogo_api.php/bookings.json?id=1
 *   POST /autogo_api.php/bookings.json
 *
 * Optional cars filters:
 *   ?search=bmw
 *   ?category=SUV
 *   ?available=true
 *   ?min_price=30&max_price=70
 *   ?page=1&limit=6
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

$dataDir = __DIR__ . "/data";
$carsFile = $dataDir . "/cars.json";
$bookingsFile = $dataDir . "/bookings.json";

if (!is_dir($dataDir)) {
    mkdir($dataDir, 0777, true);
}

function defaultCars(): array {
    return [
        [
            "id" => 1,
            "name" => "BMW 3 Series",
            "brand" => "BMW",
            "category" => "Sedan",
            "price" => 45,
            "currency" => "USD",
            "year" => 2024,
            "seats" => 5,
            "doors" => 4,
            "transmission" => "Automatic",
            "fuel" => "Petrol",
            "location" => "Astana",
            "available" => true,
            "rating" => 4.8,
            "description" => "A comfortable and stylish sedan for city trips and long journeys.",
            "image" => "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80"
        ],
        [
            "id" => 2,
            "name" => "Toyota RAV4",
            "brand" => "Toyota",
            "category" => "SUV",
            "price" => 55,
            "currency" => "USD",
            "year" => 2023,
            "seats" => 5,
            "doors" => 5,
            "transmission" => "Automatic",
            "fuel" => "Hybrid",
            "location" => "Astana",
            "available" => true,
            "rating" => 4.9,
            "description" => "Reliable and spacious SUV with excellent fuel efficiency.",
            "image" => "https://images.unsplash.com/photo-1568844293986-ca70e29f6f72?auto=format&fit=crop&w=1200&q=80"
        ],
        [
            "id" => 3,
            "name" => "Audi A5",
            "brand" => "Audi",
            "category" => "Sport",
            "price" => 70,
            "currency" => "USD",
            "year" => 2024,
            "seats" => 4,
            "doors" => 2,
            "transmission" => "Automatic",
            "fuel" => "Petrol",
            "location" => "Astana",
            "available" => true,
            "rating" => 4.7,
            "description" => "A sporty premium coupe designed for a comfortable and exciting drive.",
            "image" => "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80"
        ],
        [
            "id" => 4,
            "name" => "Mercedes-Benz C-Class",
            "brand" => "Mercedes-Benz",
            "category" => "Sedan",
            "price" => 65,
            "currency" => "USD",
            "year" => 2024,
            "seats" => 5,
            "doors" => 4,
            "transmission" => "Automatic",
            "fuel" => "Petrol",
            "location" => "Astana",
            "available" => true,
            "rating" => 4.9,
            "description" => "Premium sedan with a refined interior and smooth driving experience.",
            "image" => "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80"
        ],
        [
            "id" => 5,
            "name" => "Hyundai Tucson",
            "brand" => "Hyundai",
            "category" => "SUV",
            "price" => 50,
            "currency" => "USD",
            "year" => 2023,
            "seats" => 5,
            "doors" => 5,
            "transmission" => "Automatic",
            "fuel" => "Petrol",
            "location" => "Astana",
            "available" => true,
            "rating" => 4.6,
            "description" => "Practical SUV with plenty of space for passengers and luggage.",
            "image" => "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80"
        ],
        [
            "id" => 6,
            "name" => "Tesla Model 3",
            "brand" => "Tesla",
            "category" => "Electric",
            "price" => 60,
            "currency" => "USD",
            "year" => 2024,
            "seats" => 5,
            "doors" => 4,
            "transmission" => "Automatic",
            "fuel" => "Electric",
            "location" => "Astana",
            "available" => true,
            "rating" => 4.8,
            "description" => "Modern electric sedan with quick acceleration and a minimalist interior.",
            "image" => "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80"
        ],
        [
            "id" => 7,
            "name" => "Kia K5",
            "brand" => "Kia",
            "category" => "Sedan",
            "price" => 40,
            "currency" => "USD",
            "year" => 2023,
            "seats" => 5,
            "doors" => 4,
            "transmission" => "Automatic",
            "fuel" => "Petrol",
            "location" => "Astana",
            "available" => true,
            "rating" => 4.5,
            "description" => "Modern and affordable sedan for everyday city driving.",
            "image" => "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80"
        ],
        [
            "id" => 8,
            "name" => "Land Rover Defender",
            "brand" => "Land Rover",
            "category" => "SUV",
            "price" => 90,
            "currency" => "USD",
            "year" => 2024,
            "seats" => 5,
            "doors" => 5,
            "transmission" => "Automatic",
            "fuel" => "Petrol",
            "location" => "Astana",
            "available" => false,
            "rating" => 4.9,
            "description" => "Powerful premium SUV built for comfortable city and outdoor adventures.",
            "image" => "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80"
        ],
        [
            "id" => 9,
            "name" => "Volkswagen Golf",
            "brand" => "Volkswagen",
            "category" => "Hatchback",
            "price" => 35,
            "currency" => "USD",
            "year" => 2022,
            "seats" => 5,
            "doors" => 5,
            "transmission" => "Automatic",
            "fuel" => "Petrol",
            "location" => "Astana",
            "available" => true,
            "rating" => 4.4,
            "description" => "Compact and efficient hatchback, perfect for everyday city trips.",
            "image" => "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80"
        ],
        [
            "id" => 10,
            "name" => "Ford Mustang",
            "brand" => "Ford",
            "category" => "Sport",
            "price" => 85,
            "currency" => "USD",
            "year" => 2023,
            "seats" => 4,
            "doors" => 2,
            "transmission" => "Automatic",
            "fuel" => "Petrol",
            "location" => "Astana",
            "available" => true,
            "rating" => 4.8,
            "description" => "Iconic sports car with powerful performance and distinctive design.",
            "image" => "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80"
        ]
    ];
}

function defaultBookings(): array {
    return [
        [
            "id" => 1,
            "car_id" => 1,
            "car_name" => "BMW 3 Series",
            "customer_name" => "Alex Johnson",
            "email" => "alex@example.com",
            "location" => "Astana",
            "pickup_date" => "2026-08-20",
            "return_date" => "2026-08-23",
            "total" => 135,
            "currency" => "USD",
            "status" => "confirmed",
            "created_at" => "2026-08-17 10:00:00"
        ]
    ];
}

function loadJson(string $file, array $fallback): array {
    if (!file_exists($file)) {
        file_put_contents($file, json_encode($fallback, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        return $fallback;
    }

    $content = file_get_contents($file);
    $data = json_decode($content, true);

    return is_array($data) ? $data : $fallback;
}

function saveJson(string $file, array $data): void {
    file_put_contents(
        $file,
        json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE),
        LOCK_EX
    );
}

function response(array $data, int $status = 200): void {
    http_response_code($status);
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

function requestBody(): array {
    $raw = file_get_contents("php://input");

    if (!$raw) {
        return [];
    }

    $data = json_decode($raw, true);

    return is_array($data) ? $data : [];
}

$cars = loadJson($carsFile, defaultCars());
$bookings = loadJson($bookingsFile, defaultBookings());

$uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$endpoint = basename($uri);
$method = $_SERVER["REQUEST_METHOD"];

/*
 * RESET
 */
if ($endpoint === "reset.json" && $method === "GET") {
    $cars = defaultCars();
    $bookings = defaultBookings();

    saveJson($carsFile, $cars);
    saveJson($bookingsFile, $bookings);

    response([
        "success" => true,
        "message" => "AutoGo data has been reset.",
        "cars" => count($cars),
        "bookings" => count($bookings)
    ]);
}

/*
 * CARS
 */
if ($endpoint === "cars.json" && $method === "GET") {

    $id = isset($_GET["id"]) ? (int) $_GET["id"] : null;

    if ($id !== null && $id > 0) {
        foreach ($cars as $car) {
            if ($car["id"] === $id) {
                response($car);
            }
        }

        response([
            "success" => false,
            "message" => "Car not found."
        ], 404);
    }

    $result = $cars;

    if (!empty($_GET["search"])) {
        $search = strtolower(trim($_GET["search"]));

        $result = array_filter($result, function ($car) use ($search) {
            return str_contains(strtolower($car["name"]), $search)
                || str_contains(strtolower($car["brand"]), $search)
                || str_contains(strtolower($car["category"]), $search);
        });
    }

    if (!empty($_GET["category"]) && strtolower($_GET["category"]) !== "all") {
        $category = strtolower($_GET["category"]);

        $result = array_filter($result, function ($car) use ($category) {
            return strtolower($car["category"]) === $category;
        });
    }

    if (isset($_GET["available"])) {
        $available = filter_var($_GET["available"], FILTER_VALIDATE_BOOLEAN);

        $result = array_filter($result, function ($car) use ($available) {
            return $car["available"] === $available;
        });
    }

    if (isset($_GET["min_price"])) {
        $minPrice = (float) $_GET["min_price"];

        $result = array_filter($result, function ($car) use ($minPrice) {
            return $car["price"] >= $minPrice;
        });
    }

    if (isset($_GET["max_price"])) {
        $maxPrice = (float) $_GET["max_price"];

        $result = array_filter($result, function ($car) use ($maxPrice) {
            return $car["price"] <= $maxPrice;
        });
    }

    if (!empty($_GET["sort"])) {
        $sort = strtolower($_GET["sort"]);

        usort($result, function ($a, $b) use ($sort) {
            if ($sort === "price_asc") {
                return $a["price"] <=> $b["price"];
            }

            if ($sort === "price_desc") {
                return $b["price"] <=> $a["price"];
            }

            if ($sort === "rating") {
                return $b["rating"] <=> $a["rating"];
            }

            return 0;
        });
    }

    $total = count($result);

    $page = max(1, (int) ($_GET["page"] ?? 1));
    $limit = max(1, min(50, (int) ($_GET["limit"] ?? 6)));

    $offset = ($page - 1) * $limit;

    $result = array_values(array_slice($result, $offset, $limit));

    response([
        "success" => true,
        "data" => $result,
        "pagination" => [
            "page" => $page,
            "limit" => $limit,
            "total" => $total,
            "pages" => (int) ceil($total / $limit)
        ]
    ]);
}

/*
 * BOOKINGS
 */
if ($endpoint === "bookings.json") {

    if ($method === "GET") {

        $id = isset($_GET["id"]) ? (int) $_GET["id"] : null;

        if ($id !== null && $id > 0) {
            foreach ($bookings as $booking) {
                if ($booking["id"] === $id) {
                    response($booking);
                }
            }

            response([
                "success" => false,
                "message" => "Booking not found."
            ], 404);
        }

        response([
            "success" => true,
            "data" => array_values($bookings)
        ]);
    }

    if ($method === "POST") {

        $body = requestBody();

        $required = [
            "car_id",
            "customer_name",
            "email",
            "location",
            "pickup_date",
            "return_date"
        ];

        foreach ($required as $field) {
            if (!isset($body[$field]) || trim((string) $body[$field]) === "") {
                response([
                    "success" => false,
                    "message" => "Field '{$field}' is required."
                ], 400);
            }
        }

        $carId = (int) $body["car_id"];
        $selectedCar = null;

        foreach ($cars as $car) {
            if ($car["id"] === $carId) {
                $selectedCar = $car;
                break;
            }
        }

        if (!$selectedCar) {
            response([
                "success" => false,
                "message" => "Car not found."
            ], 404);
        }

        if (!$selectedCar["available"]) {
            response([
                "success" => false,
                "message" => "This car is currently unavailable."
            ], 409);
        }

        $pickup = new DateTime($body["pickup_date"]);
        $return = new DateTime($body["return_date"]);

        if ($return <= $pickup) {
            response([
                "success" => false,
                "message" => "Return date must be after pickup date."
            ], 400);
        }

        $days = (int) $pickup->diff($return)->days;

        $booking = [
            "id" => count($bookings) > 0
                ? max(array_column($bookings, "id")) + 1
                : 1,
            "car_id" => $selectedCar["id"],
            "car_name" => $selectedCar["name"],
            "customer_name" => trim($body["customer_name"]),
            "email" => trim($body["email"]),
            "location" => trim($body["location"]),
            "pickup_date" => $body["pickup_date"],
            "return_date" => $body["return_date"],
            "days" => $days,
            "price_per_day" => $selectedCar["price"],
            "total" => $days * $selectedCar["price"],
            "currency" => "USD",
            "status" => "confirmed",
            "created_at" => date("Y-m-d H:i:s")
        ];

        $bookings[] = $booking;
        saveJson($bookingsFile, $bookings);

        response([
            "success" => true,
            "message" => "Booking created successfully.",
            "data" => $booking
        ], 201);
    }

    response([
        "success" => false,
        "message" => "Method not allowed."
    ], 405);
}

/*
 * SIMPLE IMAGE ENDPOINT
 */
if ($endpoint === "image.png" && $method === "GET") {

    $title = $_GET["title"] ?? "AutoGo";

    $width = 900;
    $height = 500;

    $image = imagecreatetruecolor($width, $height);

    $background = imagecolorallocate($image, 15, 23, 42);
    $white = imagecolorallocate($image, 255, 255, 255);
    $blue = imagecolorallocate($image, 37, 99, 235);

    imagefill($image, 0, 0, $background);

    imagefilledrectangle(
        $image,
        0,
        $height - 12,
        $width,
        $height,
        $blue
    );

    $font = 5;

    $textWidth = imagefontwidth($font) * strlen($title);
    $x = (int) (($width - $textWidth) / 2);
    $y = (int) (($height - imagefontheight($font)) / 2);

    imagestring($image, $font, $x, $y, $title, $white);

    header("Content-Type: image/png");

    imagepng($image);
    imagedestroy($image);
    exit;
}

/*
 * DEFAULT RESPONSE
 */
response([
    "success" => false,
    "message" => "AutoGo API endpoint not found.",
    "available_endpoints" => [
        "GET /reset.json",
        "GET /cars.json",
        "GET /cars.json?id=1",
        "GET /bookings.json",
        "GET /bookings.json?id=1",
        "POST /bookings.json"
    ]
], 404);
?>
