# **Student Management System - MERN Stack with Docker**

This project is a full-stack student management system built using the **MERN stack** (MongoDB, Express, React, and Node.js). The entire application is containerized using **Docker** and orchestrated with **Docker Compose**. Additionally, we use a **Makefile** to simplify Docker-related commands and automate tasks.

## **Table of Contents**
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Set Up Environment Variables](#2-set-up-environment-variables)
  - [3. Build and Run with Docker Compose](#3-build-and-run-with-docker-compose)
- [Available Commands](#available-commands)
- [Project Structure](#project-structure)
- [Makefile Overview](#makefile-overview)
- [Useful Docker Commands](#useful-docker-commands)
- [Conclusion](#conclusion)

## **Project Overview**
The Student Management System allows users to:
- Add, view, edit, and delete student information.
- Persist data using **MongoDB**.
- Seamlessly run both frontend and backend services in separate containers using **Docker**.

The project consists of:
- A **React.js frontend** for the user interface.
- A **Node.js backend** (Express.js) to handle API requests.
- **MongoDB** for database management.
- **Docker** and **Docker Compose** for containerizing the entire application.

## **Technologies Used**
- **MongoDB**: A NoSQL database for storing student data.
- **Express.js**: A backend web framework for building RESTful APIs.
- **React.js**: A frontend library for building user interfaces.
- **Node.js**: JavaScript runtime for backend development.
- **Docker**: Containerization tool to ensure consistent environments.
- **Docker Compose**: For orchestrating multi-container Docker applications.
- **Makefile**: A tool for automating Docker commands.

## **Prerequisites**
Ensure you have the following installed on your machine:
- **Docker**
- **Docker Compose**
- **Git**

## **Getting Started**

Follow these steps to get the project up and running.

### **1. Clone the Repository**
To clone the repository, use the following command:

`git clone https://github.com/your-username/your-repository.git`

After cloning, navigate into the project directory by using:

`cd your-repository`

### **2. Set Up Environment Variables**
Create a `.env` file in the root directory of the project and add the following:

`REACT_APP_API_URL=http://localhost:5001/api`

This file ensures that the frontend can communicate with the backend API.

### **3. Build and Run with Docker Compose**
To build the Docker images and start the application, use the following command:

`docker-compose up --build`

This command will:
- Build Docker images for both the frontend and backend.
- Start up the **MongoDB** database container.
- Expose the frontend at `http://localhost:3009` and the backend API at `http://localhost:5001`.

To stop the application and remove the containers, use:

`docker-compose down`

## **Available Commands**
Here are the essential commands used for running the project:

- To **build and start** the containers, use `docker-compose up --build`.
- To **stop and remove** the running containers, use `docker-compose down`.
- To **clean up** unused Docker resources, use `docker system prune -af` and `docker volume prune -f`.

## **Project Structure**
The project is structured as follows:

- The **backend** directory contains Mongoose models, API routes, and the **Express.js** server.
- The **frontend** directory contains public assets and **React components**.
- There are **Dockerfiles** for both the frontend and backend to define how the containers should be built.
- The **docker-compose.yml** file orchestrates the running of the multiple containers.
- The **Makefile** is used to automate Docker commands.

## **Makefile Overview**
We use a **Makefile** to automate repetitive Docker commands. This simplifies common tasks such as building, starting, stopping, and cleaning up Docker containers.

The **Makefile** includes the following tasks:
- To **start** the Docker containers, use the `make start` command.
- To **stop** the Docker containers, use the `make stop` command.
- To **clean up** stopped containers, unused images, and networks, use the `make clean` command.
- To **build** the Docker containers, use the `make build` command.

## **Useful Docker Commands**
Here are some useful Docker commands to help you work on this project:

- To **view the running containers**, use `docker ps`.
- To **stop and remove containers**, use `docker-compose down`.
- To **check Docker logs**, use `docker-compose logs`.
- To **clean up the Docker system**, use `docker system prune -af`.

## **Conclusion**
This project demonstrates how to use **Docker** and **Docker Compose** to containerize a full-stack application, including a **React frontend**, **Node.js backend**, and **MongoDB** database. The use of a **Makefile** simplifies the management of Docker containers, making development and deployment more efficient.

Feel free to contribute or suggest improvements by submitting issues or pull requests to the repository.


