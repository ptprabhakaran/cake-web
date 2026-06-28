# Azure Deployment

Use this app as a Python Flask app on Azure App Service for Linux.

## Files Azure Needs

- `app.py` exposes the Flask object as `app`, so Azure can start it with Gunicorn as `app:app`.
- `requirements.txt` contains Flask, MySQL connector, and Gunicorn.
- `startup.sh` contains the production startup command.
- `.env` and `.venv/` are ignored and should not be pushed to GitHub.

## GitHub Deployment Flow

1. Push this folder to a GitHub repository.
2. Create an Azure App Service using the Python Linux runtime.
3. In the App Service, open Deployment Center.
4. Choose GitHub, select the repo and branch, then save.
5. In Configuration > General settings, set Startup Command to:

```bash
startup.sh
```

Azure can also auto-detect this app and run:

```bash
gunicorn --bind=0.0.0.0 --timeout 600 app:app
```

## App Settings

Set these in Azure App Service > Configuration > Application settings:

```text
MYSQL_HOST=<azure-mysql-host>
MYSQL_PORT=3306
MYSQL_USER=<azure-mysql-user>
MYSQL_PASSWORD=<azure-mysql-password>
MYSQL_DATABASE=cake_theory
```

Do not put production values in `.env` or commit them to GitHub.

## Database

Create an Azure Database for MySQL Flexible Server, then run `schema.sql` against it once to create the `cake_theory` database and tables.

For local development, keep using:

```powershell
.\.venv\Scripts\python.exe app.py
```
