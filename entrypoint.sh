if [ ! -d "./prisma/migrations" ]; then
  echo "🔧 Migration bulunamadı, ilk kez başlatılıyor... init migrasyonu uygulanıyor."
  npx prisma migrate dev --name init
else
  echo "✅ Migration klasörü bulundu, atlanıyor."
fi

npx prisma generate

npm run dev
