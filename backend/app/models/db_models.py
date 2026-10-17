from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, Text, Integer, ForeignKey
from app.database import Base

class ProductScopeDB(Base):
    __tablename__ = "product_scopes"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    code = Column(String, nullable=False)
    is_default = Column(Boolean, default=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class ActionCardDB(Base):
    __tablename__ = "action_cards"

    id = Column(String, primary_key=True, index=True)
    scope_id = Column(String, ForeignKey("product_scopes.id"), nullable=False, index=True)
    source = Column(String, nullable=False)  # slack, servicenow, email, teams
    category = Column(String, nullable=False)  # triage, blocker, review
    urgency = Column(String, nullable=False)  # P0 Critical, P0 Blocker, P1 Review
    title = Column(String, nullable=False)
    summary = Column(Text, nullable=False)
    best_next_step = Column(Text, nullable=False)
    status = Column(String, default="pending")  # pending, resolved, dismissed
    action_type = Column(String, nullable=False)  # draft_inquiry, sync_servicenow, review_spec
    action_label = Column(String, nullable=False)
    target_ticket = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class PRDDocumentDB(Base):
    __tablename__ = "prds"

    id = Column(String, primary_key=True, index=True)
    scope_id = Column(String, ForeignKey("product_scopes.id"), nullable=False, index=True)
    title = Column(String, nullable=False)
    status = Column(String, default="draft")  # draft, approved, synced
    content_markdown = Column(Text, nullable=False)
    servicenow_story_id = Column(String, nullable=True)
    prototype_html = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class ConnectorConfigDB(Base):
    __tablename__ = "connector_configs"

    id = Column(String, primary_key=True, index=True)
    connector_type = Column(String, nullable=False)  # servicenow, google_workspace
    name = Column(String, nullable=False)
    is_enabled = Column(Boolean, default=True)
    mode = Column(String, default="sandbox")  # sandbox, live
    instance_url = Column(String, nullable=True)
    username = Column(String, nullable=True)
    client_id = Column(String, nullable=True)
    status = Column(String, default="disconnected")  # connected, error, disconnected
    target_tables = Column(String, nullable=True)
    last_tested_at = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class AgentScheduleDB(Base):
    __tablename__ = "agent_schedules"

    id = Column(String, primary_key=True, index=True)
    agent_name = Column(String, nullable=False)
    cadence_type = Column(String, default="interval")  # interval, cron, manual
    interval_minutes = Column(Integer, default=30)
    cron_expression = Column(String, nullable=True)
    is_enabled = Column(Boolean, default=True)
    last_run_at = Column(DateTime, nullable=True)
    last_run_status = Column(String, default="idle")  # idle, running, completed, error
    next_run_at = Column(DateTime, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
