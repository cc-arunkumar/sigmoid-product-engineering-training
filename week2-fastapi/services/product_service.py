from models.product_model import Product,ProductPatch
products = [
    {"id": 1, "name": "iPhone 15", "price": 80000, "stock": 10, "category": "Electronics"},
    {"id": 2, "name": "Samsung Galaxy S23", "price": 75000, "stock": 15, "category": "Electronics"},
    {"id": 3, "name": "OnePlus 12", "price": 65000, "stock": 8, "category": "Electronics"},
    {"id": 4, "name": "Realme GT", "price": 35000, "stock": 20, "category": "Electronics"},
    {"id": 5, "name": "Nike Shoes", "price": 5000, "stock": 25, "category": "Fashion"},
    {"id": 6, "name": "Levi's Jeans", "price": 3000, "stock": 18, "category": "Fashion"},
]

def get_all_products():
    return products
def get_product_by_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None
def create_product(product_data):
    new_product = product_data.dict()
    new_product["id"]=len(products)+1
    products.append(new_product)
    return products
def update_product(product_id: int, product_data:Product):
    product = get_product_by_id(product_id)
    if not product:
        return None
    product.update(product_data.dict())
    return product
def patch_product(product_id: int, update_data:ProductPatch):
    product = get_product_by_id(product_id)
    if not product:
        return None
    # Update only provided fields
    for key, value in update_data.items():
        if key in product:
            product[key] = value
    return product
def delete_product(product_id: int):
    product = get_product_by_id(product_id)
    if not product:
        return None
    products.remove(product)
    return product