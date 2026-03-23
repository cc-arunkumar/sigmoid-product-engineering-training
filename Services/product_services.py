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

def up_product(data, id):
    updated_product = data.dict()
    updated_product["id"] = id
    
    for i, prod in enumerate(products):
        if prod["id"] == id:
            products[i] = updated_product
            return updated_product

    return {"error": "Product not found"}
