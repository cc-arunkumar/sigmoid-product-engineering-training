from app.models.products_model import Product
products=[
    {
        "id": 1,
        "name": "Product 1",
        "price": 10,
        "category": "Category A",
        "stock": 50
    },
    {
        "id": 2,
        "name": "Product 2",
        "price": 19,
        "category": "Category B",
        "stock": 30
    },
    {
        "id": 3,
        "name": "Product 3",
        "price": 5,
        "category": "Category A",
        "stock": 100
    }
]
def get_all_products(): 
    return products
def get_product_by_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None
def create_product(product: Product):   
    new_product = product.dict()
    new_product["id"] = len(products) + 1
    products.append(new_product)
    return new_product
def update_product(product_id: int, updated_product: Product):
    for index, product in enumerate(products):
        if product["id"] == product_id:
            products[index] = updated_product.dict()
            products[index]["id"] = product_id
            return products[index]
    return None
def delete_product(product_id: int):
    for index, product in enumerate(products):
        if product["id"] == product_id:
            return products.pop(index)
    return None
def update_partial_product(product_id: int, updated_fields: dict):
    for index, product in enumerate(products):
        if product["id"] == product_id:
            products[index].update(updated_fields)
            return products[index]
    return None
