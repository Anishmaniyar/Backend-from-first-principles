# XSS (Cross-Site Scripting) Fundamentals

## Introduction

Cross-Site Scripting (XSS) is one of the most common web application vulnerabilities.

XSS occurs when an attacker manages to execute their own JavaScript code inside another user's browser.

The browser cannot distinguish between:

```text
Your JavaScript

↓

Trusted
```

and

```text
Attacker JavaScript

↓

Also Trusted
```

Once the attacker's code is running inside the victim's browser, it gains access to everything that normal JavaScript can access.

This is why XSS is extremely dangerous.

---

# What Is XSS?

XSS stands for:

```text
Cross-Site Scripting
```

Definition:

> XSS is a vulnerability that allows attackers to inject and execute JavaScript inside another user's browser.

Mental model:

```text
Attacker

↓

Inject JavaScript

↓

Victim Loads Website

↓

Browser Executes Script

↓

Attack Successful
```

---

# Why Does XSS Exist?

XSS exists when applications fail to properly handle user-controlled input.

Example:

```text
Comment Box

↓

User Input

↓

Website Displays Input

↓

Browser Executes Input
```

Instead of treating the input as text, the browser may treat it as executable JavaScript.

---

# The Core Problem

The browser trusts JavaScript running on a page.

Example:

```text
Website JavaScript

↓

Trusted

--------------------

Attacker JavaScript

↓

Also Trusted
```

The browser does not know which script belongs to the developer and which belongs to the attacker.

---

# What Is Injected JavaScript?

Injected JavaScript is malicious code inserted by an attacker.

Example mentally:

```text
Attacker

↓

Adds Script

↓

Victim Visits Page

↓

Script Executes
```

The script runs with the same permissions as the legitimate website.

---

# Mental Model

```text
Attacker

↓

Inject Script

↓

Website Stores Script

↓

Victim Opens Website

↓

Browser Executes Script

↓

Attacker Gains Access
```

---

# Why Is XSS Dangerous?

Because JavaScript can access many things.

Examples:

```text
Page Content

Forms

LocalStorage

SessionStorage

User Input

API Requests

DOM
```

If attackers gain JavaScript execution:

```text
They Gain Access To Everything JavaScript Can Access
```

---

# What Can JavaScript Access?

JavaScript can typically access:

```text
LocalStorage

SessionStorage

HTML Content

Input Fields

API Responses

Cookies (sometimes)
```

---

# What Can JavaScript NOT Access?

When properly configured:

```text
HttpOnly Cookies
```

cannot be read.

Example:

```text
JavaScript

↓

Read HttpOnly Cookie

↓

Blocked
```

This becomes important later.

---

# Real-World Attack Flow

```text
Attacker

↓

Injects Script

↓

Victim Visits Website

↓

Script Executes

↓

Reads Sensitive Data

↓

Sends Data To Attacker
```

---

# Why Authentication Systems Care About XSS

Authentication systems often store:

```text
JWT

Session Information

User Data
```

inside the browser.

If JavaScript can access those values:

```text
Attacker Script

↓

Can Access Them Too
```

---

# XSS Security Principle

Never assume:

```text
JavaScript Running On Page

↓

Safe
```

Assume:

```text
If XSS Exists

↓

Attacker Can Execute JavaScript
```

---

# Common Misconceptions

## ❌ XSS Only Affects Small Websites

False.

Even large applications can have XSS vulnerabilities.

---

## ❌ XSS Is Only About Popups

False.

Popups are often used for demonstrations.

Real attacks focus on:

```text
Token Theft

Account Takeover

Data Theft
```

---

## ❌ XSS Means Server Is Hacked

False.

The attack happens inside the victim's browser.

---

## ❌ Browsers Can Detect All XSS

False.

Preventing XSS is primarily the developer's responsibility.

---

# Key Takeaways

- XSS stands for Cross-Site Scripting.
- XSS allows attackers to execute JavaScript in another user's browser.
- Browsers trust JavaScript running on the page.
- Injected scripts gain the same permissions as legitimate scripts.
- XSS can expose LocalStorage, SessionStorage, forms, and page content.
- XSS is especially dangerous for authentication systems.
- HttpOnly cookies help reduce XSS-related token theft.

---

# One-Line Summary

XSS is a vulnerability that allows attackers to execute malicious JavaScript inside a victim's browser, giving them access to anything that normal JavaScript can access and making it one of the most dangerous threats to browser-based authentication systems.
