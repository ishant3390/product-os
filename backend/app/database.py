import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings

logger = logging.getLogger(__name__)

# Choose engine based on configuration
db_url = settings.DATABASE_URL
if db_url.startswith("sqlite"):
    engine = create_engine(
        db_url,
        connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(db_url, pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    import app.models.db_models as db_models
    Base.metadata.create_all(bind=engine)
    logger.info("Database schema initialized successfully.")
    
    # Seed default data if empty
    db = SessionLocal()
    try:
        if db.query(db_models.ProductScopeDB).count() == 0:
            logger.info("Seeding initial product scopes and action cards...")
            
            # Scopes
            scope_all = db_models.ProductScopeDB(
                id="all",
                name="All Portfolios",
                code="ALL",
                is_default=True,
                description="Cross-portfolio executive view across all products"
            )
            scope_checkout = db_models.ProductScopeDB(
                id="checkout-engine",
                name="Checkout & Payments",
                code="CHK",
                is_default=False,
                description="Core payment processing, ApplePay PassKit, 3DS2, and vaulted cards"
            )
            scope_merchant = db_models.ProductScopeDB(
                id="merchant-portal",
                name="Merchant Portal",
                code="MER",
                is_default=False,
                description="Merchant self-service dashboard, reconciliation, and disputes"
            )
            scope_risk = db_models.ProductScopeDB(
                id="risk-engine",
                name="Risk & Compliance",
                code="RSK",
                is_default=False,
                description="Fraud detection, KYC identity verification, and sanctions screening"
            )
            db.add_all([scope_all, scope_checkout, scope_merchant, scope_risk])
            db.commit()
            
            # Action Cards
            c1 = db_models.ActionCardDB(
                id="act-101",
                scope_id="checkout-engine",
                source="slack",
                category="triage",
                urgency="P0 Critical",
                title="ApplePay 1-Click Biometric Checkout",
                summary="Sarah (VP Sales) requested adding ApplePay PassKit tap-to-pay for enterprise retailers. Currently missing projected merchant volume and fee impact data.",
                best_next_step="Draft structured inquiry to Sarah asking for expected quarterly gross volume and client contract commitments before drafting spec.",
                status="pending",
                action_type="draft_inquiry",
                action_label="Draft Slack Inquiry",
                target_ticket="DEMAND-00842"
            )
            c2 = db_models.ActionCardDB(
                id="act-102",
                scope_id="checkout-engine",
                source="servicenow",
                category="blocker",
                urgency="P0 Blocker",
                title="ServiceNow Demand DEM-8821 Diverged",
                summary="Tech Lead Alex Kim flagged that Payment Method Vaulting spec diverged from active Sprint 42 scope. Acceptance criteria lack offline timeout edge cases.",
                best_next_step="Auto-update PRD Section 4.2 with retry backoff specs and sync new acceptance criteria to ServiceNow Story STRY001048.",
                status="pending",
                action_type="sync_servicenow",
                action_label="Auto-Update & Sync ServiceNow",
                target_ticket="STRY001048"
            )
            c3 = db_models.ActionCardDB(
                id="act-103",
                scope_id="merchant-portal",
                source="email",
                category="review",
                urgency="P1 Review",
                title="Automated Dispute Evidence Dossier",
                summary="Chargeback team submitted requirement for automated Visa/Mastercard dispute PDF packaging. Spec drafted by Spec Agent, waiting for PM approval.",
                best_next_step="Review drafted PRD and approve 1-click publishing to ServiceNow Agile 2.0 backlog.",
                status="pending",
                action_type="review_spec",
                action_label="Review & Approve Spec",
                target_ticket="STRY001052"
            )
            db.add_all([c1, c2, c3])
            db.commit()
            
            # Seed Connectors Status
            conn_sn = db_models.ConnectorConfigDB(
                id="servicenow",
                connector_type="servicenow",
                name="ServiceNow SPM / Agile 2.0",
                is_enabled=True,
                mode=settings.SERVICENOW_MODE,
                status="connected",
                target_tables="dmn_demand, rm_story"
            )
            conn_gw = db_models.ConnectorConfigDB(
                id="google_workspace",
                connector_type="google_workspace",
                name="Google Workspace (Gmail, Chat, Cal)",
                is_enabled=True,
                mode=settings.GOOGLE_WORKSPACE_MODE,
                status="connected",
                target_tables="messages, threads, calendar"
            )
            db.add_all([conn_sn, conn_gw])
            db.commit()
            
            logger.info("Default seed data successfully populated.")
    except Exception as e:
        logger.error(f"Error during init_db seeding: {e}")
        db.rollback()
    finally:
        db.close()
