# Flight Booking API

This API allows users to book flights and retrieve booking information.

## Depoloyed Link
[Flight_Booking_API](https://flight-booking-v25z.onrender.com)

## Getting Started

To get started with the Flight Booking API, follow the instructions below.

### Prerequisites

- Node.js (v14 or above)
- MongoDB

### Installation

1. Clone the repository:

git clone <https://github.com/Ayush-kr-shanu/Flight_Booking_API.git>

2. Install the dependencies:

cd Flight_Booking_API
npm install


3. Set up the environment variables:

Create a `.env` file in the root directory and configure the following variables:
DB_URL=<mongodb-connection-url>
JWT_CODE=8
JWT_SECRET_CODE=5



### Starting the Server

Run the following command to start the server:

npm run server


## API Endpoints

### User registering
- Endpoint: POST /api/register
- Description: Register the user.
- Response: With 200 status code with message registered sucessfully.

## User logging
- Endpoint: POST /api/login
- Description: User able to login.
- Response: acessToken and RefreshToken.

### Get All Flights

- Endpoint: GET /api/flights
- Description: Retrieves all available flights.
- Response: Array of flight objects.

### Get Flight by ID

- Endpoint: GET /api/flights/:id
- Description: Retrieves flight details by flight ID.
- Parameters: flight ID as a URL parameter.
- Response: Flight object.

### Create a Booking

- Endpoint: POST /api/bookings
- Description: Books a flight.
- Request Body: 
  - `flightId`: ID of the flight to book.
  - `userId`: ID of the user making the booking.
- Response: New booking object.

### Get All Bookings

- Endpoint: GET /api/dashboard
- Description: Retrieves all bookings with flight and user details.
- Response: Array of booking objects, each containing flight and user details.