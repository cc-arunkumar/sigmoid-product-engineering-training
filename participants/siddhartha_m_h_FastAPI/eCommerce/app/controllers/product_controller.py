from fastapi import FastAPI, APIRouter

router = APIRouter(
    prefix = "/api/products",
    tags = ["Products"]
)

@router.get("/health")
def health_check():
    return { "status" : "Product APIs running!"}

@router.get("/sid")
def sid_hi():
    return { "message" : "Hi Siddhartha!"}


