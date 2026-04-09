# Day 7 — Study guide (MML textbook mapping)

**Textbook:** *Mathematics for Machine Learning* — Marc Peter Deisenroth, A. Aldo Faisal, Cheng Soon Ong (Cambridge University Press; PDF editions often dated 2020–2021).

Use the book as the primary reference for definitions, examples, and exercises. Section numbers follow the standard structure of the book (see [mml-book.com](https://mml-book.com/)).

**Simple guide:** [README.md](README.md) — PCA and Gaussian mixtures explained in plain language (not a substitute for the book).

---

## 1. Dimensionality reduction (PCA)

| Topic | Primary chapter / sections |
| --- | --- |
| Problem setting (PCA) | **Chapter 10 — Dimensionality Reduction with Principal Component Analysis**, §10.1 *Problem Setting* |
| Maximum variance perspective | **Chapter 10**, §10.2 *Maximum Variance Perspective* |
| Projection perspective | **Chapter 10**, §10.3 *Projection Perspective* |
| Eigenvector computation and low-rank approximations | **Chapter 10**, §10.4 *Eigenvector Computation and Low-Rank Approximations* |
| PCA in high dimensions | **Chapter 10**, §10.5 *PCA in High Dimensions* |

*Related in the same chapter:* **§10.6** *Key Steps of PCA in Practice* (workflow); **§10.7** *Latent Variable Perspective* (PCA as a latent-variable / generative viewpoint — read when your lecture emphasizes that angle).

---

## 2. Density estimation (Gaussian mixture models)

| Topic | Primary chapter / sections |
| --- | --- |
| Gaussian mixture model (GMM) | **Chapter 11 — Density Estimation with Gaussian Mixture Models**, §11.1 *Gaussian Mixture Model* |
| Parameter learning via maximum likelihood | **Chapter 11**, §11.2 *Parameter Learning via Maximum Likelihood* |
| EM (expectation–maximization) algorithm | **Chapter 11**, §11.3 *EM Algorithm* |

---

## 3. Latent-variable perspective: likelihood, posterior, and full data

Your outline’s **latent-variable perspective** (with **likelihood**), plus **posterior distribution** and **extension to a full dataset**, align with the GMM chapter’s closing conceptual section:

| Topic | Primary chapter / sections |
| --- | --- |
| Latent-variable perspective; likelihood | **Chapter 11**, §11.4 *Latent-Variable Perspective* |
| Posterior distribution | **Chapter 11**, §11.4 *Latent-Variable Perspective* (posterior over latent assignment variables in the mixture) |
| Extension to a full dataset | **Chapter 11**, §11.4 *Latent-Variable Perspective* (i.i.d. observations / dataset likelihood and inference) |

If your instructor also treats **PCA** from a latent-variable viewpoint, pair **§11.4** with **Chapter 10**, §10.7 *Latent Variable Perspective*.

---

## Suggested reading order for Day 7

1. **Chapter 10** — §10.1 → §10.5 (then §10.6–§10.7 as assigned).  
2. **Chapter 11** — §11.1 → §11.4 in order (model → likelihood / EM → latent-variable story including posterior and full-dataset notation).

**Prerequisites:** **Chapter 4** (eigenvalues, SVD, low-rank approximation), **Chapter 6** (Gaussian distributions), **Chapter 9** (least squares / projection intuition) for PCA; **Chapter 8** (probabilistic modeling) for GMM notation.

---

## Quick reference — book chapters touched on Day 7

| Book chapter | Title |
| --- | --- |
| 10 | Dimensionality Reduction with Principal Component Analysis |
| 11 | Density Estimation with Gaussian Mixture Models |

---

*This file maps lecture topics to the textbook only; it does not replace solving exercises from the book.*
