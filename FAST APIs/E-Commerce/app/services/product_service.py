products = [
    {"id": 1, "name": "Laptop", "price": 50000, "category": "Electronics", "stock": 10},
    {"id": 2, "name": "Mobile", "price": 20000, "category": "Electronics", "stock": 20},
]

# Get all product
def get_all_products():
    return products

# Get product by id
def get_product_by_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
        return None
    
# Post product
def create_product(product_data):
    new_product = product_data.dict()

    # Generating ID manually
    new_product["id"] = len(products)+1
    products.append(new_product)

    return new_product