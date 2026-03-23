products=[
    {
        "id":1,
        "name":"laptop",
        "price":50000,
        "category":"Electronics",
        "stock":10

    },
    {
        "id":2,
        "name":"mobile",
        "price":60000,
        "category":"Electronics",
        "stock":20

    }

]
def get_all_products():
    return products

def get_product_by_id(product_id:int):
    for product in products:
        if product["id"]==product_id:
            return product
    return None    