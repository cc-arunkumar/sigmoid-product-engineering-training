from fastapi import FastAPI, APIRouter

router = APIRouter(
    prefix="/api/products",
    tags = ["products"]
)



@router.get("/health")
def get_health():
    return {"message":"Product service is healthy   "} 