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

# CNAME
en.hk-hphi.com	cdn1.wixdns.net
m.hk-hphi.com	www129.wixdns.net
www.hk-hphi.com	cdn1.wixdns.net
zh.hk-hphi.com	cdn1.wixdns.net

# New backup script
D=$(date +%F_%H%M); OUT="/home/yamada/文件/hphi-backup-$D.zip"; TMP=$(mktemp -d) && \
mkdir -p /home/yamada/文件 && \
docker exec mongodb sh -c 'mongodump -u root -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin --db hphi-revamp --archive' > "$TMP/hphi-db.archive" && \
(cd /home/yamada/workspace/hphi/hphi-revamp/public && zip -rq "$OUT" media) && \
zip -qj "$OUT" "$TMP/hphi-db.archive" && \
rm -rf "$TMP" && \
ls -lh "$OUT" && unzip -l "$OUT" hphi-db.archive

# and unzip
docker exec -i mongodb sh -c 'mongorestore -u root -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin --archive' < hphi-db.archive
