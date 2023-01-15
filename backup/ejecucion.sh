#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" < respaldo.sql