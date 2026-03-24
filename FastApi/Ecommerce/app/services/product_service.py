from sqlalchemy.orm import Session
from app.db.base import ProductTable
# GET All Products
def get_all_products(db : Session):
    return db.query(ProductTable).all()
# GET Products by id
def get_product_by_id(db: Session, product_id: int):
    return db.query(ProductTable).filter(ProductTable.id == product_id).first()

# POST to create product
def create_product(db: Session, product_details):
    new_product = ProductTable(**product_details.dict())

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product

# PUT to update product
def update_product(db: Session, product_details, product_id):
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()

    if not product:
        return None
    
    for key, value in product_details.dict().items():
        setattr(product, key, value)
    
    db.commit()
    db.refresh(product)

    return product
    

# DELETE Product
def delete_product(db: Session, product_id):
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()
    
    if not product:
        return None
    
    db.delete(product)
    db.commit()

    return product



# PATCH Product
def patch_update(db: Session, product_id: int, patch_update):
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()
    
    if not product:
        return None
    
    update_data = patch_update.dict(exclude_unset = True)

    for key, value in update_data.items():
        setattr(product, key, value)
    
    db.commit()
    db.refresh(product)

    return product
