from app.models.product_model import ProductCreate, ProductUpdate

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

next_id = 100

def get_all_products():
    return products;

def get_product_by_id(product_id : int):
    for product in products:
        if product["id"] == product_id:
            return product
    
    return None

def create_prduct(prdouct_data : ProductCreate):
    global next_id
    new_product = prdouct_data.model_dump()
    new_product["id"] =  next_id
    products.append(new_product)
    next_id += 1
    return new_product

def update_product(product_id : int, product_data : ProductCreate):
    for index, product in enumerate(products):
        if product["id"] == product_id:
            updated_product = product_data.model_dump()
            updated_product["id"] = product_id
            products[index] = updated_product
            return updated_product
    
    return None
    

def patch_update_product(product_id : int,product_data : ProductUpdate ):
    product = get_product_by_id(product_id)
    if not product:
        return None
    
    updated_data = product_data.model_dump(exclude_unset=True)
    product.update(updated_data)
    return product

def delete_product(product_id : int):
    for index, product in enumerate(products):
        if product["id"] == product_id:
            deleted_product = products.pop(index)
            return deleted_product
    
    return None