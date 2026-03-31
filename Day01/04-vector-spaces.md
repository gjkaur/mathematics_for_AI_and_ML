# 04 — Vector Spaces

> **Reference (MML):** Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, **§2.4** — *Vector Spaces*.

---

## Why learn this?

**Vector spaces** give a single language for **features**, **parameters**, **gradients**, and later **function spaces** (kernels, Hilbert spaces). Knowing subspaces and span tells you what your model can **represent** and what is **redundant**.

**Where it is used (applications):**

- **Feature spaces:** each data point lives in $\mathbb{R}^d$; transformations map between spaces.
- **PCA / dimensionality reduction:** find a smaller subspace that captures variance (Chapter 10).
- **Null space / range:** describe all solutions of $A\mathbf{x}=\mathbf{b}$ and all achievable outputs $A\mathbf{x}$.
- **Reproducing kernel Hilbert spaces (advanced ML):** vector-space structure with inner products.

---

## Overview

A **vector space** (over $\mathbb{R}$) is a set where you can **add** vectors and **multiply** by **scalars**, subject to axioms (associativity, commutativity, existence of a zero vector, etc.—listed precisely in the book). The main finite-dimensional example in ML is **$\mathbb{R}^n$**; the same axioms later support **function spaces** with inner products (Chapter 3, §3.7).

---

## 1. The standard space $\mathbb{R}^n$

**$\mathbb{R}^n$** is the set of all **column vectors** with $n$ real components:


```math
\mathbf{x} = \begin{bmatrix} x_1 \\ \vdots \\ x_n \end{bmatrix}, \quad x_i \in \mathbb{R}.

```


**Addition** and **scalar multiplication** are defined **componentwise**:


```math
\mathbf{u} + \mathbf{v} = \begin{bmatrix} u_1 + v_1 \\ \vdots \\ u_n + v_n \end{bmatrix}, \qquad
\alpha \mathbf{u} = \begin{bmatrix} \alpha u_1 \\ \vdots \\ \alpha u_n \end{bmatrix}.

```


**Example:**


```math
\mathbf{u} = \begin{bmatrix} 1 \\ 2 \end{bmatrix}, \quad
\mathbf{v} = \begin{bmatrix} 3 \\ -1 \end{bmatrix}
\quad\Rightarrow\quad
\mathbf{u}+\mathbf{v} = \begin{bmatrix} 4 \\ 1 \end{bmatrix}, \quad
3\mathbf{u} = \begin{bmatrix} 3 \\ 6 \end{bmatrix}.

```


---

## 2. Subspaces

A subset $U \subseteq \mathbb{R}^n$ is a **(linear) subspace** if:

1. $\mathbf{0} \in U$.
2. If $\mathbf{u},\mathbf{v} \in U$, then $\mathbf{u}+\mathbf{v} \in U$.
3. If $\mathbf{u} \in U$ and $\alpha \in \mathbb{R}$, then $\alpha \mathbf{u} \in U$.

**Valid example:** All vectors $(t, 2t)^\top$ with $t \in \mathbb{R}$ form a **line through the origin** in $\mathbb{R}^2$—a **one-dimensional** subspace.

**Invalid example:** A line **not** passing through $\mathbf{0}$ is **not** a subspace (fails closure / fails to contain $\mathbf{0}$).

---

## 3. Span

Given $\mathbf{v}_1,\ldots,\mathbf{v}_k \in \mathbb{R}^n$, their **span** is the set of **all linear combinations**:


```math
\operatorname{span}\{\mathbf{v}_1,\ldots,\mathbf{v}_k\}
= \left\{ \alpha_1 \mathbf{v}_1 + \cdots + \alpha_k \mathbf{v}_k \;\middle|\; \alpha_i \in \mathbb{R} \right\}.

```


The span is always a **subspace** of $\mathbb{R}^n$.

**Example:** $\mathbf{e}_1 = (1,0)^\top$ and $\mathbf{e}_2 = (0,1)^\top$ span **all of** $\mathbb{R}^2$, because any $(a,b)^\top = a\mathbf{e}_1 + b\mathbf{e}_2$.

---

## 4. Basis and dimension (preview)

A **basis** of a subspace $U$ is a **linearly independent** set that **spans** $U$. The **dimension** $\dim(U)$ is the number of basis vectors (well-defined). For the whole space, $\dim(\mathbb{R}^n) = n$.

See note **06** for basis and rank in full.

---

## 5. Null space preview

Vectors $\mathbf{x}$ satisfying $A\mathbf{x} = \mathbf{0}$ form a subspace called the **null space** $\mathcal{N}(A)$. It captures **degrees of freedom** when $A\mathbf{x}=\mathbf{b}$ has infinitely many solutions (note **08**).

---

## Additional solved examples

*(Exercises in the style of MML Chapter 2, §2.4.)*

### Example A — Check closure of a subspace

Let $U = \{ (t,\,2t)^\top \mid t \in \mathbb{R} \} \subset \mathbb{R}^2$. Show $U$ is a subspace.

**Zero:** $t=0$ gives $(0,0)^\top \in U$.

**Addition:** $(t,2t)^\top + (s,2s)^\top = (t+s,\, 2(t+s))^\top \in U$.

**Scalars:** $\alpha(t,2t)^\top = (\alpha t,\, 2\alpha t)^\top \in U$. So $U$ is a subspace (a line through the origin).

---

### Example B — Express a vector in the span

Let $\mathbf{v}_1 = (1,1)^\top$ and $\mathbf{v}_2 = (1,-1)^\top$. Write $\mathbf{b} = (0,4)^\top$ as $\alpha_1 \mathbf{v}_1 + \alpha_2 \mathbf{v}_2$.

Solve


```math
\alpha_1 + \alpha_2 = 0, \quad \alpha_1 - \alpha_2 = 4.

```


Add: $2\alpha_1 = 4 \Rightarrow \alpha_1 = 2$. Then $\alpha_2 = -2$. **Check:** $2(1,1) - 2(1,-1) = (0,4)^\top$. So $\mathbf{b} \in \operatorname{span}\{\mathbf{v}_1,\mathbf{v}_2\}$ (and in fact $\{\mathbf{v}_1,\mathbf{v}_2\}$ spans all of $\mathbb{R}^2$).

---

### Example C — Null space as a subspace

For $A = \begin{bmatrix} 1 & 2 & -1 \end{bmatrix}$ (a $1 \times 3$ matrix), solve $A\mathbf{x} = 0$:


```math
x_1 + 2x_2 - x_3 = 0 \quad\Rightarrow\quad x_3 = x_1 + 2x_2.

```


With free parameters $x_1 = s$, $x_2 = t$:


```math
\mathbf{x} = \begin{bmatrix} s \\ t \\ s+2t \end{bmatrix}
= s\begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}
+ t\begin{bmatrix} 0 \\ 1 \\ 2 \end{bmatrix}.

```


So $\mathcal{N}(A)$ is a **2-dimensional** subspace of $\mathbb{R}^3$ (a plane through the origin).

---

## 6. Summary

1. **Vector spaces** abstract “objects you can add and scale.”
2. **$\mathbb{R}^n$** is the concrete workspace for features, parameters, and gradients.
3. **Subspaces** and **span** describe constraints and reachable sets; they underpin **rank** and **bases**.

---

*Read the book’s list of vector space axioms once; most exercises use $\mathbb{R}^n$ directly.*
