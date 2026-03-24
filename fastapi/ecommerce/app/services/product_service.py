# app/services/product_service.py

from sqlalchemy.orm import Session
from app.db.base import Product as ProductModel

# Get all products
def get_all_products(db: Session):
    return db.query(ProductModel).all()

# Get product by ID
def get_product_by_id(db: Session, product_id: int):
    return db.query(ProductModel).filter(ProductModel.id == product_id).first()

# Add product
def create_product(db: Session, product_data):
    new_product = ProductModel(**product_data.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

# Update product
def update_product(db: Session, product_id: int, product_data: ProductModel):
    product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not product:
        return None
    for key, value in product_data.dict().items():
        setattr(product, key, value)
    db.commit()
    db.refresh(product)
    return product

# Delete product
def delete_product(db: Session, product_id: int):
    product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not product:
        return None
    db.delete(product)
    db.commit()
    return product

# Partial update product
def partial_update_product(db: Session, product_id: int, product_data: ProductPartialUpdate):
    product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not product:
        return None
    for key, value in product_data.dict(exclude_unset=True).items():
        setattr(product, key, value)
    db.commit()
    db.refresh(product)
    return product