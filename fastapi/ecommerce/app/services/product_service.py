products=[
    {
      "id":101,
      "name":"Laptop",
      "price":100000.0,  
      "category":"Electronics",
      "stock":20
    },
    {
      "id":102,
      "name":"Mobile",
      "price":25000.0,  
      "category":"Electronics",
      "stock":45
    },
    {
      "id":103,
      "name":"Headphones",
      "price":25000.0,  
      "category":"Electronics",
      "stock":50      
    }
  ]
# Get all products
def get_all_products():
    return products
# Get product by ID
def get_product_by_id(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product
    return None