# example: mongodb://usr:pw@mongodb/db-name?authSource=admin
mongodump --uri="db-url" --out=/mnt/backups
zip -r ./hphi-revamp.zip ./hphi-revamp

git pull && nvm use && pnpm i && pnpm build && pm2 reload hphi-revamp
