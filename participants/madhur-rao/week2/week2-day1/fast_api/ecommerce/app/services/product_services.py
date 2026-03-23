products = (
    {
        "id":1,
        "name":"Laptop",
        "price":25000,
        "category":"Electronics",
        "stock":100
    },
    {
        "id":2,
        "name":"Mobile",
        "price":12500,
        "category":"Electronics",
        "stock":200
    }
)

def get_all_products():
    return products

def get_product_by_id(product_id : int):
    for i in range(len(products)):
        if products[i]["id"] == product_id:
            return products[i]
    return None

def create_product(product):
    new_prod = product.dict()

    new_prod["id"] = len(products)+1

    products.append(new_prod)
    return new_prod