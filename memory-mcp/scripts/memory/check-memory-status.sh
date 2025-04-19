#!/bin/bash

# Config
MEMORY_PORT=3100
MEMORY_PID_FILE="$HOME/.memory-service.pid"

# Check if process exists
if [ -f "$MEMORY_PID_FILE" ]; then
  pid=$(cat "$MEMORY_PID_FILE")
  if ps -p "$pid" > /dev/null; then
    echo "Memory service is running with PID: $pid"
  else
    echo "Memory service is not running (stale PID file)"
    exit 1
  fi
else
  echo "Memory service is not running (no PID file)"
  exit 1
fi

# Check if port is in use
if lsof -i:$MEMORY_PORT -sTCP:LISTEN > /dev/null; then
  echo "Memory service is listening on port $MEMORY_PORT"
else
  echo "Memory service is not listening on port $MEMORY_PORT"
  exit 1
fi

# Test API response
response=$(curl -s http://localhost:$MEMORY_PORT)
if [ $? -eq 0 ]; then
  echo "Memory service is responding to requests"
  echo "Response: $response"
  exit 0
else
  echo "Memory service is not responding to requests"
  exit 1
fi