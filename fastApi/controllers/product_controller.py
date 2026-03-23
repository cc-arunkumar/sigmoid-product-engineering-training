from fastapi import FastAPI, APIRouter

router = APIRouter(
    prefix = "/api/product",
    tags= ["Products"]
)

@router.get("/")
def get_products():
    products = get_all_products()
    return products


@router.get("/health")
def health_check():
    return {"status" : "Product APIs running !"}
