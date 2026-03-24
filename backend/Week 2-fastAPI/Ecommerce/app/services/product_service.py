from sqlalchemy.orm import Session
from app.models.product_model import Product

from app.schemas.product_schema import ProductCreate, ProductUpdate


def get_all_products(db : Session):
    return db.query(Product).all();

def get_product_by_id(product_id : int,db:Session ):
    
    return db.query(Product).filter(Product.id == product_id).first()

def create_prduct(product_data : ProductCreate, db : Session):
   
    new_product = Product(**product_data.model_dump())

    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product
    

def update_product(product_id : int, product_data : ProductCreate, db : Session):
    product = get_product_by_id(db, product_id)
    if not product:
        return None

    data = product_data.model_dump()
    product.name = data["name"]
    product.price = data["price"]
    product.category = data["category"]
    product.stock = data["stock"]

    db.commit()
    db.refresh(product)
    return product
    

def patch_update_product(product_id : int,product_data : ProductUpdate, db : Session ):
    product = get_product_by_id(db, product_id)
    if not product:
        return None

    data = product_data.model_dump(exclude_unset=True)

    for key, value in data.items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)
    return product

def delete_product(product_id : int, db : Session):
    product = get_product_by_id(db, product_id)
    if not product:
        return None

    db.delete(product)
    db.commit()
    return product