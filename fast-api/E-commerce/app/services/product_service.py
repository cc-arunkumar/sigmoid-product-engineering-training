products=[{
     "id": 1,
        "name": "Laptop",
        "category": "Electronics",
        "price": 75000,
        "stock": 10
    },
    {
        "id": 2,
        "name": "Smartphone",
        "category": "Electronics",
        "price": 25000,
        "stock": 25
}]
def get_all_products():
    return products
def get_product_by_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None

