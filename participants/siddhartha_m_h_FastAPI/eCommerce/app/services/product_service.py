from fastapi import HTTPException

products = [
    {
        "id" : 1,
        "name" : "iPhone 14 Pro Max",
        "price" : 1099.99,
        "category" : "Smartphones",
        "stock" : 50
    },
    {
        "id" : 2,
        "name" : "Samsung Galaxy S23 Ultra",
        "price" : 1199.99,
        "category" : "Smartphones",
        "stock" : 30
    }
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
    if product_data.price < 0:
        raise HTTPException(status_code=400, detail="Price cannot be negative")
    new_product["id"] = len(products) + 1
    products.append(new_product)
    return new_product

def update_product(product_id: int, product_data):
    for index, product in enumerate(products):
        if product["id"] == product_id:
            updated_product = product_data.dict()
            updated_product["id"] = product_id
            products[index] = updated_product
            return updated_product
    return None

def delete_product(product_id: int):
    for index, product in enumerate(products):
        if product["id"] == product_id:
            del products[index]
            return True
    return False

def patch_product(product_id: int, product_data):
    for product in products:
        if product["id"] == product_id:
            patched_data = product_data.dict(exclude_unset=True)
            for key, value in patched_data.items():
                product[key] = value
            return product
    return None
