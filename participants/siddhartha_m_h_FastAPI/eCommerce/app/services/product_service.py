from app.db.base import ProductTable
from sqlalchemy.orm import Session


def get_all_products(db: Session):
    return db.query(ProductTable).all()

def get_product_by_id(db: Session, product_id: int):
    return db.query(ProductTable).filter(ProductTable.id == product_id).first()

def create_product(db: Session, product_data):
    new_product = ProductTable(**product_data.dict())

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


def update_product(db: Session, product_id: int, updated_data):
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()

    if not product:
        return None
    
    for key,value in updated_data.dict().items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)

    return product

def delete_product(db: Session, product_id: int):
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()

    if not product:
        return None
    
    db.delete(product)
    db.commit()

    return product

    
    

def patch_product(db: Session, product_id: int, patch_data):
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()

    if not product:
        return None
    
    update_data = patch_data.dict(exclude_unset = True)

    for key, value in update_data.items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)

    return product
