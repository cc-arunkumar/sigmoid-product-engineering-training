# from app.models.product_model import Product

# products = [
#     {
#         "id": 1,
#         "name": "Product 1",
#         "price": 100,
#         "category": "Category A",
#         "stock": 10
#     },
#     {
#         "id": 2,
#         "name": "Product 2",
#         "price": 200,
#         "category": "Category B",
#         "stock": 20
#     }
# ]

# def get_all_products():
#     return products

# def get_product_by_id(product_id: int):
#     for product in products:
#         if product['id'] == product_id:
#             return product
        

# def create_product(product_data):
#     new_product = product_data.dict()
#     new_product['id'] = len(products) + 1
#     products.append(new_product)
#     return new_product

# def replace_product(product_id: int, product_data: Product):
#     for index, prod in enumerate(products):
#         if prod["id"] == product_id:
#             updated_product = {
#                 "id": product_id,
#                 **product_data.dict()
#             }
#             products[index] = updated_product
#             return updated_product
#     return None


# def delete_product(product_id: int):
#     for index, prod in enumerate(products):
#         if prod["id"] == product_id:
#             del products[index]
#             return True
#     return False   


# # PATCH Product
# def patch_update(product_id: int, patch_update):

#     for product in products:
#         if product["id"] == product_id:
#             patched_data = patch_update.dict(exclude_unset=True)

#             # exclude_unset=True means:
#             # In pydantic model, fields can be:
#             # 1. Set explicitly (user provided a value)
#             # 2. Unset (user didn't provide it at all, even if a default exists)

#             # "Only include fields that were actually provided when creating this object"
#             for key, value in patched_data.items():
#                 product[key] = value

#             return product

#     return None


from sqlalchemy.orm import Session
from app.db.base import ProductTable


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

    for key, value in updated_data.dict().items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)

    return product


def patch_product(db: Session, product_id: int, patch_data):
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()

    if not product:
        return None

    update_data = patch_data.dict(exclude_unset=True)

    for key, value in update_data.items():
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