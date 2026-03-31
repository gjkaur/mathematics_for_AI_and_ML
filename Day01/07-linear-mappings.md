# 07 — Linear Mappings

> **Reference (MML):** Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, **§2.7** — *Linear Mappings*.

---

## Why learn this?

A **linear map** is exactly what a **matrix** does to vectors: stretch, rotate, project, embed. Deep networks are **stacks of linear maps + nonlinearities**; autoencoders and PCA are linear maps with constraints. **Image** and **kernel** tell you what is **reachable** and what **ambiguity** remains.

**Where it is used (applications):**

- **Neural network layers:** $ \mathbf{h} = W\mathbf{x} + \mathbf{b}$ (affine; linear part is a linear map).
- **Attention / linear attention (simplified views):** compositions of linear transforms on token vectors.
- **Data augmentation:** rotations, shears as linear maps in pixel space.
- **Backpropagation:** Jacobians of layer maps (Chapter 5) generalize “linearization” of nonlinear maps.

---

## Overview

A **linear mapping** (linear transformation) between vector spaces **preserves** vector addition and scalar multiplication. In finite dimensions, once you choose bases, every linear map is **multiplication by a matrix**. This is the mathematical backbone of **linear layers** in neural networks and of **derivatives** of multivariate functions (Chapter 5).

---

## 1. Definition

Let $V$ and $W$ be vector spaces over $\mathbb{R}$. A map $\Phi: V \to W$ is **linear** if for all $\mathbf{u},\mathbf{v} \in V$ and $\alpha,\beta \in \mathbb{R}$:


```math
\Phi(\alpha \mathbf{u} + \beta \mathbf{v}) = \alpha \Phi(\mathbf{u}) + \beta \Phi(\mathbf{v}).

```


Equivalently: $\Phi(\mathbf{u}+\mathbf{v}) = \Phi(\mathbf{u})+\Phi(\mathbf{v})$ and $\Phi(\alpha \mathbf{u}) = \alpha \Phi(\mathbf{u})$.

**Non-example:** $\Phi(\mathbf{x}) = \mathbf{x} + \mathbf{c}$ with fixed $\mathbf{c} \neq \mathbf{0}$ is **not** linear (unless you treat it as affine—note **08**).

---

## 2. Matrix representation

If $V = \mathbb{R}^n$ and $W = \mathbb{R}^m$ with the **standard bases**, every linear $\Phi$ can be written


```math
\Phi(\mathbf{x}) = A \mathbf{x}

```


for a unique $A \in \mathbb{R}^{m \times n}$. Column $j$ of $A$ equals $\Phi(\mathbf{e}_j)$.

---

## 3. Example: rotation in $\mathbb{R}^2$

Rotation by $90^\circ$ counterclockwise sends $(x_1,x_2)^\top \mapsto (-x_2, x_1)^\top$. Thus


```math
\Phi\begin{bmatrix} x_1 \\ x_2 \end{bmatrix}
=
\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}
\begin{bmatrix} x_1 \\ x_2 \end{bmatrix}.

```


Check on $\mathbf{e}_1 = (1,0)^\top$: $\Phi(\mathbf{e}_1) = (0,1)^\top$, which is the first column of $A$.

---

## 4. Image and kernel

- **Image (range):**  
  $\operatorname{Im}(\Phi) = \{ \Phi(\mathbf{v}) \mid \mathbf{v} \in V \}$.  
  For $\Phi(\mathbf{x})=A\mathbf{x}$, this is the **column space** of $A$.

- **Kernel (null space):**  
  $\ker(\Phi) = \{ \mathbf{v} \in V \mid \Phi(\mathbf{v}) = \mathbf{0} \}$.  
  For $\Phi(\mathbf{x})=A\mathbf{x}$, this is $\{ \mathbf{x} \mid A\mathbf{x}=\mathbf{0} \}$.

**Rank–nullity (finite-dimensional $V$):**


```math
\dim \ker(\Phi) + \dim \operatorname{Im}(\Phi) = \dim(V).

```


**Worked example:**


```math
A = \begin{bmatrix} 1 & 1 \\ 2 & 2 \end{bmatrix}.

```


$A\mathbf{x}=\mathbf{0}$ gives $x_1+x_2=0$, so $\ker(A) = \operatorname{span}\{(1,-1)^\top\}$, dimension $1$.  
$\operatorname{rank}(A)=1$, so $\dim\operatorname{Im}(A)=1$, and $2 = 1 + 1$ ✓.

---

## 5. Composition and matrix multiplication

If $\Phi(\mathbf{x}) = A\mathbf{x}$ and $\Psi(\mathbf{y}) = B\mathbf{y}$, then


```math
(\Psi \circ \Phi)(\mathbf{x}) = \Psi(A\mathbf{x}) = B(A\mathbf{x}) = (BA)\mathbf{x}.

```


So **composition** of linear maps corresponds to **matrix multiplication** (order: apply $\Phi$ first, then $\Psi$ → matrix $BA$).

---

## Additional solved examples

*(MML Chapter 2, §2.7 style.)*

### Example A — Image of a matrix

Let $A = \begin{bmatrix} 1 & 2 \\ 2 & 4 \end{bmatrix}$. Column 2 $= 2\times$ column 1, so


```math
\operatorname{Im}(A) = \operatorname{span}\left\{ \begin{bmatrix}1\\2\end{bmatrix} \right\}
```

(all multiples of $(1,2)^\top$). **Kernel:** $x_1+2x_2=0$ ⇒ $\mathbf{x}=t(-2,1)^\top$.

---

### Example B — Composition of two rotations in $\mathbb{R}^2$

Let $R_{90} = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$ (rotate $90^\circ$ counterclockwise). Then $R_{90}^2 = R_{180}$:


```math
R_{90}^2 =
\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}
\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}
=
\begin{bmatrix} -1 & 0 \\ 0 & -1 \end{bmatrix}
= -I_2.
```

So applying the rotation **twice** sends each vector to its **negative** (half-turn).

---

### Example C — Scaling map (diagonal matrix)

$\Phi(\mathbf{x}) = D\mathbf{x}$ with $D = \mathrm{diag}(2,3)$ scales the first coordinate by $2$ and the second by $3$. **Kernel** is $\{\mathbf{0}\}$ (full rank if diagonal entries nonzero). **Image** is all of $\mathbb{R}^2$.

---

## 6. Summary

1. **Linearity** = superposition: $\Phi(\alpha \mathbf{u}+\beta\mathbf{v}) = \alpha\Phi(\mathbf{u})+\beta\Phi(\mathbf{v})$.
2. In $\mathbb{R}^n$, linear maps are **matrices** $A\mathbf{x}$.
3. **Kernel** describes **ambiguity**; **image** describes **reachable outputs**; rank–nullity ties them to $n$.

---

*Deep networks alternate linear maps $A\mathbf{x}$ with nonlinear activations $\sigma$; the linear pieces are exactly this structure.*
