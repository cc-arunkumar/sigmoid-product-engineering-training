from sqlalchemy.orm import Session 
from app.db.base import ProductTable

# get all the products 
def get_all_products(db:Session):
    return db.query(ProductTable).all()

# get product by id
def get_product_id(db: Session, product_id: int):
    return db.query(ProductTable).filter(ProductTable.id == product_id).first()

# create product
def create_product(db: Session, product_data):
    new_product = ProductTable(**product_data.dict())

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product

# put product
def update_product(db: Session, product_id: int, product_data):
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()

    if not product:
        return None
    for key, value in product_data.dict().items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)

    return product

# patch product
def patch_update(db: Session, product_id:int,patch_update):
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()

    if not product:
        return None

    update_data = patch_update.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(product, key, value)

    db.commit()
    db.refresh(prouct)

    return product
# delete product
def delete_prod(db: Session, product_id: int):
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()

    if not product:
        return None

    db.delete(product)
    db.commit()

    return product