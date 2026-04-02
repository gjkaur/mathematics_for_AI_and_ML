# Calculus handbook (for AI & ML)

A **compact reference** of rules and formulas from **single-variable and multivariate calculus** used in machine learning. It matches the spirit of **Chapter 5 — Vector calculus** in [*Mathematics for Machine Learning*](https://mml-book.com/) (Deisenroth, Faisal & Ong). It is **not** every fact ever proved in analysis—use your textbook for proofs and full theory.

**How to read:** Inline math uses `$...$`; longer identities use ` ```math ` blocks. On GitHub, open the normal file view so [math](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions) renders.

---

## Contents

1. [Notation](#notation)
2. [Limits and continuity (essentials)](#limits-and-continuity-essentials)
3. [Derivative: definition and basic rules](#derivative-definition-and-basic-rules)
4. [Standard derivatives (lookup)](#standard-derivatives-lookup)
5. [Taylor expansion and linearization](#taylor-expansion-and-linearization)
6. [Integration (essentials)](#integration-essentials)
7. [Multivariate calculus](#multivariate-calculus)
8. [Common functions in ML](#common-functions-in-ml)
9. [Further reading](#further-reading)

---

## Notation

| Symbol | Meaning |
|--------|--------|
| $f'(x)$, $\dfrac{df}{dx}$ | Derivative of $f$ with respect to $x$ |
| $\dfrac{\partial f}{\partial x_i}$ | Partial derivative (multivariate) |
| $\nabla f$ | Gradient (column vector of partials) |
| $J_f$, $\dfrac{\partial f}{\partial x}$ | Jacobian matrix of a vector function |
| $\nabla^2 f$, $H$ | Hessian (matrix of second partials) |

---

## Limits and continuity (essentials)

**Limit:** $\displaystyle \lim_{x\to a} f(x) = L$ means $f(x)$ can be made arbitrarily close to $L$ by taking $x$ sufficiently close to $a$ (from the directions allowed in the definition).

**Continuity at $a$:** $f$ is continuous at $a$ if $\lim_{x\to a} f(x) = f(a)$.

**Differentiability at $a$:** $f'(a)$ exists iff the limit

```math
f'(a) = \lim_{h\to 0} \frac{f(a+h)-f(a)}{h}
```

exists (same value from left and right for real functions on $\mathbb{R}$).

---

## Derivative: definition and basic rules

Let $f,g$ be differentiable where stated, $c$ a constant.

| Rule | Formula |
|------|--------|
| **Constant** | $\dfrac{d}{dx}(c) = 0$ |
| **Constant multiple** | $\dfrac{d}{dx}(c\,f(x)) = c\,f'(x)$ |
| **Sum** | $\dfrac{d}{dx}(f+g) = f' + g'$ |
| **Product** | $\dfrac{d}{dx}(fg) = f'g + fg'$ |
| **Quotient** | $\dfrac{d}{dx}\!\left(\dfrac{f}{g}\right) = \dfrac{f'g - fg'}{g^2}$ \quad ($g\neq 0$) |
| **Chain** | $\dfrac{d}{dx}\,f(g(x)) = f'(g(x))\,g'(x)$ |
| **Power** | $\dfrac{d}{dx}(x^n) = n x^{n-1}$ \quad (extend with care at $x=0$ for non-integer $n$) |
| **Inverse** | If $y=f(x)$ and $f$ invertible, $\dfrac{dy}{dx} = 1\big/\dfrac{dx}{dy}$ (with domain caveats) |

**Logarithmic differentiation:** For $f(x)>0$, $\dfrac{d}{dx}\ln f(x) = \dfrac{f'(x)}{f(x)}$.

---

## Standard derivatives (lookup)

Assume domains where expressions are defined (e.g. $x>0$ for $\ln x$).

### Powers, exponentials, logarithms

```math
\frac{d}{dx}\,e^x = e^x\,,\qquad
\frac{d}{dx}\,a^x = a^x \ln a \quad (a>0)\,,\qquad
\frac{d}{dx}\,\ln x = \frac{1}{x}\,,\qquad
\frac{d}{dx}\,\log_a x = \frac{1}{x\ln a}\,.
```

### Trigonometric

```math
\frac{d}{dx}\,\sin x = \cos x\,,\quad
\frac{d}{dx}\,\cos x = -\sin x\,,\quad
\frac{d}{dx}\,\tan x = \sec^2 x = \frac{1}{\cos^2 x}\,.
```

```math
\frac{d}{dx}\,\sec x = \sec x \tan x\,,\quad
\frac{d}{dx}\,\csc x = -\csc x \cot x\,,\quad
\frac{d}{dx}\,\cot x = -\csc^2 x\,.
```

### Inverse trigonometric

```math
\frac{d}{dx}\,\arcsin x = \frac{1}{\sqrt{1-x^2}}\,,\quad
\frac{d}{dx}\,\arccos x = -\frac{1}{\sqrt{1-x^2}}\,,\quad
\frac{d}{dx}\,\arctan x = \frac{1}{1+x^2}\,.
```

### Hyperbolic (optional but useful)

```math
\frac{d}{dx}\,\sinh x = \cosh x\,,\quad
\frac{d}{dx}\,\cosh x = \sinh x\,,\quad
\frac{d}{dx}\,\tanh x = \mathrm{sech}^2 x = 1 - \tanh^2 x\,.
```

---

## Taylor expansion and linearization

**One variable (around $a$):**

```math
f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2}(x-a)^2 + \cdots
```

**First-order (linear) approximation:** $f(x) \approx f(a) + f'(a)(x-a)$.

**Multivariate (around $\mathbf{a}$):**

```math
f(\mathbf{x}) \approx f(\mathbf{a}) + \nabla f(\mathbf{a})^\top (\mathbf{x}-\mathbf{a}) + \frac{1}{2}(\mathbf{x}-\mathbf{a})^\top H_f(\mathbf{a})(\mathbf{x}-\mathbf{a}) + \cdots
```

where $H_f$ is the Hessian.

---

## Integration (essentials)

**Fundamental theorem:** If $F'(x)=f(x)$, then $\displaystyle \int_a^b f(x)\,dx = F(b)-F(a)$.

**Antiderivatives (indefinite integrals)** — same patterns as derivatives, reversed (add $+C$):

```math
\int x^n\,dx = \frac{x^{n+1}}{n+1}+C \quad (n\neq -1)\,,\qquad
\int \frac{1}{x}\,dx = \ln|x|+C\,,
```

```math
\int e^x\,dx = e^x + C\,,\qquad
\int \sin x\,dx = -\cos x + C\,,\qquad
\int \cos x\,dx = \sin x + C\,.
```

**Substitution:** $\displaystyle \int f(g(x))\,g'(x)\,dx = \int f(u)\,du$ with $u=g(x)$.

**Integration by parts:** $\displaystyle \int u\,dv = uv - \int v\,du$.

---

## Multivariate calculus

Let $f:\mathbb{R}^D\to\mathbb{R}$ and $\mathbf{f}:\mathbb{R}^D\to\mathbb{R}^E$.

**Partial derivative:**

```math
\frac{\partial f}{\partial x_i}(\mathbf{x}) = \lim_{h\to 0} \frac{f(\mathbf{x}+h\mathbf{e}_i)-f(\mathbf{x})}{h}\,.
```

**Gradient (column vector):**

```math
\nabla f(\mathbf{x}) = \begin{bmatrix} \dfrac{\partial f}{\partial x_1} \\ \vdots \\ \dfrac{\partial f}{\partial x_D} \end{bmatrix} \in \mathbb{R}^D\,.
```

**Jacobian** of $\mathbf{f}(\mathbf{x}) = [f_1,\ldots,f_E]^\top$:

```math
\frac{\partial \mathbf{f}}{\partial \mathbf{x}} = J_{\mathbf{f}}(\mathbf{x}) \in \mathbb{R}^{E\times D}\,,\qquad
\bigl(J_{\mathbf{f}}\bigr)_{ij} = \frac{\partial f_i}{\partial x_j}\,.
```

**Chain rule (vector form):** If $\mathbf{z} = \mathbf{g}(\mathbf{x})$ and $\mathbf{h} = \mathbf{f}(\mathbf{z})$,

```math
\frac{\partial \mathbf{h}}{\partial \mathbf{x}} = \frac{\partial \mathbf{f}}{\partial \mathbf{z}}\,\frac{\partial \mathbf{g}}{\partial \mathbf{x}} \quad \text{(matrix multiply when dimensions align).}
```

**Hessian** of scalar $f$:

```math
H_f(\mathbf{x})_{ij} = \frac{\partial^2 f}{\partial x_i \partial x_j}\,.
```

**Directional derivative** of $f$ at $\mathbf{a}$ in direction $\mathbf{v}$ (unit or not):

```math
D_{\mathbf{v}} f(\mathbf{a}) = \lim_{t\to 0} \frac{f(\mathbf{a}+t\mathbf{v})-f(\mathbf{a})}{t} = \nabla f(\mathbf{a})^\top \mathbf{v}
```

when $f$ is differentiable at $\mathbf{a}$.

---

## Common functions in ML

Below, $\sigma$ is the **logistic sigmoid**, often written $\text{sigmoid}(x)$.

| Name | Formula | Derivative (where defined) |
|------|---------|------------------------------|
| **Sigmoid** | $\sigma(x)=\dfrac{1}{1+e^{-x}}$ | $\sigma'(x)=\sigma(x)(1-\sigma(x))$ |
| **Tanh** | $\tanh(x)=\dfrac{e^x-e^{-x}}{e^x+e^{-x}}$ | $1-\tanh^2(x)$ |
| **Softplus** | $\mathrm{softplus}(x)=\ln(1+e^x)$ | $\sigma(x)$ |
| **ReLU** | $\mathrm{ReLU}(x)=\max(0,x)$ | $1$ if $x>0$, $0$ if $x<0$ (subgradient at $0$) |

**Element-wise nonlinearity** on a vector: if $f(\mathbf{z}) = [g(z_1),\ldots,g(z_E)]^\top$, then

```math
\frac{\partial f}{\partial \mathbf{z}} = \mathrm{diag}\bigl(g'(z_1),\ldots,g'(z_E)\bigr)\,.
```

If $\mathbf{z} = A\mathbf{x}+\mathbf{b}$, then $\dfrac{\partial \mathbf{z}}{\partial \mathbf{x}} = A$ and (chain rule)

```math
\frac{\partial}{\partial \mathbf{x}}\, f(A\mathbf{x}+\mathbf{b}) = \mathrm{diag}(g'(z_1),\ldots,g'(z_E))\,A\,.
```

---

## Further reading

- **MML textbook:** [Chapter 5 — Vector calculus](https://mml-book.com/) (§5.1–5.8 in the standard PDF).
- **Course mapping:** [`Day03/Day03.md`](Day03/Day03.md).
- **Worked drills:** [`Day03/README-practice.md`](Day03/README-practice.md) (if present in your clone).

---

*This page is a study aid; verify signs and domains against your lecture notes and the book.*
