from fastapi import APIRouter
from fastapi import HTTPException
from app.services.productService import getAllProducts,get_product_by_id,create_product,update_product,delete_product
from app.models.product_model import Product
router=APIRouter(
    prefix="/api/products",
    tags=["Products"]
)
@router.get("/")
def getProducts():
    return getAllProducts()
    
@router.get("/{product_id}")
def get_product_id(product_id: int):
    product = get_product_by_id(product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found !")

    return product    

@router.post("/")
def add_product(product: Product):
    return create_product(product)


@router.put("/{product_id}")
def update_product_api(product_id: int, product: Product):
    updated_product = update_product(product_id, product)

    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found!")

    return updated_product


@router.delete("/{product_id}", status_code=200)
def delete_product_api(product_id: int):
    deleted_product = delete_product(product_id)

    if not deleted_product:
        raise HTTPException(status_code=404, detail="Product not found!")

    return {
        "message": "Product deleted successfully",
        "product": deleted_product
    }
