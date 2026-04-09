# Day 7 — Simple guide (PCA & Gaussian mixtures)

This page explains **Day 7** in plain language. The official section list is in **[`Day07.md`](Day07.md)** (*Mathematics for Machine Learning*, **Chapter 10** — PCA, **Chapter 11** — Gaussian mixture models).

**Math on GitHub:** open on [github.com](https://github.com) in the **normal** view (not Raw). Display math uses **unindented** fences (first line: three backticks + `math`).

> **Reading comfort:** See the root [`README.md`](../README.md#reading-comfort).

---

## Contents

1. [What Day 7 is about](#big-picture)
2. [Part A — PCA (Chapter 10)](#pca)
3. [Part B — Gaussian mixture models (Chapter 11)](#gmm)
4. [How PCA and GMM fit together](#together)
5. [Suggested reading order](#reading-order)

---

<a id="big-picture"></a>

## 1. What Day 7 is about

**Two big ideas:**

1. **PCA (Principal Component Analysis)** — You have **many numbers per example** (high-dimensional vectors). PCA finds **a few new directions** that capture **most of the spread** (variance) in the data, so you can **compress** or **visualize** without keeping every original feature.

2. **GMM (Gaussian Mixture Model)** — You believe data come from **several groups**, each roughly **bell-shaped** (Gaussian), but you do not know **which group** each point belongs to. GMMs model that with **mixing weights** and **EM** to fit parameters from data.

**Reading order in the book:** Ch. **10** (§10.1 onward), then Ch. **11** (§11.1 onward). Details: [`Day07.md`](Day07.md).

---

<a id="pca"></a>

## 2. Part A — PCA (Chapter 10)

### The problem in one sentence

You store each example as a vector $x\in\mathbb{R}^D$ with **$D$ large**. You want a **lower-dimensional** representation that **keeps as much information as possible**—PCA makes that precise using **variance** and **orthogonal projections**.

### Terms (beginner)

| Term | Simple meaning |
| --- | --- |
| **Centering** | Subtract the **mean** of each feature so the cloud of data sits around the origin. PCA is usually done on **centered** data. |
| **Principal component** | A **direction** (unit vector) in feature space. The **first** PC is the direction along which the data vary **the most** (maximum variance). |
| **Maximum variance view (§10.2)** | Pick directions so that **projected** data have **largest spread**—spread = variance along that line. |
| **Projection view (§10.3)** | Same PCs can be found by **minimizing reconstruction error**: approximate each point by its projection onto a **low-dimensional subspace** and keep the error small (in mean-square sense). |
| **Eigenvectors / eigenvalues** | PCA directions solve a **symmetric** matrix problem built from the **covariance** (or scatter) of the data. **Larger eigenvalues** mean **more variance** along the matching eigenvector direction. |
| **Low-rank approximation (§10.4)** | Keeping only the top few PCs is like approximating the data matrix with a **simpler** (lower-rank) matrix—connected to the **SVD** (see MML Ch. 4). |
| **High dimensions (§10.5)** | When $D$ is huge, you **do not** form huge matrices naively; tricks use the **number of points** $N$ when $N\ll D$ (same chapter). |
| **PCA in practice (§10.6)** | Workflow: center → compute subspace (e.g. via SVD) → choose how many components → project data. |
| **Latent view (§10.7, optional)** | PCA can also be read as a **linear generative** story with latent factors—useful if your course links PCA to hidden causes. |

### Formulas (core idea, not every proof)

With **centered** data matrix $X$ (rows or columns as examples—**follow the book’s convention**), principal directions come from the **eigendecomposition** of the **data covariance** (up to scaling). The **first** principal direction $u_1$ solves (conceptually):

```math
\max_{\|u\|=1}\; u^\top S\, u
```

where $S$ is the (sample) covariance matrix. Subsequent PCs are **orthogonal** to previous ones and capture the **next** most variance.

**Projection** of a vector $x$ onto a direction $u$ (unit length):

```math
\mathrm{proj}_u(x) = (u^\top x)\,u\,.
```

Keeping the first $M$ principal components approximates $x$ in an **$M$-dimensional** subspace with **minimal average squared error** (that is the **projection perspective**).

### Tiny example (idea)

100 students, 50 features each. PCA might show that **most variation** sits in **3 directions** (e.g. overall “size,” “style,” “noise”). You plot scores on those 3 instead of 50—easier to **see** clusters or trends.

---

<a id="gmm"></a>

## 3. Part B — Gaussian mixture models (Chapter 11)

### The problem in one sentence

Data are **not** from a **single** bell curve; they look like a **mixture** of several bells (**clusters**). A **GMM** says: each point is drawn by (1) picking a **component** $k$ with some probability $\pi_k$, then (2) drawing from a **Gaussian** with mean $\mu_k$ and covariance $\Sigma_k$.

### Terms (beginner)

| Term | Simple meaning |
| --- | --- |
| **Mixture weights** $\pi_k$ | Probabilities that **sum to 1**; how often each component is used. |
| **Component** | One Gaussian in the mixture—its own mean and covariance. |
| **Latent variable** $z$ | **Hidden** label: “which component generated this point?” Not observed—**inferred**. |
| **Likelihood** | Probability (density) of **observed** data given **all** mixture parameters. Product over data points if **i.i.d.** |
| **MLE (§11.2)** | Choose parameters to **maximize** likelihood. For mixtures, there is **no** closed-form solution like OLS—**iterative** methods are used. |
| **EM algorithm (§11.3)** | **E-step:** guess **soft assignments** (probabilities each point belongs to each component). **M-step:** update means, covariances, and weights to better match the data. Repeat until stable. |
| **Latent-variable perspective (§11.4)** | Write the model with $z$ explicit; **joint** likelihood $p(x,z)$; **posterior** $p(z\mid x)$ tells you **assignment probabilities**. For a **dataset**, multiply independent contributions. |

### Formula (mixture density, one sample)

A **$K$-component** mixture in $\mathbb{R}^D$:

```math
p(x) = \sum_{k=1}^K \pi_k\,\mathcal{N}(x\mid \mu_k,\Sigma_k)\,,\qquad \pi_k\ge 0,\;\;\sum_k \pi_k=1\,.
```

### EM in plain words

1. **Start** with initial guesses for $\pi_k,\mu_k,\Sigma_k$.  
2. **E-step:** For each point, compute **responsibility** $\gamma_{nk}$ ≈ “how much component $k$ explains point $n$.”  
3. **M-step:** Treat those responsibilities like **soft counts** and update parameters (weighted means/covariances, new $\pi_k$).  
4. **Repeat**; likelihood usually **increases** each iteration until convergence.

### Tiny example (idea)

Height data in one city: **children** and **adults** overlap but form **two bumps**. A **2-component** GMM can separate the bumps **without** labels—EM finds two Gaussians and **soft** membership.

---

<a id="together"></a>

## 4. How PCA and GMM fit together

| | **PCA** | **GMM** |
| --- | --- | --- |
| **Goal** | **Compress / denoise / visualize** linear structure | **Model clusters** as overlapping Gaussians |
| **Output** | New coordinates (scores), fewer dimensions | Probabilities, cluster parameters, assignments |
| **Supervision** | **Unsupervised** | **Unsupervised** |
| **Key math** | **Eigenvalues / SVD**, projections | **Mixture likelihood**, **EM** |

They are often **used together in pipelines**: PCA to reduce noise or dimension, then GMM (or $k$-means) on the **reduced** data—**not** required by theory, but common in practice.

---

<a id="reading-order"></a>

## 5. Suggested reading order (same as [`Day07.md`](Day07.md))

1. **Chapter 10** — §10.1 → §10.5, then **§10.6** (steps in practice) and optionally **§10.7** (latent-variable angle for PCA).  
2. **Chapter 11** — §11.1 → **§11.4** (model → likelihood / EM → latent & posterior story for a full dataset).

**Prerequisites (light):** eigenvalues / SVD ideas (MML Ch. 4), Gaussians (Ch. 6), projection / least-squares intuition (Ch. 9 helps for PCA). Probabilistic notation from Ch. 8 helps for GMM.

---

*This page is a study aid; proofs and full algorithms are in the textbook.*
