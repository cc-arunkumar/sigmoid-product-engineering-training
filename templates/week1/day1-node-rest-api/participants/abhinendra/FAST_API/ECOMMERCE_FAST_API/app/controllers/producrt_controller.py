from fastapi import APIRouter

router = APIRouter(
    prefix="/api/products",
    tags=["products"]
)

@router.get("/health")
def health_check():
    return {"message": "Product APIs running!"}