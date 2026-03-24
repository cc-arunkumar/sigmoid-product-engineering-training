from pydantic import BaseModel,Field
#the field library is used for extra validation such as number of characters in the variable and so on 
# THIS MODEL IS A STRUCTURE TO FOLLOW FOR THE REQUEST BODY ALONE 
# better to have seperate model sone for put+post wher everything is requiresd and one for patch similar to nodejs 
class Product(BaseModel):
    name:str=Field(min_length=3,max_length=20)
    # either can be string or none both works means Optional[str],now optional[str]=Field(some validation) means validation has to be followed 
    price:int=Field(lt=90000,gt=800)
    category:str=None
    # must be there or crash if no value given to it then it will be None but key is mentioned 
    stock:int=Field(gt=3)
#  autocommit is set to be false and we didnt commit by ourself manually using .coif the sesion is over our changes wont relfect on to the db and db goet our previous stoed point ,we commit to save data permanently else it goes away 
    #lt means less than,gt means greater than