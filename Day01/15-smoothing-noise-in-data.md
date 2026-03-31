# 15 — Smoothing Noise in Real-World Data

> **References (MML):** Ch. 6 — noise as randomness; Ch. 9 — Gaussian noise + least squares / MLE; Ch. 10 — PCA (variance, signal vs. noise in low-dimensional summaries).

---

## Why learn this?

Observed signals are almost always **noisy**. **Smoothing** reduces high-frequency junk while preserving **trend** or **low-dimensional structure**. The MML book links noise to **probability** (Chapter 6) and to **optimal** linear prediction under Gaussian models (Chapter 9); PCA (Chapter 10) gives a linear **signal vs. noise** separation story.

**Where it is used (applications):**

- **Time series:** moving averages, exponential smoothing, state-space models.
- **Image / audio:** denoising filters, low-pass behavior.
- **Regression / Gaussian processes:** assume smooth $f$ or correlated noise.
- **Dimensionality reduction:** PCA as variance-based smoothing (keep main components).

---

## Overview

**Noise** means random or unmodeled variation superimposed on a **signal** $f(\mathbf{x})$:


```math
y_i = f(\mathbf{x}_i) + \varepsilon_i.

```


**Smoothing** reduces high-frequency or spurious fluctuation while preserving **trend** or **structure**. Methods range from **moving averages** to **model-based** denoising (regression, PCA).

---

## 1. Signal + noise model

Let $\varepsilon_i$ have mean zero (often $\mathbb{E}[\varepsilon_i]=0$). **Small** variance $\mathrm{Var}(\varepsilon_i)$ means observations **hug** $f$; **large** variance means **scatter**.

If $\varepsilon_i \sim \mathcal{N}(0,\sigma^2)$, then **maximum likelihood** under a linear $f$ leads to **least squares** (Chapter 9)—fitting $f$ is a **global** way to “smooth” noisy $y$ in the direction of the model.

---

## 2. Moving average (local smoothing)

Given a sequence $y_1,\ldots,y_T$, a **simple moving average** replaces each value by an average of **neighbors** (window size $k$).

**Example sequence:**


```math
y = (5.1,\, 4.9,\, 5.2,\, 10.0,\, 5.0).

```


The spike $10.0$ may be noise. A **3-point** average around index $3$ (using indices $2,3,4$) gives


```math
\tilde{y}_3 = \frac{1}{3}(y_2 + y_3 + y_4) = \frac{1}{3}(4.9 + 5.2 + 10.0) \approx 6.7,

```


which is **smoother** than the raw $10.0$ (pulled toward neighbors).

**Trade-off:** larger windows **smooth more** but can **blur** real jumps (bias–variance tradeoff, Chapters 8–9).

---

## 3. Regression as smoothing

If you fit a **linear** model $\hat{y}_i = \hat{\mathbf{w}}^\top \mathbf{x}_i$ by least squares, the **predictions** $\hat{y}_i$ lie on a **smooth** surface (a hyperplane) in feature space; **residuals** $y_i - \hat{y}_i$ carry what the model does not explain—often interpreted as noise.

---

## 4. PCA perspective (Chapter 10, optional extension)

**Principal component analysis** keeps **low-dimensional** structure (directions of **large variance**) and treats small variance directions as less important—informally, a **linear** form of **denoising** or **compression** when the signal is low-rank.

---

## 5. Summary

1. **Noise** is modeled as random variation around $f(\mathbf{x})$.
2. **Moving averages** smooth **locally**; **regression** smooths **globally** under a model.
3. **Assumptions** on $\varepsilon_i$ (e.g. Gaussian) determine what **optimal** smoothing means (MLE / least squares).

---

## Additional solved examples

*(Numerical smoothing illustrations; ties to Ch. 6 & 9 themes in MML.)*

### Example A — Moving average step by step

$y = (10,\, 10,\, 10,\, 18,\, 10)$ (one spike at index 4). **Causal** 3-point average $\tilde{y}_i = \frac{1}{3}(y_{i-2}+y_{i-1}+y_i)$ for $i=3,4,5$:

- $\tilde{y}_3 = \frac{1}{3}(10+10+10)=10$
- $\tilde{y}_4 = \frac{1}{3}(10+10+18)=12.67$ (spike pulled down from 18)
- $\tilde{y}_5 = \frac{1}{3}(10+18+10)=12.67$

---

### Example B — Signal + Gaussian noise (one draw)

True $f(x)=x$. Sample $x=2$, noise $\varepsilon \sim \mathcal{N}(0,1)$, suppose $\varepsilon=-0.5$. Observation $y = 2 - 0.5 = 1.5$. **Regression** across many $(x,y)$ points recovers slope near $1$; a **single** point looks “wrong” vs $f(2)=2$ — ensemble averaging reduces noise.

---

### Example C — Variance decomposition (conceptual)

If $y_i = \mathbf{w}^\top \mathbf{x}_i + \varepsilon_i$ with $\varepsilon_i$ independent, $\mathrm{Var}(\varepsilon_i)=\sigma^2$, the **irreducible** prediction error variance under this model is at least $\sigma^2$. Smoothing / fitting reduces **structured** error but cannot remove **intrinsic** noise—matches bias–variance discussions around empirical risk (Ch. 8).

---

*Splines, Gaussian processes, and wavelets are beyond the core MML book but extend the same calculus and probability tools.*
