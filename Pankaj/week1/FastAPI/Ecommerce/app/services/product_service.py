from sqlalchemy.orm import Session
from app.db.base import productTable
# products = [
#     {"id": 1, "name": "Laptop", "price": 999.99, "category": "Electronics","stock" : 10},
#     {"id": 2, "name": "Smartphone", "price": 499.99, "category": "Electronics","stock" : 20},
#     {"id": 3, "name": "Headphones", "price": 199.99, "category": "Electronics","stock" : 15},
# ]

def get_all_products(db : Session):
    return db.query(productTable).all()

def get_product_by_id(db : Session, product_id : int):
    return db.query(productTable).filter(productTable.id == product_id).first()

def create_product(db : Session,product_data):
    new_product = productTable( **product_data.dict() )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    
    return new_product

def put_product(db : Session, product_id : int, product_data):
    product = db.query(productTable).filter(productTable.id == product_id).first()
    if not product:
        return None
    
    for key, value in product_data.dict().items():
        setattr(product, key, value)
    
    db.commit()
    db.refresh(product)
    
    return product

def patch_product(db : Session, product_id : int , product_data):
    product = db.query(productTable).filter(productTable.id == product_id).first()
    
    if not product:
        return None
    for key, value in product_data.dict(exclude_unset=True).items():
        setattr(product, key, value)
    
    db.commit()
    db.refresh(product)
    return product

def delete_product(db : Session,product_id : int):
    product = db.query(productTable).filter(productTable.id == product_id).first()
    if not product:
        return False
    
    db.delete(product)
    db.commit()
    
    return True


