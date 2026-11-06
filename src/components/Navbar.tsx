"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const linkClass =
    "block rounded-lg px-3 py-2 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600";

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="text-2xl font-bold text-gray-900"
        >
          Book<span className="text-blue-600">Nook</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 lg:flex">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>

          <Link href="/books" className="text-gray-700 hover:text-blue-600">
            All Books
          </Link>

          <Link href="/add-book" className="text-gray-700 hover:text-blue-600">
            Add Book
          </Link>

          <Link href="/my-books" className="text-gray-700 hover:text-blue-600">
            My Books
          </Link>

          <Link href="/my-borrows" className="text-gray-700 hover:text-blue-600">
            My Borrows
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Login & Register */}
          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href="/login"
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border text-xl text-gray-700 hover:bg-gray-100 lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t bg-white px-4 py-4 shadow-md lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">

            <Link href="/" onClick={closeMenu} className={linkClass}>
              Home
            </Link>

            <Link href="/books" onClick={closeMenu} className={linkClass}>
              All Books
            </Link>

            <Link href="/add-book" onClick={closeMenu} className={linkClass}>
              Add Book
            </Link>

            <Link href="/my-books" onClick={closeMenu} className={linkClass}>
              My Books
            </Link>

            <Link href="/my-borrows" onClick={closeMenu} className={linkClass}>
              My Borrows
            </Link>

            <Link href="/login" onClick={closeMenu} className={linkClass}>
              Login
            </Link>

            <Link href="/register" onClick={closeMenu} className={linkClass}>
              Register
            </Link>

          </div>
        </div>
      )}
    </header>
  );
}