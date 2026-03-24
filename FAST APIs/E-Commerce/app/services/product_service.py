products = [
    {"id": 1, "name": "Laptop", "price": 50000, "category": "Electronics", "stock": 10},
    {"id": 2, "name": "Mobile", "price": 20000, "category": "Electronics", "stock": 20},
]

# Get all product
def get_all_products():
    return products

# Get product by id
def get_product_by_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None
    
# POST product
def create_product(product_data):
    new_product = product_data.dict()

    # Generating ID manually
    new_product["id"] = len(products)+1
    products.append(new_product)

    return new_product

# PUT product
def replace_product(product_id: int, new_data):
    for index, product in enumerate(products):
        if product["id"] == product_id:
            replaced = new_data.dict()
            replaced["id"] = product_id
            products[index] = replaced
            return products[index]
    return None


# PATCH Product
def patch_update(product_id: int, patch_update):
    for product in products:
        if product["id"] == product_id:
            patched_data = patch_update.dict(exclude_unset=True)

            # exclude_unset=True means:
            # In pydantic model, fields can be:
            # 1. Set explicitly (user provided a value)
            # 2. Unset (user didn't provide it at all, even if a default exists)

            # "Only include fields that were actually provided when creating this object"
            for key, value in patched_data.items():
                product[key] = value

            return product

    return None

# DELETE product
def delete_product(product_id: int):
    for index, product in enumerate(products):
        if product["id"] == product_id:
            products.pop(index)
            return True
    return False
