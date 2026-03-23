products = [
    {"id": 1, "name": "Laptop", "price": 999.99},
    {"id": 2, "name": "Smartphone", "price": 499.99},
    {"id": 3, "name": "Headphones", "price": 199.99},
]

def get_all_products():
    return products

def get_product_by_id(product_id : int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None