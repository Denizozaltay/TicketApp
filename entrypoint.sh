set -e

echo "🔄 Waiting for the database to be ready..."
wait-for-it ticket-db-dev:5432 -t 60

echo "🔧 Generating Prisma client..."
npx prisma generate

if [ ! -d "./prisma/migrations" ] || [ -z "$(ls -A ./prisma/migrations 2>/dev/null)" ]; then
  echo "🔧 No migration found or folder is empty, starting for the first time... applying init migration."
  npx prisma migrate dev --name init
else
  echo "✅ Migration folder found. Applying pending migrations..."
  npx prisma migrate deploy
fi

echo "🚀 Starting the application..."
exec npm run dev
