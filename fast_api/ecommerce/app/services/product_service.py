from sqlalchemy.orm import Session
from app.db.base import PrdouctTable


# GET ALL PRODUCTS
def get_all_products(db: Session):
    return db.query(PrdouctTable).all()


# GET PRODUCT BY ID
def get_product_by_id(product_id: int, db: Session):
    return db.query(PrdouctTable).filter(PrdouctTable.id == product_id).first()


# CREATE PRODUCT
def create_product(product_data, db: Session):
    new_product = PrdouctTable(
        name=product_data.name,
        price=product_data.price,
        category=product_data.category,
        stock=product_data.stock
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product


# PUT PRODUCT (FULL UPDATE)
def put_products(product_id: int, product_data, db: Session):
    product = db.query(PrdouctTable).filter(PrdouctTable.id == product_id).first()

    if not product:
        return None

    product.name = product_data.name
    product.price = product_data.price
    product.category = product_data.category
    product.stock = product_data.stock

    db.commit()
    db.refresh(product)
    return product


# PATCH PRODUCT (PARTIAL UPDATE)
def patch_product(product_id: int, product_data, db: Session):
    product = db.query(PrdouctTable).filter(PrdouctTable.id == product_id).first()

    if not product:
        return None

    update_data = product_data.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)
    return product


# DELETE PRODUCT
def delete_product(product_id: int, db: Session):
    product = db.query(PrdouctTable).filter(PrdouctTable.id == product_id).first()

    if not product:
        return None

    db.delete(product)
    db.commit()
    return product