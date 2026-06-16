# Day 2 - Basic Password Authentication (No JWT, No Sessions)

## Objective

Understand the complete authentication flow from first principles without relying on authentication libraries, JWTs, sessions, cookies, or OAuth.

The goal was to understand every step involved in securely storing and verifying passwords.

---

## Topics Covered

- Signup flow
- Login flow
- Logout (conceptual)
- Password hashing
- bcrypt
- Password verification
- Input validation
- Basic error handling
- Authentication flow design
- Security mindset

---

## Authentication Flow

```
User

↓

Enter Email + Password

↓

Server Receives Request

↓

Validate Input

↓

Check Existing User

↓

Hash Password (bcrypt)

↓

Store Password Hash

↓

User Created
```

---

## Login Flow

```
User

↓

Enter Email + Password

↓

Server Receives Request

↓

Validate Input

↓

Find User

↓

Retrieve Stored Hash

↓

bcrypt.compare()

↓

Password Match

↓

Login Successful
```

---

## Logout

At this stage, logout is only a conceptual operation.

Since no sessions or JWTs exist yet, there is no persistent authentication state to invalidate.

Logout functionality will become meaningful after implementing sessions or token-based authentication.

---

## Security Principles Learned

- Never store plaintext passwords.
- Always hash passwords before storing them.
- Never trust client input.
- Validate all incoming data.
- Never return password hashes in API responses.
- Password verification should use bcrypt.compare().
- Authentication should happen on the server.
- The client should never decide authentication state.

---

## Important Concepts Understood

### Password Hashing

```
Password

↓

bcrypt.hash()

↓

Password Hash

↓

Database
```

---

### Password Verification

```
Entered Password

↓

bcrypt.compare()

↓

Stored Hash

↓

Match?

↓

Authenticated
```

---

### Why bcrypt?

- Automatically generates a unique salt
- Protects against rainbow table attacks
- Intentionally slow
- Adjustable cost factor
- Designed specifically for password storage

---

## Error Handling Considered

- Missing email
- Missing password
- Invalid input
- Duplicate email
- Invalid credentials
- Internal server errors

---

## What Was NOT Used

- JWT
- Sessions
- Cookies
- OAuth
- Passport.js
- Clerk
- Auth0
- NextAuth
- Authentication middleware
- Refresh tokens

The focus was purely on understanding password-based authentication from first principles.

---

## Key Takeaways

- Authentication starts with proving identity.
- Passwords should never be stored directly.
- Hashes are stored instead of passwords.
- bcrypt.compare() verifies passwords without decrypting anything.
- Security starts with never trusting client input.
- Understanding the underlying flow is more important than using authentication libraries.

---

## Next Step

Persist users in a real database.

Target flow:

```
Signup

↓

Validate

↓

Check Existing User

↓

Hash Password

↓

Store Hash In Database

↓

Login

↓

Find User

↓

Retrieve Hash

↓

Compare Password

↓

Authenticated
```
