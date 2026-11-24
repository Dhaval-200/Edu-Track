#!/usr/bin/env bash
# ====================================================================
# Helper script to launch local MySQL server instance (port 3307)
# ====================================================================

DB_DIR="/tmp/sms-mysql-data"
SOCK="/tmp/sms-mysql.sock"
PORT=3307

if [ ! -d "$DB_DIR" ]; then
    echo "Initializing MySQL data directory at $DB_DIR..."
    mysqld --no-defaults --datadir="$DB_DIR" --log-error="$DB_DIR/error.log" --initialize-insecure
fi

# Check if already running
if nc -z 127.0.0.1 $PORT 2>/dev/null || ss -tln | grep -q ":$PORT "; then
    echo "MySQL is already running on port $PORT."
else
    echo "Starting MySQL daemon on port $PORT..."
    mysqld --no-defaults \
      --datadir="$DB_DIR" \
      --port=$PORT \
      --bind-address=127.0.0.1 \
      --mysqlx=0 \
      --socket="$SOCK" \
      --pid-file=/tmp/sms-mysql.pid \
      --log-error="$DB_DIR/error.log" &
    sleep 2
    echo "MySQL server started successfully on port $PORT."
fi
