from fastapi import APIRouter, HTTPException, Depends
# 1. from sqlalchemy.orm import Session

# 2. async operation 
from sqlalchemy.ext.asyncio import AsyncSession


from Services.product_services import (
    get_all_products,
    get_product_by_id,
    create_product,
    update_product,
    patch_product,
    delete_product
)



from models.product_model import Product, ProductPatch
from config.get_db import get_db


router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)


# @router.get("/")
# def get_products(db: Session = Depends(get_db)):
#     return get_all_products(db)

@router.get("/")
def get_products(db: AsyncSession = Depends(get_db)):
    return get_all_products(db)


# @router.get("/{product_id}")
# def get_product(product_id: int, db: Session = Depends(get_db)):
#     product = get_product_by_id(db, product_id)

#     if not product:
#         raise HTTPException(status_code=404, detail="Product not found")

#     return product

@router.get("/{product_id}")
async def get_product(product_id: int, db: AsyncSession = Depends(get_db)):
    product = await get_product_by_id(db, product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product


# @router.post("/")
# def add_product(product: Product, db: Session = Depends(get_db)):
#     return create_product(db, product)

@router.post("/")
async def add_product(product: Product, db: AsyncSession = Depends(get_db)):
    return await create_product(db, product)


# @router.put("/{product_id}")
# def replace_product(product_id: int, product: Product, db: Session = Depends(get_db)):
#     updated_product = update_product(db, product_id, product)

#     if not updated_product:
#         raise HTTPException(status_code=404, detail="Product not found")

#     return updated_product


@router.put("/{product_id}")
async def replace_product(
    product_id: int, 
    product: Product, 
    db: AsyncSession = Depends(get_db)):
    updated_product = await update_product(db, product_id, product)

    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")

    return updated_product


# @router.patch("/{product_id}")
# def update_partial_product(
#     product_id: int,
#     product: ProductPatch,
#     db: Session = Depends(get_db)
# ):
#     updated_product = patch_product(db, product_id, product)

#     if not updated_product:
#         raise HTTPException(status_code=404, detail="Product not found")

#     return updated_product


@router.patch("/{product_id}")
async def update_partial_product(
    product_id: int,
    product: ProductPatch,
    db: AsyncSession = Depends(get_db)
):
    updated_product = await patch_product(db, product_id, product)

    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")

    return updated_product


# @router.delete("/{product_id}")
# def remove_product(product_id: int, db: Session = Depends(get_db)):
#     deleted_product = delete_product(db, product_id)

#     if not deleted_product:
#         raise HTTPException(status_code=404, detail="Product not found")

#     return {
#         "message": "Product deleted successfully",
#         "deleted_product": deleted_product
#     }

@router.delete("/{product_id}")
async def remove_product(product_id: int, db: AsyncSession = Depends(get_db)):
    deleted_product = await delete_product(db, product_id)

    if not deleted_product:
        raise HTTPException(status_code=404, detail="Product not found")

    return {
        "message": "Product deleted successfully",
        "deleted_product": deleted_product
    }