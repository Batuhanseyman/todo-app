# Todo App

A full-featured Todo application built with **Next.js**, **Tailwind CSS** and **Firebase Authentication**. This project follows a modular component-based architecture and utilizes **Express.js REST API** with **MongoDB** as the backend.

## Features

### Frontend (Next.js + Tailwind CSS)
- User authentication via **Google** and **Email/Password** using **Firebase**
- **Session management** handled on the frontend
- **Component-based architecture** with **TypeScript (TSX format)**
- **Anonymous user todos** are stored locally and transferred to the backend upon login
- **CRUD operations** (Create, Read, Update, Delete) for todos
- **Profile page** displaying:
  - Google login: Profile picture, email, and display name
  - Email/Password login: Avatar generated using first letter of email via **AvatarUI API**
  - Request count statistics (GET, POST, PUT, DELETE) per user

### Backend (Express.js + MongoDB)
- **RESTful API** built with Express.js
- **MongoDB (NoSQL)** database for persisting user and todo data
- **Middleware-based architecture** for user validation using Firebase
- **Logging mechanism** to track the count of API requests (GET, POST, PUT, DELETE)

## Installation & Setup

### Prerequisites
- Node.js (>= 18.x)
- MongoDB (local or Atlas instance)
- Firebase project with authentication configured
- Git

### Clone the Repository
```sh
git clone https://github.com/Batuhanseyman/todo-app.git
cd todo-app
```

### Setup Environment Variables
Create a `.env.local` file in the root of the frontend directory and add:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
NEXT_PUBLIC_BACKEND_API_URI="http://localhost:8080/api"
```
For backend, create a `.env` file and add:
```env
MONGO_URI=mongodb://localhost:27017/todo
PORT=8080
```


To properly authenticate Firebase on the backend, download your Firebase Admin SDK JSON file from the Firebase Console and place it inside the backend directory at:
```
backend/src/configs/firebase/serviceAccountKey.json
```
This file is required for Firebase authentication and should not be committed to version control.

### Install Dependencies
#### Frontend
```sh
cd frontend
npm install
```
#### Backend
```sh
cd backend
npm install
```

### Run the Application
#### Start Backend
```sh
cd backend
npm run dev
```
#### Start Frontend
```sh
cd frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Authentication
| Method | Endpoint        | Description                      |
|--------|----------------|----------------------------------|
| GET    | `/api/register/`    | Pair backend with Firebase |

### Todos
| Method | Endpoint         | Description            |
|--------|-----------------|------------------------|
| GET    | `/api/todos/:id`        | Fetch user todos       |
| POST   | `/api/todos/`       | Create a new todo      |
| POST   | `/api/todos/insert-many`       | Create a many new todos      |
| PUT    | `/api/todos/:id`    | Update a todo         |
| DELETE | `/api/todos/:id`   | Delete a todo         |

### Profile
| Method | Endpoint        | Description                      |
|--------|----------------|----------------------------------|
| GET    | `/api/requestcounts/:id`    | Fetch API request count per user |

## Screenshots
### Home Page
![home_page](https://github.com/user-attachments/assets/c829d769-a7d3-4b54-8a08-67d3a3866d65)


### Login/Register Page
![login_page](https://github.com/user-attachments/assets/f1c4aa1e-a916-47d6-b42f-a88ea26cb6fe)


### Profile Page
![profile_page](https://github.com/user-attachments/assets/03ab1b74-eaf8-4db2-9ca6-b52807a42301)


## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License
This project is licensed under the **MIT License**.

