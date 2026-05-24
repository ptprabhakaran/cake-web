# The Cake Theory Backend Setup

This adds a Python Flask checkout API with MySQL order storage.

## Project Structure

```text
app.py                Python Flask backend
init_db.py            Creates MySQL tables from schema.sql
schema.sql            MySQL database schema
requirements.txt      Python packages for Railway/local setup
public/               HTML pages
static/css/           CSS files
static/js/            JavaScript files
static/assets/        Images and uploaded assets
```

## 1. Install Python Packages

From this folder:

```powershell
pip install -r requirements.txt
```

## 2. Check MySQL Login

MySQL settings are stored in `.env`.

Do not share this file publicly because it contains your local database password.

## 3. Create MySQL Database and Tables

Make sure MySQL is running, then run:

```powershell
python init_db.py
```

## 4. Start the Server

```powershell
python app.py
```

Then open:

```text
http://127.0.0.1:5000
```

Use the website from this local server, not by double-clicking `index.html`, for the smoothest checkout flow.

## Railway Notes

Set these environment variables in Railway:

```text
MYSQL_HOST=
MYSQL_PORT=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
```

Railway can run the app with:

```text
python app.py
```

## API

- `POST /api/orders` creates an order.
- `GET /api/orders` lists orders for the admin panel.
