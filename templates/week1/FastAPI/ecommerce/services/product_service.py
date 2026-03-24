from sqlalchemy.orm import Session
from db.base import ProductTable

def get_all_products(db: Session):
    return db.query(ProductTable).all()

def get_product_by_id(db: Session, product_id: int):
    # Fixed: Use == for filtering
    return db.query(ProductTable).filter(ProductTable.id == product_id).first()

def create_product(db: Session, product_data):
    # Fixed: Added missing = assignment
    new_product = ProductTable(**product_data.dict())
    
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    
    return new_product

def update_product(db: Session, product_id: int, updated_data):
    # Fixed: Added missing = and corrected filter syntax
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()
    
    if not product:
        return None
        
    for key, value in updated_data.dict().items():
        setattr(product, key, value)
        
    db.commit()
    db.refresh(product)
    
    return product

def patch_product(db: Session, product_id: int, patch_data):
    # Fixed: Added missing = and corrected filter syntax
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()
    
    if not product:
        return None
    
    # exclude_unset=True ensures we only update fields provided in the request
    update_data = patch_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(product, key, value)
        
    db.commit()
    db.refresh(product)
    
    return product

def delete_product(db: Session, product_id: int):
    # Fixed: Corrected filter syntax
    product = db.query(ProductTable).filter(ProductTable.id == product_id).first()
    
    if not product:
        return None
        
    db.delete(product)
    db.commit()
    
    return product

# products = [
#     {
#         "id": 1,
#         "name": "Laptop",
#         "price": 500000,
#         "category": "Electronics",
#         "stock": 10
#     },
#     {
#         "id": 2,
#         "name": "Mobile",
#         "price": 250000,
#         "category": "Electronics",
#         "stock": 15
#     }
# ]

# # GET All Products
# def get_all_products():
#     return products

# # GET Products By Id
# def get_product_by_id(product_id: int):
#     for product in products:
#         if product["id"] == product_id:
#             return product
#     return None

# #POST Product
# def create_product(product_data):
#     new_product = product_data.dict()

#     #Generating ID manually
#     new_product["id"] = len(products) + 1

#     products.append(new_product)

#     return new_product

# # UPDATE Product
# def update_product(product_id: int, product_data: dict):
#     for product in products:
#         if product["id"] == product_id:

#             updated_item = {"id": product_id, **product_data}
            
#             idx = products.index(product)
#             products[idx] = updated_item
#             return updated_item
#     return "Product not found"

# # DELETE Product
# def delete_product(product_id: int):
#     for product in products:
#         if product_id == product["id"]:
#             products.remove(product)
#             return product
#     return "Product not found"

# # PATCH Product
# def patch_product(product_id: int, patch_update):
#     for product in products:
#         if product["id"] == product_id:
#             patched_data = patch_update.dict(exclude_unset = True)

#             # exclude_unset = True means:
#             # In pydantic model, fields can be:
#             # 1. Set explicitly (user provided a value)
#             # 2. Unset (User didn't provide it all, even if a default exist)

#             for key, value in patched_data.items():
#                 product[key] = value
            
#             return product
#     return None