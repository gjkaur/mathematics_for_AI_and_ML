# 11 — Lengths and Distances

> **Reference (MML):** Deisenroth, Faisal & Ong, *Mathematics for Machine Learning*, **§3.3** — *Lengths and Distances*.

---

## Why learn this?

**Distance** defines what “**near**” and “**far**” mean between feature vectors. Changing the norm changes the **shape** of balls and neighborhoods—so $k$-NN, clustering, and some losses behave differently under $L_1$ vs $L_2$ vs $L_\infty$.

**Where it is used (applications):**

- **$k$-nearest neighbors:** classify by majority vote among closest points (Euclidean or other metrics).
- **Clustering ($k$-means, etc.):** assign points to nearest center (usually $L_2$).
- **Reconstruction error** in PCA/autoencoders: often $L_2$ distance per sample.
- **Manifold learning / metric learning:** learn a distance or embedding tailored to the task.

---

## Overview

**Length** is the norm of a single vector. **Distance** between two points is the norm of their **difference**. Different norms ($L_1$, $L_2$, $L_\infty$) give different notions of “close,” which matters for **$k$-NN**, **clustering**, and **loss functions**.

---

## 1. Length (Euclidean)

The **Euclidean length** of $\mathbf{x} \in \mathbb{R}^n$ is


```math
\|\mathbf{x}\|_2 = \sqrt{\mathbf{x}^\top \mathbf{x}} = \sqrt{\sum_{i=1}^n x_i^2}.

```


**Example:**


```math
\mathbf{x} = \begin{bmatrix} 3 \\ 4 \end{bmatrix}
\quad\Rightarrow\quad
\|\mathbf{x}\|_2 = \sqrt{9+16} = 5.

```


More generally, **length** means $\|\mathbf{x}\|$ for whichever norm is chosen (note **09**).

---

## 2. Distance from a norm

If $\|\cdot\|$ is a norm, the **induced distance** is


```math
d(\mathbf{x}, \mathbf{y}) = \|\mathbf{x} - \mathbf{y}\|.

```


**Euclidean distance ($L_2$):**


```math
d_2(\mathbf{x}, \mathbf{y}) = \sqrt{\sum_{i=1}^n (x_i - y_i)^2}.

```


---

## 3. Worked example ($L_2$)

Let $\mathbf{x} = (1,0)^\top$ and $\mathbf{y} = (4,4)^\top$. Then


```math
\mathbf{x} - \mathbf{y} = \begin{bmatrix} -3 \\ -4 \end{bmatrix}, \quad
d_2(\mathbf{x},\mathbf{y}) = \sqrt{(-3)^2 + (-4)^2} = \sqrt{9+16} = 5.

```


So the points are **5 units apart** in Euclidean geometry.

---

## 4. Same pair of points: $L_1$ and $L_\infty$ distances

Using $\mathbf{x} - \mathbf{y} = (-3,-4)^\top$:

**Manhattan ($L_1$):**


```math
d_1(\mathbf{x},\mathbf{y}) = |-3| + |-4| = 7.

```


**Chebyshev ($L_\infty$):**


```math
d_\infty(\mathbf{x},\mathbf{y}) = \max(|-3|, |-4|) = 4.

```


So “how far apart” $\mathbf{x}$ and $\mathbf{y}$ are **depends on the norm**.

---

## 5. Metric space properties

For any norm-induced distance:

1. $d(\mathbf{x},\mathbf{y}) \ge 0$, with equality iff $\mathbf{x}=\mathbf{y}$.
2. $d(\mathbf{x},\mathbf{y}) = d(\mathbf{y},\mathbf{x})$ (**symmetry**).
3. **Triangle inequality:** $d(\mathbf{x},\mathbf{z}) \le d(\mathbf{x},\mathbf{y}) + d(\mathbf{y},\mathbf{z})$.

These properties justify using distance in **algorithms** (nearest neighbor, clustering).

---

## 6. Machine learning

- **$k$-nearest neighbors:** classify or average using **smallest** $d(\mathbf{x},\mathbf{x}_i)$.
- **$k$-means:** assigns points to centers by **minimum distance**.
- **Least squares:** minimizes sum of **squared** $L_2$ distances to predictions.

---

## Additional solved examples

*(MML Chapter 3, §3.3 style.)*

### Example A — Distance from a point to the origin

The **distance** from $\mathbf{x}$ to $\mathbf{0}$ is $d(\mathbf{x},\mathbf{0}) = \|\mathbf{x}-\mathbf{0}\| = \|\mathbf{x}\|$. For $\mathbf{x}=(1,2,2)^\top$:


```math
d_2(\mathbf{x},\mathbf{0}) = \sqrt{1+4+4} = 3.

```


---

### Example B — $k$-NN style comparison

Points $\mathbf{p}=(0,0)^\top$, $\mathbf{q}_1=(1,0)^\top$, $\mathbf{q}_2=(0,2)^\top$.


```math
d_2(\mathbf{p},\mathbf{q}_1) = 1, \quad d_2(\mathbf{p},\mathbf{q}_2) = 2.

```


So $\mathbf{q}_1$ is the **nearest** neighbor under Euclidean distance.

---

### Example C — Manhattan distance on a grid

From $(0,0)$ to $(3,4)$ moving only horizontally/vertically, **Manhattan** distance is $d_1 = 3+4=7$, while **Euclidean** “as the crow flies” is $d_2=5$. This is why $L_1$ is called **taxicab** distance.

---

## 7. Summary

1. **Length** = $\|\mathbf{x}\|$; **distance** = $\|\mathbf{x}-\mathbf{y}\|$.
2. **$L_2$** is the ordinary geometric distance; **$L_1$** and $L_\infty$ give different geometries.
3. Choosing the norm = choosing what **“near”** means for your application.

---

*PCA (Chapter 10) minimizes reconstruction error in $L_2$; robust methods sometimes use $L_1$.*
