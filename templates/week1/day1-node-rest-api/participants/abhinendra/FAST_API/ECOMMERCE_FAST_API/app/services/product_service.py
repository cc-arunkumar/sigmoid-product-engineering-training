products =[
    {
        "id": 1,
        "name": "Laptop",
        "price": 50000,
        "category": "Electronics",
        "stock": 10
    },
    {
        "id": 2,
        "name": "Smartphone",
        "price": 25000,
        "category": "Electronics",
        "stock": 15
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
    new_product= product_data.dict()

    #Generating ID manually
    new_product["id"]= len(products) +1

    products.append(new_product)

    return products

# def update_product_by_id(product_id: int, product_data):
#     for index, product in enumerate(products):
#         if product["id"] == product_id:
#             updated_product = product_data.dict()

#             # ID preserve karna hai
#             updated_product["id"] = product_id

#             products[index] = updated_product
#             return updated_product

#     return None

#update by using put
def update_product_by_id(product_id: int , product_data):
     updateproduct=product_data.dict()
     updateproduct["id"]= product_id
     for product in products:
        if product["id"]==product_id:
           product=updateproduct
           return product  
            
     return {"error": "Product not found"}


#update partial product

def patch_update(product_id:int, patch_update):
    
    for product in products:
        if product[id]==product_id:
            patched_data=patch_update.dict(exclude_unset=True)

            for key, value in patched_data.items():
                product[key]= value
            
            return product
        
    return None


#delete product

def delete_product_by_id(product_id: int):
    for index, product in enumerate(products):
        if product["id"] == product_id:
            deleted_product = products.pop(index)  # remove from list
            return deleted_product

    return None