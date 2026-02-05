# CodeLeap API

REST API for managing blog posts.

## Quick Start

```bash
# Setup
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate

# Run
python manage.py runserver
```

Server: `http://127.0.0.1:8000`

## Documentation

Swagger: http://127.0.0.1:8000/docs/

## Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/careers/` | List posts |
| POST | `/careers/` | Create post |
| GET | `/careers/{id}/` | Get post |
| PATCH | `/careers/{id}/` | Update post |
| DELETE | `/careers/{id}/` | Delete post |
