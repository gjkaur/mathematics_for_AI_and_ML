# Day 4 — Probability & distributions (teaching + numerical practice)

Concise notes and **numbered exercises** aligned with **Chapter 6** (§6.1–§6.5) in *Mathematics for Machine Learning* and with [`Day04.md`](Day04.md). Display math uses **GitHub display math** fenced blocks so formulas render on [github.com](https://github.com) in the normal file view (not Raw).

> **Reading comfort:** See the root [`README.md`](../README.md#reading-comfort).

**How to use:** Skim each **Teaching** block, then solve the **Problem** before reading the **Solution**.

---

## Contents

1. [Teaching — probability space & axioms](#sec-teach-1)
2. [Teaching — discrete vs continuous](#sec-teach-2)
3. [Teaching — sum rule, product rule, Bayes](#sec-teach-3)
4. [Teaching — expectation, variance, independence](#sec-teach-4)
5. [Teaching — Gaussian (normal) distribution](#sec-teach-5)
6. [Numerical problems 1–8](#sec-problems)

---

<h2 id="sec-teach-1">Teaching — probability space & axioms</h2>

A **probability space** $(\Omega, \mathcal{A}, P)$ has: outcomes $\Omega$, events $\mathcal{A}$ (a $\sigma$-algebra), and a probability **measure** $P$ with $P(\Omega)=1$, $P(A)\ge 0$, and **countable additivity** on disjoint events.

For a **finite** sample space, often each outcome $\omega$ gets a mass $P(\{\omega\})$ with all masses nonnegative and summing to $1$.

---

<h2 id="sec-teach-2">Teaching — discrete vs continuous</h2>

- **Discrete** $X$: described by a **PMF** $p_X(x)=P(X=x)$ on a countable set; $\sum_x p_X(x)=1$.
- **Continuous** $X$: described by a **PDF** $f_X(x)\ge 0$ with $\displaystyle \int_{-\infty}^{\infty} f_X(x)\,dx=1$ and
  ```math
  P(a \le X \le b) = \int_a^b f_X(x)\,dx\,.
  ```
- **CDF:** $F_X(x)=P(X\le x)$ links discrete sums and continuous integrals.

---

<h2 id="sec-teach-3">Teaching — sum rule, product rule, Bayes</h2>

- **Sum rule (marginalization):** $P(X=x)=\sum_y P(X=x,Y=y)$ (discrete); integrate the joint density for continuous.
- **Product rule:** $P(X=x,Y=y)=P(Y=y\mid X=x)\,P(X=x)$.
- **Bayes’ theorem:**
  ```math
  P(X=x\mid Y=y) = \frac{P(Y=y\mid X=x)\,P(X=x)}{P(Y=y)}\,,
  ```
  with $P(Y=y)=\sum_x P(Y=y\mid X=x)P(X=x)$ (discrete case).

---

<h2 id="sec-teach-4">Teaching — expectation, variance, independence</h2>

- **Expectation:** $\displaystyle E[X]=\sum_x x\,p_X(x)$ or $\displaystyle E[X]=\int x f_X(x)\,dx$.
- **Variance:** $\mathrm{Var}(X)=E[(X-E[X])^2]=E[X^2]-(E[X])^2$.
- **Independence:** $X,Y$ independent iff $p_{X,Y}(x,y)=p_X(x)p_Y(y)$ (discrete) or $f_{X,Y}(x,y)=f_X(x)f_Y(y)$ (continuous). Then $E[XY]=E[X]E[Y]$ and $\mathrm{Var}(X+Y)=\mathrm{Var}(X)+\mathrm{Var}(Y)$ for independent summands.

---

<h2 id="sec-teach-5">Teaching — Gaussian (normal) distribution</h2>

A **univariate** Gaussian $X\sim\mathcal{N}(\mu,\sigma^2)$ has PDF
```math
f_X(x)=\frac{1}{\sqrt{2\pi\sigma^2}}\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right),\qquad \sigma>0\,.
```
Here $\mu=E[X]$ and $\sigma^2=\mathrm{Var}(X)$. The **standard** normal has $\mu=0$, $\sigma^2=1$.

**Standardizing:** $Z=\dfrac{X-\mu}{\sigma}$ is standard normal when $X\sim\mathcal{N}(\mu,\sigma^2)$.

**Sum of independent Gaussians:** If $X\sim\mathcal{N}(\mu_X,\sigma_X^2)$ and $Y\sim\mathcal{N}(\mu_Y,\sigma_Y^2)$ are independent, then $X+Y\sim\mathcal{N}(\mu_X+\mu_Y,\sigma_X^2+\sigma_Y^2)$.

---

<h2 id="sec-problems">Numerical problems</h2>

### Problem 1 — finite sample space

A fair die is rolled once. Let $A$ be “even number” and $B$ be “number $\ge 5$.”

1. List the sample space $\Omega$ and the sets $A$, $B$, $A\cap B$.
2. Compute $P(A)$, $P(B)$, $P(A\cap B)$, and $P(A\cup B)$ using the **addition rule** $P(A\cup B)=P(A)+P(B)-P(A\cap B)$.

<details>
<summary>Solution</summary>

$\Omega=\{1,2,3,4,5,6\}$; $A=\{2,4,6\}$; $B=\{5,6\}$; $A\cap B=\{6\}$.

```math
P(A)=\frac{3}{6}=\frac12,\quad P(B)=\frac{2}{6}=\frac13,\quad P(A\cap B)=\frac16\,,
```

```math
P(A\cup B)=\frac12+\frac13-\frac16=\frac23\,.
```

(Counting outcomes: $A\cup B=\{2,4,5,6\}$ gives four outcomes, $4/6=2/3$.)

</details>

---

### Problem 2 — PMF, expectation, variance

A discrete random variable $X$ has

```math
p_X(0)=0.1,\quad p_X(1)=0.4,\quad p_X(2)=0.5\,.
```

1. Verify $\sum_x p_X(x)=1$.
2. Compute $E[X]$ and $E[X^2]$, then $\mathrm{Var}(X)$.

<details>
<summary>Solution</summary>

$0.1+0.4+0.5=1$.

```math
E[X]=0\cdot 0.1+1\cdot 0.4+2\cdot 0.5=1.4\,.
```

```math
E[X^2]=0+1\cdot 0.4+4\cdot 0.5=2.4,\quad \mathrm{Var}(X)=2.4-(1.4)^2=0.44\,.
```

</details>

---

### Problem 3 — continuous PDF on an interval

Let $X$ have PDF $f_X(x)=c\,x$ for $x\in[0,1]$ and $f_X(x)=0$ otherwise.

1. Find $c$.
2. Compute $P(0.25\le X\le 0.5)$.

<details>
<summary>Solution</summary>

```math
\int_0^1 c x\,dx = c\left[\frac{x^2}{2}\right]_0^1=\frac{c}{2}=1 \;\Rightarrow\; c=2\,.
```

```math
P(0.25\le X\le 0.5)=\int_{0.25}^{0.5}2x\,dx=\left[x^2\right]_{0.25}^{0.5}=0.25-0.0625=0.1875\,.
```

</details>

---

### Problem 4 — Bayes’ theorem (diagnostic test)

A rare disease affects **0.5%** of the population. A test is **98%** sensitive ($P(\text{positive}\mid\text{disease})=0.98$) and **97%** specific ($P(\text{negative}\mid\text{healthy})=0.97$). A person tests **positive**. What is $P(\text{disease}\mid\text{positive})$? Give a decimal approximation.

<details>
<summary>Solution</summary>

Let $D$ be “has disease,” $T^+$ be “positive test.”

```math
P(D)=0.005,\quad P(T^+\mid D)=0.98,\quad P(T^+\mid D^c)=1-0.97=0.03\,.
```

```math
P(T^+)=P(T^+\mid D)P(D)+P(T^+\mid D^c)P(D^c)=0.98\cdot 0.005+0.03\cdot 0.995=0.03475\,.
```

```math
P(D\mid T^+)=\frac{P(T^+\mid D)P(D)}{P(T^+)}=\frac{0.98\cdot 0.005}{0.03475}\approx 0.141\,.
```

So about **14.1%** despite a good-looking test—rarity of the disease dominates.

</details>

---

### Problem 5 — independence & joint probability

Two independent fair coins are flipped. Let $X$ be the number of heads (0, 1, or 2).

1. Write the PMF of $X$.
2. Confirm $E[X]$ using $X=H_1+H_2$ with $H_i\in\{0,1\}$ Bernoulli$(1/2)$.

<details>
<summary>Solution</summary>

```math
p_X(0)=\frac14,\quad p_X(1)=\frac12,\quad p_X(2)=\frac14\,.
```

```math
E[X]=0\cdot\frac14+1\cdot\frac12+2\cdot\frac14=1\,.
```

Independence: $E[H_1]=E[H_2]=1/2$, so $E[X]=E[H_1]+E[H_2]=1$.

</details>

---

### Problem 6 — checking independence in a $2\times 2$ table

Suppose

```math
P(X=0,Y=0)=0.2,\quad P(X=0,Y=1)=0.3,\quad P(X=1,Y=0)=0.2,\quad P(X=1,Y=1)=0.3\,.
```

Are $X$ and $Y$ independent? (Compare $P(X=x,Y=y)$ to $P(X=x)P(Y=y)$.)

<details>
<summary>Solution</summary>

```math
P(X=0)=0.5,\quad P(X=1)=0.5,\quad P(Y=0)=0.4,\quad P(Y=1)=0.6\,.
```

If independent, $P(X=0,Y=0)$ would equal $0.5\cdot 0.4=0.2$. That **matches**. Check all four:

- $(0,0)$: $0.5\cdot 0.4=0.2$ ✓  
- $(0,1)$: $0.5\cdot 0.6=0.3$ ✓  
- $(1,0)$: $0.5\cdot 0.4=0.2$ ✓  
- $(1,1)$: $0.5\cdot 0.6=0.3$ ✓  

So **yes**, $X$ and $Y$ are independent.

</details>

---

### Problem 7 — Gaussian probabilities

Let $X\sim\mathcal{N}(\mu=100,\sigma^2=25)$ (so $\sigma=5$). Using standard normal **CDF** $\Phi(z)=P(Z\le z)$ for $Z\sim\mathcal{N}(0,1)$:

1. Express $P(X\le 110)$ as $\Phi(z)$ for a numerical $z$.
2. If you have a table or calculator, give $P(X\le 110)$ to a few decimal places.

<details>
<summary>Solution</summary>

```math
Z=\frac{X-100}{5}\sim\mathcal{N}(0,1),\quad P(X\le 110)=P\left(Z\le \frac{110-100}{5}\right)=\Phi(2)\approx 0.9772\,.
```

</details>

---

### Problem 8 — sum of independent Gaussians

Independent random variables $X\sim\mathcal{N}(1,4)$ and $Y\sim\mathcal{N}(2,9)$ (variances **4** and **9**). What is the distribution of $S=X+Y$? Then give $E[S]$ and $\mathrm{Var}(S)$.

<details>
<summary>Solution</summary>

```math
S\sim\mathcal{N}(1+2,\;4+9)=\mathcal{N}(3,13)\,.
```

So $E[S]=3$ and $\mathrm{Var}(S)=13$.

</details>

---

## Short answers (check your work)

| # | Key result |
|---|------------|
| 1 | $P(A\cup B)=2/3$ |
| 2 | $E[X]=1.4$, $\mathrm{Var}(X)=0.44$ |
| 3 | $c=2$, $P(0.25\le X\le 0.5)=0.1875$ |
| 4 | $P(D\mid T^+)\approx 0.141$ |
| 5 | $p_X(0)=1/4$, $p_X(1)=1/2$, $p_X(2)=1/4$; $E[X]=1$ |
| 6 | Independent |
| 7 | $z=2$, $\Phi(2)\approx 0.9772$ |
| 8 | $\mathcal{N}(3,13)$; $E[S]=3$, $\mathrm{Var}(S)=13$ |

---

*For full theory and proofs, use MML Chapter 6. This sheet is for intuition and calculation practice.*
