# FinTrack

FinTrack is an enterprise expense management system designed to help businesses efficiently track and manage financial transactions. It features a modern frontend built with React, TypeScript, and TailwindCSS, and a backend powered by Spring Boot with MySQL.

## Features

- User authentication (Signup, Login)
- Expense tracking and management
- Secure API with Spring Security
- Database management using MySQL and Flyway
- Responsive UI with TailwindCSS
- Interactive data visualization using Recharts

---

## Tech Stack

### Frontend

- React 19 (TypeScript)
- TailwindCSS
- Axios for API requests
- Recharts for data visualization

### Backend

- Spring Boot 3.3.9
- Spring Security
- Spring Data JPA (MySQL)
- Flyway for database migrations
- Lombok for cleaner code

---

## Getting Started

### Prerequisites

- **Node.js** (for frontend)
- **Java 21** (for backend)
- **MySQL** database
- **Maven** (for backend dependency management)

### Installation

#### Frontend Setup

```sh
# Clone the repository
git clone https://github.com/yourusername/fintrack.git
cd fintrack/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

#### Backend Setup

```sh
cd fintrack/backend

# Build the project
mvn clean install

# Run the Spring Boot application
mvn spring-boot:run
```

---

## Project Structure

```
fintrack/
├── frontend/      # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
├── backend/       # Spring Boot backend
│   ├── src/
│   │   ├── main/java/com/fintrack/
│   │   ├── resources/
│   ├── pom.xml
│   ├── application.properties
└── README.md
```

---

## Environment Variables

Create a `.env` file in the `backend/src/main/resources/` directory:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/fintrack
spring.datasource.username=root
spring.datasource.password=yourpassword
```

For the frontend, create a `.env` file in `frontend/`:

```sh
VITE_API_URL=http://localhost:8080/api
```

---

## Running Tests

### Frontend Tests

```sh
npm run test
```

### Backend Tests

```sh
mvn test
```

---

## Deployment

### Frontend (Vercel/Netlify)

```sh
npm run build
```

### Backend (Docker)

Create a `Dockerfile` for the backend:

```dockerfile
FROM openjdk:21-jdk-slim
COPY target/fintrack-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Build and run:

```sh
docker build -t fintrack-backend .
docker run -p 8080:8080 fintrack-backend
```

---

## License

This project is licensed under the MIT License.

