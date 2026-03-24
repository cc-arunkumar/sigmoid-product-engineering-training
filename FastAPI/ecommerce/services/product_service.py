products = [
    {
        "id":1,
        "name":"Laptop",
        "price":500000,
        "category":"Electronics",
        "stock":10
        },
    {
        "id":2,
        "name":"Mobile",
        "price":250000,
        "category":"Electronics",
        "stock":15
        }
]

def get_all_products():
    return products

def get_product_by_id(product_id:int):
    for product in products:
        if product["id"]==product_id:
            return product
    return None

#POST Product
def create_product(product_data):
    new_product=product_data.dict()
    new_product["id"]=len(products)+1
    products.append(new_product)
    return new_product

# PUT 
def update_product_by_id(product_id: int, updated_product):
    for product in products:
        if product["id"] == product_id:
            product.update(updated_product.dict())
            return product
    return None

# PATCH Product
def patch_update(product_id:int,patch_update):
    for product in products:
        if product["id"]==product_id:
            patched_data=patch_update.dict(exclude_unset=True)
            for key, value in patched_data.items():
                product[key]=value
            return product
    return None    

            # pydantic Field validations successfully