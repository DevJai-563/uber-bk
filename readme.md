# Uber BK API Documentation

## Endpoints

### POST `/users/register`

This endpoint is used to register a new user.

#### Request Body

The following fields are required in the request body:

| Field               | Type     | Description                                    |
|---------------------|----------|------------------------------------------------|
| `fullname`| `object` |  |
| `fullname.firstname`| `string` | The first name of the user (minimum 3 characters). |
| `fullname.lastname` | `string` | The last name of the user (optional).          |
| `email`             | `string` | The email address of the user (must be valid). |
| `password`          | `string` | The password for the user (minimum 6 characters). |

Example request body:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

#### Response

| Status Code | Description                                   |
|-------------|-----------------------------------------------|
| `201`       | User successfully registered. Returns a token and user details. |
| `422`       | Validation error. Returns an array of validation errors. |

Example success response (`201`):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
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

Example error response (`422`):
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password should contain minimum 6 characters",
      "param": "password",
      "location": "body"
    }
  ]
}
```

#### Notes

- Ensure that the `email` field is unique for each user.
- The `password` is hashed before being stored in the database.
- A JWT token is generated upon successful registration and returned in the response.





---
### POST `/users/login`

This endpoint is used to log in an existing user.

#### Request Body

The following fields are required in the request body:

| Field      | Type     | Description                                    |
|------------|----------|------------------------------------------------|
| `email`    | `string` | The email address of the user (must be valid). |
| `password` | `string` | The password for the user.                     |

Example request body:
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

#### Response

| Status Code | Description                                   |
|-------------|-----------------------------------------------|
| `201`       | User successfully logged in. Returns a token and user details. |
| `401`       | Authentication error. Invalid email or password. |

Example success response (`201`):
```json
{
  "message": "User login Successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
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
  "message": "Invalid User or Password"
}
```

#### Notes

- Ensure that the `email` and `password` fields are provided in the request body.
- The `password` is compared with the hashed password stored in the database.
- A JWT token is generated upon successful login and returned in the response.