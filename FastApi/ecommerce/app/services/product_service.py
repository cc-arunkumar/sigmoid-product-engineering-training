
products = [
    {
        "id": 1,
        "name": "Laptop",
        "price": 50000,
        "category": "Electronics",
        "stock": 25
    },
    {
        "id": 2,
        "name": "Mobile",
        "price": 25000,
        "category": "Electronics",
        "stock": 100
    }
]

# GET All Products
def get_all_products():
    return products


# GET Products by id
def get_product_by_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    
    return None

# POST to create product
def create_product(product_details):
    product = product_details.dict()
    product["id"] = len(products) + 1
    products.append(product)
    return product