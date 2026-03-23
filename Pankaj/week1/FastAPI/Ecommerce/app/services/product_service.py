products = [
    {
        "id": 1,
        "name": "Laptop",
        "price": 99999,
        "category": "Electronics",
        "stock": 10
    },
    {
        "id": 2,
        "name": "Smartphone",
        "price": 10999, 
        "category": "Electronics",
        "stock": 25
    },
    {
        "id": 3,
        "name": "Headphones",
        "price": 2999,
        "category": "Electronics",
        "stock": 50
    }
]

def get_all_products():
    return products 

def get_product_by_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None