products=[{
     "id": 1,
        "name": "Laptop",
        "category": "Electronics",
        "price": 75000,
        "stock": 10
    },
    {
        "id": 2,
        "name": "Smartphone",
        "category": "Electronics",
        "price": 25000,
        "stock": 25
}]
def get_all_products():
    return products


def get_product_by_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None
def add_product(product_data):
    new_product= product_data.dict()

    

    new_product["id"]= len(products)+1
    products.append(new_product)

    
    return new_product

def update_product(product):
    n_product= product.dict()
    

    


