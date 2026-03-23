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
    },
    {
        "id": 3,
        "name": "keyboard",
        "price": 2500,
        "category": "Electronics",
        "stock": 12
    }
]
# GET ALL products
def get_all_products():
    return products

# GET products by ID

# def get_product_by_id(product_id: int):
#     for product in products:
#         if product["id"] == product_id:
#             return product
#         return None
def get_product_by_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None
    
# POST product
def create_product(product_data):
    print("=========> service")
    
    new_product = product_data.dict()
    
    #Generating ID manually
    new_product["id"] = len(products) + 1
    
    print(new_product)
    
    
    products.append(new_product)
    
    return new_product

#PUT product

def update_product(product_id: int, product_data):
    for i, p in enumerate(products):
        if p["id"] == product_id:
            products[i] = {"id": product_id, **product_data.dict()}
            return products[i]
    return None

# patch product
def patch_product(product_id: int, product_data):
    for i, p in enumerate(products):
        if p["id"] == product_id:
            products[i].update(product_data.dict(exclude_unset=True))
            return products[i]
    return None

# DELETE product
def delete_product(product_id: int):
    for i, p in enumerate(products):
        if p["id"] == product_id:
            del products[i]
            return True
    return False
