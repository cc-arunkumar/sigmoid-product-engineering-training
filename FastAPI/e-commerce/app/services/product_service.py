products = [
    {
        "id": 1,
        "name": "Laptop",
        "price": 100000,
        "category": "Electronics",
        "stock": 10
    },
    {
        "id": 2,
        "name": "Mobile",
        "price": 50000,
        "category": "Electronics",
        "stock": 15
    },
    {
        "id": 3,
        "name": "Tablet",
        "price": 30000,
        "category": "Electronics",
        "stock": 20
    }
]

def get_all_products():
    return products


def get_product_by_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None

def create_product(product_data):
    new_product = product_data.dict()
    new_product["id"] = len(products) + 1
    products.append(new_product)
    return new_product

def put_product(product_id : int, product_data):
    for index, product in enumerate(products):
        if product["id"] == product_id:
            updated_product = {"id" : product_id, **product_data.dict()}
            products[index] = updated_product
            return updated_product
    return None

def patch_product(product_id : int , product_data):
    for i, product in enumerate(products):
        if product["id"] == product_id:
            updated_product = {**product, **product_data.dict(exclude_unset=True)}
            products[i] = updated_product
            return updated_product
    return None

def delete_product(product_id : int):
    for i, product in enumerate(products):
        if product["id"] == product_id:
            del products[i]
            return True
    return False