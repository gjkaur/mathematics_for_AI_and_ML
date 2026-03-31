# 12 — Angles and Orthogonality

> **Reference (MML):** Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, **§3.4** — *Angles and Orthogonality*.

---

## Why learn this?

**Angles** quantify how similar two directions are (cosine similarity). **Orthogonality** means “no linear overlap” in inner-product sense—clean decompositions into **signal + orthogonal noise** and the geometry of **least squares**.

**Where it is used (applications):**

- **Cosine similarity** for document and embedding vectors.
- **Orthogonal projections** in regression; residuals orthogonal to fitted span (Chapter 9).
- **PCA:** orthogonal principal directions; variance along orthogonal axes (Chapter 10).
- **QR / SVD / Gram–Schmidt:** build orthogonal or orthonormal bases for stable computation.

---

## Overview

The **angle** between two vectors in $\mathbb{R}^n$ is defined using the **inner product** and **lengths**. **Orthogonality** (90° angle) means **zero inner product**. **Orthonormal** sets are coordinate systems with no redundancy—central to **projections**, **PCA**, and **QR/SVD** (later chapters).

---

## 1. Cosine of the angle

For nonzero $\mathbf{x}, \mathbf{y} \in \mathbb{R}^n$, the **cosine** of the angle $\omega \in [0,\pi]$ between them is


```math
\cos \omega = \frac{\langle \mathbf{x}, \mathbf{y} \rangle}{\|\mathbf{x}\| \, \|\mathbf{y}\|}.

```


By **Cauchy–Schwarz**, $|\cos\omega| \le 1$, so $\omega$ is well-defined.

**Worked example:** $\mathbf{x} = (1,0)^\top$, $\mathbf{y} = (1,1)^\top$.


```math
\langle \mathbf{x},\mathbf{y} \rangle = 1, \quad \|\mathbf{x}\| = 1, \quad \|\mathbf{y}\| = \sqrt{2}
\quad\Rightarrow\quad
\cos\omega = \frac{1}{\sqrt{2}}
\quad\Rightarrow\quad
\omega = 45^\circ.

```


---

## 2. Orthogonality

$\mathbf{x}$ and $\mathbf{y}$ are **orthogonal**, written $\mathbf{x} \perp \mathbf{y}$, if


```math
\langle \mathbf{x}, \mathbf{y} \rangle = 0.

```


For nonzero vectors, this is equivalent to $\omega = 90^\circ$.

**Example:** $\mathbf{x} = (1,2)^\top$, $\mathbf{y} = (2,-1)^\top$.


```math
\langle \mathbf{x},\mathbf{y} \rangle = 1\cdot 2 + 2\cdot(-1) = 0
\quad\Rightarrow\quad
\mathbf{x} \perp \mathbf{y}.

```


---

## 3. Orthonormal sets

Vectors $\mathbf{q}_1,\ldots,\mathbf{q}_k$ are **orthonormal** if


```math
\langle \mathbf{q}_i, \mathbf{q}_j \rangle = \delta_{ij} =
\begin{cases}
1, & i = j, \\
0, & i \neq j.
\end{cases}

```


So each $\mathbf{q}_i$ has **unit length**, and distinct vectors are **orthogonal**. An **orthonormal basis** makes coordinates easy: $\langle \mathbf{x}, \mathbf{q}_i\rangle$ is the **$i$-th coefficient** of $\mathbf{x}$ in that basis.

---

## 4. Orthogonal projection (preview of least squares)

If $\mathbf{u}$ is a **unit** vector ($\|\mathbf{u}\|=1$), the **orthogonal projection** of $\mathbf{y}$ onto the line spanned by $\mathbf{u}$ is


```math
\operatorname{proj}_{\mathbf{u}}(\mathbf{y}) = \langle \mathbf{u}, \mathbf{y} \rangle \, \mathbf{u} = (\mathbf{u}^\top \mathbf{y}) \mathbf{u}.

```


The **residual** $\mathbf{y} - \operatorname{proj}_{\mathbf{u}}(\mathbf{y})$ is **orthogonal** to $\mathbf{u}$.

**Numerical check:** $\mathbf{y} = (3,4)^\top$, $\mathbf{u} = (1,0)^\top$.


```math
\operatorname{proj}_{\mathbf{u}}(\mathbf{y}) = 3 \mathbf{u} = (3,0)^\top, \quad
\text{residual} = (0,4)^\top, \quad
\langle (0,4)^\top, (1,0)^\top \rangle = 0 \quad \checkmark

```


This is the geometric core of **linear regression** as orthogonal projection (Chapter 9, §9.4).

---

## 5. Cosine similarity (NLP / IR)


```math
\text{cosine-sim}(\mathbf{x},\mathbf{y}) = \frac{\langle \mathbf{x},\mathbf{y} \rangle}{\|\mathbf{x}\|\|\mathbf{y}\|} = \cos \omega.

```


It measures **directional** similarity, ignoring vector **magnitude** (length-normalized dot product).

---

## Additional solved examples

*(MML Chapter 3, §3.4 style.)*

### Example A — Angle between two standard basis vectors

$\mathbf{e}_1=(1,0)^\top$, $\mathbf{e}_2=(0,1)^\top$. Then $\langle \mathbf{e}_1,\mathbf{e}_2\rangle=0$, so $\cos\omega=0$ and $\omega = 90^\circ$ — **orthogonal**.

---

### Example B — Orthogonal projection onto a non-unit direction

Project $\mathbf{y}=(4,3)^\top$ onto $\mathbf{v}=(2,0)^\top$. First normalize: $\mathbf{u} = \mathbf{v}/\|\mathbf{v}\|_2 = (1,0)^\top$. Then


```math
\mathrm{proj}_{\mathbf{v}}(\mathbf{y}) = \langle \mathbf{y},\mathbf{u}\rangle \mathbf{u} = 4(1,0)^\top = (4,0)^\top.

```


(Equivalently $\frac{\mathbf{v}^\top\mathbf{y}}{\mathbf{v}^\top\mathbf{v}}\mathbf{v} = \frac{8}{4}(2,0)^\top=(4,0)^\top$.)

Residual: $(4,3)-(4,0)=(0,3)^\top$, which is **orthogonal** to $(2,0)^\top$.

---

### Example C — Cosine similarity

$\mathbf{a}=(1,1)^\top$, $\mathbf{b}=(1,0)^\top$.


```math
\cos\omega = \frac{1}{\sqrt{2}\cdot 1} = \frac{1}{\sqrt{2}}, \quad \omega = 45^\circ.

```


Cosine similarity (often used for text vectors) is $\cos\omega \approx 0.707$.

---

### Example D — Gram–Schmidt preview (orthonormal pair)

Start with $\mathbf{v}_1=(1,1)^\top$, $\mathbf{v}_2=(1,0)^\top$. Let $\mathbf{u}_1 = \mathbf{v}_1/\|\mathbf{v}_1\|_2 = \frac{1}{\sqrt{2}}(1,1)^\top$. Subtract projection of $\mathbf{v}_2$ onto $\mathbf{u}_1$:


```math
\mathbf{w}_2 = \mathbf{v}_2 - \langle \mathbf{v}_2,\mathbf{u}_1\rangle \mathbf{u}_1
= (1,0)^\top - \frac{1}{\sqrt{2}}\cdot \frac{1}{\sqrt{2}}(1,1)^\top
= \left(\frac{1}{2},\, -\frac{1}{2}\right)^\top.

```


Normalize $\mathbf{u}_2 = \mathbf{w}_2/\|\mathbf{w}_2\|_2$ to get an **orthonormal** pair from two independent vectors (full Gram–Schmidt in §3.5 of the book).

---

## 6. Summary

1. **Angle** $\omega$ satisfies $\cos\omega = \dfrac{\langle \mathbf{x},\mathbf{y}\rangle}{\|\mathbf{x}\|\|\mathbf{y}\|}$.
2. **Orthogonal** $\Leftrightarrow$ $\langle \mathbf{x},\mathbf{y}\rangle = 0$ (for nonzero vectors, 90°).
3. **Orthonormal** bases simplify **coordinates** and **projections**; they appear throughout Part I and in PCA/SVD.

---

*Next in the book: orthonormal bases (§3.5), orthogonal complements (§3.6), projections (§3.8).*
