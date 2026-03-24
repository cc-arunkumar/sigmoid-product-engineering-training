from fastapi import APIRouter,HTTPException,Depends
from app.services.product_service import get_all_products
from app.services.product_service import get_product_by_id,create_product,update_product as update
from app.services.product_service import patch_product
from app.services.product_service import delete_product_by_id
from app.models.product_model import Product as Product_Put_Post
from app.models.product_model_patch import ProductPatch as Product_Patch
from sqlalchemy.orm import Session
from app.core.config import get_db
router= APIRouter(
    prefix="/api/products",
    tags=["Products"]
)
#the purpose of tags is to decide the section in sqwagger doc under which to group this particular API into
# prefix="/api" you can use and then in router.get("/product" or "/products") for get all products you can put /product and in get by id you can put product alone to differentiate
# @router.get("/health")
# def health_check():
#     return {"status":"Product APIs running !"}
# get all products
@router.get("/")
def get_products(db: Session = Depends(get_db)):
    products=get_all_products(db)
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
def get_product(product_id:int,db: Session=Depends(get_db)):
    product=get_product_by_id(db,product_id)
    if not product:
        raise HTTPException(status_code=404,detail="Product not found")
# this httpexcetion module is needed to reaise errors similar to in nodejs we create an error reponse like that 
    return product

@router.post("/")
def add_product(product:Product_Put_Post,db: Session=Depends(get_db)):
    # if  sorted(product.keys())!=["category","name","price","stock"]:
    #     raise HTTPException(status_code=400,detail="bad request body which is invalid and missing details")
    # this code of sorted is not needed the model qwe have created in padentic auto validates the request body input data of user as per the datatypes we have given to individual class variables 
    return create_product(db,product)
# each route is defined using @ symbol which indicates annotation here ,apart from this the esxceptions are raised using httpexception library 
@router.put("/{product_id}")
def update_product(product_data:Product_Put_Post,product_id:int,db:Session = Depends(get_db)):
    updatedprod=update(db,product_id,product_data,)
    if not updatedprod:
        raise HTTPException(status_code=404,detail="Product not found")
    return updatedprod

@router.patch("/{product_id}")
def update_product_partial(product_data: Product_Patch,product_id:int,db:Session = Depends(get_db)):
    patchedprod=patch_product(db,product_id,product_data)
    if not patchedprod:
        raise HTTPException(status_code=404,detail="Product not found")
    return patchedprod

@router.delete("/{product_id}")
def delete_product(product_id:int,db:Session = Depends(get_db)):
    returnresult=delete_product_by_id(db,product_id)
    if(returnresult):
        return {"message":"successfully deleted product","deleted_product":returnresult}
    else:
        raise HTTPException(status_code=404,detail="Product not found")
        return  None
