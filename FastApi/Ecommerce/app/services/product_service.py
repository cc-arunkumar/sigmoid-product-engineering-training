products=[
    {
        "id": 1,
        "name": "Iphone",
        "price": 100000,
        "category": "Electronics",
        "stock": 10
    },
    {
        "id": 2,
        "name": "Samsung Galaxy",
        "price": 80000,
        "category": "Electronics",
        "stock": 15
    }
]

def get_all_products():
    return products

def get_product_by_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None



#post product
def create_product(product):
    new_product = product.dict()

    #generate id manually
    new_product["id"] = len(products) + 1

    products.append(new_product)
    return new_product

def update_product(product_id: int, updated_data):
    for product in products:
        if product["id"] == product_id:
            update_fields = updated_data.dict(exclude_unset=True)
            product.update(update_fields)
            return product
    return None

def replace_product(product_id: int, new_data):
    for index, product in enumerate(products):
        if product["id"] == product_id:
            replaced = new_data.dict()
            replaced["id"] = product_id
            products[index] = replaced
            return products[index]
    return None

def delete_product(product_id: int):
    for index, product in enumerate(products):
        if product["id"] == product_id:
            products.pop(index)
            return True
    return False