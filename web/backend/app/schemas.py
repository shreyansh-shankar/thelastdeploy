# web/backend/app/schemas.py

from datetime import datetime
from pydantic import BaseModel, EmailStr


# --- Auth ---

class RegisterRequest(BaseModel):
    email: EmailStr
    username: str
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


# --- Challenges ---

class ChallengeListItem(BaseModel):
    id: str
    yaml: str

class ChallengeListResponse(BaseModel):
    challenges: list[ChallengeListItem]

class ChallengeDetail(BaseModel):
    id: str
    title: str
    description: str | None
    topic: str | None
    difficulty: str | None
    xp: int
    estimated_minutes: int | None
    completed: bool = False


# --- Results ---

class ResultRequest(BaseModel):
    challenge_id: str
    passed: bool
    output: str | None = None
    ran_at: datetime | None = None
    signature: str | None = None
    queued_at: datetime | None = None

class ResultResponse(BaseModel):
    xp_awarded: int


# --- Users ---

class MeResponse(BaseModel):
    id: int
    username: str
    email: str
    xp: int
    streak_days: int
    completed_challenges: list[str]

class LeaderboardEntry(BaseModel):  
    rank: int
    username: str
    xp: int
    completed: int

class LeaderboardResponse(BaseModel):
    leaderboard: list[LeaderboardEntry]