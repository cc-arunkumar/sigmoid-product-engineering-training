products=[
    {
        "id": 1,
        "name": "Laptop",
        "price": 999.99,
        "category": "Electronics",
        "stock": 10
    },
    {
        "id": 2,
        "name": "Smartphone",
        "price": 499.99,
        "category": "Electronics",
        "stock": 20
    }
]
#GET ALL PRODUCTS
def get_all_products():
    return products

#GET PRODUCT BY ID
def get_product_by_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None 
