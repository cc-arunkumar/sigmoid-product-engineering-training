
products = [
    {
        "id": 1,
        "name": "Laptop",
        "price": 50000,
        "category": "Electronics",
        "stock": 25
    },
    {
        "id": 2,
        "name": "Mobile",
        "price": 25000,
        "category": "Electronics",
        "stock": 100
    }
]

# GET All Products
def get_all_products():
    return products


# GET Products by id
def get_product_by_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    
    return None

# POST to create product
def create_product(product_details):
    product = product_details.dict()
    product["id"] = len(products) + 1
    products.append(product)
    return product

# PUT to update product
def update_product(product_details, product_id):
    new_product = product_details.dict()
    new_product["id"] = product_id
    updated = False
    for i in range(0, len(products)):
        if products[i]["id"] == product_id:
            products[i] = new_product
            updated = True
            break
    
    if updated:
        return {"Updated Successfully"}
    else:
        return {"Product not found"}
    

# DELETE Product
def delete_product(product_id):
    index = None
    for i in range(0, len(products)):
        if products[i]["id"] == product_id:
            index = i
            break
    
    if index == None:
        return {"Please enter a valid index"}
    else:
        products.pop(index)
        return {"Product deleted successfully"}

# PATCH Product
def patch_update(product_id: int, patch_update):
    
    for product in products:
        if product["id"] == product_id:
            patched_data = patch_update.dict(exclude_unset = True)
            for key, value in patched_data.items():
                product[key] = value
            
            return product
    return None