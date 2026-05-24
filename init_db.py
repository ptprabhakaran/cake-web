import os

import mysql.connector


BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def load_env_file():
    env_path = os.path.join(BASE_DIR, ".env")
    if not os.path.exists(env_path):
        return

    with open(env_path, "r", encoding="utf-8") as env_file:
        for line in env_file:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue

            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip())


load_env_file()

connection = mysql.connector.connect(
    host=os.getenv("MYSQL_HOST", "127.0.0.1"),
    port=int(os.getenv("MYSQL_PORT", "3306")),
    user=os.getenv("MYSQL_USER", "root"),
    password=os.getenv("MYSQL_PASSWORD", ""),
)

cursor = connection.cursor()

with open(os.path.join(BASE_DIR, "schema.sql"), "r", encoding="utf-8") as schema_file:
    statements = schema_file.read().split(";")

for statement in statements:
    statement = statement.strip()
    if statement:
        cursor.execute(statement)

connection.commit()
cursor.close()
connection.close()

print("Database initialized successfully.")
