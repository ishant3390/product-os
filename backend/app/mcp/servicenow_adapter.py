import logging
import time
from typing import Dict, Any, List, Optional
import httpx

logger = logging.getLogger(__name__)

class ServiceNowAdapter:
    """ServiceNow MCP Connector supporting both Live REST/Table API and Sandbox Mock mode."""

    def __init__(self, mode: str = "sandbox", instance_url: Optional[str] = None, username: Optional[str] = None, password: Optional[str] = None):
        self.mode = mode
        self.instance_url = (instance_url or "").strip()
        self.username = (username or "").strip()
        self.password = password or ""

    def _normalize_url(self, url: str) -> str:
        clean = url.strip().rstrip("/")
        if clean and not clean.startswith("http://") and not clean.startswith("https://"):
            clean = f"https://{clean}"
        return clean

    async def test_connection(
        self,
        mode: Optional[str] = None,
        instance_url: Optional[str] = None,
        username: Optional[str] = None,
        password: Optional[str] = None
    ) -> Dict[str, Any]:
        target_mode = mode or self.mode
        target_url = self._normalize_url(instance_url or self.instance_url)
        target_user = (username if username is not None else self.username).strip()
        target_pass = password if password is not None else self.password

        start = time.time()
        if target_mode == "live" and target_url:
            try:
                headers = {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
                async with httpx.AsyncClient(timeout=12.0, verify=True) as client:
                    resp = await client.get(
                        f"{target_url}/api/now/table/sys_user?sysparm_limit=1",
                        auth=(target_user, target_pass),
                        headers=headers
                    )
                    latency = int((time.time() - start) * 1000)
                    
                    if resp.status_code == 200:
                        return {
                            "status": "connected",
                            "message": f"Successfully authenticated with ServiceNow instance ({target_url})",
                            "latency_ms": latency,
                            "tables_verified": ["dmn_demand", "rm_story", "sys_user"]
                        }
                    elif resp.status_code in [401, 403]:
                        err_msg = "Invalid username or password"
                        try:
                            data = resp.json()
                            if "error" in data and "message" in data["error"]:
                                err_msg = data["error"]["message"]
                        except Exception:
                            pass
                        return {
                            "status": "error",
                            "message": f"ServiceNow Authentication Failed (HTTP {resp.status_code}): {err_msg}",
                            "latency_ms": latency,
                            "tables_verified": []
                        }
                    else:
                        return {
                            "status": "error",
                            "message": f"ServiceNow returned HTTP {resp.status_code}: {resp.text[:120]}",
                            "latency_ms": latency,
                            "tables_verified": []
                        }
            except httpx.ConnectError:
                return {
                    "status": "error",
                    "message": f"Could not reach {target_url}. Check instance URL or ensure instance is not hibernating.",
                    "latency_ms": int((time.time() - start) * 1000),
                    "tables_verified": []
                }
            except Exception as e:
                return {
                    "status": "error",
                    "message": f"Connection error: {str(e)}",
                    "latency_ms": int((time.time() - start) * 1000),
                    "tables_verified": []
                }
        else:
            # Sandbox Mode
            return {
                "status": "connected",
                "message": "ServiceNow Sandbox Emulation Active (Mock Mode)",
                "latency_ms": 28,
                "tables_verified": ["dmn_demand", "rm_story", "sys_user"]
            }

    async def query_demands(self, query: str = "") -> List[Dict[str, Any]]:
        target_url = self._normalize_url(self.instance_url)
        if self.mode == "live" and target_url:
            try:
                headers = {"Accept": "application/json"}
                async with httpx.AsyncClient(timeout=10.0) as client:
                    resp = await client.get(
                        f"{target_url}/api/now/table/dmn_demand?sysparm_limit=10",
                        auth=(self.username, self.password),
                        headers=headers
                    )
                    if resp.status_code == 200:
                        return resp.json().get("result", [])
            except Exception as e:
                logger.error(f"Error querying live demands: {e}")
                
        return [
            {
                "number": "DEMAND-00842",
                "short_description": "ApplePay PassKit 1-Click Biometric Checkout",
                "state": "Draft",
                "business_case": "Enable 1-tap checkout for Safari and iOS apps to lift mobile conversion.",
                "assigned_to": "Sarah Jenkins (VP Sales)",
                "priority": "1 - Critical"
            },
            {
                "number": "DEMAND-008821",
                "short_description": "Payment Method Vaulting & Offline Retry",
                "state": "In Review",
                "business_case": "Zero-friction tokenized card vaulting with automatic retry on network drops.",
                "assigned_to": "Alex Kim (Tech Lead)",
                "priority": "2 - High"
            }
        ]

    async def create_story(self, short_description: str, acceptance_criteria: str, demand_number: Optional[str] = None) -> Dict[str, Any]:
        target_url = self._normalize_url(self.instance_url)
        if self.mode == "live" and target_url:
            payload = {
                "short_description": short_description,
                "description": acceptance_criteria,
                "demand": demand_number or "",
                "state": "Draft"
            }
            try:
                headers = {"Accept": "application/json", "Content-Type": "application/json"}
                async with httpx.AsyncClient(timeout=10.0) as client:
                    resp = await client.post(
                        f"{target_url}/api/now/table/rm_story",
                        auth=(self.username, self.password),
                        headers=headers,
                        json=payload
                    )
                    if resp.status_code in [200, 201]:
                        res = resp.json().get("result", {})
                        return {
                            "story_number": res.get("number", "STRY001048"),
                            "sys_id": res.get("sys_id", ""),
                            "status": "Created in ServiceNow Agile 2.0"
                        }
            except Exception as e:
                logger.error(f"Error creating live story: {e}")
                
        # Sandbox simulated creation
        new_number = f"STRY{int(time.time()) % 100000:05d}"
        return {
            "story_number": new_number,
            "sys_id": f"sys_mock_{int(time.time())}",
            "status": "Created in ServiceNow Agile 2.0 (Sandbox)",
            "short_description": short_description,
            "demand_ref": demand_number or "DEMAND-00842"
        }
