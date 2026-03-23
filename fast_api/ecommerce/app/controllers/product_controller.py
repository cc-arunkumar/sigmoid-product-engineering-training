from fastapi import APIRouter,HTTPException
from app.services.product_service import get_all_products
from app.services.product_service import get_product_by_id,create_product,put_products,delete_product
from app.models.product_model import Product,ProductPatch

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

#GET PRODUCTS
@router.get("/")
def get_products():
    products=get_all_products()
    return products

#GET PRODUCTS BY ID
@router.get("/{product_id}")
def get_product(product_id: int):
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

#CREATE PRODUCTS
@router.post("/")
def create(product_data:Product):
    return create_product(product_data)

#PUT PRODUCTS
@router.put("/{product_id}")
def put(product_id:int,product_data:Product):
    product=put_products(product_id,product_data)
    if not product:
        raise HTTPException(status_code=404,detail="Product not found")
    return product

# #PATCH PRODUCT
# @router.patch("/{product_id}")
# def patch(product_id:int,product_data:ProductPatch):
#     prod=patch_product(product_id,product_data)
#     if not prod:
#         raise HTTPException(status_code=404,detail="Product not found")
#     return prod


# #DELETE PRODUCTS
@router.delete("/{product_id}")
def delete(product_id:int):
    products=delete_product(product_id)
    if not products:
        raise HTTPException(status_code=404,detail="Product Not Found")
    return products
    


# @router.get("/health")
# def health_check():
#     return {"status": "Product API is running"}