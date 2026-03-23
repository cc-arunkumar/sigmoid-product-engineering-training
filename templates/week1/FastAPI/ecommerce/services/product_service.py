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

#POST Product
def create_product(product_data):
    new_product = product_data.dict()

    #Generating ID manually
    new_product["id"] = len(products) + 1

    products.append(new_product)

    return new_product

# UPDATE Product
def update_product(product_id: int, product_data: dict):
    for product in products:
        if product["id"] == product_id:

            updated_item = {"id": product_id, **product_data}
            
            idx = products.index(product)
            products[idx] = updated_item
            return updated_item
    return "Product not found"

# DELETE Product
def delete_product(product_id: int):
    for product in products:
        if product_id == product["id"]:
            products.remove(product)
            return product
    return "Product not found"

# PATCH Product
def patch_product(product_id: int, patch_update):
    for product in products:
        if product["id"] == product_id:
            patched_data = patch_update.dict(exclude_unset = True)

            # exclude_unset = True means:
            # In pydantic model, fields can be:
            # 1. Set explicitly (user provided a value)
            # 2. Unset (User didn't provide it all, even if a default exist)

            for key, value in patched_data.items():
                product[key] = value
            
            return product
    return None