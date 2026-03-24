from fastapi import APIRouter, HTTPException, Depends

from app.services.product_service import get_all_products,get_product_by_id,create_product,update_product_by_id,patch_update,delete_product_by_id

from app.models.product_model import Product,patch_product

from sqlalchemy.orm import Session

from app.core.config import get_db

from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(
    prefix="/api/products",
    tags=["products"]
)

@router.get("/")
async def get_products(db : AsyncSession = Depends(get_db)):
    return await get_all_products(db)



#GET products by ID
@router.get("/{product_id}")
async def get_product(product_id: int,db : AsyncSession = Depends(get_db)):
    product = await get_product_by_id(db , product_id)

    if not product:
        raise HTTPException(status_code= 404, detail= "Product not Found")

    return product


#CREATE product
@router.post("/")
async def add_product(product : Product,db : AsyncSession = Depends(get_db)):
    return await create_product(db , product)


#update product using put

@router.put("/{product_id}")
async def update_product(product_id: int, product: Product, db : AsyncSession = Depends(get_db)):
    updated_product = await update_product_by_id(db, product_id, product)

    if updated_product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    return updated_product

#update partial product
@router.patch("/{product_id}")
async def update_partial_product(
    product_id:int, 
    patch_data: patch_product,
    db : AsyncSession = Depends(get_db)
):
    patched_product = await patch_update(product_id, patch_data,db)

    if not patched_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return patched_product
# @router.patch("/{product_id}")
# def update_partial_product(
#     product_id: int,
#     patch_data: patch_product,
#     db: Session = Depends(get_db)
# ):
#     patched_product = patch_update(product_id, patch_data, db)

#     if not patched_product:
#         raise HTTPException(status_code=404, detail="Product not found")
    
#     return patched_product


#delete product
@router.delete("/{product_id}")
async def delete_product(product_id: int,db : AsyncSession = Depends(get_db)):
    deleted_product = await delete_product_by_id(product_id)

    if deleted_product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    return {
        "message": "Product deleted successfully",
        "product": deleted_product
    }