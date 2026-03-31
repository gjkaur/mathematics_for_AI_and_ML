# 02 — Matrices

> **Reference (MML):** Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, **§2.2** — *Matrices*.

---

## Why learn this?

**Matrices** are the standard way to represent **linear transformations**, **datasets** (samples $\times$ features), and **parameters** (weights) in code and in math. Fluency with shapes, multiplication, and transpose is non-optional for reading papers and implementations.

**Where it is used (applications):**

- **Data matrices:** each row (or column) is a sample; matrix multiply applies a model to many points at once.
- **Deep learning:** weight matrices map activations between layers; convolution can be written as structured matrix ops.
- **Graph / recommender models:** adjacency and factorization use matrix structure (rank, eigenvalues—later chapters).
- **Numerical libraries:** NumPy, PyTorch, JAX—all think in tensors (generalized matrices).

---

## Overview

A **matrix** is a rectangular array of real (or complex) numbers. Matrices encode **linear maps**, store **datasets** (samples as rows or columns), and represent **weights** in linear neural layers. This note fixes notation and the core operations used everywhere in the book.

---

## 1. Shape and entries

An **$m \times n$ matrix** $A$ has **$m$ rows** and **$n$ columns**. The entry in **row $i$**, **column $j$** is denoted

$$
A = [a_{ij}]_{i=1,\ldots,m;\; j=1,\ldots,n}.
$$

**Example ($2 \times 2$):**

$$
A = \begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix}.
$$

---

## 2. Vectors as special matrices

- A **column vector** $\mathbf{x} \in \mathbb{R}^n$ is an $n \times 1$ matrix.
- A **row vector** is a $1 \times n$ matrix.

The **transpose** $A^\top$ swaps rows and columns:

$$
(A^\top)_{ij} = A_{ji}.
$$

**Numerical example:**

$$
A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}
\quad\Rightarrow\quad
A^\top = \begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix}.
$$

---

## 3. Matrix–vector multiplication

If $A$ is $m \times n$ and $\mathbf{x}$ is $n \times 1$, the product $\mathbf{y} = A\mathbf{x}$ is $m \times 1$. The **$i$-th component** is the **dot product** of **row $i$ of $A$** with $\mathbf{x}$:

$$
y_i = \sum_{j=1}^{n} a_{ij} x_j, \qquad i = 1,\ldots,m.
$$

**Worked example:**

$$
A = \begin{bmatrix} 1 & 2 \\ 0 & -1 \end{bmatrix}, \quad
\mathbf{x} = \begin{bmatrix} 3 \\ 1 \end{bmatrix}.
$$

- Row 1: $y_1 = 1 \cdot 3 + 2 \cdot 1 = 5$.
- Row 2: $y_2 = 0 \cdot 3 + (-1) \cdot 1 = -1$.

Hence

$$
A\mathbf{x} = \begin{bmatrix} 5 \\ -1 \end{bmatrix}.
$$

---

## 4. Matrix–matrix multiplication

If $A$ is $m \times n$ and $B$ is $n \times p$, then $C = AB$ is $m \times p$ with entries

$$
c_{ik} = \sum_{j=1}^{n} a_{ij} b_{jk}.
$$

**Interpretation:** Column $k$ of $AB$ equals $A$ times column $k$ of $B$.

**Worked example:**

$$
\begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}
\begin{bmatrix} 2 & 0 \\ 1 & 3 \end{bmatrix}
=
\begin{bmatrix}
1\cdot 2 + 1\cdot 1 & 1\cdot 0 + 1\cdot 3 \\
0\cdot 2 + 1\cdot 1 & 0\cdot 0 + 1\cdot 3
\end{bmatrix}
=
\begin{bmatrix} 3 & 3 \\ 1 & 3 \end{bmatrix}.
$$

**Important:** In general **$AB \neq BA$** (even when both products exist).

---

## 5. Special matrices

| Name | Definition / role |
|------|-------------------|
| **Identity** $I_n$ | Diagonal entries $1$, off-diagonals $0$; $A I = I A = A$ (for compatible shapes). |
| **Zero matrix** | All entries $0$. |
| **Symmetric** | $A = A^\top$ (square matrices). |

For $I_2$:

$$
I_2 = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}.
$$

---

## 6. Why this matches linear maps

If $\Phi(\mathbf{x}) = A\mathbf{x}$, then for scalars $\alpha,\beta$ and vectors $\mathbf{u},\mathbf{v}$,

$$
\Phi(\alpha \mathbf{u} + \beta \mathbf{v}) = \alpha \Phi(\mathbf{u}) + \beta \Phi(\mathbf{v}),
$$

because matrix multiplication distributes over addition and commutes with scalar multiplication. So **every matrix $A$ defines a linear map**; see note **07** for image, kernel, and composition.

---

## Additional solved examples

*(Standard drill problems as in MML Chapter 2, §2.2.)*

### Example A — $AB \neq BA$ for $2 \times 2$ matrices

Let

$$
A = \begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix}, \quad
B = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}.
$$

**Compute $AB$:**

$$
AB =
\begin{bmatrix}
1\cdot 0 + 2\cdot 1 & 1\cdot 1 + 2\cdot 0 \\
0\cdot 0 + 1\cdot 1 & 0\cdot 1 + 1\cdot 0
\end{bmatrix}
=
\begin{bmatrix} 2 & 1 \\ 1 & 0 \end{bmatrix}.
$$

**Compute $BA$:**

$$
BA =
\begin{bmatrix}
0\cdot 1 + 1\cdot 0 & 0\cdot 2 + 1\cdot 1 \\
1\cdot 1 + 0\cdot 0 & 1\cdot 2 + 0\cdot 1
\end{bmatrix}
=
\begin{bmatrix} 0 & 1 \\ 1 & 2 \end{bmatrix}.
$$

So $AB \neq BA$.

---

### Example B — Design matrix times weight vector (ML setup)

Three examples with two features (plus bias as third coordinate). Stack them as rows:

$$
X =
\begin{bmatrix}
1 & x_1^{(1)} & x_2^{(1)} \\
1 & x_1^{(2)} & x_2^{(2)} \\
1 & x_1^{(3)} & x_2^{(3)}
\end{bmatrix}
=
\begin{bmatrix}
1 & 0 & 1 \\
1 & 1 & 0 \\
1 & 2 & 1
\end{bmatrix},
\quad
\boldsymbol{\theta} =
\begin{bmatrix} b \\ w_1 \\ w_2 \end{bmatrix}
=
\begin{bmatrix} 1 \\ 2 \\ -1 \end{bmatrix}.
$$

Predictions $\hat{\mathbf{y}} = X\boldsymbol{\theta}$:

- Row 1: $1 + 2(0) + (-1)(1) = 0$.
- Row 2: $1 + 2(1) + (-1)(0) = 3$.
- Row 3: $1 + 2(2) + (-1)(1) = 4$.

So $\hat{\mathbf{y}} = (0,\,3,\,4)^\top$. This is the same pattern as **linear regression** predictions in matrix form (Chapter 9).

---

### Example C — Symmetric matrix and transpose

If $S = \begin{bmatrix} 2 & -1 \\ -1 & 3 \end{bmatrix}$, then $S^\top = S$ (**symmetric**). For any $\mathbf{x}$,

$$
\mathbf{x}^\top S \mathbf{x} = \begin{bmatrix} x_1 & x_2 \end{bmatrix}
\begin{bmatrix} 2x_1 - x_2 \\ -x_1 + 3x_2 \end{bmatrix}
= 2x_1^2 - 2x_1 x_2 + 3x_2^2,
$$

a **quadratic form** used later with inner products and optimization.

---

## 7. Summary

1. **Shape** $m \times n$ tells you output dimension ($m$) and input dimension ($n$) for $\mathbf{y} = A\mathbf{x}$.
2. **Rows** of $A$ “dot” with $\mathbf{x}$ to produce **components** of $\mathbf{y}$.
3. **Matrix multiplication** composes linear transformations: $(AB)\mathbf{x} = A(B\mathbf{x})$.

---

*Reinforce with small hand calculations, then textbook exercises on matrix algebra.*
