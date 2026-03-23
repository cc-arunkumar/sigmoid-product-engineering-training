products = [
   {
    "id" : 1,
    "name" : "laptop",
    "price": 50000,
    "category" : "electronics",
    "stock": 15
   },
    {
    "id" : 2,
    "name" : "mobile",
    "price": 25000,
    "category" : "electronics",
    "stock": 10
   }
]


def get_all_products():
    return products

def get_product_by_id(product_id : int):
    for product in products : 
        if product["id"] == product_id :
            return product
        
    return None


def create_product(product_details):
    product = product_details.dict()
    product["id"] = len(products) + 1
    products.append(product)
    return product


