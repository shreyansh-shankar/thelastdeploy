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
    device_key: str


# --- Labs ---

class LabSchema(BaseModel):
    id: str
    title: str
    order: int
    xp: int
    estimated_minutes: int | None = None
    setup_type: str | None = None
    seed_commands: str | None = None     # JSON string
    resource_limits_cpu: int | None = None
    resource_limits_mem: int | None = None
    completed: bool = False
    xp_awarded: int = 0

    class Config:
        from_attributes = True


class LabDetail(BaseModel):
    """Response for GET /labs/:id — includes location metadata for agent sync."""
    id: str
    module_id: str
    section_id: str
    data: LabSchema


# --- Sections ---

class SectionSchema(BaseModel):
    id: str
    title: str
    order: int
    content: str | None = None
    labs: list[LabSchema] = []

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
    total_sections: int
    sections: list[SectionSchema]

class ModuleSummary(BaseModel):
    """Lightweight module info for GET /modules/:id (used by tld sync -m)."""
    id: str
    title: str
    description: str | None
    topic: str | None
    difficulty: str | None
    estimated_minutes: int | None
    tags: list[str] = []
    total_xp: int
    total_sections: int


# --- Lab Progress ---

class CompleteSectionResponse(BaseModel):
    xp_awarded: int
    total_xp: int


# --- Results (from tld check) ---

class ResultRequest(BaseModel):
    lab_id: str           # globally unique lab ID, e.g. "dkr-run-hello"
    section_id: str       # for context/logging
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
    completed_labs: list[str]        # lab IDs

class LeaderboardEntry(BaseModel):
    rank: int
    username: str
    xp: int
    completed: int

class LeaderboardResponse(BaseModel):
    leaderboard: list[LeaderboardEntry]