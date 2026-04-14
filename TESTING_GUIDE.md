# Agrihar Blog — Website Testing Guide

> Assign to: Student Tester  
> Site: **http://localhost:3000** (frontend) · **http://localhost:5000** (backend)

---

## Before You Start

Make sure both servers are running:

| Server   | Command                          | Port  |
|----------|----------------------------------|-------|
| Backend  | `npm start` (in backend folder)  | 5000  |
| Frontend | `npm run dev` (in frontend folder)| 3000 |

Open **http://localhost:3000** in your browser.

---

## Credentials

### Super Admin
| Field    | Value               |
|----------|---------------------|
| Email    | `admin@agrihar.com` |
| Password | `test123`           |
| Login at | `/admin/login`      |

### Author (use any email — no password needed)
| Field | Value              |
|-------|--------------------|
| Email | any valid email    |
| Login at | `/author/login` |

---

## Test Flow 1 — Public Browsing

**Goal:** Verify the homepage and blog reading work correctly.

1. Go to `http://localhost:3000`
2. Check that the **Recent Articles** section loads blog cards
3. Click any blog card → should open the full blog at `/blog/[slug]`
4. Verify the blog shows: cover image, title, author name, date, content
5. Click **Back** → returns to home page
6. Click **View all** in the Recent Articles header → should open `http://localhost:3000/blog`
7. On the `/blog` page, try clicking the category filter buttons (Recent Blogs / Tech Farming / Government Schemes) → list should update
8. Click any article card from this page → should open correctly (no 404)

**Pass:** All articles open. No 404 errors. Category filters work.

---

## Test Flow 2 — Author Submits a Blog

**Goal:** Verify the author write → preview → submit flow.

1. Go to `http://localhost:3000/author/login`
2. Enter any email (e.g. `test@author.com`) and click **Send Access Link / Login**
3. You should land on the **Author Dashboard** at `/author`
4. Click **Write New Blog**
5. Fill in all fields:
   - Title: `Test Blog Post`
   - Subtitle: `A subtitle for testing`
   - Your Name: `Test Author`
   - Category: select any
   - LinkedIn: `https://linkedin.com/in/test`
   - Cover Image: upload any image
   - Content: write at least 3–4 lines of text
6. Click **Preview** → should navigate to `/author/preview` showing a styled blog preview
7. Click **Back to editor** → **verify all filled fields are still present** (this is the key test)
8. Make a small change (e.g. add a word to the title)
9. Click **Submit for Review**
10. Should redirect to author dashboard with a success message

**Pass:** Form data is preserved after preview. Blog is submitted without error.

---

## Test Flow 3 — Admin Moderates the Blog

**Goal:** Verify the admin can view, preview, approve, and reject blogs.

1. Go to `http://localhost:3000/admin/login`
2. Login with:
   - Email: `admin@agrihar.com`
   - Password: `test123`
3. You should land on the **Admin Dashboard** at `/admin`
4. Click **Moderation** (or go to `/admin/moderation`)
5. Verify the blog submitted in Flow 2 appears in the **Pending List**
6. Click **Full Preview →** next to the blog
7. Should open `/admin/moderation/preview` showing the full blog with cover image, content, author info
8. Verify the cover image is correct (not the body image)
9. Click **Approve** → should show success and redirect back to `/admin/moderation`
10. Verify the approved blog is no longer in the pending list

**Pass:** Blog appears in pending list. Full preview opens correctly. Approve works.

---

## Test Flow 4 — Approved Blog Appears Publicly

**Goal:** Verify an approved blog shows up on the site.

1. Go to `http://localhost:3000`
2. Scroll to **Recent Articles** — the blog approved in Flow 3 should now appear
3. Click it → should open the full blog page with no 404
4. Go to `http://localhost:3000/blog` → blog should also appear here

**Pass:** Approved blog is visible publicly within one page refresh.

---

## Test Flow 5 — Reject a Blog

**Goal:** Verify rejection flow with a message.

1. Submit another blog as an author (repeat Flow 2 steps 1–9)
2. Login as admin and go to `/admin/moderation`
3. Click **Full Preview →** on the new blog
4. Click **Reject** → a text box appears
5. Leave the message empty and click **Confirm Reject** → should show an error (message required)
6. Enter a rejection reason (e.g. `Content does not meet guidelines`) and click **Confirm Reject**
7. Should show success and redirect to `/admin/moderation`
8. Blog should no longer appear in the pending list

**Pass:** Empty rejection is blocked. Rejection with message works.

---

## Quick Checklist

| # | Test                                      | Pass / Fail |
|---|-------------------------------------------|-------------|
| 1 | Homepage loads with recent articles       |             |
| 2 | Blog cards link correctly (no 404)        |             |
| 3 | `/blog` page loads and filters work       |             |
| 4 | Author login works                        |             |
| 5 | Form data preserved after preview         |             |
| 6 | Blog submitted successfully               |             |
| 7 | Admin login works                         |             |
| 8 | Pending blog appears in moderation list   |             |
| 9 | Full preview shows correct cover image    |             |
|10 | Approve works and blog goes live          |             |
|11 | Reject without message is blocked         |             |
|12 | Reject with message works                 |             |

---

## Bugs? Note Down

For each bug, write:
- **Where:** which page / URL
- **What:** what went wrong
- **Steps:** how to reproduce it

---

*Agrihar Blog — Internal Testing Document*
