from fastapi import APIRouter


router = APIRouter(
    prefix  = '/api/products', 
    tags = {"Products"}
)

@router.get("/health")
def health_cheak():
    return {"Status" : "Product API running"} 