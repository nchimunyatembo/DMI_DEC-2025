# petauke Leave Management System - Vercel Deployment Guide

## Prerequisites
- Vercel account (free at https://vercel.com)
- Git repository pushed to GitHub
- MySQL database accessible from Vercel (or use a managed service like PlanetScale, AWS RDS, or Vercel's database options)

## Deployment Steps

### 1. Prepare Environment Variables
Create a `.env.local` file (local) with:
```
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=petauke
DB_PORT=3306
```

### 2. Push to GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 3. Deploy to Vercel
1. Go to https://vercel.com/import
2. Select your GitHub repository
3. Add environment variables:
   - `DB_HOST`: Your database host
   - `DB_USER`: Your database username
   - `DB_PASSWORD`: Your database password
   - `DB_NAME`: `petauke`
   - `DB_PORT`: `3306`
4. Click "Deploy"

### 4. Configure Database
- Update `DB_HOST` in Vercel dashboard to your remote MySQL database
- Ensure database is accessible from Vercel (check firewall rules)
- Create `users` table by running `database.sql` on your remote database

### 5. Update Frontend API Calls
Before deployment, update `script.js` to use your Vercel domain:
- Change `/auth/register` → `/api/auth/register`
- Change `/auth/login` → `/api/auth/login`

### Project Structure
```
project/
├── public/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   └── leave.html
├── api/
│   └── auth/
│       └── index.js (serverless functions)
├── vercel.json
├── package.json
└── .env.local
```

## Important Notes
- Static files (HTML, CSS, JS) are served from the `public/` directory
- API routes run as serverless functions in the `api/` directory
- Database must be accessible from Vercel's IP range
- Keep `DB_PASSWORD` in environment variables, never commit to git

## Troubleshooting
- Check Vercel logs: `vercel logs <project-name>`
- Verify database connectivity: test from Vercel CLI
- CORS issues: Update allowed origins in headers if needed
