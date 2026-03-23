from fastapi import APIRouter , HTTPException
from app.services.products_service import getallProduct , get_product_by_id , create_product, update_product, patch_product, del_product
from app.models.product_model import Product , PatchProducts


router=APIRouter(
    prefix="/api/products",
    tags=["Products"]
)


@router.get("/")
def get_products():
    products=getallProduct()
    return products

@router.get("/{product_id}")
def get_product_id(product_id:int):
    product=get_product_by_id(product_id)

    if not product:
        raise HTTPException(status_code=404 , detail="product not found")
    
    return product

@router.post("/")
def add_product(product : Product):
    newProduct=create_product(product)
    return newProduct

@router.put("/{product_id}")
def put_product(product_id:int, product : Product):
    newProduct=update_product(product_id, product)
    return newProduct

@router.patch("/{product_id}")
def update_product_bypatch(product_id: int , product:PatchProducts):
    return patch_product(product_id, product)

@router.delete("/{product_id}")
def delete_product(product_id:int):
    return del_product(product_id)