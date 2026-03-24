from fastapi import APIRouter , HTTPException, Depends
from app.services.products_service import getallProduct , get_product_by_id , create_product, update_product, patch_product, del_product
from app.models.product_model import Product , PatchProducts
from app.core.config import get_db
from sqlalchemy.orm import Session


router=APIRouter(
    prefix="/api/products",
    tags=["Products"]
)


@router.get("/")
def get_products(db:Session=Depends(get_db)):
    products=getallProduct(db)
    return products

@router.get("/{product_id}")
def get_product_id(product_id:int , db:Session=Depends(get_db)):
    product=get_product_by_id(db , product_id)

    if not product:
        raise HTTPException(status_code=404 , detail="product not found")
    
    return product

@router.post("/")
def add_product(product : Product , db:Session=Depends(get_db)):
    newProduct=create_product(db , product)
    return newProduct

@router.put("/{product_id}")
def put_product(product_id:int, product : Product , db:Session=Depends(get_db)):
    newProduct=update_product(db , product_id, product)
    return newProduct

@router.patch("/{product_id}")
def update_product_bypatch(product_id: int , product:PatchProducts , db:Session=Depends(get_db)):
    return patch_product(db, product_id, product)

@router.delete("/{product_id}")
def delete_product(product_id:int, db:Session=Depends(get_db)):
    return del_product(db, product_id)