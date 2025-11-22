# petauke Leave Management System

A leave management system for petauke district health office, built with Node.js, Express, and MySQL.

## Features
- User registration and authentication
- Secure password hashing with bcryptjs
- Leave application form
- Session management with localStorage
- Responsive design
- Protected routes (leave page requires login)

## Local Development

### Prerequisites
- Node.js 18.x or higher
- MySQL database
- npm

### Installation
1. Clone the repository:
```bash
git clone <your-repo-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with database credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=petauke
DB_PORT=3306
PORT=4500
```

4. Create the database and users table:
```bash
mysql -u root -p petauke < database.sql
```

5. Start the development server:
```bash
npm run dev
```

6. Open http://localhost:4500 in your browser

## Project Structure
```
project/
├── public/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   └── leave.html
├── api/
│   └── auth/
│       └── index.js (Vercel serverless functions)
├── config/
│   └── db.js (database configuration)
├── controllers/
│   └── authController.js (authentication logic)
├── routes/
│   └── auth.js (API routes)
├── index.js (main server file)
├── script.js (client-side logic)
├── package.json
├── vercel.json (Vercel configuration)
└── database.sql (database schema)
```

## Deployment to Vercel

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for step-by-step deployment instructions.

### Quick Deploy
```bash
npm install -g vercel
vercel
```

Then add environment variables in Vercel dashboard:
- DB_HOST
- DB_USER
- DB_PASSWORD
- DB_NAME
- DB_PORT

## API Endpoints

### Authentication
- `POST /auth/register` or `/api/auth/register` - Register a new user
- `POST /auth/login` or `/api/auth/login` - Login user

### Pages
- `GET /` - Homepage
- `GET /login` - Login page
- `GET /register` - Registration page
- `GET /Leave` - Leave application form (requires authentication)

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: bcryptjs
- **Frontend**: HTML, CSS, JavaScript
- **Deployment**: Vercel

## License
ISC

## Author
petauke district health office