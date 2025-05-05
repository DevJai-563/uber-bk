# Uber BK API Documentation

## Endpoints

### GET `/users/profile`

This endpoint retrieves the profile information of the currently authenticated user.

#### Authentication

- **Required**: Bearer Token

#### Response

| Status Code | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| `200`       | Returns the user's profile data, including details such as name and email. |
| `401`       | Unauthorized. Returned if the user is not authenticated.                   |
| `404`       | Not Found. Returned if the user's profile cannot be found.                 |

Example success response (`200`):
```json
{
  "user": {
    "_id": "643b1f2e5f1c2a001c8e4b9d",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  }
}
```

Example error response (`401`):
```json
{
  "message": "Unauthorized"
}
```

Example error response (`404`):
```json
{
  "message": "User profile not found"
}
```

#### Notes

- Ensure the request includes a valid Bearer Token in the `Authorization` header.
- The endpoint returns the profile data of the currently authenticated user.

---

### POST `/user/logout`

This endpoint logs out the currently authenticated user by invalidating their session or token.

#### Authentication

- **Required**: Bearer Token

#### Request Body

- None

#### Response

| Status Code | Description                                   |
|-------------|-----------------------------------------------|
| `200`       | Indicates successful logout.                 |
| `401`       | Unauthorized. Returned if the user is not authenticated. |

Example success response (`200`):
```json
{
  "message": "Logout successful"
}
```

Example error response (`401`):
```json
{
  "message": "Unauthorized"
}
```

#### Notes

- Ensure the request includes a valid Bearer Token in the `Authorization` header.
- This endpoint invalidates the user's session or token, effectively logging them out.
- No request body is required for this endpoint.







### POST `/captains/register`

This endpoint is used to register a new captain.

#### Request Body

The following fields are required in the request body:

| Field               | Type     | Description                                    |
|---------------------|----------|------------------------------------------------|
| `fullname`          | `object` | Contains the captain's full name.             |
| `fullname.firstname`| `string` | The first name of the captain (minimum 3 characters). |
| `fullname.lastname` | `string` | The last name of the captain (optional).       |
| `email`             | `string` | The email address of the captain (must be valid). |
| `password`          | `string` | The password for the captain (minimum 6 characters). |
| `vehicle`           | `object` | Contains the vehicle details.                 |
| `vehicle.color`     | `string` | The color of the vehicle.                     |
| `vehicle.noPlate`   | `string` | The vehicle's number plate.                   |
| `vehicle.vehicleType`| `string`| The type of the vehicle (e.g., car, bike).    |
| `vehicle.capacity`  | `number` | The capacity of the vehicle (e.g., number of passengers). |

Example request body:
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "janedoe@example.com",
  "password": "securepassword123",
  "vehicle": {
    "color": "Red",
    "noPlate": "ABC-1234",
    "vehicleType": "Car",
    "capacity": 4
  }
}
```

#### Response

| Status Code | Description                                   |
|-------------|-----------------------------------------------|
| `201`       | Captain successfully registered. Returns a token and captain details. |
| `401`       | Validation error or captain already exists. Returns an error message. |

Example success response (`201`):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "643b1f2e5f1c2a001c8e4b9d",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "janedoe@example.com",
    "vehicle": {
      "color": "Red",
      "noPlate": "ABC-1234",
      "vehicleType": "Car",
      "capacity": 4
    }
  }
}
```

Example error response (`401`):
```json
{
  "message": "Captain already exists."
}
```

#### Notes

- Ensure that the `email` field is unique for each captain.
- The `password` is hashed before being stored in the database.
- A JWT token is generated upon successful registration and returned in the response.


### POST `/captains/login`

This endpoint is used to log in an existing captain.

#### Request Body

The following fields are required in the request body:

| Field      | Type     | Description                                    |
|------------|----------|------------------------------------------------|
| `email`    | `string` | The email address of the captain (must be valid). |
| `password` | `string` | The password for the captain.                  |

Example request body:
```json
{
  "email": "janedoe@example.com",
  "password": "securepassword123"
}
```

#### Response

| Status Code | Description                                   |
|-------------|-----------------------------------------------|
| `201`       | Captain successfully logged in. Returns a token and captain details. |
| `401`       | Authentication error. Invalid email or password. |

Example success response (`201`):
```json
{
  "message": "Captain logged in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "643b1f2e5f1c2a001c8e4b9d",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "janedoe@example.com",
    "vehicle": {
      "color": "Red",
      "noPlate": "ABC-1234",
      "vehicleType": "Car",
      "capacity": 4
    }
  }
}
```

Example error response (`401`):
```json
{
  "message": "Username or Password invalid"
}
```

#### Notes

- Ensure that the `email` and `password` fields are provided in the request body.
- The `password` is compared with the hashed password stored in the database.
- A JWT token is generated upon successful login and returned in the response.

---

### GET `/captains/profile`

This endpoint retrieves the profile information of the currently authenticated captain.

#### Authentication

- **Required**: Bearer Token

#### Response

| Status Code | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| `200`       | Returns the captain's profile data, including details such as name, email, and vehicle information. |
| `401`       | Unauthorized. Returned if the captain is not authenticated.                |

Example success response (`200`):
```json
{
  "captain": {
    "_id": "643b1f2e5f1c2a001c8e4b9d",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "janedoe@example.com",
    "vehicle": {
      "color": "Red",
      "noPlate": "ABC-1234",
      "vehicleType": "Car",
      "capacity": 4
    }
  }
}
```

Example error response (`401`):
```json
{
  "message": "Unauthorized"
}
```

#### Notes

- Ensure the request includes a valid Bearer Token in the `Authorization` header.
- The endpoint returns the profile data of the currently authenticated captain.

---

### POST `/captains/logout`

This endpoint logs out the currently authenticated captain by invalidating their session or token.

#### Authentication

- **Required**: Bearer Token

#### Request Body

- None

#### Response

| Status Code | Description                                   |
|-------------|-----------------------------------------------|
| `200`       | Indicates successful logout.                 |
| `401`       | Unauthorized. Returned if the captain is not authenticated. |

Example success response (`200`):
```json
{
  "message": "Captain logged out"
}
```

Example error response (`401`):
```json
{
  "message": "Unauthorized"
}
```

#### Notes

- Ensure the request includes a valid Bearer Token in the `Authorization` header.
- This endpoint invalidates the captain's session or token, effectively logging them out.
- No request body is required for this endpoint.

### GET `/map/coordinates`

This endpoint retrieves the geographical coordinates (latitude and longitude) of a given address.

#### Authentication

- **Required**: Bearer Token in the `Authorization` header.

#### Headers

| Header            | Value                  | Description                     |
|-------------------|------------------------|---------------------------------|
| `Authorization`   | `Bearer <your-token>` | The JWT token for authentication. |

#### Query Parameters

| Parameter | Type     | Description                       |
|-----------|----------|-----------------------------------|
| `address` | `string` | The address to get coordinates for. |

Example request:
```
GET /map/coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA
Authorization: Bearer <your-token>
```

#### Response

| Status Code | Description                                   |
|-------------|-----------------------------------------------|
| `200`       | Successfully retrieved coordinates.           |
| `400`       | Validation error. Address is missing or invalid. |
| `401`       | Unauthorized. Returned if the token is missing or invalid. |
| `404`       | Unable to find coordinates for the given address. |

Example success response (`200`):
```json
{
  "lat": "37.4224764",
  "lon": "-122.0842499",
  "display_name": "1600 Amphitheatre Parkway, Mountain View, CA"
}
```

Example error response (`401`):
```json
{
  "message": "Unauthorized"
}
```

Example error response (`404`):
```json
{
  "message": "Coordinates not found"
}
```

#### Notes

- Ensure the request includes a valid Bearer Token in the `Authorization` header.
- The `address` parameter must be URL-encoded.

---

### GET `/map/disandtime`

This endpoint calculates the distance and estimated travel time between two addresses.

#### Authentication

- **Required**: Bearer Token in the `Authorization` header.

#### Headers

| Header            | Value                  | Description                     |
|-------------------|------------------------|---------------------------------|
| `Authorization`   | `Bearer <your-token>` | The JWT token for authentication. |

#### Query Parameters

| Parameter      | Type     | Description                                      |
|----------------|----------|--------------------------------------------------|
| `origin`       | `string` | The starting address.                            |
| `destination`  | `string` | The destination address.                         |

Example request:
```
GET /map/disandtime?origin=New+York,+NY&destination=Los+Angeles,+CA
Authorization: Bearer <your-token>
```

#### Response

| Status Code | Description                                   |
|-------------|-----------------------------------------------|
| `200`       | Successfully retrieved distance and time.     |
| `400`       | Validation error. Origin or destination is missing. |
| `401`       | Unauthorized. Returned if the token is missing or invalid. |
| `404`       | Unable to calculate distance and time.        |

Example success response (`200`):
```json
{
  "distance": 4500,
  "duration": 2700
}
```

Example error response (`401`):
```json
{
  "message": "Unauthorized"
}
```

Example error response (`404`):
```json
{
  "message": "Distance and time not found"
}
```

#### Notes

- Ensure the request includes a valid Bearer Token in the `Authorization` header.
- The `origin` and `destination` parameters must be URL-encoded.
- The `distance` is returned in kilometers, and the `duration` is returned in minutes.

