products = [
    {
        "id": 1,
        "name": "Laptop",
        "price": 500000,
        "category": "Electronics",
        "stock": 10
    },
    {
        "id": 2,
        "name": "Mobile",
        "price": 250000,
        "category": "Electronics",
        "stock": 15
    }
]

# GET All Products
def get_all_products():
    return products

# GET Products By Id
def get_product_by_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None