products = [
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
]

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


def update_product_by_id(product_id:int,product):
    new_prod={}
    for prod in products:
        if prod["id"] == product_id:
            new_prod = prod
            break
    if not new_prod:
        return None
    product = product.dict()
    new_prod["name"] = product["name"]
    new_prod["price"] = product["price"]
    new_prod["category"] = product["category"]
    new_prod["stock"] = product["stock"]

    return new_prod


def update_product_partial_by_id(product_id:int,data):
    # new_prod = {}
    # for prod in products:
    #     if prod["id"] == product_id:
    #         new_prod = prod
    #         break
    # if not new_prod:
    #     return None
    # data = data.dict()
    # for key,value in data.items():
    #     if key in new_prod.keys():
    #         new_prod[key] = value
    for product in products:
        if product["id"] == product_id:
            patched_data = data.dict(exclude_unset=True)

            for key,value in patched_data.items():
                product[key]=value
        return product
    return None
        
