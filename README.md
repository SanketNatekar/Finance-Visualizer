📊 Finance Visualizer
A Next.js application to track transactions, manage categories, and set budgets — backed by MongoDB Atlas.

🚀 Features
💵 Transactions: Create, update, delete transactions with amount and date.

🏷️ Categories: Organize transactions into customizable categories.

📈 Budgets: Set monthly budgets and monitor spending.

📊 Dashboard: Visual summary of your current month's activity.

🛠️ Technologies Used
Frontend: Next.js, TypeScript

Backend: Node.js API Routes

Database: MongoDB Atlas

Styling: Tailwind CSS 


⚙️ Getting Started
1. Clone the repository
git clone https://github.com/SanketNatekar/finance-visualizer.git
cd finance-visualizer

2. Install dependencies
npm install
# or
yarn install

3. Set up Environment Variables
Create a .env.local file in the root:

MONGODB_URI="your-mongodb-atlas-connection-string"

Example:
MONGODB_URI="mongodb+srv://finance_user:password@cluster0.mongodb.net/finance_visualizer?retryWrites=true&w=majority"

4. Run the development server
npm run dev
# or
yarn dev

Visit http://localhost:3000 to view the app.
