# Day 5 Learning Log – JWT Storage, Cookies, LocalStorage & XSS

## Objective

The goal of Day 5 was to understand where JWTs can be stored inside the browser and the security implications of each storage mechanism.

I explored:

- LocalStorage-based authentication
- Cookie-based authentication
- XSS attacks
- HttpOnly cookies
- Token theft scenarios
- Security trade-offs

---

# Key Learning 1 – JWT Authentication Logic Does Not Change

One of the biggest realizations was:

```text
JWT Logic

↓

Does Not Change
```

Whether the JWT is stored in:

```text
LocalStorage

or

Cookies
```

the backend verification process remains almost identical.

The server still:

```text
Receive JWT

↓

Verify Signature

↓

Extract Claims

↓

Authenticate User
```

The difference is only:

```text
Where The JWT Comes From
```

---

# Key Learning 2 – LocalStorage Flow

LocalStorage authentication flow:

```text
Login

↓

Generate JWT

↓

Return JWT

↓

Store JWT In LocalStorage

↓

Future Request

↓

Read JWT

↓

Authorization Header

↓

Bearer Token

↓

Backend
```

The frontend is responsible for:

```text
Reading JWT

Attaching JWT

Sending JWT
```

The browser does not help.

---

# Key Learning 3 – Cookie Flow

Cookie-based authentication flow:

```text
Login

↓

Generate JWT

↓

Set-Cookie

↓

Browser Stores Cookie

↓

Future Request

↓

Browser Automatically Sends Cookie

↓

Backend
```

Unlike LocalStorage:

```text
No Authorization Header Needed
```

The browser automatically handles cookie transmission.

---

# Key Learning 4 – JWT Location Changed

In my Day 4 implementation:

```text
Authorization Header

↓

Bearer JWT
```

was used.

The JWT was extracted from:

```text
req.headers.authorization
```

---

In cookie-based authentication:

```text
JWT

↓

Cookie
```

The token is extracted from:

```text
req.cookies
```

instead of:

```text
req.headers.authorization
```

This was one of the most important implementation differences I noticed.

---

# Key Learning 5 – Same Verification Process

Even though storage changed:

```text
Header

↓

Cookie
```

JWT verification remained identical.

Flow:

```text
Get JWT

↓

jwt.verify()

↓

Valid?

↓

Authenticated
```

The storage mechanism changes.

The cryptographic verification does not.

---

# Key Learning 6 – Cookie Names Matter

Cookies are stored as:

```text
cookieName

↓

cookieValue
```

Example:

```text
token

↓

eyJ...
```

or

```text
jwt

↓

eyJ...
```

When reading cookies:

```text
req.cookies.cookieName
```

must match the cookie name used during creation.

The browser stores cookies as key-value pairs.

---

# Key Learning 7 – Browser Responsibility

A major difference:

## LocalStorage

```text
Frontend Reads JWT

↓

Frontend Sends JWT
```

---

## Cookies

```text
Browser Stores Cookie

↓

Browser Sends Cookie
```

This means:

```text
Less Manual Work
```

for authenticated requests.

---

# Key Learning 8 – XSS

I learned that XSS means:

```text
Attacker

↓

Inject JavaScript

↓

Runs In Victim Browser
```

The browser treats attacker JavaScript the same as legitimate JavaScript.

This makes XSS extremely dangerous.

---

# Key Learning 9 – LocalStorage Risk

JavaScript can access:

```text
LocalStorage
```

Therefore:

```text
Injected JavaScript

↓

Read JWT

↓

Steal JWT
```

This creates token theft risk.

---

# Key Learning 10 – HttpOnly

HttpOnly cookies prevent:

```text
JavaScript

↓

Reading Cookies
```

Flow:

```text
Cookie

↓

HttpOnly

↓

document.cookie

↓

Blocked
```

This was the main reason HttpOnly was created.

---

# Key Learning 11 – JWT Security vs JWT Theft

I learned that:

```text
JWT Signature
```

protects against:

```text
Modification

Forgery

Tampering
```

But does NOT protect against:

```text
Token Theft
```

A stolen JWT is still valid.

This was one of the most important security concepts of the day.

---

# Key Learning 12 – Authentication Security Mindset

When building authentication systems I should always ask:

```text
What if token is stolen?

What if XSS exists?

What if JavaScript is compromised?

What if cookie leaks?

What if secret key leaks?
```

Security is not about making things work.

Security is about thinking how things can fail.

---

# Final Understanding

At the end of Day 5, I can confidently explain:

- LocalStorage authentication
- Cookie authentication
- Authorization headers
- Automatic cookie transmission
- JWT storage strategies
- XSS fundamentals
- Token theft
- HttpOnly cookies
- Browser vs frontend responsibilities
- Authentication security trade-offs

The most important lesson from today was:

```text
JWT Signatures Protect Against Tampering.

HttpOnly Helps Protect Against Theft.
```

These are different security problems that require different protections.
