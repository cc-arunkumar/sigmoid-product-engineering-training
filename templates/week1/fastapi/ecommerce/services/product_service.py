products = [
    {
        "id":1,
        "name":"Laputopu",
        "price":100,
        "category":"electronics",
        "stock":1
    },
    {
        "id":2,
        "name":"dechtopu",
        "price":10,
        "category":"electronics",
        "stock":2
    }
]
# GET ALL
def get_all_products():
    return products

# get products by id
def get_productById(product_id : int):
    for product in products:
        if(product_id == product["id"]):
            return product
    return None

#CREATE PRODUCT
def create_product(input_product):
    new_product = input_product.dict()
    new_product["id"] = len(products)+1
    products.append(new_product)

    return new_product
