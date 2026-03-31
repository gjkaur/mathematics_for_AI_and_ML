# 03 — Solving Systems of Linear Equations

> **Reference (MML):** Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, **§2.3** — *Solving Systems of Linear Equations*.

---

## Why learn this?

Training often requires **solving** or **repeatedly approximately solving** linear systems (normal equations, Newton steps, interior-point methods). Understanding **elimination**, **rank**, and **when a unique solution exists** prevents black-box confusion and bad conditioning.

**Where it is used (applications):**

- **Least squares / ridge:** $(X^\top X + \lambda I)\mathbf{w} = X^\top \mathbf{y}$ (structure of a linear system).
- **Kalman filtering / Gaussian models:** updates involve solving linear systems or equivalently matrix inversion.
- **Constrained optimization (SVM, QP):** KKT linear systems at each iteration.
- **Scientific computing:** LU/Cholesky factorization (implementation of “solving”) underlies most numerical linear algebra.

---

## Overview

Given $A \in \mathbb{R}^{m \times n}$ and $\mathbf{b} \in \mathbb{R}^m$, we want all $\mathbf{x} \in \mathbb{R}^n$ such that


```math
A\mathbf{x} = \mathbf{b}.

```


The textbook emphasizes **Gaussian elimination**, **row echelon form (REF)**, **reduced row echelon form (RREF)**, and—when $m = n$ and $A$ is invertible—the **inverse matrix** $A^{-1}$.

---

## 1. Gaussian elimination (main idea)

Form the **augmented matrix** $[A \mid \mathbf{b}]$. Apply **elementary row operations**:

1. Swap two rows.
2. Multiply a row by a **nonzero** scalar.
3. Add a multiple of one row to another.

These operations **do not change** the set of vectors $\mathbf{x}$ that satisfy the system.

You reduce $[A \mid \mathbf{b}]$ to **row echelon form** or **reduced row echelon form**, then **back-substitute** to read off $x_1,\ldots,x_n$ (or parametrize free variables if there are infinitely many solutions).

---

## 2. Worked example: $3 \times 3$ system

Solve


```math
\begin{cases}
x + y + z = 6, \\
2x - y + z = 3, \\
x + 2y - z = 2.
\end{cases}

```


**Augmented matrix:**


```math
\left[\begin{array}{ccc|c}
1 & 1 & 1 & 6 \\
2 & -1 & 1 & 3 \\
1 & 2 & -1 & 2
\end{array}\right].

```


**Step 1 — Clear below the first pivot:**  
$R_2 \leftarrow R_2 - 2R_1$, $R_3 \leftarrow R_3 - R_1$:


```math
\left[\begin{array}{ccc|c}
1 & 1 & 1 & 6 \\
0 & -3 & -1 & -9 \\
0 & 1 & -2 & -4
\end{array}\right].

```


**Step 2 — Continue elimination** (swap rows if convenient, eliminate second column, etc.). After completing elimination and back substitution (full steps in the textbook), one obtains the **unique** solution


```math
x = 1, \quad y = 2, \quad z = 3.

```


**Check:**


```math
1+2+3=6,\quad 2(1)-(2)+3=3,\quad 1+2(2)-3=2.

```


---

## 3. Square systems: $\mathbf{x} = A^{-1}\mathbf{b}$

If $m = n$ and $A$ is **invertible** (nonsingular), there is **exactly one** solution:


```math
\mathbf{x} = A^{-1}\mathbf{b}.

```


**$2 \times 2$ inverse formula:** For $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$ with $\det(A) = ad - bc \neq 0$,


```math
A^{-1} = \frac{1}{ad-bc}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}.

```


**Numerical example:**


```math
A = \begin{bmatrix} 2 & 0 \\ 0 & 3 \end{bmatrix}, \quad
\mathbf{b} = \begin{bmatrix} 4 \\ 9 \end{bmatrix}.

```


Here


```math
A^{-1} = \begin{bmatrix} 1/2 & 0 \\ 0 & 1/3 \end{bmatrix},
\quad
\mathbf{x} = A^{-1}\mathbf{b} = \begin{bmatrix} 2 \\ 3 \end{bmatrix}.

```


---

## 4. When is $A$ not invertible?

If rows or columns of $A$ are **linearly dependent**, then $\det(A) = 0$ (for square $A$) and **no inverse** exists. Then $A\mathbf{x} = \mathbf{b}$ may have **no** solution or **infinitely many**, depending on $\mathbf{b}$ (see **06** on rank, **08** on affine solution sets).

---

## 5. Connection to machine learning

**Normal equations** in linear least squares (Chapter 9) are linear systems in the coefficients. Understanding elimination and rank tells you when a **unique** least-squares solution exists and how **numerical stability** depends on the condition of $A^\top A$.

---

## Additional solved examples

*(Aligned with MML Chapter 2, §2.3: elimination and inverse.)*

### Example A — Complete Gaussian elimination ($3 \times 3$)

Solve the system from §2 above (same as the opening worked example). Augmented matrix after $R_2 \leftarrow R_2 - 2R_1$, $R_3 \leftarrow R_3 - R_1$:


```math
\left[\begin{array}{ccc|c}
1 & 1 & 1 & 6 \\
0 & -3 & -1 & -9 \\
0 & 1 & -2 & -4
\end{array}\right].

```


**Step 1 — Swap $R_2 \leftrightarrow R_3$** (optional; gives a $+1$ pivot in row 2):


```math
\left[\begin{array}{ccc|c}
1 & 1 & 1 & 6 \\
0 & 1 & -2 & -4 \\
0 & -3 & -1 & -9
\end{array}\right].

```


**Step 2 — $R_3 \leftarrow R_3 + 3R_2$:**


```math
\left[\begin{array}{ccc|c}
1 & 1 & 1 & 6 \\
0 & 1 & -2 & -4 \\
0 & 0 & -7 & -21
\end{array}\right].

```


**Step 3 — Back substitution:**  
From row 3: $-7z = -21 \Rightarrow z = 3$.  
Row 2: $y - 2z = -4 \Rightarrow y - 6 = -4 \Rightarrow y = 2$.  
Row 1: $x + y + z = 6 \Rightarrow x + 2 + 3 = 6 \Rightarrow x = 1$.

**Answer:** $(x,y,z) = (1,2,3)$ (matches the earlier check).

---

### Example B — Using $A^{-1}$ ($2 \times 2$)

Solve $A\mathbf{x}=\mathbf{b}$ with


```math
A = \begin{bmatrix} 3 & 1 \\ 2 & 1 \end{bmatrix}, \quad
\mathbf{b} = \begin{bmatrix} 5 \\ 4 \end{bmatrix}.

```


$\det A = 3\cdot 1 - 1\cdot 2 = 1$. So


```math
A^{-1} = \frac{1}{1}\begin{bmatrix} 1 & -1 \\ -2 & 3 \end{bmatrix}
=
\begin{bmatrix} 1 & -1 \\ -2 & 3 \end{bmatrix}.

```



```math
\mathbf{x} = A^{-1}\mathbf{b}
=
\begin{bmatrix} 1 & -1 \\ -2 & 3 \end{bmatrix}
\begin{bmatrix} 5 \\ 4 \end{bmatrix}
=
\begin{bmatrix} 5-4 \\ -10+12 \end{bmatrix}
=
\begin{bmatrix} 1 \\ 2 \end{bmatrix}.

```


So $x_1=1$, $x_2=2$. **Check:** $3(1)+1(2)=5$, $2(1)+1(2)=4$.

---

### Example C — No solution ($2 \times 2$)


```math
\begin{cases}
x + y = 1, \\
x + y = 2.
\end{cases}

```


Subtract: $0 = 1$. **Inconsistent** — no solution. In augmented form, elimination produces a row $[0\ 0\ |\ c]$ with $c \neq 0$.

---

## 6. Summary

1. **Elimination** on $[A \mid \mathbf{b}]$ is systematic and scales to large $m,n$.
2. **Unique solution** for square $A$ $\Leftrightarrow$ $A$ invertible $\Leftrightarrow$ full rank (see **06**).
3. **$A^{-1}\mathbf{b}$** is conceptually simple; in practice, software uses **LU** or other factorizations for speed and stability.

---

*Always verify solutions by substituting into $A\mathbf{x}=\mathbf{b}$ until the process is automatic.*
