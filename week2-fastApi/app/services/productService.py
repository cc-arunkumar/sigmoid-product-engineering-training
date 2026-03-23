products = [
    {
        "id": 1,
        "name": "Laptop",
        "price": 100000,
        "category": "Electronics",
        "stock": 10
    }, {
        "id": 2,
        "name": "Mobile",
        "price": 30000,
        "category": "Electronics",
        "stock": 80
    }, {
        "id": 3,
        "name": "oneplus_headphone",
        "price": 300,
        "category": "Electronics",
        "stock": 150
    },
    {
        "id": 4,
        "name": "samsung_galaxy",
        "price": 30000,
        "category": "Electronics",
        "stock": 15000
    }
]
def getAllProducts():
    return products

    # GET Products By Id
def get_product_by_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None

# POST Product

def create_product(product_data):
    new_product = product_data.dict()

    # Generating ID manually
    new_product["id"] = len(products) + 1

    products.append(new_product)

    return new_product

# PUT PRODUCT
def update_product(product_id, product_data):
    for product in products:
        if product["id"] == product_id:
            updated_data = product_data.dict()   # or model_dump() (Pydantic v2)

            product.update(updated_data)
            return product

    return None


#DELETE PRODUCT

def delete_product(product_id:int):
   for index, product in enumerate(products):
      if product["id"] == product_id:
         deleted_product = products.pop(index)
         return deleted_product 

   return None


#PATCH PRODUCT

def patch_product(product_id:int,product_data):
    for product in products:
        if product["id"]==product_id:
            update_data=product_data.dict(exclude_unset=True)

            product.update(update_data)
            return product
    return None                       
