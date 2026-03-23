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
    },{

        "id": 3,
        "name": "Book",
        "price": 2500,
        "category": "Stationary",
        "stock": 20
    }
]

def get_all_products():
    return products


def get_product_by_id(product_id:int):
    
    for product in products:
        if product["id"]==product_id:
            return product
    return None



def create_product(product_data):
    
    new_product=product_data.dict()

    new_product["id"]=len(products)+1
    products.append(new_product)

    return new_product
    



def update_product_by_id(product_id:int,updated_data):
    for index,product in enumerate(products):
        if product["id"]==product_id:
            updated_product=updated_data.dict()
            updated_product["id"]=product_id
            product[index]=updated_product
            return updated_product
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