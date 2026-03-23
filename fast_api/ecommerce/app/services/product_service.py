products=[{
    "id":1,
    "name":"Laptop",
    "price":50000,
    "category":"Electronics",
    "stock":50
},
{
    "id":2,
    "name":"Iphone",
    "price":85000,
    "category":"Electronics",
    "stock":50
},
{
    "id":3,
    "name":"Tablet",
    "price":25000,
    "category":"Electronics",
    "stock":50
}
]

def get_all_products():
    return products

def get_product_by_id(product_id:int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None