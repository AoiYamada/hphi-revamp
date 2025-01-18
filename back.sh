# example: mongodb://usr:pw@mongodb/db-name?authSource=admin
rm -rf hphi-revamp-back && mv hphi-revamp hphi-revamp-back
mongodump --uri="db-url" --out=/mnt/backups
rm ./hphi-revamp-back.zip && mv ./hphi-revamp.zip ./hphi-revamp-back.zip
zip -r ./hphi-revamp.zip ./hphi-revamp
zip -r ../hphi-media.zip ./public/media -x "*.mp4"

git pull && nvm use && pnpm i && pnpm build && pm2 reload hphi-revamp

# dns records backup
hk-hphi.com	185.230.63.171
hk-hphi.com	185.230.63.186
hk-hphi.com	185.230.63.107
