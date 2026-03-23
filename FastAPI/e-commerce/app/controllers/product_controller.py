from fastapi import APIRouter

router = APIRouter(
    prefix="/api/product",
    tags=["Products"]
)

@router.get("/health")
def health_check():
    return {"status": "Product APIs running smoothly!"}