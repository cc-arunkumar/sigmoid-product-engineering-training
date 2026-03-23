from fastapi import FastAPI, APIRouter

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@router.get("/health")
def system_health():
    return {"message": "System is working fine"}