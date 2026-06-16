# Day 2 Learnings

## Things I Understand

- Basic signup flow
- Basic login flow
- Why hashing exists
- Why plaintext passwords should never be stored
- bcrypt hashing
- bcrypt.compare()
- Salt (high level)
- Server-side validation
- Basic authentication flow
- Security mindset

## Biggest Insights

- Passwords are never decrypted.
- The server compares hashes instead.
- bcrypt automatically handles salting.
- Authentication is simply proving identity.
- The backend should never trust client input.
- Frameworks hide complexity but do not replace understanding.

## Things I Still Need To Learn

- Database integration
- Sessions
- Cookies
- express-session
- Redis session storage
- JWT
- Refresh tokens
- OAuth
- RBAC
- MFA
