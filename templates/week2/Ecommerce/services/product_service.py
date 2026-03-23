products = [
    {
        "id" : 1,
        "name" : "Laptop",
        "price" : 2000,
        "category" : "Electronics",
        "stock" : 10
    },
    {
        "id" : 2,
        "name" : "Mobile",
        "price" : 10000,
        "category" : "Electronics",
        "stock" : 4
    }
]   

def get_all_products(): #GET ALL PRODUCTS
    return products

def get_product_by_id(product_id: int): #GET BY ID 
    for product in products:
        if product["id"] == product_id:
            return product
    return None

def create_product(product_data):  #ADD PRODUCT
    new_product = product_data.dict()
    new_product["id"] = len(products) + 1
    products.append(new_product)
    return new_product

def update_product(product_id: int, updated_data):  #UPDATE PRODUCT
    updated_data = updated_data.dict()
    for product in products:
        if product["id"] == product_id:
            product["name"] = updated_data.get("name", product["name"])
            product["price"] = updated_data.get("price", product["price"])
            product["category"] = updated_data.get("category", product["category"])
            product["stock"] = updated_data.get("stock", product["stock"])

        return updated_data
    return None

# def patch_product(product_id: int, updated_data):
#     updated_data = updated_data.dict()
#     for product in products:
#         if product["id"] == product_id:
