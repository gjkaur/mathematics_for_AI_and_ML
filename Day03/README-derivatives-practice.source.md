# Derivative formula — practice questions

Use the rules and tables in [`README-calculus.md`](README-calculus.md) as your formula sheet. Each item has a **step-by-step Solution** after the question. All math here is **inline** (`$...$`) so GitHub MathJax renders it reliably; the generated [`README-derivatives-practice.md`](README-derivatives-practice.md) is produced by `npm run render:math`—edit **this** `.source.md` file only.

Assume real variables and domains where each expression is defined (e.g. $x>0$ for $\ln x$).

---

## Contents

1. [Powers, sums, and the chain rule](#sec1)
2. [Product and quotient rules](#sec2)
3. [Exponentials and logarithms](#sec3)
4. [Trigonometric and inverse trig](#sec4)
5. [Harder compositions](#sec5)

---

<h2 id="sec1">1. Powers, sums, and the chain rule</h2>

**1.1** Compute $\dfrac{d}{dx}\bigl(3x^5 - 2x^2 + 7\bigr)$.

**Solution.** Differentiate term by term: $\dfrac{d}{dx}(7)=0$, and $\dfrac{d}{dx}(x^n)=nx^{n-1}$. So
$\dfrac{d}{dx}\bigl(3x^5 - 2x^2 + 7\bigr) = 15x^4 - 4x$.

---

**1.2** Compute $\dfrac{d}{dx}\bigl((2x + 1)^4\bigr)$.

**Solution.** Let $u=2x+1$, so $\dfrac{du}{dx}=2$. **Chain rule:** $\dfrac{d}{dx}(u^4)=4u^3\,\dfrac{du}{dx}=4(2x+1)^3\cdot 2=8(2x+1)^3$.

---

**1.3** Compute $\dfrac{d}{dx}\bigl(\sqrt{1 + x^2}\bigr)$.

**Solution.** Write $(1+x^2)^{1/2}$ with $u=1+x^2$, $\dfrac{du}{dx}=2x$. Then $\dfrac{d}{dx}(u^{1/2})=\tfrac{1}{2}u^{-1/2}\cdot 2x=\dfrac{x}{\sqrt{1+x^2}}$.

---

<h2 id="sec2">2. Product and quotient rules</h2>

**2.1** Compute $\dfrac{d}{dx}\bigl(x^2 e^x\bigr)$.

**Solution.** **Product rule** $(uv)'=u'v+uv'$: $u=x^2$, $v=e^x$ $\Rightarrow$ $u'=2x$, $v'=e^x$. So $\dfrac{d}{dx}(x^2 e^x)=2x e^x + x^2 e^x = e^x(x^2+2x)=xe^x(x+2)$.

---

**2.2** Compute $\dfrac{d}{dx}\bigl(x \ln x\bigr)$ for $x > 0$.

**Solution.** Product rule: $\dfrac{d}{dx}(x\ln x)=1\cdot\ln x + x\cdot \dfrac{1}{x}=\ln x + 1$.

---

**2.3** Compute $\dfrac{d}{dx}\left(\dfrac{x^2}{1 + x}\right)$ for $x \neq -1$.

**Solution.** **Quotient rule** $\left(\dfrac{f}{g}\right)'=\dfrac{f'g-fg'}{g^2}$ with $f=x^2$, $g=1+x$: $f'=2x$, $g'=1$. So $\dfrac{2x(1+x)-x^2}{(1+x)^2}=\dfrac{2x+x^2}{(1+x)^2}=\dfrac{x(x+2)}{(1+x)^2}$.

---

<h2 id="sec3">3. Exponentials and logarithms</h2>

**3.1** Compute $\dfrac{d}{dx}\bigl(e^{x^2}\bigr)$.

**Solution.** Chain rule: $\dfrac{d}{dx}e^{x^2}=e^{x^2}\cdot 2x=2x\,e^{x^2}$.

---

**3.2** Compute $\dfrac{d}{dx}\bigl(\ln(3x + 1)\bigr)$ for $x > -\tfrac{1}{3}$.

**Solution.** $\dfrac{d}{dx}\ln(3x+1)=\dfrac{3}{3x+1}$.

---

**3.3** Compute $\dfrac{d}{dx}\bigl(2^x\bigr)$ (express using $\ln 2$).

**Solution.** Since $2^x=e^{x\ln 2}$, $\dfrac{d}{dx}2^x=e^{x\ln 2}\cdot\ln 2=2^x\ln 2$.

---

<h2 id="sec4">4. Trigonometric and inverse trig</h2>

**4.1** Compute $\dfrac{d}{dx}\bigl(\sin(3x + 1)\bigr)$.

**Solution.** Chain rule: $\cos(3x+1)\cdot 3 = 3\cos(3x+1)$.

---

**4.2** Compute $\dfrac{d}{dx}\bigl(x^2 \cos x\bigr)$.

**Solution.** Product rule: $2x\cos x + x^2(-\sin x)=2x\cos x - x^2\sin x$.

---

**4.3** Compute $\dfrac{d}{dx}\bigl(\arctan(x^2)\bigr)$.

**Solution.** $\dfrac{d}{du}\arctan(u)=\dfrac{1}{1+u^2}$ with $u=x^2$, $\dfrac{du}{dx}=2x$: $\dfrac{1}{1+x^4}\cdot 2x=\dfrac{2x}{1+x^4}$.

---

<h2 id="sec5">5. Harder compositions</h2>

**5.1** Compute $\dfrac{d}{dx}\bigl(\ln(\sin x)\bigr)$ on intervals where $\sin x > 0$.

**Solution.** $\dfrac{d}{dx}\ln(\sin x)=\dfrac{\cos x}{\sin x}=\cot x$.

---

**5.2** Compute $\dfrac{d}{dx}\left(\dfrac{e^x}{1 + e^x}\right)$ (this is $\sigma'(x)$ for the logistic sigmoid).

**Solution.** Quotient rule: $\dfrac{e^x(1+e^x)-e^x\cdot e^x}{(1+e^x)^2}=\dfrac{e^x}{(1+e^x)^2}$. This equals $\sigma(x)\bigl(1-\sigma(x)\bigr)$ for $\sigma(x)=\dfrac{e^x}{1+e^x}$.

---

**5.3** Let $f(x) = \bigl(\ln x\bigr)^2$ for $x > 0$. Compute $f'(x)$.

**Solution.** Chain rule: outer $u^2$, inner $u=\ln x$, so $f'(x)=2(\ln x)\cdot \dfrac{1}{x}=\dfrac{2\ln x}{x}$.
