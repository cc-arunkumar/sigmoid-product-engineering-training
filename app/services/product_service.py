products= [
    {
        "id":1,
        "name":"Laptop",
        "price":30000,
        "category":"electronics",
        "stock":4

    },
    {
        "id":2,
        "name":"shoe",
        "price":300,
        "category":"fashion",
        "stock":7

    }
]
# get all the products 
def get_all_products():
    return products

# get product by id
def get_product_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None

# create product
def create_product(product_data):
    new_product = product_data.dict()

    new_product["id"] = len(products) + 1

    products.append(new_product)

    return new_product

# put product
def update_product(product_id: int, product_data: products):
    for index, product in enumerate(products):
        if product["id"] == product_id:
            updated_product = product_data.dict()
            updated_product["id"] = product_id  

            products[index] = updated_product
            return updated_product

    return None

# patch product
def patch_update(product_id:int,patch_update: products):
    for product in products:
        if product["id"] == product_id:
            patched_data = patch_update.dict(exclude_unset=True) 
            # (exclude_unset=True)
            # in pydantic model , fields can be:
            # 1. Set explicitly(user provided a value)
            # 2. Unset(user didn't provide it all, even if a default exist)

            #only include fields that actually user given 
            for key, value in patched_data.items():
                product[key] = value
            return product
    return None

