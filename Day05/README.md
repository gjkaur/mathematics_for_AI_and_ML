# Day 5 — Terms, definitions & formulas

Reference sheet for **Day 5** in *Mathematics for Machine Learning*: **Ch. 6 §6.6–6.7** and **Ch. 7 §7.1–7.3**. Section numbers and reading order: **[`Day05.md`](Day05.md)**. **Numerical exercises:** **[`README-practice.md`](README-practice.md)**.

**Math on GitHub:** use the **normal** file view on [github.com](https://github.com) (not Raw). Display formulas use **unindented** display-math fences (first line: three backticks, then the word `math`).

> **Reading comfort:** See the root [`README.md`](../README.md#reading-comfort).

---

## Contents

1. [Probability — exponential family & conjugacy (§6.6)](#sec66)
2. [Probability — change of variables (§6.7)](#sec67)
3. [Optimization — gradient descent (§7.1)](#sec71)
4. [Optimization — Lagrange multipliers (§7.2)](#sec72)
5. [Optimization — convex sets, LP, QP, convex conjugate (§7.3)](#sec73)
6. [Symbol index](#symbols)

---

<a id="sec66"></a>

## 1. Exponential family & conjugacy (Ch. 6 §6.6)

### Definitions

| Term | Meaning |
| --- | --- |
| **Parameter** | A quantity $\theta$ that indexes a family of distributions (often unknown). |
| **Prior** $p(\theta)$ | Belief about $\theta$ **before** observing data $\mathcal{D}$. |
| **Likelihood** $p(\mathcal{D}\mid\theta)$ | Probability (or density) of the data **given** $\theta$. |
| **Posterior** $p(\theta\mid\mathcal{D})$ | Belief about $\theta$ **after** seeing data; obtained via **Bayes’ rule**. |
| **Conjugacy** | The prior is **conjugate** to the likelihood if the posterior belongs to the **same parametric family** as the prior (only hyperparameters change). |
| **Sufficient statistic** $T(x)$ | A function of the data such that the likelihood depends on the data **only** through $T(x)$ (for that model). |
| **Natural parameter** $\eta$ | The parameter vector appearing linearly inside the exponential in the canonical form below. |
| **Log-partition / cumulant** $A(\theta)$ | Ensures $\int p(x\mid\theta)\,dx = 1$ (or the sum equals $1$ in the discrete case). |

### Exponential family — general form

Many common models can be written as

```math
p(x\mid\theta) = h(x)\,\exp\!\big(\eta(\theta)^\top T(x) - A(\theta)\big)\,,
```

where $h(x)\ge 0$, $T(x)$ is the **vector of sufficient statistics**, $\eta(\theta)$ is the **natural parameter**, and $A(\theta)$ is the **log-partition function** (normalizes mass).

### Example — Bernoulli

For $X\in\{0,1\}$, $P(X=1)=p$:

```math
P(X=x)=p^x(1-p)^{1-x}=\exp\!\Big(x\ln\frac{p}{1-p}+\ln(1-p)\Big),\quad x\in\{0,1\}\,.
```

Here $T(x)=x$, natural parameter $\eta=\ln\frac{p}{1-p}$ (**log-odds**), and $A=-\ln(1-p)$ in the usual canonical packaging (book conventions may differ by reparameterization).

### Example — Beta–Binomial conjugacy

**Prior** on success probability $\theta\in(0,1)$:

```math
p(\theta)\propto \theta^{\alpha-1}(1-\theta)^{\beta-1}\,,\qquad \theta\sim\mathrm{Beta}(\alpha,\beta)\,.
```

**Likelihood** for $k$ successes in $n$ independent trials (given $\theta$):

```math
p(k\mid \theta)\propto \theta^k(1-\theta)^{n-k}\,.
```

**Posterior** (same Beta family):

```math
p(\theta\mid k,n)\propto \theta^{\alpha+k-1}(1-\theta)^{\beta+n-k-1}\,,\qquad
\theta\mid k,n \sim \mathrm{Beta}(\alpha+k,\;\beta+n-k)\,.
```

---

<a id="sec67"></a>

## 2. Change of variables (Ch. 6 §6.7)

### Definitions

| Term | Meaning |
| --- | --- |
| **Pushforward / induced distribution** | The distribution of $Y=g(X)$ when $X$ has a known distribution. |
| **Jacobian matrix** | Matrix of first derivatives $\dfrac{\partial g}{\partial x}$ for a multivariate map $g:\mathbb{R}^n\to\mathbb{R}^n$. |
| **Inverse transform sampling** | Sample $U\sim\mathrm{Uniform}(0,1)$, set $X=F^{-1}(U)$ where $F$ is a CDF to obtain draws from that law (when $F^{-1}$ is tractable). |

### One dimension

If $X$ has PDF $f_X$ and $Y=g(X)$ with $g$ **strictly monotone** and differentiable, then

```math
f_Y(y) = f_X\big(g^{-1}(y)\big)\,\left|\frac{d}{dy} g^{-1}(y)\right|\,.
```

**Affine map** $Y=aX+b$, $a\neq 0$:

```math
f_Y(y)=\frac{1}{|a|}\,f_X\!\left(\frac{y-b}{a}\right)\,.
```

### Several dimensions

If $g:\mathbb{R}^n\to\mathbb{R}^n$ is invertible and smooth, with $Y=g(X)$,

```math
f_Y(\mathbf{y}) = f_X\big(g^{-1}(\mathbf{y})\big)\,\big|J_{g^{-1}}(\mathbf{y})\big|\,,
```

where $|J_{g^{-1}}|$ is the absolute value of the Jacobian determinant of the **inverse** map (equivalently $1/|J_g|$ at the matching point—book uses whichever form matches the proof setup).

---

<a id="sec71"></a>

## 3. Gradient descent (Ch. 7 §7.1)

### Definitions

| Term | Meaning |
| --- | --- |
| **Objective / loss** $f(x)$ | Scalar function to **minimize** (e.g. empirical risk). |
| **Gradient** $\nabla f(x)$ | Vector $\big(\frac{\partial f}{\partial x_1},\ldots,\frac{\partial f}{\partial x_n}\big)^\top$; direction of **steepest ascent** of $f$ at $x$. |
| **Gradient descent step** | Move in the direction of **steepest descent** ($-\nabla f$). |
| **Step size / learning rate** $\eta>0$ | Scalar multiplying the gradient in the update. |

### Update rule (standard form)

Minimizing $f(x)$:

```math
x_{t+1} = x_t - \eta_t\,\nabla f(x_t)\,,
```

with $\eta_t$ fixed or chosen by a schedule / line search (book discusses variants).

**Univariate** case:

```math
x_{t+1} = x_t - \eta_t\,f'(x_t)\,.
```

---

<a id="sec72"></a>

## 4. Lagrange multipliers (Ch. 7 §7.2)

### Definitions

| Term | Meaning |
| --- | --- |
| **Equality constraint** | $h(x)=0$ (or vector $h(x)=0$) restricting feasible $x$. |
| **Feasible set** | All $x$ satisfying the constraints. |
| **Lagrangian** | Objective plus weighted constraints used to derive optimality conditions. |
| **Lagrange multiplier** $\lambda$ | Scalar (or vector) weight in the Lagrangian at a constrained optimum. |

### Equality-constrained problem

Minimize $f(x)$ subject to $h(x)=0$ (smooth functions, regularity conditions such as **LICQ** in more general settings).

**Lagrangian:**

```math
\mathcal{L}(x,\lambda) = f(x) + \lambda\,h(x)\quad\text{(sign convention can vary; match the book)}\,.
```

**Stationarity (first-order):** at a local minimizer $(x^\star,\lambda^\star)$,

```math
\nabla_x \mathcal{L}(x^\star,\lambda^\star)=0\,,\qquad h(x^\star)=0\,.
```

Equivalently $\nabla f(x^\star)$ is parallel to $\nabla h(x^\star)$ when $\nabla h\neq 0$:

```math
\nabla f(x^\star) = -\lambda^\star \nabla h(x^\star)
```

(sign depends on whether you write $\mathcal{L}=f+\lambda h$ or $f-\lambda h$).

### Inequality constraints (KKT — names only)

Problems with $g_i(x)\le 0$ introduce **KKT multipliers** and conditions (**stationarity, primal feasibility, dual feasibility, complementary slackness**). Full statement is in MML §7.2; the **Lagrangian** idea is the same, with extra sign rules for inequalities.

---

<a id="sec73"></a>

## 5. Convex optimization, LP, QP, convex conjugate (Ch. 7 §7.3)

### Convex sets and functions

**Convex set** $C$: for all $x,y\in C$ and $\theta\in[0,1]$,

```math
\theta x + (1-\theta)y \in C\,.
```

**Convex function** $f$ (on a convex domain): for all $x,y$ and $\theta\in[0,1]$,

```math
f\big(\theta x + (1-\theta)y\big) \le \theta f(x) + (1-\theta) f(y)\,.
```

For **smooth** convex $f$, **any** stationary point is a **global** minimizer.

### Linear programming (LP)

**Linear** objective and **linear** constraints (equalities and/or inequalities). A common schematic:

```math
\min_{x}\; c^\top x \quad \text{s.t.}\quad A x \le b,\;\; x \ge 0
```

(formats differ: maximize instead of minimize, equality rows, etc.). Feasible set is a **polyhedron**; if a minimum exists and the problem is bounded, an optimum occurs at a **vertex** (extreme point) in the standard polyhedral case.

### Quadratic programming (QP)

**Convex quadratic** objective, typically

```math
\min_{x}\; \frac{1}{2} x^\top Q x + c^\top x \quad \text{s.t.}\quad \text{linear constraints},
```

with $Q$ **positive semidefinite** ($Q\succeq 0$) so the objective is convex. Reduces to **least squares** when $Q$ comes from $A^\top A$ and constraints are linear.

### Convex conjugate (Legendre–Fenchel)

Given $f:\mathbb{R}^n\to\mathbb{R}\cup\{+\infty\}$, the **convex conjugate** is

```math
f^\ast(y) = \sup_{x\in\mathbb{R}^n}\;\big( y^\top x - f(x) \big)\,.
```

Used in **duality**, **Fenchel–Young inequality**, and analyzing regularizers; MML §7.3 ties this to convex optimization views in ML.

---

<a id="symbols"></a>

## 6. Symbol index (quick)

| Symbol | Typical meaning |
| --- | --- |
| $\theta$ | Parameter vector or scalar |
| $\eta$ | Natural parameter (exponential family) |
| $T(x)$ | Sufficient statistic |
| $A(\theta)$ | Log-partition function |
| $f_X$, $f_Y$ | Probability density functions |
| $g$, $g^{-1}$ | Transform and its inverse |
| $J$ | Jacobian (determinant when written $|J|$) |
| $\nabla f$ | Gradient of $f$ |
| $\eta_t$ or $\eta$ | Step size / learning rate |
| $h$, $\lambda$ | Constraint function, Lagrange multiplier |
| $Q$, $c$, $A$, $b$ | QP/LP data matrices and vectors |
| $f^\ast$ | Convex conjugate of $f$ |

---

## Suggested reading order (same as [`Day05.md`](Day05.md))

1. Ch. 6 §6.6 → §6.7  
2. Ch. 7 §7.1 → §7.2 → §7.3  

**Prerequisites:** Ch. 5 (gradients); Ch. 6 §6.1–6.5 for probability context; Ch. 2–3 for linear algebra geometry used in constraints and convex sets.

---

*This page summarizes terminology and standard formulas. Proofs, full KKT statements, and exercises are in the textbook.*
