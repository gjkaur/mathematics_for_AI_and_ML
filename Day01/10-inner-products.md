# 10 — Inner Products

> **Reference (MML):** Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, **§3.2** — *Inner Products*.

---

## Why learn this?

**Inner products** encode **alignment** between vectors: similarity, correlation (centered data), and **angles**. They connect linear algebra to **geometry** and are the entry point to **kernels** (inner products in feature space) in SVMs and kernel methods.

**Where it is used (applications):**

- **Cosine similarity** in NLP, search, and recommender systems.
- **Projections** and **least squares** (orthogonal residual; Chapter 9).
- **Kernel methods:** $k(\mathbf{x},\mathbf{x}')$ behaves like an inner product in a high-dimensional space (Chapter 12).
- **Attention scores** (in simplified linear forms) use dot products between query and key vectors.

---

## Overview

An **inner product** captures **alignment** between two vectors: how much they “point the same way.” From it you get **lengths** ($\sqrt{\langle \mathbf{x},\mathbf{x}\rangle}$), **angles**, **orthogonality**, and—later—**kernels** (Chapter 12). The standard case in $\mathbb{R}^n$ is the **dot product**.

---

## 1. Real inner product: axioms

A map $\langle \cdot , \cdot \rangle : V \times V \to \mathbb{R}$ on a real vector space $V$ is an **inner product** if it is:

1. **Linear in the first argument:**  
   $\langle \alpha \mathbf{u} + \beta \mathbf{v}, \mathbf{w} \rangle = \alpha \langle \mathbf{u},\mathbf{w}\rangle + \beta \langle \mathbf{v},\mathbf{w}\rangle$.
2. **Symmetric:** $\langle \mathbf{u}, \mathbf{v} \rangle = \langle \mathbf{v}, \mathbf{u} \rangle$.
3. **Positive definite:** $\langle \mathbf{x}, \mathbf{x} \rangle > 0$ for all $\mathbf{x} \neq \mathbf{0}$.

**Standard dot product on $\mathbb{R}^n$:**

$$
\langle \mathbf{x}, \mathbf{y} \rangle = \mathbf{x}^\top \mathbf{y} = \sum_{i=1}^{n} x_i y_i.
$$

---

## 2. Induced norm

Every inner product induces a **norm**:

$$
\|\mathbf{x}\| = \sqrt{\langle \mathbf{x}, \mathbf{x} \rangle}.
$$

For the dot product, this is the **Euclidean** $L_2$ norm.

**Example:**

$$
\mathbf{x} = \begin{bmatrix} 1 \\ 2 \end{bmatrix}, \quad
\langle \mathbf{x}, \mathbf{x} \rangle = 1 + 4 = 5, \quad
\|\mathbf{x}\| = \sqrt{5}.
$$

---

## 3. Worked inner product

Let $\mathbf{x} = (1,2)^\top$ and $\mathbf{y} = (3,-1)^\top$. Then

$$
\langle \mathbf{x}, \mathbf{y} \rangle = 1\cdot 3 + 2\cdot(-1) = 3 - 2 = 1.
$$

---

## 4. Cauchy–Schwarz inequality

For any $\mathbf{x},\mathbf{y}$ in an inner product space,

$$
|\langle \mathbf{x}, \mathbf{y} \rangle| \le \|\mathbf{x}\| \, \|\mathbf{y}\|.
$$

**Equality** holds if and only if $\mathbf{x}$ and $\mathbf{y}$ are **linearly dependent** (one is a scalar multiple of the other).

**Check with the previous example:**

$$
\|\mathbf{x}\| = \sqrt{5}, \quad \|\mathbf{y}\| = \sqrt{10}, \quad \|\mathbf{x}\|\|\mathbf{y}\| = \sqrt{50} \approx 7.07, \quad |1| \le 7.07 \quad \checkmark
$$

---

## 5. Weighted inner products

If $A$ is **symmetric positive definite (SPD)**, then

$$
\langle \mathbf{x}, \mathbf{y} \rangle_A = \mathbf{x}^\top A \mathbf{y}
$$

is also an inner product. It weights different directions differently (ellipsoidal geometry).

---

## 6. Machine learning connections

- **Cosine similarity** (NLP, retrieval) uses $\langle \mathbf{x},\mathbf{y}\rangle / (\|\mathbf{x}\|\|\mathbf{y}\|)$.
- **Orthogonality** $\langle \mathbf{x},\mathbf{y}\rangle=0$ means “no linear correlation in the Euclidean sense” for centered data (note **12**).
- **Kernels** generalize inner products to high-dimensional feature spaces (Chapter 12).

---

## Additional solved examples

*(MML Chapter 3, §3.2 style.)*

### Example A — Expand $\|\mathbf{x}+\mathbf{y}\|_2^2$

$$
\|\mathbf{x}+\mathbf{y}\|_2^2
= (\mathbf{x}+\mathbf{y})^\top(\mathbf{x}+\mathbf{y})
= \mathbf{x}^\top\mathbf{x} + 2\mathbf{x}^\top\mathbf{y} + \mathbf{y}^\top\mathbf{y}
= \|\mathbf{x}\|_2^2 + 2\langle \mathbf{x},\mathbf{y}\rangle + \|\mathbf{y}\|_2^2.
$$

If $\mathbf{x} \perp \mathbf{y}$, then $\langle \mathbf{x},\mathbf{y}\rangle=0$ and **Pythagoras** holds: $\|\mathbf{x}+\mathbf{y}\|_2^2 = \|\mathbf{x}\|_2^2 + \|\mathbf{y}\|_2^2$.

---

### Example B — Cauchy–Schwarz with equality

$\mathbf{x} = (2,4)^\top$, $\mathbf{y} = (1,2)^\top$. Here $\mathbf{x} = 2\mathbf{y}$, so they are **collinear**.

$$
\langle \mathbf{x},\mathbf{y}\rangle = 2+8 = 10, \quad
\|\mathbf{x}\|_2 = \sqrt{20},\quad \|\mathbf{y}\|_2 = \sqrt{5},\quad
\|\mathbf{x}\|_2\|\mathbf{y}\|_2 = \sqrt{100} = 10.
$$

So $|\langle \mathbf{x},\mathbf{y}\rangle| = \|\mathbf{x}\|_2\|\mathbf{y}\|_2$ — **equality** in Cauchy–Schwarz.

---

### Example C — Weighted inner product (numerical)

Let $A = \begin{bmatrix} 2 & 0 \\ 0 & 1 \end{bmatrix}$ (SPD). For $\mathbf{x}=(1,1)^\top$, $\mathbf{y}=(1,-1)^\top$:

$$
\langle \mathbf{x},\mathbf{y}\rangle_A = \mathbf{x}^\top A \mathbf{y}
= \begin{bmatrix}1&1\end{bmatrix}
\begin{bmatrix} 2 & 0 \\ 0 & 1 \end{bmatrix}
\begin{bmatrix} 1 \\ -1 \end{bmatrix}
= \begin{bmatrix}1&1\end{bmatrix}
\begin{bmatrix} 2 \\ -1 \end{bmatrix}
= 1.
$$

---

## 7. Summary

1. The **dot product** $\mathbf{x}^\top\mathbf{y}$ is the default inner product on $\mathbb{R}^n$.
2. **Cauchy–Schwarz** bounds correlations and proves the **triangle inequality** for the induced norm.
3. Inner products generalize to **functions** (§3.7 in the book: $\int f(x)g(x)\,dx$).

---

*Practice: expand $\|\mathbf{x}+\mathbf{y}\|^2$ using inner products to derive the cosine law.*
