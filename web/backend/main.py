# web/backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, modules, results, users

app = FastAPI(
    title="The Last Deploy API",
    description="Backend for The Last Deploy DevOps practice platform",
    version="0.3.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, tags=["auth"])
app.include_router(modules.router, tags=["modules"])   # includes /labs/:id too
app.include_router(results.router, tags=["results"])
app.include_router(users.router, tags=["users"])


@app.get("/health")
async def health():
    return {"status": "ok"}