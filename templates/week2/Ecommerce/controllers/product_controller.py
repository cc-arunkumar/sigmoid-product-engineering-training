from fastapi import APIRouter


router = APIRouter(
    prefix="/api/products",
    tags=["Product"]
)

def health_check():
    return {"status" : "Product APIs running!"}


