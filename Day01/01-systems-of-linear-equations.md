# 01 — Systems of Linear Equations

> **Reference (MML):** Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, **§2.1** — *Systems of Linear Equations*.

---

## Why learn this?

Almost every “linear” piece of machine learning—**fitting coefficients**, **solving constraints**, **inverting** normal equations—starts as a **system of linear equations** or an equivalent matrix form. If you cannot read $A\mathbf{x}=\mathbf{b}$, you cannot see what your solver is doing.

**Where it is used (applications):**

- **Linear / ridge regression:** normal equations and least-squares solutions are linear systems.
- **Neural networks:** each layer’s pre-activation is a matrix–vector product; batching stacks systems.
- **Optimization:** KKT systems, Newton linear subproblems, and many iterative methods reduce to solving linear systems each step.
- **Computer graphics & robotics:** transformations and constraints are linear systems in disguise.

---

## Overview

A **system of linear equations** is the problem of finding numbers $x_1, x_2, \ldots, x_n$ that satisfy **several linear equations simultaneously**. This is one of the central objects of linear algebra and appears constantly in machine learning whenever you see a **matrix–vector equation** $A\mathbf{x} = \mathbf{b}$ (least squares, linear layers, constraints).

---

## 1. What is a linear equation?

A single **linear equation** in $n$ unknowns has the form

$$
a_1 x_1 + a_2 x_2 + \cdots + a_n x_n = b,
$$

where $a_1,\ldots,a_n$ and $b$ are given real numbers.

**“Linear” means:**

- Each variable $x_j$ appears only to the **first power**.
- There are **no products** like $x_1 x_2$, no $\sin(x_1)$, no $e^{x_1}$.

**Why this matters for ML:** Many models (linear regression before nonlinear activations, first-order approximations) are built from expressions that are **linear in parameters** or in features, which leads directly to systems of this form.

---

## 2. A system: many equations at once

A **system** collects several such equations that must **all** hold:

$$
\begin{aligned}
a_{11}x_1 + \cdots + a_{1n}x_n &= b_1, \\
a_{21}x_1 + \cdots + a_{2n}x_n &= b_2, \\
&\vdots \\
a_{m1}x_1 + \cdots + a_{mn}x_n &= b_m.
\end{aligned}
$$

You seek one vector $\mathbf{x} = (x_1,\ldots,x_n)^\top$ that satisfies **every** row.

---

## 3. Worked example: $2 \times 2$ system

Find $x, y \in \mathbb{R}$ such that

$$
\begin{cases}
2x + y = 5, \\
x - y = 1.
\end{cases}
$$

**Step 1 — Eliminate $y$ by adding the two equations:**

$$
(2x + y) + (x - y) = 5 + 1
\quad\Rightarrow\quad
3x = 6
\quad\Rightarrow\quad
x = 2.
$$

**Step 2 — Substitute $x = 2$ into $x - y = 1$:**

$$
2 - y = 1
\quad\Rightarrow\quad
y = 1.
$$

**Verification:**

$$
2(2) + 1 = 5, \qquad 2 - 1 = 1.
$$

So the **unique solution** is $(x,y) = (2,1)$.

**Geometry:** In the $(x,y)$-plane, each equation describes a **straight line**. The solution is the **intersection point** of those two lines (here, a single point).

---

## 4. Matrix form: $A\mathbf{x} = \mathbf{b}$

The same system can be written compactly as

$$
\underbrace{\begin{bmatrix} 2 & 1 \\ 1 & -1 \end{bmatrix}}_{A}
\underbrace{\begin{bmatrix} x \\ y \end{bmatrix}}_{\mathbf{x}}
=
\underbrace{\begin{bmatrix} 5 \\ 1 \end{bmatrix}}_{\mathbf{b}}.
$$

- **Rows of $A$** correspond to **equations**.
- **Columns of $A$** show how each **unknown** contributes to each equation.
- **$\mathbf{b}$** lists the **right-hand sides**.

This notation is the standard language of *Mathematics for Machine Learning* and of most ML implementations.

---

## 5. What kinds of solutions exist?

For a **square** system ($m = n$), exactly one of the following typically happens:

| Case | Meaning (informal) |
|------|-------------------|
| **Unique solution** | Equations are consistent and independent (in 2D: two lines meet at one point). |
| **No solution** | Inconsistent equations (in 2D: parallel distinct lines). |
| **Infinitely many solutions** | Redundant dependent equations (in 2D: same line twice; in 3D: two planes may meet in a line). |

Later notes (**03**, **06**) connect this to **elimination**, **rank**, and **invertibility** of $A$.

---

## 6. Example: inconsistent system (no solution)

Consider

$$
\begin{cases}
x + y = 2, \\
x + y = 3.
\end{cases}
$$

Subtracting gives $0 = 1$, which is **impossible**. There is **no** $(x,y)$ satisfying both equations.

In applications, inconsistency often means your **constraints** or **measurements** contradict each other; in ML, you may instead **approximate** (least squares) rather than solve exactly.

---

## Additional solved examples

*(Problems in the spirit of Chapter 2, §2.1 of MML.)*

### Example A — Unique solution by substitution ($2 \times 2$)

Solve

$$
\begin{cases}
3x + 2y = 8, \\
x - y = 1.
\end{cases}
$$

**Step 1.** From the second equation, $x = y + 1$.

**Step 2.** Substitute into the first:

$$
3(y+1) + 2y = 8
\;\Rightarrow\;
3y + 3 + 2y = 8
\;\Rightarrow\;
5y = 5
\;\Rightarrow\;
y = 1.
$$

**Step 3.** Then $x = y + 1 = 2$.

**Check:** $3(2) + 2(1) = 8$ and $2 - 1 = 1$. **Solution:** $(x,y) = (2,1)$.

---

### Example B — Infinitely many solutions

$$
\begin{cases}
x + 2y = 4, \\
2x + 4y = 8.
\end{cases}
$$

The second equation is **twice** the first, so there is only **one** independent equation. From $x + 2y = 4$, write $x = 4 - 2y$ with $y \in \mathbb{R}$ free. **Solution set:**

$$
(x,y) = (4 - 2t,\, t), \quad t \in \mathbb{R}.
$$

In matrix form $A\mathbf{x}=\mathbf{b}$ with $A=\begin{bmatrix}1&2\\2&4\end{bmatrix}$, $\mathbf{b}=\begin{bmatrix}4\\8\end{bmatrix}$, the two rows are dependent, so **rank** $< 2$ and there are infinitely many solutions.

---

### Example C — Matrix form and multiplication check

The system

$$
\begin{cases}
x + y = 3, \\
2x - y = 0
\end{cases}
$$

is $A\mathbf{x}=\mathbf{b}$ with

$$
A = \begin{bmatrix} 1 & 1 \\ 2 & -1 \end{bmatrix},\quad
\mathbf{x} = \begin{bmatrix} x \\ y \end{bmatrix},\quad
\mathbf{b} = \begin{bmatrix} 3 \\ 0 \end{bmatrix}.
$$

Solving: from the second equation $y = 2x$, plug into the first: $x + 2x = 3 \Rightarrow x = 1$, $y = 2$. Verify:

$$
\begin{bmatrix} 1 & 1 \\ 2 & -1 \end{bmatrix}
\begin{bmatrix} 1 \\ 2 \end{bmatrix}
=
\begin{bmatrix} 1+2 \\ 2-2 \end{bmatrix}
=
\begin{bmatrix} 3 \\ 0 \end{bmatrix}.
$$

---

## 7. Summary

1. A **linear system** ties several **first-degree** equations to the **same** unknowns.
2. The compact form $A\mathbf{x} = \mathbf{b}$ is the matrix language used throughout MML.
3. Solutions can be **unique**, **absent**, or **infinite**; the structure of $A$ and $\mathbf{b}$ determines which case occurs.

---

*Practice with Chapter 2 exercises in the textbook to build fluency moving between equations and $A\mathbf{x}=\mathbf{b}$.*
