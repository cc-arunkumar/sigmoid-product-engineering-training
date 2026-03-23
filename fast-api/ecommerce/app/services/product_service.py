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
#POST PRODUCT
def create_product(product_data):
    new_product = product_data.dict()
    new_product["id"] = len(products) + 1
    products.append(new_product)
    return new_product
  
#put product
def update_product(product_id: int, product_data):
    for index, product in enumerate(products):
        if product["id"] == product_id:
            updated_product = product_data.dict()
            updated_product["id"] = product_id
            products[index] = updated_product
            return updated_product
    return None
#delete product
def delete_product(product_id: int):
    for index, product in enumerate(products):
        if product["id"] == product_id:
            del products[index]
            return True
    return False
