# web/backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, challenges, results, users

app = FastAPI(
    title="OrbStack API",
    description="Backend for the OrbStack DevOps practice platform",
    version="0.1.0",
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
app.include_router(challenges.router, tags=["challenges"])
app.include_router(results.router, tags=["results"])
app.include_router(users.router, tags=["users"])


@app.get("/health")
async def health():
    return {"status": "ok"}