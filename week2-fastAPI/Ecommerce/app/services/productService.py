from app.models.productModel import Product, PatchProduct
from app.db.base import ProductTable
from sqlalchemy.orm import Session


def getAllProducts(db: Session):
    return db.query(ProductTable).all()


def getProductById(productId: int, db: Session):
    return db.query(ProductTable).filter(ProductTable.id == productId).first()


def createProduct(product: Product, db: Session):
    data = product.model_dump()

    new_product = ProductTable(**data)

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


def updateProduct(productId: int, productData: Product, db: Session):
    product = db.query(ProductTable).filter(ProductTable.id == productId).first()

    if not product:
        return None

    update_data = productData.model_dump()

    for key, value in update_data.items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)

    return product


def patchUpdate(productId: int, patchData: PatchProduct, db: Session):
    product = db.query(ProductTable).filter(ProductTable.id == productId).first()

    if not product:
        return None

    update_data = patchData.model_dump(exclude_unset=True)

    if not update_data:
        return product  # or raise error if you want strict PATCH

    for key, value in update_data.items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)

    return product


def deleteProduct(productId: int, db: Session):
    product = db.query(ProductTable).filter(ProductTable.id == productId).first()

    if not product:
        return None

    db.delete(product)
    db.commit()

    return product