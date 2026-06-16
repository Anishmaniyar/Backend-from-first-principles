# Cookies

## What is a Cookie?

A cookie is a **small piece of data stored by the browser** that is automatically sent with future HTTP requests to the same server (subject to its rules and attributes).

A cookie is simply:

```
Key

↓

Value
```

Examples:

```
theme=dark

language=en

currency=INR

session=abc123xyz
```

Cookies themselves are **not authentication mechanisms** and are **not sessions**.

---

# Why Were Cookies Invented?

HTTP is stateless.

Every request is independent.

```
Request 1

↓

Server

↓

Response

--------------------

Request 2

↓

Server

↓

Response
```

Without cookies, browsers would have no standard mechanism to remember small pieces of information across requests.

Cookies provide persistent browser-side storage that can automatically accompany future requests.

---

# Purpose of Cookies

Cookies can be used to store:

- Theme preference
- Language preference
- Currency preference
- User preferences
- Shopping cart identifiers
- Session IDs
- Other small pieces of data

Example:

```
theme=dark

language=en

currency=INR

session=abc123xyz
```

---

# A Cookie is NOT a Session

This is one of the most important concepts.

## ❌ Wrong

```
Cookie

↓

Session
```

---

## ✅ Correct

```
Cookie

↓

Stores Session ID

↓

Session ID

↓

Server

↓

Session Store

↓

User Data
```

A cookie simply transports or stores information.

The actual session lives on the server.

---

# Who Creates a Cookie?

Typically, the server creates the cookie.

Flow:

```
Browser

↓

Request

↓

Server

↓

Set-Cookie Header

↓

Browser Stores Cookie
```

The browser usually does not invent cookies on its own.

The server instructs the browser to store them.

---

# How Does the Server Create a Cookie?

The server sends an HTTP response containing a `Set-Cookie` header.

Conceptually:

```
HTTP Response

↓

Set-Cookie

↓

session=abc123xyz
```

The browser receives this response and stores the cookie automatically.

(The `Set-Cookie` header is covered in detail later.)

---

# Who Stores Cookies?

Cookies are stored by the browser.

Examples:

- Chrome
- Firefox
- Safari
- Edge

Conceptually:

```
Browser

↓

Cookie Storage

↓

theme=dark

language=en

session=abc123xyz
```

---

# Who Sends Cookies?

The browser automatically sends applicable cookies with future requests.

```
Server

↓

Set-Cookie

↓

Browser Stores Cookie

======================

Future Request

↓

Browser Automatically Sends Cookie

↓

Server
```

Developers usually do not manually attach cookies to every request.

---

# Automatic Browser Behavior

Example:

Server response:

```
Set-Cookie:

session=abc123xyz
```

Browser stores:

```
session=abc123xyz
```

Future request:

```
GET /profile

Cookie:

session=abc123xyz
```

The browser automatically includes the cookie when making requests.

---

# Cookies in Session-Based Authentication

A very common use of cookies is storing a Session ID.

Example:

```
User

↓

Login

↓

Authenticate

↓

Generate Session ID

↓

Store Session

↓

Set-Cookie

session=abc123xyz

↓

Browser Stores Cookie

===========================

Future Request

↓

Cookie

session=abc123xyz

↓

Server

↓

Lookup Session

↓

Authenticated
```

Notice:

The cookie does **not** contain the user object.

It usually contains only the Session ID.

---

# Can Cookies Store Anything?

Technically, cookies store key-value pairs.

Examples:

```
theme=dark

language=en

currency=INR

session=abc123xyz
```

However, just because something can be stored does not mean it should be stored.

---

# Should Sensitive Data Be Stored in Cookies?

Generally, **no**.

Avoid storing:

- Plaintext passwords
- Account balances
- Roles
- Permissions
- Secret information
- Sensitive business data

Example (bad):

```
password=hello123

role=admin

balance=500000
```

Users may inspect or modify cookies.

Sensitive information should remain on the server.

---

# Who Owns the Cookie?

The browser owns and stores cookies.

Users can often:

- View cookies
- Delete cookies
- Modify cookies
- Copy cookies

Developers should never blindly trust cookie contents.

---

# Can Users Modify Cookies?

Yes.

For example:

Original:

```
theme=dark
```

Modified:

```
theme=light
```

No issue.

However:

Original:

```
role=user
```

Modified:

```
role=admin
```

If the backend trusts this value, it creates a serious security vulnerability.

---

# Never Trust Cookie Contents

Cookies are client-side data.

Treat them exactly like:

- Request body
- Query parameters
- URL parameters
- Headers

Everything coming from the client should be considered untrusted until verified.

---

# Browser DevTools

Cookies can be inspected through browser developer tools.

Example:

```
Developer Tools

↓

Application

↓

Cookies
```

You can observe:

- Name
- Value
- Domain
- Path
- Expiration
- HttpOnly
- Secure
- SameSite

You can also experiment by deleting cookies and observing application behavior.

---

# Relationship Between Cookies and Sessions

```
Browser

↓

Cookie

↓

Session ID

↓

Server

↓

Session Store

↓

User Object

↓

Authenticated
```

Cookies do not replace sessions.

Cookies often carry the Session ID that allows the server to locate the corresponding session.

---

# Common Misconceptions

## ❌ Cookie = Session

False.

A cookie is browser storage.

A session is server-side state.

---

## ❌ Cookies automatically provide authentication

False.

Cookies simply store and transport data.

Authentication logic happens on the server.

---

## ❌ Cookies are encrypted

False.

Cookies are not automatically encrypted.

Security depends on how they are configured and used.

---

## ❌ Users cannot modify cookies

False.

Users can inspect and modify many cookies.

Never trust client-controlled data.

---

## ❌ Passwords should be stored in cookies

False.

Passwords should never be stored in cookies.

---

# Key Takeaways

- Cookies are small pieces of browser-managed storage.
- Cookies store key-value pairs.
- Browsers automatically send cookies with future requests.
- Servers usually create cookies using the `Set-Cookie` header.
- Cookies are not sessions.
- Cookies commonly store Session IDs in session-based authentication.
- Sensitive information should not be stored in cookies.
- Users can inspect and modify cookies.
- Cookie contents should never be blindly trusted.
- Authentication state should remain under server control.

---

# Easy Memory Trick

```
Server

↓

Set-Cookie

↓

Browser Stores Cookie

↓

Future Request

↓

Browser Sends Cookie

↓

Server Reads Cookie

↓

Find Session

↓

Authenticated
```

---

# One-Line Summary

A cookie is a small browser-managed key-value storage mechanism that is automatically sent with future requests and is commonly used to carry a Session ID, while the actual authentication state and user data remain securely stored on the server.
