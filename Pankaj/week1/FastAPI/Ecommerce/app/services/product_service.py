products = [
    {
        "id": 1,
        "name": "Laptop",
        "price": 99999,
        "category": "Electronics",
        "stock": 10
    },
    {
        "id": 2,
        "name": "Smartphone",
        "price": 10999, 
        "category": "Electronics",
        "stock": 25
    },
    {
        "id": 3,
        "name": "Headphones",
        "price": 2999,
        "category": "Electronics",
        "stock": 50
    }
]

def get_all_products():
    return products 

def get_product_by_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None

def create_product(product_data):
    new_product= { "id": len(products) + 1, **product_data.dict() }
    products.append(new_product)
    return new_product

def put_product( product_id: int, product_data):
    for i, product in enumerate(products):
        if product["id"]== product_id:
            updated_product = {"id": product_id, **product_data.dict()}
            products[i]=updated_product
            return updated_product
    return None


