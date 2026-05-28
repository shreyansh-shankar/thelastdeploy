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


# --- Sections ---

class SectionSchema(BaseModel):
    id: str
    title: str
    type: str
    order: int
    xp: int
    content: str | None = None
    completed: bool = False
    xp_awarded: int = 0

    class Config:
        from_attributes = True


# --- Modules ---

class ModuleListItem(BaseModel):
    id: str
    title: str
    description: str | None
    topic: str | None
    difficulty: str | None
    estimated_minutes: int | None
    tags: list[str] = []
    total_xp: int = 0
    total_sections: int = 0
    completed_sections: int = 0

class ModuleListResponse(BaseModel):
    modules: list[ModuleListItem]

class ModuleDetail(BaseModel):
    id: str
    title: str
    description: str | None
    topic: str | None
    difficulty: str | None
    estimated_minutes: int | None
    tags: list[str] = []
    total_xp: int
    sections: list[SectionSchema]


# --- Section Progress ---

class CompleteSectionResponse(BaseModel):
    xp_awarded: int
    total_xp: int


# --- Results (practical sections) ---

class ResultRequest(BaseModel):
    module_id: str
    section_id: str
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
    completed_sections: list[str]

class LeaderboardEntry(BaseModel):
    rank: int
    username: str
    xp: int
    completed: int

class LeaderboardResponse(BaseModel):
    leaderboard: list[LeaderboardEntry]