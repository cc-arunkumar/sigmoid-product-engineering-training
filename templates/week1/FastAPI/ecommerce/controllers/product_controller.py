from fastapi import FastAPI, APIRouter

router = APIRouter(
    prefix = "/api/products",
    tags = ["Products"]
)

@router.get("/health")
def health_check():
    return {"status": "Product APIs running"}
