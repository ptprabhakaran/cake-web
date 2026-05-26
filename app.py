import os
import urllib.parse
from decimal import Decimal

from flask import Flask, jsonify, request, send_from_directory
import mysql.connector
from mysql.connector import Error


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.join(BASE_DIR, "public")

app = Flask(__name__, static_folder="static", static_url_path="/static")


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


def db_config():
    mysql_url = os.getenv("MYSQL_URL")
    if mysql_url:
        parsed = urllib.parse.urlparse(mysql_url)
        return {
            "host": parsed.hostname or "127.0.0.1",
            "port": parsed.port or 3306,
            "user": parsed.username or "root",
            "password": parsed.password or "",
            "database": parsed.path.lstrip("/") or os.getenv("MYSQL_DATABASE", "railway"),
        }

    return {
        "host": os.getenv("MYSQL_HOST", "127.0.0.1"),
        "port": int(os.getenv("MYSQL_PORT", "3306")),
        "user": os.getenv("MYSQL_USER", "root"),
        "password": os.getenv("MYSQL_PASSWORD", ""),
        "database": os.getenv("MYSQL_DATABASE", "railway"),
    }


def get_connection():
    return mysql.connector.connect(**db_config())


def init_db():
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor()
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS orders (
              id INT AUTO_INCREMENT PRIMARY KEY,
              customer_name VARCHAR(120) NOT NULL,
              phone VARCHAR(30) NOT NULL,
              address TEXT NOT NULL,
              notes TEXT,
              total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
              status ENUM('pending', 'accepted', 'rejected', 'completed') NOT NULL DEFAULT 'pending',
              payment_status ENUM('unpaid', 'paid', 'failed', 'refunded') NOT NULL DEFAULT 'unpaid',
              created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS order_items (
              id INT AUTO_INCREMENT PRIMARY KEY,
              order_id INT NOT NULL,
              product_slug VARCHAR(160),
              product_name VARCHAR(180) NOT NULL,
              category VARCHAR(120),
              size VARCHAR(120),
              option_type VARCHAR(80),
              message VARCHAR(80),
              quantity INT NOT NULL DEFAULT 1,
              unit_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
              line_total DECIMAL(10, 2) NOT NULL DEFAULT 0,
              FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
            )
            """
        )
        connection.commit()
    except Error as exc:
        print(f"Database initialization failed: {exc}")
    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()


init_db()


def money(value):
    return Decimal(str(value or 0)).quantize(Decimal("0.01"))


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response


@app.route("/")
def home():
    return send_from_directory(PUBLIC_DIR, "index.html")


@app.route("/api/health")
def health():
    return jsonify({"ok": True, "message": "Cake Theory backend is running"})


@app.route("/api/orders", methods=["OPTIONS"])
def orders_options():
    return ("", 204)


@app.route("/api/orders", methods=["POST"])
def create_order():
    payload = request.get_json(force=True)
    customer = payload.get("customer", {})
    items = payload.get("items", [])

    if not items:
        return jsonify({"ok": False, "error": "Cart is empty"}), 400

    if not customer.get("name") or not customer.get("phone") or not customer.get("address"):
        return jsonify({"ok": False, "error": "Name, phone, and address are required"}), 400

    total_amount = sum(money(item.get("unitPrice")) * int(item.get("quantity", 1)) for item in items)

    try:
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(
            """
            INSERT INTO orders
              (customer_name, phone, address, notes, total_amount, status, payment_status)
            VALUES
              (%s, %s, %s, %s, %s, %s, %s)
            """,
            (
                customer.get("name"),
                customer.get("phone"),
                customer.get("address"),
                customer.get("notes", ""),
                total_amount,
                "pending",
                "unpaid",
            ),
        )
        order_id = cursor.lastrowid

        for item in items:
            unit_price = money(item.get("unitPrice"))
            quantity = int(item.get("quantity", 1))
            cursor.execute(
                """
                INSERT INTO order_items
                  (order_id, product_slug, product_name, category, size, option_type, message, quantity, unit_price, line_total)
                VALUES
                  (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """,
                (
                    order_id,
                    item.get("slug", ""),
                    item.get("title", ""),
                    item.get("category", ""),
                    item.get("size", ""),
                    item.get("option", ""),
                    item.get("note", ""),
                    quantity,
                    unit_price,
                    unit_price * quantity,
                ),
            )

        connection.commit()
        return jsonify({"ok": True, "order_id": order_id, "total": str(total_amount)})

    except Error as exc:
        return jsonify({"ok": False, "error": str(exc)}), 500
    finally:
        if "cursor" in locals():
            cursor.close()
        if "connection" in locals() and connection.is_connected():
            connection.close()


@app.route("/api/orders", methods=["GET"])
def list_orders():
    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT id, customer_name, phone, address, notes, total_amount, status, payment_status, created_at
            FROM orders
            ORDER BY id DESC
            """
        )
        orders = cursor.fetchall()

        for order in orders:
            order["total_amount"] = str(order["total_amount"])
            order["created_at"] = order["created_at"].isoformat(sep=" ", timespec="minutes")
            cursor.execute(
                """
                SELECT product_slug, product_name, category, size, option_type, message, quantity, unit_price, line_total
                FROM order_items
                WHERE order_id = %s
                """,
                (order["id"],),
            )
            order["items"] = cursor.fetchall()
            for item in order["items"]:
                item["unit_price"] = str(item["unit_price"])
                item["line_total"] = str(item["line_total"])

        return jsonify({"ok": True, "orders": orders})
    except Error as exc:
        return jsonify({"ok": False, "error": str(exc)}), 500
    finally:
        if "cursor" in locals():
            cursor.close()
        if "connection" in locals() and connection.is_connected():
            connection.close()


@app.route("/api/orders/pay", methods=["OPTIONS"])
def orders_pay_options():
    return ("", 204)


@app.route("/api/orders/pay", methods=["POST"])
def pay_order():
    payload = request.get_json(force=True)
    order_id = payload.get("order_id")
    payment_id = payload.get("payment_id")

    if not order_id or not payment_id:
        return jsonify({"ok": False, "error": "Order ID and Payment ID are required"}), 400

    try:
        connection = get_connection()
        cursor = connection.cursor()
        cursor.execute(
            """
            UPDATE orders
            SET payment_status = 'paid', status = 'accepted', notes = CONCAT(notes, ' | Razorpay ID: ', %s)
            WHERE id = %s
            """,
            (payment_id, order_id),
        )
        connection.commit()
        return jsonify({"ok": True, "message": "Payment verified and saved"})
    except Error as exc:
        return jsonify({"ok": False, "error": str(exc)}), 500
    finally:
        if "cursor" in locals():
            cursor.close()
        if "connection" in locals() and connection.is_connected():
            connection.close()
@app.route("/api/customers", methods=["GET"])
def list_customers():
    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT 
                phone, 
                MAX(customer_name) as name, 
                MAX(address) as address, 
                COUNT(id) as total_orders, 
                SUM(total_amount) as total_spent, 
                MAX(created_at) as last_order_date
            FROM orders
            GROUP BY phone
            ORDER BY last_order_date DESC
            """
        )
        customers = cursor.fetchall()
        
        for customer in customers:
            customer["total_spent"] = str(customer["total_spent"])
            customer["last_order_date"] = customer["last_order_date"].isoformat(sep=" ", timespec="minutes")

        return jsonify({"ok": True, "customers": customers})
    except Error as exc:
        return jsonify({"ok": False, "error": str(exc)}), 500
    finally:
        if "cursor" in locals():
            cursor.close()
        if "connection" in locals() and connection.is_connected():
            connection.close()



@app.route("/<path:path>")
def public_files(path):
    file_path = os.path.join(PUBLIC_DIR, path)
    if os.path.isfile(file_path):
        return send_from_directory(PUBLIC_DIR, path)
    return send_from_directory(PUBLIC_DIR, "index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=False, use_reloader=False)
