# 09 — Norms

> **Reference (MML):** Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, **§3.1** — *Norms*.

---

## Why learn this?

**Norms** measure **size** of errors, **size** of weights (regularization), and **distance** between predictions and targets. Different norms ($L_1$, $L_2$, $L_\infty$) encode different **geometry** and **robustness** trade-offs—e.g. squared loss vs. absolute loss vs. worst-case error.

**Where it is used (applications):**

- **Loss functions:** $\|\mathbf{y}-\hat{\mathbf{y}}\|_2^2$ (MSE), $\|\mathbf{y}-\hat{\mathbf{y}}\|_1$ (MAE).
- **Regularization:** ridge $\|\mathbf{w}\|_2^2$, lasso $\|\mathbf{w}\|_1$, elastic net mixes both.
- **Generalization bounds** and **stability** analyses often use norms on weights and gradients.
- **Numerical analysis:** condition numbers and convergence rates use matrix/vector norms.

---

## Overview

A **norm** $\|\cdot\|$ assigns a nonnegative **length** to each vector in $\mathbb{R}^n$. Norms define **distances**, **balls**, **convergence**, and appear in **loss functions** and **regularization** (e.g. ridge and lasso). This note focuses on **vector norms**; matrix norms extend the idea (book).

---

## 1. Axioms of a norm

A function $\|\cdot\|: \mathbb{R}^n \to \mathbb{R}$ is a **norm** if for all $\mathbf{x},\mathbf{y} \in \mathbb{R}^n$ and $\alpha \in \mathbb{R}$:

1. **Positive definiteness:** $\|\mathbf{x}\| \ge 0$, and $\|\mathbf{x}\| = 0$ if and only if $\mathbf{x} = \mathbf{0}$.
2. **Absolute homogeneity:** $\|\alpha \mathbf{x}\| = |\alpha| \, \|\mathbf{x}\|$.
3. **Triangle inequality:** $\|\mathbf{x} + \mathbf{y}\| \le \|\mathbf{x}\| + \|\mathbf{y}\|$.

From these, you can prove useful facts (e.g. $|\|\mathbf{x}\| - \|\mathbf{y}\|| \le \|\mathbf{x}-\mathbf{y}\|$).

---

## 2. The $L_p$ norms on $\mathbb{R}^n$

For $p \ge 1$, the **$L_p$ norm** is


```math
\|\mathbf{x}\|_p = \left( \sum_{i=1}^{n} |x_i|^p \right)^{1/p}.

```


**Limit $p \to \infty$** gives the **max norm**:


```math
\|\mathbf{x}\|_\infty = \max_{1 \le i \le n} |x_i|.

```


---

## 3. The three most common cases

Fix $\mathbf{x} = (3,-4)^\top$.

| Norm | Formula | Computation for $(3,-4)^\top$ |
|------|---------|-------------------------------|
| **$L_1$** (Manhattan / taxicab) | $\displaystyle \|\mathbf{x}\|_1 = \sum_{i=1}^n \|x_i\|$ | $|3| + |-4| = 7$ |
| **$L_2$** (Euclidean) | $\displaystyle \|\mathbf{x}\|_2 = \sqrt{\sum_{i=1}^n x_i^2}$ | $\sqrt{9+16} = 5$ |
| **$L_\infty$** (Chebyshev) | $\displaystyle \|\mathbf{x}\|_\infty = \max_i |x_i|$ | $\max(3,4) = 4$ |

**Another vector** $\mathbf{x} = (1,2,-2)^\top$:


```math
\|\mathbf{x}\|_1 = 1+2+2 = 5, \quad
\|\mathbf{x}\|_2 = \sqrt{1+4+4} = 3, \quad
\|\mathbf{x}\|_\infty = 2.

```


---

## 4. Geometry and optimization intuition

- **$L_2$** is **rotation-invariant** (orthogonal transformations preserve $L_2$ length). It is smooth and appears in **least squares**.
- **$L_1$** encourages **sparsity** in minimization: many coefficients can become **exactly zero** (lasso).
- **$L_\infty$** controls the **largest coordinate**; useful in **robust** constraints (“no single feature too large”).

---

## 5. Connection to inner products

The **Euclidean** norm satisfies


```math
\|\mathbf{x}\|_2^2 = \mathbf{x}^\top \mathbf{x} = \langle \mathbf{x}, \mathbf{x} \rangle

```


for the standard dot product (note **10**). Not every norm comes from an inner product, but $L_2$ does.

---

## 6. Machine learning usage

- **Loss:** $\|\mathbf{y} - \hat{\mathbf{y}}\|_2^2$ (sum of squared errors) or $\|\mathbf{y}-\hat{\mathbf{y}}\|_1$ (absolute error).
- **Regularization:** $\lambda \|\mathbf{w}\|_2^2$ (ridge), $\lambda \|\mathbf{w}\|_1$ (lasso).
- **Gradients** of norms appear in optimization (Chapters 5 and 7).

---

## Additional solved examples

*(MML Chapter 3, §3.1 style.)*

### Example A — Unit vectors under different norms

Let $\mathbf{e}_1 = (1,0)^\top \in \mathbb{R}^2$. Then $\|\mathbf{e}_1\|_1 = 1$, $\|\mathbf{e}_1\|_2 = 1$, $\|\mathbf{e}_1\|_\infty = 1$.

Let $\mathbf{v} = (1,1)^\top$. Then $\|\mathbf{v}\|_1 = 2$, $\|\mathbf{v}\|_2 = \sqrt{2}$, $\|\mathbf{v}\|_\infty = 1$.

---

### Example B — Prove the triangle inequality for two specific vectors

$\mathbf{x} = (1,0)^\top$, $\mathbf{y} = (0,1)^\top$ in $\mathbb{R}^2$ with $\|\cdot\|_1$:


```math
\|\mathbf{x}+\mathbf{y}\|_1 = \|(1,1)^\top\|_1 = 2, \quad
\|\mathbf{x}\|_1 + \|\mathbf{y}\|_1 = 1 + 1 = 2.

```


Equality in the **triangle inequality** for $\|\cdot\|_1$ holds here because $\mathbf{x}$ and $\mathbf{y}$ are **supported on different coordinates** ($(1,0)$ vs $(0,1)$), so $|\cdot|$ adds with **no cancellation**: $|1|+|1|=|1+1|$.

---

### Example C — Normalize a feature vector

If $\mathbf{x} = (3,4)^\top$, then $\|\mathbf{x}\|_2 = 5$. The **unit-norm** vector in the same direction is


```math
\hat{\mathbf{x}} = \frac{\mathbf{x}}{\|\mathbf{x}\|_2} = \left(\frac{3}{5},\, \frac{4}{5}\right)^\top,

```


used when you want **length-normalized** features before cosine similarity.

---

## 7. Summary

1. Norms **measure size** of vectors and induce **metrics** $d(\mathbf{x},\mathbf{y})=\|\mathbf{x}-\mathbf{y}\|$.
2. **$L_1$, $L_2$, $L_\infty$** are the norms you meet most often in ML.
3. Choice of norm changes which solutions are **preferred** in optimization.

---

*For matrix norms (spectral norm, Frobenius), see the book’s development and Chapter 4.*
