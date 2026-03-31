# 05 — Linear Independence

> **Reference (MML):** Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, **§2.5** — *Linear Independence*.

---

## Why learn this?

**Linear independence** tells you whether features or columns add **new information** or are **redundant**. It is the difference between a **unique** least-squares solution (full column rank) and **many** equivalent solutions (dependent columns).

**Where it is used (applications):**

- **Multicollinearity** in regression: dependent feature columns inflate variance of $\hat{\mathbf{w}}$.
- **Rank of a data matrix:** counts effective degrees of freedom in linear models.
- **Identifiability:** whether parameters can be uniquely recovered from data.
- **Basis construction:** PCA, QR, and SVD build independent directions (later chapters).

---

## Overview

**Linear independence** tells you whether a set of vectors carries **redundant** direction information. It is the key to **unique** representation in a basis, **full rank** of data matrices, and **invertibility** of square matrices.

---

## 1. Definition

Vectors $\mathbf{v}_1,\ldots,\mathbf{v}_k \in \mathbb{R}^n$ are **linearly independent** if the **only** solution to

$$
\alpha_1 \mathbf{v}_1 + \alpha_2 \mathbf{v}_2 + \cdots + \alpha_k \mathbf{v}_k = \mathbf{0}
$$

is $\alpha_1 = \alpha_2 = \cdots = \alpha_k = 0$.

If there exists a solution with **not all** $\alpha_i$ equal to zero, the vectors are **linearly dependent**.

**Intuition:** Dependent means at least one vector is a **linear combination** of the others (“redundant direction”).

---

## 2. Example: independent pair in $\mathbb{R}^2$

Let $\mathbf{v}_1 = (1,0)^\top$ and $\mathbf{v}_2 = (0,1)^\top$. Suppose

$$
\alpha_1 \mathbf{v}_1 + \alpha_2 \mathbf{v}_2 = \mathbf{0}.
$$

Then $(\alpha_1, \alpha_2)^\top = (0,0)^\top$, so $\alpha_1 = \alpha_2 = 0$. Hence $\{\mathbf{v}_1,\mathbf{v}_2\}$ is **linearly independent**.

---

## 3. Example: dependent pair in $\mathbb{R}^2$

Let $\mathbf{v}_1 = (1,2)^\top$ and $\mathbf{v}_2 = (2,4)^\top$. Observe $\mathbf{v}_2 = 2\mathbf{v}_1$. Therefore

$$
2\mathbf{v}_1 - \mathbf{v}_2 = \mathbf{0},
$$

with coefficients $(2,-1) \neq (0,0)$. The set is **linearly dependent**.

---

## 4. Matrix test (columns)

Place $\mathbf{v}_1,\ldots,\mathbf{v}_k$ as **columns** of a matrix $A \in \mathbb{R}^{n \times k}$. Then

$$
\alpha_1 \mathbf{v}_1 + \cdots + \alpha_k \mathbf{v}_k = A \boldsymbol{\alpha},
\quad \boldsymbol{\alpha} = (\alpha_1,\ldots,\alpha_k)^\top.
$$

The vectors are **independent** if and only if $A\boldsymbol{\alpha} = \mathbf{0}$ implies $\boldsymbol{\alpha} = \mathbf{0}$.

For **square** $n \times n$ matrix $A$, columns are independent **if and only if** $A$ is **invertible** (equivalently $\det A \neq 0$, in the book’s treatment of determinants).

**Example:**

$$
A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}, \quad \det A = 1\cdot 4 - 2\cdot 3 = -2 \neq 0.
$$

So the columns are **linearly independent**.

---

## 5. Fact: too many vectors in $\mathbb{R}^n$

Any set of **more than $n$** vectors in $\mathbb{R}^n$ is necessarily **linearly dependent**. This explains why you cannot have more than $n$ mutually independent directions in $n$-dimensional space.

---

## 6. Machine learning perspective

- **Features** that are linearly dependent imply **multicollinearity** (redundant columns in a design matrix).
- The **column rank** of a data matrix counts how many **independent** feature directions you effectively have (note **06**).
- For **unique** least-squares solutions in certain setups, you need **full column rank** (independent columns).

---

## Additional solved examples

*(MML Chapter 2, §2.5 style.)*

### Example A — Dependence in $\mathbb{R}^3$

Let $\mathbf{v}_1 = (1,0,0)^\top$, $\mathbf{v}_2 = (0,1,0)^\top$, $\mathbf{v}_3 = (1,1,0)^\top$. Note $\mathbf{v}_3 = \mathbf{v}_1 + \mathbf{v}_2$, so

$$
\mathbf{v}_1 + \mathbf{v}_2 - \mathbf{v}_3 = \mathbf{0}
$$

with coefficients $(1,1,-1) \neq \mathbf{0}$. The set is **linearly dependent**.

---

### Example B — Solve $A\boldsymbol{\alpha} = \mathbf{0}$ for independence

$A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$. Solve $A\boldsymbol{\alpha}=\mathbf{0}$:

$$
\alpha_1 + 2\alpha_2 = 0,\quad 3\alpha_1 + 4\alpha_2 = 0.
$$

From the first, $\alpha_1 = -2\alpha_2$. Substitute: $3(-2\alpha_2)+4\alpha_2 = -2\alpha_2 = 0 \Rightarrow \alpha_2=0$, hence $\alpha_1=0$. **Only trivial solution** → columns are **independent**.

---

### Example C — Three vectors in $\mathbb{R}^2$ must be dependent

Take $\mathbf{u}_1=(1,0)^\top$, $\mathbf{u}_2=(0,1)^\top$, $\mathbf{u}_3=(1,1)^\top$. We know $\mathbf{u}_3 = \mathbf{u}_1+\mathbf{u}_2$, so

$$
\mathbf{u}_1 + \mathbf{u}_2 - \mathbf{u}_3 = \mathbf{0}.
$$

This illustrates: **more than $n$** vectors in $\mathbb{R}^n$ cannot be independent.

---

## 7. Summary

1. **Independence** $\Leftrightarrow$ the only linear combination giving $\mathbf{0}$ is the **trivial** one.
2. **Dependence** $\Leftrightarrow$ some vector is a combination of the others.
3. **Column test:** $A\boldsymbol{\alpha}=\mathbf{0}$ has only $\boldsymbol{\alpha}=\mathbf{0}$ means columns are independent.

---

*Prove small cases by hand, then use the book’s exercises on subspaces spanned by given vectors.*
