# taskflow-SayanHaldar
TaskFlow — Engineering Take-Home Assignment. A Greening India Assignment.
## Overview

This project is a full-featured task management system built as part of a full-stack engineering assignment.
It allows users to:

* Authenticate using JWT-based login
* Create and manage projects
* Create, update, and delete tasks under projects
* Assign tasks and track their status
* Use a modal-based UX for editing without losing navigation context

The focus of this project is not just functionality, but real-world architecture decisions, clean UX, and production-style routing patterns.

## Tech Stack

In this project my role was a Frontend Developer. So in that case I have used,
* React(TypeScript)
* Chakra UI
* Formik + Yup validation
* Json-server mock API

## Architechture Decisions

* Modal Routing Pattern

Instead of navigating away from the project view, I implemented a React Router modal overlay pattern:

* Background route preserves project context
* Modal route overlays edit UI (/projects/:id/edit)
* Prevents full page reload and improves UX continuity
* Separation of Concerns
    * Project list page handles fetching and listing all projects
    * Modal wrapper handles single project fetch
    * Modal handles update logic only

This ensures clear responsibility boundaries.

* State Synchronization Strategy

Instead of global state libraries:
    * Data refresh is handled via useEffect triggered on route change
    * Ensures UI consistency after updates without prop drilling

* PostgreSQL Relational Design

Data modeled as:
    * Users → Projects → Tasks (1-to-many relationships)
    * Enables scalable task assignment and filtering logic
* Dockerized Environment

Entire system runs via: "docker compose up --build"

## Running Locally

* git clone https://github.com/<your-username>/<repo-name>
* cd <repo-name>
* cp .env.example .env
* docker compose up --build

## Access

* Frontend: http://localhost:4000
* Backend: http://localhost:5000
* Database: PostgreSQL (port 5432)

## API Reference

Auth

* POST /auth/register
* POST /auth/login

Projects

* GET /projects
* POST /projects
* GET /projects/:id
* PATCH /projects/:id
* DELETE /projects/:id

Tasks

* GET /projects/:id/tasks
* POST /projects/:id/tasks
* PATCH /tasks/:id
* DELETE /tasks/:id

## If Given More Time I wWill DO

* Real-time updates using WebSockets
* Advanced filtering & pagination
* Role-based access control (RBAC)
* Proper Backend Integration