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

