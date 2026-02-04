# CodeLeap Network

Full-stack blog application with authentication and post management.

## Stack

**Frontend:** Next.js, TypeScript, Chakra UI  
**Backend:** Django, Django REST Framework

---

## Quick Start

### Backend

```bash
cd codeleap-backend
python -m venv venv
source venv/bin/activate  # Linux/Mac | venv\Scripts\activate (Windows)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Runs at: `http://127.0.0.1:8000`  
Docs: `http://127.0.0.1:8000/docs/`

### Frontend

```bash
cd codeleap-frontend
npm install
npm run dev
```

Runs at: `http://localhost:3000`

---

## Deploy

**Backend:** [YOUR_BACKEND_URL]  
**Frontend:** [YOUR_FRONTEND_URL]

Update `NEXT_PUBLIC_API_URL` in frontend with deployed backend URL.
