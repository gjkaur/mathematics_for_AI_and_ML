# Day 5 — Concepts, formulas & simple numerical practice

**Simple definitions**, short explanations, and **hand-calculator–friendly** exercises for **Day 5** topics (MML Ch. 6 §6.6–6.7, Ch. 7 §7.1–7.3). Maps to **[`Day05.md`](Day05.md)**. Full **terms and formulas** reference: **[`README.md`](README.md)**.

**Math on GitHub:** display blocks use **unindented** display-math fences (first line: three backticks, then the word `math`). View the file on [github.com](https://github.com) in the **normal** view, not Raw.

> **Reading comfort:** See the root [`README.md`](../README.md#reading-comfort).

**How to use:** Skim **Simple definitions** below, then read each **Concept** block and try the **Problem** before **Solution**.

---

<a id="defs"></a>

## Simple definitions

Short meanings used in this sheet. (Formal versions are in MML.)

### Probability (§6.6–6.7)

| Term | Simple meaning |
| --- | --- |
| **Parameter** | A number that fixes a model (e.g. unknown success probability $\theta$). |
| **Prior** | What you believe about the parameter **before** seeing new data, written as a distribution $p(\theta)$. |
| **Likelihood** | How probable the **observed data** would be for different parameter values: $p(\mathcal{D}\mid\theta)$. |
| **Posterior** | What you believe **after** combining prior and data: $p(\theta\mid\mathcal{D})$ (via Bayes’ rule). |
| **Conjugacy** | A prior family is **conjugate** to a likelihood when the **posterior stays in the same family** as the prior—only the parameters change. |
| **Exponential family** | A standard “template” $p(x)\propto h(x)\exp(\eta^\top T(x)-A(\theta))$; many common distributions fit it. |
| **Sufficient statistic** | A summary $T(x)$ that carries all the information the data contribute about the parameter (in that model). |
| **Natural parameter** | The $\eta$ in the exponential-family template; often **not** the same as the “usual” parameter (e.g. log-odds vs $p$). |
| **PDF (density)** | For a **continuous** variable: $f(x)\ge 0$ with total integral $1$; $P(a\le X\le b)$ is an integral of $f$. |
| **Support** | The set of values where the PDF (or PMF) is **not** zero. |
| **Change of variables** | How the density of $Y=g(X)$ relates to the density of $X$; in 1D you multiply by **\|derivative\|** (“stretch factor”). |

### Optimization (§7.1–7.3)

| Term | Simple meaning |
| --- | --- |
| **Objective** | The function you want to **minimize** or **maximize** (e.g. training loss). |
| **Gradient** | Vector of partial derivatives; points in the direction of **steepest increase** of the objective. |
| **Gradient descent** | Update parameters by stepping **opposite** to the gradient to **reduce** a loss: $x\leftarrow x-\eta\nabla f(x)$. |
| **Step size (learning rate)** | $\eta>0$: how large each update is; too big can overshoot, too small can be slow. |
| **Constraint** | A rule the solution must satisfy (equality or inequality). |
| **Feasible point / region** | A point (or set) that **satisfies all** constraints. |
| **Lagrange multiplier** | A number $\lambda$ that balances “improve the objective” vs “satisfy an equality constraint” in the Lagrangian. |
| **Linear program (LP)** | **Linear** objective + **linear** constraints; in 2D the feasible set is often a polygon; optimum often at a **vertex**. |
| **Quadratic program (QP)** | **Convex quadratic** objective + (usually) linear constraints; generalizes least squares with rules. |
| **Convex (informal)** | A bowl-like objective (no separate “hidden valleys”); **local minima are global** under usual assumptions. |

---

## Contents

0. [Simple definitions](#defs) (above)
1. [Conjugacy — Beta–Binomial](#sec1)
2. [Exponential family (Bernoulli)](#sec2)
3. [Change of variables (1D)](#sec3)
4. [Gradient descent (one step)](#sec4)
5. [Lagrange multiplier — equality constraint](#sec5)
6. [Linear program (corner check)](#sec6)
7. [Quadratic program (tiny)](#sec7)

---

<a id="sec1"></a>

## 1. Conjugacy — Beta–Binomial

**Key terms:** [definitions](#defs) — prior, likelihood, posterior, conjugacy.

### Concept

A **prior** $p(\theta)$ and **likelihood** $p(\mathcal{D}\mid\theta)$ are **conjugate** when the **posterior** $p(\theta\mid\mathcal{D})$ belongs to the **same family** as the prior—only the parameters update.

For **Binomial** data ( $n$ trials, $k$ successes) with unknown success probability $\theta\in(0,1)$, a **Beta** prior is conjugate:

```math
\theta \sim \mathrm{Beta}(\alpha,\beta),\qquad
p(\theta)\propto \theta^{\alpha-1}(1-\theta)^{\beta-1}\,.
```

After observing $k$ successes in $n$ trials:

```math
\theta\mid k,n \sim \mathrm{Beta}(\alpha+k,\;\beta+n-k)\,.
```

So you **add** successes to $\alpha$ and failures $(n-k)$ to $\beta$.

### Problem

Use prior $\mathrm{Beta}(2,5)$. You observe $n=8$ trials with $k=3$ successes. Write the **posterior** Beta parameters $(\alpha',\beta')$.

#### Solution

```math
\alpha' = 2 + 3 = 5,\qquad \beta' = 5 + (8-3) = 5 + 5 = 10\,.
```

Posterior: $\theta\mid\text{data}\sim \mathrm{Beta}(5,10)$.

---

<a id="sec2"></a>

## 2. Exponential family (Bernoulli)

**Key terms:** [definitions](#defs) — exponential family, sufficient statistic, natural parameter, log-partition.

### Concept

Many models can be written in **exponential-family** form:

```math
p(x\mid\theta) = h(x)\,\exp\!\big(\eta(\theta)^\top T(x) - A(\theta)\big)\,,
```

with **sufficient statistic** $T(x)$, **natural parameter** $\eta$, and **log-partition** $A$ (normalizes mass).

For **Bernoulli** $X\in\{0,1\}$ with $P(X=1)=p$:

```math
P(X=x)=p^x(1-p)^{1-x}=\exp\!\Big(x\ln\frac{p}{1-p}+\ln(1-p)\Big),\quad x\in\{0,1\}\,.
```

Here $T(x)=x$ and the natural parameter is $\eta=\ln\frac{p}{1-p}$ ( **log-odds** ).

### Problem

Let $p=0.8$. Compute the **log-odds** $\eta=\ln\frac{p}{1-p}$ (use $\ln$; a calculator is fine). Round to two decimals.

#### Solution

```math
\frac{p}{1-p}=\frac{0.8}{0.2}=4,\qquad \eta=\ln 4 \approx 1.39\,.
```

---

<a id="sec3"></a>

## 3. Change of variables (1D)

**Key terms:** [definitions](#defs) — PDF, support, change of variables.

### Concept

If $Y=g(X)$ with $g$ **strictly monotone** and differentiable, then (1D change-of-variables):

```math
f_Y(y) = f_X\big(g^{-1}(y)\big)\,\left|\frac{d}{dy} g^{-1}(y)\right|\,.
```

For an **affine** map $Y=aX+b$ with $a\neq 0$:

```math
f_Y(y)=\frac{1}{|a|}\,f_X\!\left(\frac{y-b}{a}\right)\,.
```

### Problem

Let $X\sim\mathrm{Uniform}(0,1)$ with density $f_X(x)=1$ on $(0,1)$ and $0$ otherwise. Let $Y=2X+1$. Find $f_Y(y)$ on its support.

#### Solution

Support: $X\in(0,1)\Rightarrow Y\in(1,3)$. Here $a=2$, $b=1$:

```math
f_Y(y)=\frac{1}{2}\,f_X\!\left(\frac{y-1}{2}\right)\,.
```

For $y\in(1,3)$, $\frac{y-1}{2}\in(0,1)$ so $f_X(\cdot)=1$. Hence $f_Y(y)=\dfrac{1}{2}$ on $(1,3)$, and $0$ otherwise (uniform on $(1,3)$).

---

<a id="sec4"></a>

## 4. Gradient descent (one step)

**Key terms:** [definitions](#defs) — objective, gradient, gradient descent, step size.

### Concept

To **minimize** a smooth function $f(x)$, **gradient descent** iterates

```math
x_{t+1} = x_t - \eta\,\nabla f(x_t)\,,
```

with step size $\eta>0$. In **one dimension**: $x_{t+1}=x_t-\eta\,f'(x_t)$.

### Problem

Let $f(x)=x^2-4x+7$. Starting at $x_0=0$, compute **one** gradient-descent step with $\eta=\dfrac{1}{4}$.

#### Solution

```math
f'(x)=2x-4\,,\qquad f'(0)=-4\,.
```

```math
x_1 = 0 - \frac14\cdot(-4)=1\,.
```

(The minimizer of $f$ is at $x=2$; one step moves from $0$ toward $2$.)

---

<a id="sec5"></a>

## 5. Lagrange multiplier — equality constraint

**Key terms:** [definitions](#defs) — objective, constraint, Lagrange multiplier.

### Concept

To **minimize** $f(x)$ subject to **equality** $g(x)=0$ (smooth, regular setup), introduce $\lambda$ and stationary conditions $\nabla f=\lambda \nabla g$ together with $g(x)=0$.

**2D example:** minimize $f(x,y)$ subject to $h(x,y)=0$. Solve

```math
\frac{\partial f}{\partial x}=\lambda\frac{\partial h}{\partial x},\qquad
\frac{\partial f}{\partial y}=\lambda\frac{\partial h}{\partial y},\qquad h(x,y)=0\,.
```

### Problem

Minimize $f(x,y)=x^2+y^2$ subject to $x+y=1$.

#### Solution

Let $h(x,y)=x+y-1$. Then $\nabla f=(2x,2y)$, $\nabla h=(1,1)$. So $2x=\lambda$, $2y=\lambda$, hence $x=y$. With $x+y=1$: $x=y=\dfrac{1}{2}$.

```math
f_{\min}=\left(\frac12\right)^2+\left(\frac12\right)^2=\frac12\,.
```

(Geometrically: closest point on the line $x+y=1$ to the origin.)

---

<a id="sec6"></a>

## 6. Linear program (corner check)

**Key terms:** [definitions](#defs) — linear program, feasible region, objective (maximize here).

### Concept

A **linear program** has a **linear** objective and **linear** constraints. In 2D, if the feasible region is a polygon, a **maximum** of a linear function often occurs at a **vertex** (unless the objective is constant along an edge).

### Problem

Maximize $F(x,y)=3x+2y$ subject to

```math
x+y\le 3,\qquad x\ge 0,\qquad y\ge 0\,.
```

Evaluate $F$ at all **vertices** of the feasible region and give the maximum.

#### Solution

Vertices: $(0,0)$, $(3,0)$, $(0,3)$ (intersection of boundary lines in the first quadrant).

```math
F(0,0)=0,\qquad F(3,0)=9,\qquad F(0,3)=6\,.
```

Maximum is **9** at $(x,y)=(3,0)$.

---

<a id="sec7"></a>

## 7. Quadratic program (tiny)

**Key terms:** [definitions](#defs) — quadratic program, constraint, convex (informal).

### Concept

A **convex quadratic program** minimizes a **convex quadratic** (often $\tfrac{1}{2}x^\top Q x + c^\top x$ with $Q\succeq 0$) subject to linear (in)equalities. With one **equality** $Ax=b$, the solution is where the gradient of the objective is orthogonal to the feasible plane (related to §7.2–7.3).

### Problem

Minimize $g(x,y)=\dfrac{1}{2}(x^2+y^2)$ subject to $x+y=1$.

#### Solution

Same geometry as §5 but with objective $\tfrac{1}{2}(x^2+y^2)$. Again $x=y=\dfrac{1}{2}$ by symmetry / Lagrange:

```math
g_{\min}=\frac12\left(\frac14+\frac14\right)=\frac14\,.
```

---

## Quick answer table

| Section | Main result |
| --- | --- |
| 1 | Posterior $\mathrm{Beta}(5,10)$ |
| 2 | $\eta\approx 1.39$ |
| 3 | $f_Y(y)=\tfrac{1}{2}$ on $(1,3)$ |
| 4 | $x_1=1$ |
| 5 | $(x,y)=(\tfrac12,\tfrac12)$, $f_{\min}=\tfrac12$ |
| 6 | Max $9$ at $(3,0)$ |
| 7 | $g_{\min}=\tfrac14$ at $(\tfrac12,\tfrac12)$ |

---

*These drills are small; the textbook has full theory and harder exercises.*
