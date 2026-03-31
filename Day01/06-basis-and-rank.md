# 06 — Basis and Rank

> **Reference (MML):** Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, **§2.6** — *Basis and Rank*.

---

## Why learn this?

**Rank** measures how much **information** a matrix really carries: independent columns, dimension of the output space, and **how many** singular values are nonzero (preview: SVD). **Basis** is how you choose coordinates in that space—critical for compression and interpretation.

**Where it is used (applications):**

- **Low-rank approximation / PCA / recommendation:** approximate big matrices with small rank.
- **Model complexity:** effective rank of features relates to how rich a linear model is.
- **Invertibility:** full rank (square) $\Leftrightarrow$ invertible matrix $\Leftrightarrow$ unique solution of $A\mathbf{x}=\mathbf{b}$.
- **Numerical stability:** near-rank-deficient matrices are **ill-conditioned**.

---

## Overview

A **basis** is a minimal set of directions that **spans** a subspace. **Rank** counts how many independent directions a matrix’s columns (or rows) really contribute. Both concepts explain **unique vs. non-unique** solutions of $A\mathbf{x}=\mathbf{b}$ and underpin **PCA** and **low-rank approximation** later in the book.

---

## 1. Basis of a subspace

Let $U$ be a subspace of $\mathbb{R}^n$. A **basis** of $U$ is a finite set of vectors $\{\mathbf{b}_1,\ldots,\mathbf{b}_d\}$ such that:

1. **Spanning:** every $\mathbf{u} \in U$ can be written as  
   $\mathbf{u} = c_1 \mathbf{b}_1 + \cdots + c_d \mathbf{b}_d$.
2. **Linear independence:** the only combination giving $\mathbf{0}$ is $c_1=\cdots=c_d=0$.

Then **every** $\mathbf{u} \in U$ has **unique** coefficients $(c_1,\ldots,c_d)$.

**Standard basis of $\mathbb{R}^n$:**


```math
\mathbf{e}_1 = (1,0,\ldots,0)^\top,\ \ldots,\ \mathbf{e}_n = (0,\ldots,0,1)^\top.

```


---

## 2. Dimension

The **dimension** $\dim(U)$ is the number of vectors in **any** basis of $U$ (this number does not depend on which basis you choose).

**Example in $\mathbb{R}^3$:** The three vectors


```math
(1,0,0)^\top,\quad (1,1,0)^\top,\quad (1,1,1)^\top

```


form a basis of $\mathbb{R}^3$ (you can verify independence and spanning by solving $c_1\mathbf{v}_1+c_2\mathbf{v}_2+c_3\mathbf{v}_3=\mathbf{b}$ for arbitrary $\mathbf{b}$).

---

## 3. Rank of a matrix

For $A \in \mathbb{R}^{m \times n}$:

- **Column rank** $=$ dimension of $\operatorname{span}\{\text{columns of } A\}$ (the **column space**).
- **Row rank** $=$ dimension of the span of rows.

**Theorem (fundamental):** Row rank $=$ column rank $=$ **rank**$(A)$, denoted $\operatorname{rank}(A)$.

**Numerical example:**


```math
A = \begin{bmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \end{bmatrix}.

```


Column 2 is $2\times$ column 1; column 3 is $3\times$ column 1. Only **one** column is independent, so


```math
\operatorname{rank}(A) = 1.

```


---

## 4. Rank and the linear map $\mathbf{x} \mapsto A\mathbf{x}$

- $\operatorname{rank}(A)$ is the **dimension of the image** (column space): how large the output set can be.
- **Nullity** $\dim \mathcal{N}(A) = n - \operatorname{rank}(A)$ (**rank–nullity theorem**) counts **free parameters** in the solution of $A\mathbf{x}=\mathbf{0}$.

**Square $n \times n$ matrix:**  
$\operatorname{rank}(A)=n$ $\Leftrightarrow$ columns form a basis of $\mathbb{R}^n$ $\Leftrightarrow$ $A$ is **invertible**.

---

## 5. Machine learning connections

- **Low-rank** matrices approximate high-dimensional data with fewer parameters (**PCA**, Chapter 10; **SVD**, Chapter 4).
- **Effective rank** of feature matrices indicates how many **degrees of freedom** your linear model really has.

---

## Additional solved examples

*(MML Chapter 2, §2.6 style: basis and rank.)*

### Example A — Rank of a $2 \times 2$ matrix


```math
B = \begin{bmatrix} 2 & 0 \\ 1 & 0 \end{bmatrix}.

```


Column 2 is $0$; column 1 is nonzero. So $\operatorname{rank}(B) = 1$. **Null space:** $B\mathbf{x}=\mathbf{0}$ gives $2x_1=0$ and $x_1=0$, so $\mathbf{x}=(0,t)^\top$ with $t$ free — nullity $1$, and $1+1=2$ (rank–nullity).

---

### Example B — Extend to a basis of $\mathbb{R}^3$

Given $\mathbf{u}_1 = (1,1,0)^\top$ and $\mathbf{u}_2 = (1,0,1)^\top$ (independent), find $\mathbf{u}_3$ so that $\{\mathbf{u}_1,\mathbf{u}_2,\mathbf{u}_3\}$ is a basis.

Try $\mathbf{u}_3 = (1,0,0)^\top$. Solve $c_1\mathbf{u}_1+c_2\mathbf{u}_2+c_3\mathbf{u}_3=\mathbf{0}$ **by components**:


```math
c_1\begin{bmatrix}1\\1\\0\end{bmatrix}
+c_2\begin{bmatrix}1\\0\\1\end{bmatrix}
+c_3\begin{bmatrix}1\\0\\0\end{bmatrix}
=\begin{bmatrix}0\\0\\0\end{bmatrix}
\Rightarrow
\begin{cases}
c_1+c_2+c_3 = 0 & \text{(1st)} \\
c_1 = 0 & \text{(2nd)} \\
c_2 = 0 & \text{(3rd)}
\end{cases}
\Rightarrow
c_1=c_2=c_3=0.

```


So $\{\mathbf{u}_1,\mathbf{u}_2,\mathbf{u}_3\}$ is **linearly independent** (a basis of $\mathbb{R}^3$). **Any** vector not in $\operatorname{span}\{\mathbf{u}_1,\mathbf{u}_2\}$ could be chosen instead; $(1,0,0)^\top$ is one valid choice.

---

### Example C — Rank of a product (special case)

If $\mathbf{u} \in \mathbb{R}^m$, $\mathbf{v} \in \mathbb{R}^n$, the **outer product** $A = \mathbf{u}\mathbf{v}^\top$ is $m \times n$ with **rank 1** (every column is a multiple of $\mathbf{u}$). Example: $\mathbf{u}=(1,2)^\top$, $\mathbf{v}=(1,-1)^\top$.


```math
A = \begin{bmatrix} 1 \\ 2 \end{bmatrix}
\begin{bmatrix} 1 & -1 \end{bmatrix}
=
\begin{bmatrix} 1 & -1 \\ 2 & -2 \end{bmatrix}.

```


Second column is $-1$ times the first → $\operatorname{rank}(A)=1$. This is the **low-rank** structure behind many ML models.

---

## 6. Summary

1. A **basis** is an independent spanning set; **dimension** counts basis vectors.
2. **Rank** $=$ number of independent columns (equals number of independent rows).
3. Rank links **solvability** and **uniqueness** of $A\mathbf{x}=\mathbf{b}$ to linear structure.

---

*Work textbook problems that ask for a basis of the column space and the null space of small matrices.*
