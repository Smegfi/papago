# Praha 10 - Papago

Aplikace pro evidenci a správu teplotních čidel papago.

# How to run
## Development
Ve vývojovém prostředí je nejdříve potřeba vytvořit databázi, postačí nám čistá instance PostgreSQL.
Druhým korem je nastavit .env soubor, do kterého je potřeba vložit connection string k databázi.
Například:
```
DATABASE_URL="postgresql://{username}:{password}@{database_host}:5432/{database_name}"
```

Pak je potřeba spustit migraci pomocí:
```bash
npx drizzle-kit push
```

Následně je již možné zapnout vývojový server:
```bash
npm run dev
```

## Deployment

Deploment probíhá pomocí Coolify platformy, která se stará o deployment, monitorování a další.
Coolify je přístpuny v interní sítí nebo pomocí VPN.
http://10.41.172.109:8000/

V prostředí coolify je nutno nejdříve vyrobit instanci PostgreSQL a poté obdobně 
jako v vývojovém prostředí nastavit environment proměnné:
```
DATABASE_URL="postgresql://{username}:{password}@{database_host}:5432/{database_name}"
```
