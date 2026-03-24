# from fastapi import APIRouter, HTTPException, Depends
# from app.models.product_model import Product, ProductPatch
# from app.services.product_service import (
#     get_all_products,
#      get_product_id,
#       create_product, 
#       update_product,
#        patch_update,
#         delete_prod
# )
# from app.core.config import get_db
# router = APIRouter(
#     prefix="/api/products",
#     tags=["products"]
# )

# # home route
# @router.get("/")
# def get_products(db: Session = Depends(get_db)):
#     return get_all_products(db)


# #get product by id
# @router.get("/{product_id}")
# def get_product_ID(product_id: int, db: Session = Depends(get_db)):
#     product = get_product_id(db, product_id)
#     if not product:
#         raise HTTPException(status_code=404,detail="Product not found!")
#     return product

# # post product
# @router.post("/")
# def add_product(product: Product, db: Session = Depends(get_db)):
#     return create_product(db,
#     product)

# # put product
# @router.put("/{product_id}")
# def put_product(product_id: int, product_data: Product, db: Session = Depends(get_db)):
#     product = update_product(db, product_id,product_data)
#     if not product:
#         raise HTTPException(status_code=404,details="Product not found")
#     return product
    

# # patch product
# @router.patch("/{product_id}")
# def update_partial_product(product_id: int, patch_data: Product, db: Session = Depends(get_db)):
#     patched_product = patch_update(db, product_id,patch_data)

#     if not patched_product:
#         raise HTTPException(status_code=404,detail="Product not found!")

#     return patched_product


# # delete product
# @router.delete("/{product_id}")
# def delete_product(product_id: int, db: Session = Depends(get_db)):
#     product = delete_prod(db, product_id)

#     if not product:
#         raise HTTPException(status_code=404, detail="Product not found")

#     return product
#  ---------------------------------async-------------------------
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.product_model import Product, ProductPatch
from app.services.product_service import (
    get_all_products,
    get_product_id,
    create_product,
    update_product,
    delete_prod
)
from app.core.config import get_db
router = APIRouter(
    prefix="/api/products",
    tags=["products"]
)

# home route
@router.get("/")
async def get_products(db: AsyncSession = Depends(get_db)):
    return await get_all_products(db)


#get product by id
@router.get("/{product_id}")
async def get_product_ID(product_id: int, db: AsyncSession = Depends(get_db)):
    product = await get_product_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404,detail="Product not found!")
    return product

# post product
@router.post("/")
async def add_product(product: Product, db: AsyncSession = Depends(get_db)):
    return await create_product(db,product)

# put product
@router.put("/{product_id}")
async def put_product(product_id: int, product_data: Product, db: AsyncSession = Depends(get_db)):
    product = await update_product(db, product_id,product_data)
    if not product:
        raise HTTPException(status_code=404,details="Product not found")
    return product
    

# patch product
@router.patch("/{product_id}")
async def update_partial_product(product_id: int, patch_data: Product, db: AsyncSession = Depends(get_db)):
    patched_product = await patch_update(db, product_id,patch_data)

    if not patched_product:
        raise HTTPException(status_code=404,detail="Product not found!")

    return patched_product


# delete product
@router.delete("/{product_id}")
async def delete_product(product_id: int, db: AsyncSession = Depends(get_db)):
    product = await delete_prod(db, product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return {
        "message": "Product deleted successfully",
        "product": product
    }