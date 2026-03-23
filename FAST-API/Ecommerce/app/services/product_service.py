products = [
    {
        "id" : 1,
        "name" : "computer",
        "price" : 250000,
        "category": "electronics",
        "stock" : 10
    },
    {
        "id" : 2,
        "name" : "laptop",
        "price" : 50000,
        "category": "electronics",
        "stock" : 20
    }
]


# GET ALL PRODUCTS
def get_all_products():
    return products


#GET PRODUCTS BY ID
def get_product_by_id(product_id : int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None    


#POST PRODUCT
def create_product(product_data):
    new_product = product_data.dict()
    #generating the id manually
    new_product["id"] = len(products) + 1
    products.append(new_product)
    return new_product
    

#PUT PRODUCT
def update_product(product_id : int, updated_product):
    prod = updated_product.dict()
    for index, product in enumerate(products):
        if product["id"] == product_id:
            products[index].update(prod)
            return products[index]
    return None        

#PATCH PRODUCT
def update_partially(product_id : int, patched_product):
    for product in products:
        if product["id"] == product_id :
            patched_data = patched_product.dict(exclude_unset=True)

        #exclude_unset-True means:
        #In pydantic model, fields can be:
        #1. Set explicitly (user provided a value)
        #2. Unset (User didn't provide it all, even if a default exist)
        # "Only include fields that were actually provided when creating this object"

    for key, value in patched_data.items():
        product[key] = value

    return product

#DELETE PRODUCT
def delete_product(product_id: int):
    for i in range(len(products)):
        if products[i]["id"] == product_id:
            del products[i]
            return products
    return None
