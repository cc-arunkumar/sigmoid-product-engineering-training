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

def create_product(product_data):
    new_product=product_data.dict()
    new_product["id"]=len(products)+1
    products.append(new_product)
    return new_product