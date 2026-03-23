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