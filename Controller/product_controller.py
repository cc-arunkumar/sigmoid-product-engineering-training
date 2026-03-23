from fastapi import APIRouter , HTTPException ; 

# from ..Services.product_services import get_all_products

from Services.product_services import get_all_products , get_product_by_id , post_product  , up_product , patch_product , delete_product
from models.product_model import Product 


router = APIRouter(
    prefix  = '/api/products', 
    tags = {"Products"}
)

@router.get("/health")
def health_cheak():
    return {"Status" : "Product API running"} 


@router.get("/")
def get_product():
    product = get_all_products()
    return product

@router.get("/{product_id}")
def get_product_id(product_id: int):
    product = get_product_by_id(product_id)

    if not product:
        raise HTTPException(status_code= 404 , details="Product Not Found") ; 

    return product

@router.post("/")
def post_prod(product : Product):
    return post_product(product) ; 


@router.put("/{prod_id}")
def put_prod(prod_id : int , product : Product ):
    return up_product(product , prod_id) ; 

@router.delete("/{prod_id}")
def delete_prd(prod_id : int):
    return delete_product(prod_id)


@router.patch("/{prod_id}")
def patch_data(data : Product , prod_id : int):
    return patch_product(data , prod_id) 