# products=[
#     {
#         "id": 1,
#         "name": "Laptop",
#         "price": 999.99,
#         "category": "Electronics",
#         "stock": 10
#     },
#     {
#         "id": 2,
#         "name": "Smartphone",
#         "price": 499.99,
#         "category": "Electronics",
#         "stock": 20
#     }
# ]
from sqlalchemy.orm import Session
from app.db.base import Product as ProductTable
#GET ALL PRODUCTS
def get_all_products(db: Session):
    return db.query(ProductTable).all()

#GET PRODUCT BY ID
def get_product_by_id(db: Session, product_id: int):
    return db.query(ProductTable).filter(ProductTable.id == product_id).first()

#POST PRODUCT
def create_product(db: Session, product_data):
    new_product = ProductTable(**product_data.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product
  
#put product
def update_product(db: Session, product_id: int, product_data):
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()
    if not product:
        return None
    for key, value in product_data.dict(exclude_unset=True).items():
        setattr(product, key, value)
    db.commit()
    db.refresh(product)
    return product

#delete product
def delete_product(db: Session, product_id: int):
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()
    if not product:
        return False
    db.delete(product)
    db.commit()
    return product
            
#Patch
def partial_update_product(db: Session, product_id: int, product_data):
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()
    if not product:
        return None
    for key, value in product_data.dict(exclude_unset=True).items():
        setattr(product, key, value)
    db.commit()
    db.refresh(product)
    return product




