

# Calendar & Meeting Management System

This is a **Calendar & Meeting Management System** built using **Node.js, Express, MongoDB**, and **JWT** for authentication. The system allows users to create and manage calendars, schedule meetings, and perform actions based on their roles (Organizer/Attendee).

## Features

- User Authentication (Sign up, Log in, Log out) using **JWT**.
- Create, update, and delete **calendars**.
- View and manage **meetings** for a calendar.
- Only **organizers** can reschedule meetings and update location information.
- Meetings have a **start** and **end** time.
- **JWT blacklisting** to manage token invalidation on logout.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [User Authentication](#user-authentication)
  - [Calendar Management](#calendar-management)
  - [Meeting Management](#meeting-management)
- [License](#license)

---

## Tech Stack

- **Node.js**: JavaScript runtime for server-side code execution.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **JWT**: Token-based authentication.
- **Bcrypt**: Password hashing for secure authentication.
- **Dotenv**: Environment variable management.

---

## Installation

Follow these steps to run the project locally:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/<your-username>/calendar-meeting-management-system.git
    cd calendar-meeting-management-system
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables)).

4. **Run the development server:**

    ```bash
    npm start
    ```

5. The server should now be running on `http://localhost:5000`.

---

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```bash
PORT=5000
MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret key>
```

---

## API Endpoints

### User Authentication

1. **Sign Up**  
   **Endpoint**: `/api/user/signup`  
   **Method**: `POST`  
   **Description**: Registers a new user.

   **Request Body**:
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "yourpassword"
   }
   ```

   **Response**:
   ```json
   {
     "token": "<JWT Token>"
   }
   ```

2. **Log In**  
   **Endpoint**: `/api/user/login`  
   **Method**: `POST`  
   **Description**: Logs in an existing user and returns a JWT token.

   **Request Body**:
   ```json
   {
     "email": "john@example.com",
     "password": "yourpassword"
   }
   ```

   **Response**:
   ```json
   {
     "token": "<JWT Token>"
   }
   ```

3. **Log Out**  
   **Endpoint**: `/api/user/logout`  
   **Method**: `POST`  
   **Description**: Logs out the current user by blacklisting the JWT token.

   **Headers**:
   ```
   Authorization: Bearer <JWT Token>
   ```

---

### Calendar Management

1. **Create a Calendar**  
   **Endpoint**: `/api/calendar`  
   **Method**: `POST`  
   **Description**: Creates a new calendar.

   **Request Body**:
   ```json
   {
     "name": "Work Calendar"
   }
   ```

   **Response**:
   ```json
   {
     "_id": "<Calendar ID>",
     "name": "Work Calendar",
     "user": "<User ID>",
     "created_at": "2024-09-14T06:15:24.456Z"
   }
   ```

2. **Update a Calendar**  
   **Endpoint**: `/api/calendar/:calendarId`  
   **Method**: `PUT`  
   **Description**: Updates the name of a calendar.

   **Request Body**:
   ```json
   {
     "name": "Updated Calendar Name"
   }
   ```

3. **Delete a Calendar**  
   **Endpoint**: `/api/calendar/:calendarId`  
   **Method**: `DELETE`  
   **Description**: Deletes an existing calendar.

---

### Meeting Management

1. **View Meetings in a Calendar**  
   **Endpoint**: `/api/meeting/:calendarId`  
   **Method**: `GET`  
   **Description**: Retrieves all meetings in a specific calendar.

2. **Get Details of a Meeting**  
   **Endpoint**: `/api/meeting/details/:meetingId`  
   **Method**: `GET`  
   **Description**: Retrieves details of a specific meeting.

3. **Reschedule a Meeting** (Organizer only)  
   **Endpoint**: `/api/meeting/reschedule/:meetingId`  
   **Method**: `PUT`  
   **Description**: Allows the organizer to reschedule a meeting.

   **Request Body**:
   ```json
   {
     "start_time": "2024-09-14T10:00:00Z",
     "end_time": "2024-09-14T11:00:00Z"
   }
   ```

4. **Update Meeting Location** (Organizer only)  
   **Endpoint**: `/api/meeting/update-location/:meetingId`  
   **Method**: `PUT`  
   **Description**: Allows the organizer to update the meeting location.

   **Request Body**:
   ```json
   {
     "location": "Conference Room 1"
   }
   ```

---

