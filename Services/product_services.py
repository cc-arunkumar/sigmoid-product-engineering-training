products = [
{
"id":1,
"name":"Laptop",
"price":500000,
"category":"Electronics",
"stock":10
},
{
"id":2,
"name":"Mobile",
"price":250000,
"category":"Electronics",
"stock":15
}
]


# Get Product ALL
def get_all_products():
    return products

# Get Product By ID 
def get_product_by_id(prod_id):
    for prod in products: 
        if prod["id"] == prod_id:
            return prod 
    return None

def post_product(data):
    new_product = data.dict()
    new_product["id"] = len(products)+1 

    products.append(new_product)

    return new_product 

# def up_product(data, id):
#     updated_product = data.dict()
#     updated_product["id"] = id
#     # enumerate = gives index + value
#     for i, prod in enumerate(products):
#         if prod["id"] == id:
#             products[i] = updated_product
#             return updated_product

#     return {"error": "Product not found"}



def up_product(data , id):
    update_product = data.dict()
    update_product["id"] = id 

    for prod in products : 
        if prod["id"] == id:
            prod.update(update_product)
            return update_product
        
    return {"error" : "can not find the product"}

def patch_product(data, id):
    update_data = data.dict(exclude_unset=True)
    # set only those feild that i am passing not aisa kuch ki har field dena hi hia isme aisa kuch hai ki ha jo jo dia hai , aur baki ka agar nahi dia hai to sabko nahi dena hai 

    for prod in products:
        if prod["id"] == id:
            prod.update(update_data)
            return prod

    return {"error": "Product not found"}


def delete_product(id):
    for prod in products:
        if prod["id"] == id:
            products.remove(prod)
            return {"message": "Product deleted"}

    return {"error": "Product not found"}