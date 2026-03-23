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

# Get Product By ID 
def get_product_by_id(prod_id):
    for prod in products: 
        if prod["id"] == prod_id:
            return prod 
    return None