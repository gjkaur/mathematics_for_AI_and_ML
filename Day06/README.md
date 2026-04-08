# Day 6 — Beginner guide: terms, concepts, formulas & examples

This page explains **Day 6** topics from *Mathematics for Machine Learning* in **plain language**, with **definitions**, **core formulas**, and **small examples**. It follows the reading order in **[`Day06.md`](Day06.md)** (**Chapter 8** §8.1–8.6, then **Chapter 9** §9.1–9.4).

**Who this is for:** you are new to “learning from data” vocabulary but are OK with **vectors**, **matrices**, and basic **probability** (if not, skim Day 1–4 notes first).

**Math on GitHub:** open this file on [github.com](https://github.com) in the **normal** view (not Raw). Display math uses **unindented** fences (first line: three backticks + `math`).

> **Reading comfort:** See the root [`README.md`](../README.md#reading-comfort).

---

## Contents

1. [Big picture — what Day 6 is about](#big-picture)
2. [Chapter 8 §8.1 — Data, models, and learning](#ch81)
3. [Chapter 8 §8.2 — Empirical risk, loss, hypothesis class, regularization](#ch82)
4. [Chapter 8 §8.3 — Parameter estimation (MLE / MAP idea)](#ch83)
5. [Chapter 8 §8.4 — Probabilistic modeling and inference](#ch84)
6. [Chapter 8 §8.5 — Directed graphical models](#ch85)
7. [Chapter 8 §8.6 — Model selection & cross-validation](#ch86)
8. [Chapter 9 §9.1–§9.2 — Linear regression & least squares](#ch91)
9. [Chapter 9 §9.3 — Bayesian linear regression (idea + formulas)](#ch93)
10. [Chapter 9 §9.4 — Maximum likelihood as orthogonal projection](#ch94)
11. [Mini symbol index](#symbols)

---

<a id="big-picture"></a>

## 1. Big picture — what Day 6 is about

**Story:** You have **data** (inputs and often outputs). You choose a **model family** (a set of candidate prediction rules or probability laws). You **fit** unknown numbers (**parameters**) by making training error small, and you **check** whether the model will work on new data (**generalization**). **Chapter 8** sets up that workflow in general. **Chapter 9** specializes to **linear regression**—the most important concrete case—and connects it to **geometry** (projections) and a **Bayesian** view.

**Reading order (same as the book):** Ch. 8 from §8.1 through §8.6, then Ch. 9 from §9.1 through §9.4.

---

<a id="ch81"></a>

## 2. Chapter 8 §8.1 — Data, models, and learning

### Terms (beginner)

| Term | Meaning |
| --- | --- |
| **Data / dataset** | A collection of examples—often pairs $(x_n,y_n)$ for supervised learning, or just $x_n$ for unsupervised learning. |
| **Model** | A mathematical description that connects inputs to outputs (or describes how data are generated). It contains **parameters** you can tune. |
| **Learning** | Choosing parameter values so the model fits data **and** (you hope) predicts well on **new** data—not only memorizing the training set. |
| **Supervised learning** | Training uses **labels** $y_n$ (correct answers or targets). |
| **Unsupervised learning** | Training uses **only** inputs $x_n$ (structure discovery, clustering, etc.). |

### Concept

A **model** is not “the truth”; it is a **useful simplification**. Learning means **searching** over allowed parameters so that predictions match observations **on average** (according to a **loss** you choose in §8.2).

### Tiny example

You measure house size $x$ and price $y$. A **linear** model might say $y \approx w_0 + w_1 x$. The numbers $(w_0,w_1)$ are **parameters** to learn from many houses.

---

<a id="ch82"></a>

## 3. Chapter 8 §8.2 — Empirical risk, loss, hypothesis class, regularization

### Terms

| Term | Meaning |
| --- | --- |
| **Loss function** $\ell(y,\hat{y})$ | Score of **how wrong** a prediction $\hat{y}$ is when the truth is $y$. Smaller is better. |
| **Empirical risk** | **Average loss on training data**—what you can actually compute from your dataset. |
| **Empirical risk minimization (ERM)** | Choose parameters that **minimize** empirical risk (possibly with penalties—see below). |
| **Hypothesis class** $\mathcal{H}$ | The **set of candidate functions** your algorithm is allowed to use (e.g. “all linear functions,” “all polynomials of degree $\le 5$,” “all neural nets of this architecture”). |
| **Overfitting** | The model fits **training** data very well but **fails on new** data—often because the hypothesis class is too **flexible** or you tuned too aggressively to noise. |
| **Regularization** | Add an extra term that **penalizes complexity** (large weights, many features, etc.) so the solution is smoother or simpler. |
| **Structural risk / penalized ERM** | Minimize **empirical risk + penalty** (same spirit as “don’t only minimize training error”). |

### Formulas

For dataset $\mathcal{D}=\{(x_n,y_n)\}_{n=1}^N$ and model $f(\cdot;w)$ with parameters $w$:

**Empirical risk** with loss $\ell$:

```math
\widehat{R}(w) = \frac{1}{N}\sum_{n=1}^N \ell\big(y_n,\, f(x_n;w)\big)\,.
```

**ERM** (conceptually):

```math
w^\star \in \arg\min_{w\in\mathcal{W}} \widehat{R}(w)\,,
```

where $\mathcal{W}$ is the set of allowed parameters (often tied to choosing a hypothesis class).

**Regularized** objective (schematic):

```math
\widehat{R}_{\mathrm{reg}}(w) = \widehat{R}(w) + \lambda\,\Omega(w)\,,
```

where $\Omega(w)$ measures “size” or complexity (e.g. squared Euclidean norm $\|w\|_2^2$) and $\lambda\ge 0$ trades fit vs. simplicity.

### Examples of loss (supervised)

- **Squared loss** (regression): $\ell(y,\hat{y})=(y-\hat{y})^2$.
- **Absolute loss:** $|y-\hat{y}|$ (less sensitive to huge outliers).
- **Classification:** **0–1 loss** (hard to optimize directly); smooth surrogates like **logistic loss** are common.

### Tiny numerical example (squared loss)

True targets $y_1=1$, $y_2=3$; predictions $\hat{y}_1=2$, $\hat{y}_2=2$.

```math
\widehat{R}=\frac12\big[(1-2)^2+(3-2)^2\big]=\frac12(1+1)=1\,.
```

---

<a id="ch83"></a>

## 4. Chapter 8 §8.3 — Parameter estimation

### Terms

| Term | Meaning |
| --- | --- |
| **Parameter estimation** | Using data to pick numerical values for model parameters. |
| **Likelihood** $p(\mathcal{D}\mid\theta)$ | “How probable the **observed data** would be if parameter value were $\theta$.” |
| **Maximum likelihood estimation (MLE)** | Choose $\theta$ that **maximizes** the likelihood (equivalently **log-likelihood**): |
| **Maximum a posteriori (MAP)** | Bayesian-style point estimate: maximize **posterior** $\propto$ likelihood $\times$ prior. |

### Formulas (ideas)

**MLE:**

```math
\theta_{\mathrm{MLE}} \in \arg\max_{\theta}\; p(\mathcal{D}\mid\theta)
\;=\;\arg\max_{\theta}\; \ln p(\mathcal{D}\mid\theta)\quad\text{(often easier in log form).}
```

**MAP** (with prior $p(\theta)$):

```math
\theta_{\mathrm{MAP}} \in \arg\max_{\theta}\; p(\theta\mid\mathcal{D})
\;=\;\arg\max_{\theta}\; \big(\ln p(\mathcal{D}\mid\theta) + \ln p(\theta)\big)\,,
```

up to normalizing constants that do not depend on $\theta$.

### Concept for beginners

- **MLE** asks: *which parameter makes the data we saw most plausible?*  
- **MAP** adds a **prior** belief about parameters before seeing data—useful when data are scarce or you want to **pull** estimates toward reasonable values.

### Tiny example (idea only)

If outcomes are **Gaussian** with unknown mean $\mu$ and you observe numbers, the MLE of the mean is often the **sample mean**—a formula you can derive by calculus (see the book).

---

<a id="ch84"></a>

## 5. Chapter 8 §8.4 — Probabilistic modeling and inference

### Terms

| Term | Meaning |
| --- | --- |
| **Probabilistic model** | Specifies **distributions** over variables (data, parameters, latent causes)—not only a single deterministic prediction. |
| **Latent variable** | A quantity **not observed** directly but assumed in the model (e.g. a hidden topic in a document). |
| **Inference** | Computing **posterior** beliefs or **predictive** distributions from the model after seeing data—e.g. $p(z\mid x)$ for latent $z$, or $p(y^\star\mid x^\star,\mathcal{D})$ for a new input. |

### Concept

Instead of one “best” parameter, you may track **uncertainty**: which parameter values remain plausible after data? **Bayesian** methods put distributions on parameters; **frequentist** methods often report confidence intervals—different philosophies, shared need for clear **generative** stories.

### Tiny example (predictive distribution)

After learning, you might report **not only** a point prediction $\hat{y}$ but also a **spread** (variance) reflecting both noise and parameter uncertainty—especially in **Bayesian** regression (Ch. 9 §9.3).

---

<a id="ch85"></a>

## 6. Chapter 8 §8.5 — Directed graphical models

### Terms

| Term | Meaning |
| --- | --- |
| **Directed graph** | Nodes = **random variables**; arrows = **direct influence** (one variable is generated conditional on its parents). |
| **DAG** | **Directed acyclic graph**—no directed cycles (common in basic graphical models). |
| **Factorization** | The graph tells you how the **joint** distribution **factorizes** into a product of **conditional** distributions. |

### Formula (core rule)

If the graph is a **valid** DAG for variables $x_1,\ldots,x_K$,

```math
p(x_1,\ldots,x_K) = \prod_{k=1}^K p\big(x_k \mid \mathrm{Pa}(x_k)\big)\,,
```

where $\mathrm{Pa}(x_k)$ are the **parents** of node $x_k$ (variables that point into $x_k$).

### Example — simple chain

Variables $X\to Y\to Z$ (Markov chain structure):

```math
p(x,y,z)=p(x)\,p(y\mid x)\,p(z\mid y)\,.
```

Read: “sample $x$, then $y$ given $x$, then $z$ given $y$.”

### Example — naive Bayes (classification sketch)

Class $C$, features $F_1,\ldots,F_D$ **conditionally independent given** $C$:

```math
p(c,f_1,\ldots,f_D)=p(c)\prod_{d=1}^D p(f_d\mid c)\,.
```

Good for intuition; real features are often correlated, but the graph makes assumptions explicit.

---

<a id="ch86"></a>

## 7. Chapter 8 §8.6 — Model selection & cross-validation

### Terms

| Term | Meaning |
| --- | --- |
| **Model selection** | Choosing among different models (different hypothesis classes, different numbers of parameters, different regularization strengths). |
| **Generalization** | Performance on **new** data drawn from the same underlying process—not the training set. |
| **Cross-validation (CV)** | Reuse data in **rotated train/validation splits** to estimate generalization error **without** a separate huge test set. |
| **$k$-fold CV** | Split data into $k$ parts; train $k$ times, each time holding out one part as **validation**, average the validation scores. |

### Concept

Training error **always** tempts you to pick **more complex** models. **Validation** estimates how models behave on **held-out** points. **$k$-fold CV** reduces reliance on one lucky split.

### Procedure (k-fold, schematic)

1. Randomly partition indices $\{1,\ldots,N\}$ into $k$ roughly equal **folds**.  
2. For each fold $j$, train on **all folds except** $j$, evaluate on fold $j$.  
3. Average the $k$ validation scores—use that to compare models or hyperparameters (e.g. $\lambda$).

---

<a id="ch91"></a>

## 8. Chapter 9 §9.1–§9.2 — Linear regression & least squares

### §9.1 Problem formulation — terms

| Term | Meaning |
| --- | --- |
| **Design matrix** $X$ | Rows often are **feature vectors** for each example (sometimes with a column of ones for intercept). |
| **Targets** $y$ | Vector of outputs you want to predict. |
| **Linear model** | Prediction $\hat{y}_n = x_n^\top w$ (or include bias via extra feature $1$). Stacked: $\hat{y}=Xw$. |

### Model (noise view, common)

```math
y = Xw + \varepsilon\,,
```

where $\varepsilon$ captures **noise** and **model mismatch**. Different assumptions on $\varepsilon$ lead to different losses (squared loss links to **Gaussian** noise in a likelihood story).

### §9.2 Parameter estimation — ordinary least squares (OLS)

**Goal:** minimize **sum of squared errors** (equivalently mean squared error up to a constant):

```math
\min_{w}\; \|y - Xw\|_2^2\,.
```

If $X^\top X$ is **invertible**, the **closed-form** solution satisfies the **normal equations**

```math
X^\top X\, w = X^\top y \quad\Rightarrow\quad
w^\star = (X^\top X)^{-1} X^\top y\,.
```

### Concept for beginners

- **Geometric meaning (preview of §9.4):** $Xw$ is a **linear combination of columns** of $X$; OLS picks the combination **closest** to $y$ in Euclidean distance—that **closest point** is the **orthogonal projection** of $y$ onto the column space of $X$.  
- **When $(X^\top X)$ is not invertible:** infinitely many solutions or numerical issues—**regularization** (ridge) helps (see book).

### Tiny example (one feature, no intercept, by hand)

Data: $x_1=1,y_1=1$; $x_2=2,y_2=3$. Here $X=\begin{pmatrix}1\\2\end{pmatrix}$, $y=\begin{pmatrix}1\\3\end{pmatrix}$.

```math
X^\top X = 5,\quad X^\top y = 1\cdot 1 + 2\cdot 3 = 7 \quad\Rightarrow\quad w^\star = 7/5 = 1.4\,.
```

Predictions: $1.4$ and $2.8$; squared errors $(0.4)^2$ and $(0.2)^2$.

---

<a id="ch93"></a>

## 9. Chapter 9 §9.3 — Bayesian linear regression (idea + formulas)

### Idea

Put a **prior** $p(w)$ on weights (often **Gaussian**). After observing $(X,y)$, obtain **posterior** $p(w\mid X,y)$. Predictions **average** over uncertainty in $w$ (**posterior predictive**), not only a single $w^\star$.

### Common choices (schematic)

**Gaussian likelihood** (noise) + **Gaussian prior** on $w$ often yields a **Gaussian posterior** for $w$ (conjugate structure in the right setup—details in MML).

**Posterior** (symbolic):

```math
p(w\mid X,y) \propto p(y\mid X,w)\, p(w)\,.
```

**Posterior predictive** for new input $x_\star$:

```math
p(y_\star\mid x_\star,X,y)=\int p(y_\star\mid x_\star,w)\, p(w\mid X,y)\,\mathrm{d}w\,.
```

### Concept for beginners

- **Frequentist OLS** gives **one** weight vector (plus classical uncertainty intervals in other courses).  
- **Bayesian** regression keeps a **distribution** over weights—useful when data are **sparse** or you want **uncertainty bars** on predictions that include **parameter uncertainty**, not only noise.

---

<a id="ch94"></a>

## 10. Chapter 9 §9.4 — Maximum likelihood as orthogonal projection

### Setup

For the **linear-Gaussian** model with **fixed** $X$, maximizing the **likelihood** can be shown to be equivalent to **minimizing** $\|y-Xw\|_2^2$ (under standard assumptions). The fitted vector of predictions is

```math
\hat{y} = X w^\star = X(X^\top X)^{-1}X^\top y\,,
```

when $X^\top X$ is invertible.

### Projection matrix

Define the **hat matrix**

```math
\Pi = X(X^\top X)^{-1}X^\top\,.
```

Then $\hat{y}=\Pi y$. The matrix $\Pi$ is an **orthogonal projector** onto the **column space** of $X$: it is **symmetric** and **idempotent** ($\Pi^2=\Pi$).

### Geometric picture (beginner)

- Think of $y$ as a **vector** in $\mathbb{R}^N$.  
- **Columns** of $X$ span a **subspace** (all linear combinations of features).  
- **OLS** finds the point in that subspace **closest** to $y$—the **foot** of the perpendicular from $y$ to the subspace.  
- The **residual** $y-\hat{y}$ is **orthogonal** to every column of $X$:

```math
X^\top (y - \hat{y}) = 0\,,
```

which is exactly the **normal equations** in another form.

---

<a id="symbols"></a>

## 11. Mini symbol index

| Symbol | Typical meaning |
| --- | --- |
| $N$ | Number of training examples |
| $x_n$ | Input (feature vector) for example $n$ |
| $y_n$ | Target / label for example $n$ |
| $w$, $\theta$ | Parameters |
| $\ell$ | Loss function |
| $\widehat{R}$ | Empirical risk |
| $\lambda$ | Regularization strength |
| $X$ | Design matrix |
| $\Pi$ | Projection (“hat”) matrix |
| $p(\cdot\mid\cdot)$ | Conditional distribution |

---

## What to read in the book

Full proofs, algorithms, and exercises: **Ch. 8** §8.1–8.6, then **Ch. 9** §9.1–9.4 — see **[`Day06.md`](Day06.md)**.

---

*This file is a study companion; it does not replace the textbook.*
