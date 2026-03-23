products = [
    {"id": 1, "name": "Laptop", "price": 999.99, "category": "Electronics","stock" : 10},
    {"id": 2, "name": "Smartphone", "price": 499.99, "category": "Electronics","stock" : 20},
    {"id": 3, "name": "Headphones", "price": 199.99, "category": "Electronics","stock" : 15},
]

def get_all_products():
    return products

def get_product_by_id(product_id : int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None

def create_product(product_data):
    new_product = {"id" : len(products) + 1, **product_data.dict()}
    products.append(new_product)
    return new_product

def put_product(product_id : int, product_data):
    for index, product in enumerate(products):
        if product["id"] == product_id:
            updated_product = {"id" : product_id, **product_data.dict()}
            products[index] = updated_product
            return updated_product
    return None

def patch_product(product_id : int , product_data):
    for i, product in enumerate(products):
        if product["id"] == product_id:
            updated_product = {**product, **product_data.dict(exclude_unset=True)}
            products[i] = updated_product
            return updated_product
    return None

def delete_product(product_id : int):
    for index, product in enumerate(products):
        if product["id"] == product_id:
            del products[index]
            return True
    return False
