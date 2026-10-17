import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import init_db

@pytest.fixture(scope="session", autouse=True)
def setup_db():
    init_db()

client = TestClient(app)

def test_health():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "version" in data

def test_scopes():
    response = client.get("/api/v1/scopes")
    assert response.status_code == 200
    scopes = response.json()
    assert len(scopes) >= 3
    scope_ids = [s["id"] for s in scopes]
    assert "checkout-engine" in scope_ids

def test_actions():
    response = client.get("/api/v1/actions?scope_id=checkout-engine")
    assert response.status_code == 200
    actions = response.json()
    assert len(actions) >= 1
    assert "best_next_step" in actions[0]

def test_connectors():
    response = client.get("/api/v1/connectors")
    assert response.status_code == 200
    connectors = response.json()
    assert len(connectors) >= 2
    types = [c["connector_type"] for c in connectors]
    assert "servicenow" in types
    assert "google_workspace" in types

def test_test_connector_servicenow():
    response = client.post("/api/v1/connectors/servicenow/test")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "connected"
    assert "dmn_demand" in data["tables_verified"]

def test_test_connector_google():
    response = client.post("/api/v1/connectors/google_workspace/test")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "connected"

def test_agent_run_on_demand():
    response = client.post("/api/v1/agents/triage_agent/run", json={"scope_id": "checkout-engine"})
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "completed"
    assert data["agent_name"] == "triage_agent"
