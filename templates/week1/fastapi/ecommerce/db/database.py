# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker, declarative_base

# DATABASE_URL = "mysql+pymysql://root:password@localhost:3306/ecommerce_db"

# engine = create_engine(DATABASE_URL)

# SessionLocal = sessionmaker(
#     autocommit = False,
#     autoflush = False,
#     bind=engine
# )

# base = declarative_base()



# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker, declarative_base

# DATABASE_URL = "mysql+pymysql://root:password@localhost:3306/ecommerce_db"

# engine = create_engine(DATABASE_URL)

# SessionLocal = sessionmaker(
#     autocommit = False,
#     autoflush = False,
#     bind=engine
# )

# base = declarative_base()

from sqlalchemy.ext.asyncio import create_async_engine , AsyncSession
from sqlalchemy.orm import sessionmaker , declarative_base

DATABASE_URL = "mysql+aiomysql://root:password@localhost:3306/ecommerce_db"

engine = create_async_engine(
    DATABASE_URL,
    echo=True
)

SessionLocal = sessionmaker(
    bind = engine,
    class_ = AsyncSession,
    expire_on_commit=False
)

base = declarative_base()