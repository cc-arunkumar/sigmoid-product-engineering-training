from fastapi import APIRouter,HTTPException
from app.services.product_service import get_all_products
from app.services.product_service import get_product_by_id
router= APIRouter(
    prefix="/api/products",
    tags=["Products"]
)
# prefix="/api" you can use and then in router.get("/product" or "/products") for get all products you can put /product and in get by id you can put product alone to differentiate
# @router.get("/health")
# def health_check():
#     return {"status":"Product APIs running !"}
# get all products
@router.get("/")
def get_products():
    products=get_all_products()
    return products


# @router.get("/")
# def get_products():
#     products=get_all_products()
#     return products

# @router.get("/")
# def get_products():
#     products=get_all_products()
#     return 3
# see here if we have defined same router twice then first function is considered not second one unlike common sense approach where second overwrites first route here first route definitoin wins over second route definition


# get product by id 
@router.get("/{product_id}")
def get_product(product_id:int):
    product=get_product_by_id(product_id)
    if not product:
        raise HTTPException(statuscode=404,detail="Product not found!")

    return product