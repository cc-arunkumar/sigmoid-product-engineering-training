from fastapi import APIRouter , HTTPException, Depends
from app.services.products_service import getallProduct , get_product_by_id , create_product, update_product, patch_product, del_product
from app.models.product_model import Product , PatchProducts
from app.core.config import get_db
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession


router=APIRouter(
    prefix="/api/products",
    tags=["Products"]
)


@router.get("/")
async def get_products(db:AsyncSession=Depends(get_db)):
    products=await getallProduct(db)
    return  products

@router.get("/{product_id}")
async def get_product_id(product_id:int , db:AsyncSession=Depends(get_db)):
    product= await get_product_by_id(db , product_id)

    if not product:
        raise HTTPException(status_code=404 , detail="product not found")
    
    return product

@router.post("/")
async def add_product(product : Product , db:AsyncSession=Depends(get_db)):
    newProduct=await create_product(db , product)
    return newProduct

@router.put("/{product_id}")
async def put_product(product_id:int, product : Product , db:AsyncSession=Depends(get_db)):
    newProduct=await update_product(db , product_id, product)
    return newProduct

@router.patch("/{product_id}")
async def update_product_bypatch(product_id: int , product:PatchProducts , db:AsyncSession=Depends(get_db)):
    return await patch_product(db, product_id, product)

@router.delete("/{product_id}")
async def delete_product(product_id:int, db:AsyncSession=Depends(get_db)):
    return await del_product(db, product_id)