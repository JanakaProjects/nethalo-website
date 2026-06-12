#!/bin/bash
# National Hate Crime - VPS Setup Script
# Run this on your GoDaddy VPS (Ubuntu/Debian)

set -e

echo "=== National Hate Crime VPS Setup ==="
echo ""

# 1. Update system
echo "[1/10] Updating system packages..."
apt update && apt upgrade -y

# 2. Install Node.js 22
echo "[2/10] Installing Node.js 22..."
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs

# 3. Install git
echo "[3/10] Installing git..."
apt install -y git

# 4. Install nginx
echo "[4/10] Installing Nginx..."
apt install -y nginx

# 5. Install certbot for SSL
echo "[5/10] Installing Certbot..."
apt install -y certbot python3-certbot-nginx

# 6. Install PM2
echo "[6/10] Installing PM2..."
npm install -g pm2

# 7. Clone the repo
echo "[7/10] Cloning repository..."
cd /opt
git clone https://github.com/JanakaProjects/nethalo-website.git
cd nethalo-website/nethalo-website

# 8. Install dependencies and build
echo "[8/10] Installing dependencies and building..."
npm install
npm run build
cd server
npm install

# 9. Start the server with PM2
echo "[9/10] Starting server..."
JWT_SECRET=$(openssl rand -hex 32) pm2 start --name national-hate-crime ../node_modules/.bin/tsx index.ts
pm2 save
pm2 startup

# 10. Configure Nginx
echo "[10/10] Configuring Nginx..."
cp ../../nginx.conf /etc/nginx/sites-available/national-hate-crime
sed -i 's/yourdomain.com/YOUR_DOMAIN/g' /etc/nginx/sites-available/national-hate-crime
ln -sf /etc/nginx/sites-available/national-hate-crime /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx

# Open firewall
ufw allow 80
ufw allow 443
ufw allow 3001

echo ""
echo "=== Setup Complete ==="
echo "1. Point your domain DNS (A record) to this server's IP"
echo "2. Run: certbot --nginx -d YOUR_DOMAIN -d www.YOUR_DOMAIN"
echo "3. Your site will be live at https://YOUR_DOMAIN"
echo ""
echo "Default login credentials:"
echo "  Student: student@nationalhatecrime.com / password123"
echo "  Parent:  parent@nationalhatecrime.com / password123"
echo "  Admin:   admin@nationalhatecrime.com / password123"
