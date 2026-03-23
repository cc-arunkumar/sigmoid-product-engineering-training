from fastapi import APIRouter

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

@router.get("/health")
def health_check():
    return {"status" : "product api is running"}