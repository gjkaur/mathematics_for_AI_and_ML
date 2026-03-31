# Day 2 — Study guide (MML textbook mapping)

**Textbook:** *Mathematics for Machine Learning* — Marc Peter Deisenroth, A. Aldo Faisal, Cheng Soon Ong (Cambridge University Press; PDF editions often dated 2020–2021).

Use the book as the primary reference for definitions, examples, and exercises. Section numbers follow the standard structure of the book (see [mml-book.com](https://mml-book.com/)).

---

## 1. Orthonormal basis and related geometry

| Topic | Primary chapter / sections |
| --- | --- |
| Orthonormal basis | **Chapter 3 — Analytic Geometry**, §3.5 *Orthonormal Basis* |
| Orthogonal complement | **Chapter 3**, §3.6 *Orthogonal Complement* |
| Inner product of functions | **Chapter 3**, §3.7 *Inner Product of Functions* |
| Orthogonal projections | **Chapter 3**, §3.8 *Orthogonal Projections* |
| Rotations | **Chapter 3**, §3.9 *Rotations* |

---

## 2. Matrix decompositions (determinants through eigendecomposition)

| Topic | Primary chapter / sections |
| --- | --- |
| Determinant and trace | **Chapter 4 — Matrix Decompositions**, §4.1 *Determinant and Trace* |
| Eigenvalues and eigenvectors | **Chapter 4**, §4.2 *Eigenvalues and Eigenvectors* |
| Cholesky decomposition | **Chapter 4**, §4.3 *Cholesky Decomposition* |
| Eigendecomposition and diagonalization | **Chapter 4**, §4.4 *Eigendecomposition and Diagonalization* |

---

## 3. SVD, matrix operations, and approximation

| Topic | Primary chapter / sections |
| --- | --- |
| Singular value decomposition (SVD) | **Chapter 4**, §4.5 *Singular Value Decomposition* |
| Operations on matrices | **Chapter 2 — Linear Algebra**, §2.2 *Matrices* (addition, multiplication, transpose, identity, inverse where applicable; computational view of matrix algebra). Revisit as needed while reading **Chapter 4** (decompositions are built from these operations). |
| Matrix approximation | **Chapter 4**, §4.5 *Singular Value Decomposition* — low-rank matrix approximation (Eckart–Young theorem; best rank‑\(k\) approximation in Frobenius norm). **Chapter 4**, §4.4 *Eigendecomposition and Diagonalization* — when the matrix is symmetric PSD, diagonalization also supports spectral views used in approximation. |

---

## 4. Matrix phylogeny

**Matrix phylogeny** is **not** a standard section or index entry in *Mathematics for Machine Learning*. Treat it as **course-specific**:

- Use your lecture notes or slides for the exact definition your instructor uses.
- If the idea is **how decompositions relate to each other** (e.g., when Cholesky applies, when eigendecomposition vs SVD), the supporting material is **Chapter 4** as a whole, plus **§2.2** (Matrices) and **§4.2** (eigenvalues) for prerequisites.
- If the term was meant to be something else (e.g., matrix **properties**, **provenance**, or a domain-specific tree), **confirm the wording** with your instructor and map it to **Chapters 2–4** once clarified.

---

## Suggested reading order for Day 2

1. **Chapter 3** — §3.5–§3.9 (complete the orthonormal / projection / rotation thread).  
2. **Chapter 2** — §2.2 *Matrices* (refresh if operations on matrices feel rusty).  
3. **Chapter 4** — §4.1–§4.5 in order (determinant/trace through SVD, including matrix approximation via SVD).

---

## Quick reference — book chapters touched on Day 2

| Book chapter | Title |
| --- | --- |
| 2 | Linear Algebra (esp. §2.2 Matrices) |
| 3 | Analytic Geometry (esp. §3.5–§3.9) |
| 4 | Matrix Decompositions |

---

*This file maps lecture topics to the textbook only; it does not replace solving exercises from the book.*
