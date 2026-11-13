# 📚 BookNook — A Small Online Library

BookNook is a modern online library management application where readers can explore books, borrow their favorite books, manage their personal book collection, and return borrowed books.

The platform provides a simple and user-friendly experience for discovering and managing books.

## 🌐 Live Website

**Live Link:** https://b14-booknook-client.vercel.app

**Frontend Repository:** https://github.com/dhsamrat/b14-booknook-client

**Backend Repository:** https://github.com/dhsamrat/b14-booknook-server

## ✨ Key Features

- **User Authentication:** Secure registration and login using Better Auth with Google authentication support.
- **Browse Books:** Explore the complete book collection with book details.
- **Latest Books:** Discover the newest books added to the library.
- **Add Books:** Authenticated users can add new books with title, author, category, image, and description.
- **Manage My Books:** Users can view, edit, and delete books they have added.
- **Borrow Books:** Logged-in users can borrow available books by selecting borrowing and return dates.
- **My Borrowed Books:** View all borrowed books in one place.
- **Return Books:** Return borrowed books and automatically update available copies.
- **Book Availability:** Track total copies and available copies of each book.
- **Responsive Design:** Optimized layouts for mobile, tablet, and desktop devices.

## 🛠️ Technologies Used

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Better Auth
- Lucide React
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Better Auth JWT Plugin

### Deployment
- Vercel

## 📂 Project Structure

```text
b14-booknook-client/
├── public/
├── src/
│   ├── app/
│   │   ├── all-books/
│   │   ├── add-book/
│   │   ├── login/
│   │   ├── register/
│   │   ├── profile/
│   │   ├── my-books/
│   │   ├── my-borrows/
│   │   └── page.tsx
│   ├── components/
│   └── lib/
├── .env.local
├── package.json
└── README.md
```

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/dhsamrat/b14-booknook-client.git
```

### 2. Navigate to the Project Folder

```bash
cd b14-booknook-client
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
NEXT_PUBLIC_API_URL=your_backend_api_url
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Replace the placeholder values with your actual configuration. Never commit secret keys or credentials to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

## 🔐 Authentication

BookNook uses Better Auth for authentication.

- Email and password authentication.
- Google OAuth authentication.
- Protected routes for authenticated users.
- JWT-based API authorization.

## 📖 Main Application Routes

| Route | Description |
|---|---|
| `/` | Homepage |
| `/all-books` | Browse all books |
| `/all-books/[id]` | Book details |
| `/add-book` | Add a new book |
| `/my-books` | Manage added books |
| `/my-borrows` | Manage borrowed books |
| `/profile` | User profile |
| `/login` | User login |
| `/register` | User registration |

## 👨‍💻 Developer

**Delowar Hossain Samrat**

- GitHub: https://github.com/dhsamrat

---

⭐ If you find this project interesting, feel free to explore the repository and its features!

**BookNook — Discover, Borrow, and Read.**
