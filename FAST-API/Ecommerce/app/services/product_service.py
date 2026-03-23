products = [
    {
        "id" : 1,
        "name" : "computer",
        "price" : 250000,
        "category": "electronics",
        "stock" : 10
    },
    {
        "id" : 2,
        "name" : "laptop",
        "price" : 50000,
        "category": "electronics",
        "stock" : 20
    }
]


# GET ALL PRODUCTS
def get_all_products():
    return products


#GET PRODUCTS BY ID
def get_product_by_id(product_id : int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None    


#POST PRODUCT
def create_product(product_data):
    new_product = product_data.dict()
    #generating the id manually
    new_product["id"] = len(products) + 1
    products.append(new_product)
    return new_product
    

#PUT PRODUCT
def update_product(product_id : int, updated_product):
    prod = updated_product.dict()
    for index, product in enumerate(products):
        if product["id"] == product_id:
            products[index].update(prod)
            return products[index]
    return None        


    



    
