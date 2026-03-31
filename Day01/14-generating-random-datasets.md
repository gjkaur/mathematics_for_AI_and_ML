# 14 — Generating Controlled Random Datasets

> **References (MML):** Ch. 6 — *Probability and Distribution*; Ch. 8 — *When Models Meet Data*; Ch. 9 — *Linear Regression* (synthetic regression).

---

## Why learn this?

**Synthetic data** let you **know** the truth (true parameters, noise level) so you can **verify** algorithms, **debug** code, and **study** sample size and noise effects—without confounding real-world unknowns. Probability (Chapter 6) is the language for **sampling** those datasets.

**Where it is used (applications):**

- **Unit tests** for ML pipelines: reproducible inputs with `random.seed`.
- **Benchmarking** optimizers and estimators against known ground truth.
- **Simulation studies** in statistics and reinforcement learning (synthetic MDPs).
- **Data augmentation** (controlled randomness) and **privacy** (synthetic records).

---

## Overview

**Controlled** random data means **you** choose the **true** parameters, the **noise distribution**, and the **sampling** of inputs. Then you can verify that an estimator (e.g. least squares) **recovers** the truth on average. This is standard for **debugging** code and **studying** sample size effects.

---

## 1. Linear regression generative model (scalar $x$)

Assume


```math
y_i = w_0 + w_1 x_i + \varepsilon_i, \qquad \varepsilon_i \sim \mathcal{N}(0, \sigma^2) \text{ i.i.d.}

```


**Simulation procedure:**

1. Fix **ground truth** $(w_0, w_1)^\top$.
2. Choose inputs $x_1,\ldots,x_n$ (e.g. uniform on $[0,1]$, or deterministic grid).
3. Draw $\varepsilon_i \sim \mathcal{N}(0,\sigma^2)$.
4. Set $y_i = w_0 + w_1 x_i + \varepsilon_i$.

You obtain pairs $(x_i,y_i)$ that follow the **probabilistic model** used in Chapter 9.

---

## 2. Numerical example (one sample)

Let $w_0 = 1$, $w_1 = 2$, $\sigma = 0.1$. Take $x_1 = 0.5$ and draw (for example) $\varepsilon_1 = -0.03$. Then


```math
y_1 = 1 + 2(0.5) + (-0.03) = 1 + 1 - 0.03 = 1.97.

```


Repeat for $n \gg 1$ to get a **dataset**; fit $(\hat{w}_0,\hat{w}_1)$ by least squares and compare to $(1,2)$.

---

## 3. Multivariate inputs and Gaussians

For $\mathbf{x} \in \mathbb{R}^d$, a common choice is


```math
\mathbf{x} \sim \mathcal{N}(\boldsymbol{\mu}, \Sigma),

```


a **multivariate Gaussian** (Chapter 6). The **mean** $\boldsymbol{\mu}$ shifts the cloud; **covariance** $\Sigma$ controls shape and **correlations** between features.

**Independent coordinates:** If $\Sigma$ is diagonal with $\Sigma_{ii} = \sigma_i^2$, then each $x_i$ is sampled **independently** $\mathcal{N}(\mu_i, \sigma_i^2)$.

**Example:** $d=2$, $\boldsymbol{\mu}=\mathbf{0}$, $\Sigma = I_2$. Then $x_1,x_2 \sim \mathcal{N}(0,1)$ independently—points fill a **round** cloud near the origin.

---

## 4. Reproducibility

Use a **fixed random seed** in software (e.g. `numpy.random.seed` in Python) so that **everyone** regenerates the **same** dataset for debugging and for **reproducible** experiments.

---

## 5. Link to Chapter 8

Synthetic data specify the **generative** side; you still must choose a **hypothesis class** and **loss** (empirical risk) when you **learn** parameters from data—see Chapter 8.

---

## 6. Summary

1. **Control** = known truth + noise model + input design.
2. **Gaussian noise** pairs naturally with **least squares** / **MLE** in linear regression (Chapter 9).
3. **Multivariate Gaussians** model correlated feature vectors.

---

## Additional solved examples

*(Synthetic data generation; aligns with Ch. 6 & 9 of MML.)*

### Example A — Full mini dataset ($n=4$)

Truth: $y = 1 + 2x + \varepsilon$, $\varepsilon \sim \mathcal{N}(0, 0.01)$ (small noise). Take fixed inputs $x \in \{0,1,2,3\}$.

Suppose draws give $\varepsilon = 0,\,-0.02,\,0.01,\,-0.01$ (illustrative).

| $x$ | $y = 1+2x+\varepsilon$ |
|-----|-------------------------|
| 0 | $1$ |
| 1 | $2.98$ |
| 2 | $5.01$ |
| 3 | $6.99$ |

You can fit least squares and compare $\hat{w}_0,\hat{w}_1$ to $(1,2)$.

---

### Example B — Bivariate Gaussian with correlation

Let $(X_1,X_2)^\top \sim \mathcal{N}(\mathbf{0}, \Sigma)$ with $\Sigma = \begin{bmatrix} 1 & 0.8 \\ 0.8 & 1 \end{bmatrix}$. **High correlation** $0.8$ means samples tend to lie along a diagonal in the plane—useful for testing **PCA** later (first PC along that diagonal).

*(Generating exact samples by hand needs Cholesky $\Sigma = LL^\top$; numerically: `numpy.random.multivariate_normal`.)*

---

### Example C — Binary labels for classification toy data

Features $\mathbf{x}_i \in \mathbb{R}^2$, labels $y_i \in \{-1,+1\}$. For example, sample $\mathbf{x}_i \sim \mathcal{N}(\boldsymbol{\mu}_{y_i}, I)$ with $\boldsymbol{\mu}_{+1}=(1,1)^\top$, $\boldsymbol{\mu}_{-1}=(-1,-1)^\top$. You control **overlap** by scaling covariance—clean way to benchmark classifiers (related spirit to Ch. 8: data + model).

---

*Official tutorials on [mml-book.com](https://mml-book.com/) use synthetic data for regression and PCA.*
