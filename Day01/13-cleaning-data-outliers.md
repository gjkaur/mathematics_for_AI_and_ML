# 13 — Cleaning Data from Outliers

> **References (MML):** Ch. 8 — *When Models Meet Data* (data, risk, assumptions); Ch. 9 — *Linear Regression* (residuals, influence); Ch. 6 — *Probability and Distribution* (tails of distributions, noise models).

---

## Why learn this?

Real data contain **errors**, **mislabels**, and **rare events**. **Outliers** can distort least-squares fits and mislead validation metrics. You need a **clear** idea: outlier relative to **what model** (residuals, distance, likelihood)—and the math from MML (risk, noise, regression) is what makes that precise.

**Where it is used (applications):**

- **Data quality** before training: detect bad sensors, typos, or impossible combinations.
- **Robust training:** down-weight or clip extreme residuals; use heavy-tailed or Huber losses (beyond core MML, but same probability story).
- **Anomaly detection:** fraud, intrusion detection, manufacturing defects.
- **Influence diagnostics** in regression: how much one point moves $\hat{\mathbf{w}}$.

---

## Overview

**Outliers** are observations that are **unusual** relative to most of the data or **inconsistent** with the model you fit (measurement errors, wrong labels, rare events). The textbook does not use one single “chapter on cleaning”; instead, **residuals**, **geometry of regression**, and **probabilistic modeling** tell you when a point is **hard to explain** under your assumptions.

---

## 1. What is an outlier?

There is **no universal definition**. Common approaches:

1. **Distance-based:** feature vector is far from the bulk of the data (e.g. far from the mean in $\mathbb{R}^d$).
2. **Residual-based:** after fitting a model, prediction error $r_i = y_i - \hat{y}_i$ is unusually large.
3. **Probabilistic:** under an assumed distribution for noise, the observation has **very low** density (unlikely).

---

## 2. Residual view (regression)

Fit $\hat{y}_i = w x_i + b$. The **residual** is


```math
r_i = y_i - \hat{y}_i.

```


**Toy dataset:**

| $x_i$ | $y_i$ |
|------|---------|
| $1$ | $2.1$ |
| $2$ | $3.9$ |
| $3$ | $6.2$ |
| $4$ | $20.0$  (suspicious) |

The first three points are roughly consistent with a line through the origin with slope $\approx 2$. The fourth point **pulls** a least-squares fit strongly or produces a **large residual** if you fit without it.

**Least squares** uses **squared** residuals, so **large** errors are penalized **very** heavily—outliers can dominate the fit.

---

## 3. Distance-based view in feature space

Let feature vectors be $\mathbf{x}_i \in \mathbb{R}^d$. With sample mean


```math
\bar{\mathbf{x}} = \frac{1}{N}\sum_{i=1}^N \mathbf{x}_i,

```


large values of


```math
\|\mathbf{x}_i - \bar{\mathbf{x}}\|_2

```


flag points **far from the center** (candidate outliers in **unsupervised** screening).

**Example in $\mathbb{R}^2$:** Cluster near $(1,1)$; a point $(10,10)$ has large distance to $\bar{\mathbf{x}} \approx (1,1)$.

---

## 4. Probabilistic view (Gaussian noise)

If you model $y_i = \mathbf{w}^\top \mathbf{x}_i + \varepsilon_i$ with $\varepsilon_i \sim \mathcal{N}(0,\sigma^2)$, then **large** $|r_i|$ are **unlikely** under the model. A common rule of thumb is to **inspect** points with


```math
|r_i| > 3\sigma

```


(**three-sigma rule**), remembering that Gaussian tails are **thin**—real data often have **heavier tails** (Chapter 6 motivates choosing distributions that match data).

---

## 5. What the textbook emphasizes

- **Chapter 8:** Data enter through **empirical risk**; bad points affect training and validation.
- **Chapter 9:** **Projection** and **residuals** show how each observation affects the fit.
- **Chapter 6:** The **noise model** (Gaussian vs heavy-tailed) encodes how often you expect “extreme” values.

---

## 6. Practical takeaway

1. **Define** outlier relative to a **model** (distance, residual, or likelihood).
2. **Document** rules (thresholds, robust alternatives) before you delete data.
3. **Distinguish** harmful errors from **valid rare events** you should keep.

---

## Additional solved examples

*(Conceptual/numerical; complements Ch. 8–9 ideas in MML.)*

### Example A — Residuals from a hand-fit line

Data: $(x_i,y_i) = (0,1),\,(1,3),\,(2,5),\,(3,30)$. Suppose you believe $y \approx 2x+1$ (ignoring the last point for a moment).

Predictions $\hat{y}_i = 2x_i+1$: $1,3,5,7$. Residuals $r_i = y_i - \hat{y}_i$:

| $i$ | $x_i$ | $y_i$ | $\hat{y}_i$ | $r_i$ |
|-----|-------|-------|-------------|-------|
| 1 | 0 | 1 | 1 | 0 |
| 2 | 1 | 3 | 3 | 0 |
| 3 | 2 | 5 | 5 | 0 |
| 4 | 3 | 30 | 7 | **23** |

The fourth residual is **enormous** compared to the others → strong **candidate outlier** before you even run formal tests.

---

### Example B — $z$-score distance in 1D

Sample values $1,2,3,4,100$ ($n=5$). **Sample mean** $\bar{x} = (1+2+3+4+100)/5 = 22$.

**Sum of squared deviations** (from $\bar{x}$):


```math
(1-22)^2+(2-22)^2+(3-22)^2+(4-22)^2+(100-22)^2 = 441+400+361+324+6084 = 7610.

```


**Sample standard deviation** (divide by $n-1=4$):


```math
s = \sqrt{7610/4} = \sqrt{1902.5} \approx 43.62.

```


The value $100$ has **$z$-score** $(100-22)/s \approx 78/43.62 \approx 1.79$. It is **far** from the bulk in raw terms, yet **below** a common $|z|>3$ rule—illustrating that **blind** $3\sigma$ rules miss context (heavy tails, small $n$, or legitimate extremes). Use $z$-scores with care and with your **model** for noise.

---

### Example C — Influence of one point on least-squares slope

Fit a line $y = wx$ through origin to $(1,1)$ and $(2,2)$: perfect line $y=x$, $w=1$. Add $(10,0)$. Then minimizing $\sum (y_i - w x_i)^2$ pulls $w$ **down** because the new point wants a small slope. **One** distant point can move $\hat{w}$ a lot → motivation for **robust** regression or outlier handling.

---

*Robust losses and heavy-tailed likelihoods go beyond the core MML narrative but rest on the same probability and risk concepts.*
