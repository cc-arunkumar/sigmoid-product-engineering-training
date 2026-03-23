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

# UPDATE PRODUCT
def update_product(input_product, product_id: int):
    for product in products:
        if product_id == product["id"]:
            product.update(input_product)  
            return product
    return "Product not found"

#DELETE Product
def delete_product(product_id:int):
    for product in products:
        if product_id == product["id"]:
            products.remove(product)
            return product
    return "Product not found"

#PATCH Product
def patch_product(product_id: int, input_product):
    for product in products:
        if product["id"] == product_id:
            product.update(input_product)  
            return product

    return "Product not found"



