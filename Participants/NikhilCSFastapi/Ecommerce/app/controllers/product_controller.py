from fastapi import APIRouter,HTTPException
from app.services.product_service import get_all_products
from app.services.product_service import get_product_by_id,create_product,update_product as update
from app.models.product_model import Product
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
        raise HTTPException(status_code=404,detail="Product not found")
# this httpexcetion module is needed to reaise errors similar to in nodejs we create an error reponse like that 
    return product

@router.post("/")
def add_product(product:Product):
    # if  sorted(product.keys())!=["category","name","price","stock"]:
    #     raise HTTPException(status_code=400,detail="bad request body which is invalid and missing details")
    return create_product(product)

@router.put("/{product_id}")
def update_product(product_data:Product,product_id:int):
    updatedprod=update(product_data,product_id)
    if not updatedprod:
        raise HTTPException(status_code=404,detail="Product not found")
    return updatedprod