# 08 — Affine Spaces

> **Reference (MML):** Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, **§2.8** — *Affine Spaces*.

---

## Why learn this?

**Affine** = linear + **translation**. Real models almost always include **biases**; decision boundaries are **offset hyperplanes**, not subspaces through the origin. Solution sets of $A\mathbf{x}=\mathbf{b}$ are **affine flats**, not vector subspaces—unless $\mathbf{b}=\mathbf{0}$.

**Where it is used (applications):**

- **Linear / logistic regression:** $\mathbf{w}^\top\mathbf{x} + b$ is affine in $\mathbf{x}$.
- **SVM and perceptrons:** separating hyperplanes $\mathbf{w}^\top\mathbf{x}+b=0$ (Chapter 12).
- **Computer vision:** rigid motions = affine transforms in homogeneous coordinates.
- **Optimization:** feasible sets are often affine subsets (equality constraints).

---

## Overview

A **linear subspace** must contain $\mathbf{0}$. Many geometric objects in ML—**solution sets** of $A\mathbf{x}=\mathbf{b}$, **hyperplanes** $\mathbf{w}^\top\mathbf{x}+b=0$, and **predictions** $\mathbf{y} = W\mathbf{x}+\mathbf{b}$—are **affine**: they are a subspace **translated** by a fixed vector.

---

## 1. Definition: affine subspace

Let $U$ be a linear subspace of $\mathbb{R}^n$ and $\mathbf{x}_0 \in \mathbb{R}^n$. The set


```math
\mathcal{A} = \mathbf{x}_0 + U = \{ \mathbf{x}_0 + \mathbf{u} \mid \mathbf{u} \in U \}

```


is an **affine subspace** (parallel to $U$). Its **dimension** is $\dim(U)$.

**Examples:**

- A **line** not through the origin in $\mathbb{R}^2$.
- A **plane** not through the origin in $\mathbb{R}^3$.
- The set of **all solutions** to $A\mathbf{x}=\mathbf{b}$ (when nonempty).

---

## 2. Affine combinations

Given points $\mathbf{x}_1,\ldots,\mathbf{x}_k$, an **affine combination** is


```math
\sum_{i=1}^{k} \lambda_i \mathbf{x}_i
\quad\text{with}\quad
\sum_{i=1}^{k} \lambda_i = 1.

```


Coefficients are **not** arbitrary scalars—they must sum to $1$. The **affine hull** of a set is all such combinations.

**Example — midpoint:**


```math
\frac{1}{2}\mathbf{a} + \frac{1}{2}\mathbf{b}

```


has weights $1/2 + 1/2 = 1$, so it lies on the line through $\mathbf{a}$ and $\mathbf{b}$.

---

## 3. Structure of solutions of $A\mathbf{x} = \mathbf{b}$

Suppose $\mathbf{x}_p$ satisfies $A\mathbf{x}_p = \mathbf{b}$ (**particular solution**). Then **every** solution has the form


```math
\mathbf{x} = \mathbf{x}_p + \mathbf{h}, \qquad A\mathbf{h} = \mathbf{0}.

```


So the solution set is **$\mathbf{x}_p + \mathcal{N}(A)$**, an affine space parallel to the **null space** $\mathcal{N}(A)$.

**Worked example:**


```math
A = \begin{bmatrix} 1 & 1 \\ 2 & 2 \end{bmatrix}, \quad
\mathbf{b} = \begin{bmatrix} 2 \\ 4 \end{bmatrix}.

```


- Particular solution: $\mathbf{x}_p = (1,1)^\top$ since $1+1=2$ and $2+2=4$.
- Null space: $h_1+h_2=0$, so $\mathbf{h} = t(1,-1)^\top$, $t \in \mathbb{R}$.

**All solutions:**


```math
\mathbf{x} = \begin{bmatrix} 1 \\ 1 \end{bmatrix} + t \begin{bmatrix} 1 \\ -1 \end{bmatrix}, \quad t \in \mathbb{R}.

```


This is a **line** in $\mathbb{R}^2$ (verify: it satisfies $x_1+x_2=2$).

---

## 4. Machine learning

- **Bias** in $\mathbf{y} = W\mathbf{x} + \mathbf{b}$ makes the map **affine** in $\mathbf{x}$; it is **linear** only if $\mathbf{b}=\mathbf{0}$.
- **SVM** decision boundaries $\mathbf{w}^\top\mathbf{x} + b = 0$ are **affine hyperplanes** (Chapter 12).

---

## Additional solved examples

*(MML Chapter 2, §2.8 style.)*

### Example A — Line through two points as an affine set

Let $\mathbf{a} = (0,1)^\top$ and $\mathbf{b} = (2,3)^\top$. The line through $\mathbf{a}$ and $\mathbf{b}$ is


```math
\mathbf{x}(t) = (1-t)\mathbf{a} + t\mathbf{b}, \quad t \in \mathbb{R}.

```


This is an **affine combination** because $(1-t)+t=1$. For $t=0$ you get $\mathbf{a}$; for $t=1$ you get $\mathbf{b}$. Expand:


```math
\mathbf{x}(t) = (2t,\, 1+2t)^\top.

```


---

### Example B — Particular solution + null space ($2 \times 3$)

Solve $A\mathbf{x}=\mathbf{b}$ with


```math
A = \begin{bmatrix} 1 & 1 & 0 \\ 0 & 1 & 1 \end{bmatrix}, \quad
\mathbf{b} = \begin{bmatrix} 5 \\ 3 \end{bmatrix}.

```


**Particular:** try $x_3=0$: then $x_2=3$, $x_1+x_2=5 \Rightarrow x_1=2$. So $\mathbf{x}_p=(2,3,0)^\top$.

**Homogeneous** $A\mathbf{x}=\mathbf{0}$: $x_1+x_2=0$, $x_2+x_3=0$ ⇒ $x_2=-x_1$, $x_3= x_1$. So $\mathbf{h} = t(1,-1,1)^\top$.

**General solution:**


```math
\mathbf{x} = \begin{bmatrix} 2 \\ 3 \\ 0 \end{bmatrix}
+ t \begin{bmatrix} 1 \\ -1 \\ 1 \end{bmatrix}, \quad t \in \mathbb{R}.

```


---

### Example C — Affine hyperplane

The set $\{ \mathbf{x} \in \mathbb{R}^2 \mid x_1 + 2x_2 = 0 \}$ is a **linear** subspace (line through origin). The set $\{ x_1 + 2x_2 = 1 \}$ is **affine** but **not** a subspace: it is $(1,0)^\top + \operatorname{span}\{(-2,1)^\top\}$.

---

## 5. Summary

1. **Affine space** = translate of a linear subspace: $\mathbf{x}_0 + U$.
2. **Solutions** to $A\mathbf{x}=\mathbf{b}$ are an affine translate of $\mathcal{N}(A)$.
3. **Affine combinations** (weights summing to $1$) describe **lines, planes, and hulls** of points without requiring the origin.

---

*Express the line through two distinct points $\mathbf{a},\mathbf{b}$ as $\mathbf{a} + t(\mathbf{b}-\mathbf{a})$—an affine line.*
