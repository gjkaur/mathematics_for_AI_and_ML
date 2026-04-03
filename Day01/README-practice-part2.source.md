# Day 1 — Practice questions (part 2): inverse, eigenvalues, rank, matrix dependence

Extra drills aligned with **Chapter 2** (linear algebra) in *Mathematics for Machine Learning*. This **part 2** complements [`README-practice.md`](README-practice.md) (part 1). For each question, a short **Concept** explains the idea in plain language, then **Solution (step by step)** carries out the work. Math uses **inline** (`$...$`) so GitHub MathJax renders it; row breaks in matrices use `\cr` where needed (see [00-INDEX.md](00-INDEX.md#how-to-read-the-math)). The generated [`README-practice-part2.md`](README-practice-part2.md) is produced by `npm run render:math`—edit **this** `.source.md` file only.

> **Reading comfort:** See the root [`README.md`](../README.md#reading-comfort).

---

## Contents

1. [Inverse of a matrix](#sec1)
2. [Eigenvalues and eigenvectors](#sec2)
3. [Rank of a matrix](#sec3)
4. [Linear dependence of matrices (as a vector space)](#sec4)

---

<h2 id="sec1">1. Inverse of a matrix</h2>

### Q1

Find the inverse of $A=\begin{bmatrix} 3 & 2 & 1 \cr 1 & 1 & 0 \cr 2 & 1 & 1 \end{bmatrix}$.

**Concept.** The **inverse** $A^{-1}$ is the matrix that “undoes” $A$, like division for numbers. It exists only when $A$ is **nonsingular**: no redundant row (or column), determinant nonzero. If one row is a combination of others, the matrix **collapses** information and cannot be inverted.

**Solution (step by step).**

1. **Check dependence of rows.** Compute $\mathrm{row}_1-\mathrm{row}_2=[3-1,\,2-1,\,1-0]=[2,1,1]$. That equals $\mathrm{row}_3$. So $\mathrm{row}_1-\mathrm{row}_2-\mathrm{row}_3=\mathbf{0}$: the rows are linearly dependent.

2. **Conclusion.** A square matrix is invertible iff its rows (equivalently columns) are linearly independent, iff $\mathrm{rank}(A)=3$, iff $\det(A)\neq 0$. Here $\mathrm{rank}(A)\le 2$, so **$\det(A)=0$** and **$A^{-1}$ does not exist.**

3. **Optional: $\det(A)$ by first row (confirms singularity).**  
$\det(A)=3\det\begin{bmatrix}1&0\cr1&1\end{bmatrix}-2\det\begin{bmatrix}1&0\cr2&1\end{bmatrix}+1\det\begin{bmatrix}1&1\cr2&1\end{bmatrix}=3(1)-2(1)+1(-1)=0$.

---

### Q2

Determine whether $A=\begin{bmatrix} 1 & 2 & 3 \cr 2 & 4 & 6 \cr 1 & 0 & 1 \end{bmatrix}$ is invertible; if yes, find $A^{-1}$.

**Concept.** Same idea as Q1: invertible $\Leftrightarrow$ **full rank** $\Leftrightarrow$ rows (and columns) **independent**. If one row is a **multiple** of another, that already forces determinant zero—no inverse.

**Solution (step by step).**

1. **Spot a row relation.** $\mathrm{row}_2=[2,4,6]=2[1,2,3]=2\cdot\mathrm{row}_1$. So rows 1 and 2 are dependent.

2. **Determinant.** If two rows are proportional, $\det(A)=0$. (Alternatively: subtract $2\cdot\mathrm{row}_1$ from $\mathrm{row}_2$ to get a zero row.)

3. **Conclusion.** **$A$ is not invertible**; there is **no** $A^{-1}$. You do not need to run Gauss–Jordan on $[A\mid I]$.

---

<h2 id="sec2">2. Eigenvalues and eigenvectors</h2>

### Q3

Find the real eigenvalues of $A=\begin{bmatrix} 2 & 1 \cr 1 & 2 \end{bmatrix}$ and corresponding eigenvectors.

**Concept.** An **eigenvector** is a **special direction**: multiplying by $A$ only **stretches** (or flips) the vector; it does not turn it to a new direction. The **eigenvalue** $\lambda$ is that stretch factor: $A\mathbf{v}=\lambda\mathbf{v}$. You find $\lambda$ by solving $\det(A-\lambda I)=0$, then find $\mathbf{v}$ from $(A-\lambda I)\mathbf{v}=\mathbf{0}$.

**Solution (step by step).**

1. **Characteristic polynomial.**  
$A-\lambda I=\begin{bmatrix}2-\lambda&1\cr1&2-\lambda\end{bmatrix}$.  
$\det(A-\lambda I)=(2-\lambda)^2-1=\lambda^2-4\lambda+3=(\lambda-1)(\lambda-3)$.

2. **Eigenvalues.** $\lambda_1=1$, $\lambda_2=3$.

3. **$\lambda=1$.** Solve $(A-I)\mathbf{v}=\mathbf{0}$:  
$A-I=\begin{bmatrix}1&1\cr1&1\end{bmatrix}$. Equations: $v_1+v_2=0$, so $v_2=-v_1$. Take $v_1=1$: **$\mathbf{v}=\begin{bmatrix}1\cr-1\end{bmatrix}$** (any nonzero multiple).

4. **$\lambda=3$.** Solve $(A-3I)\mathbf{v}=\mathbf{0}$:  
$A-3I=\begin{bmatrix}-1&1\cr1&-1\end{bmatrix}$. Equations: $-v_1+v_2=0$, so $v_2=v_1$. Take $v_1=1$: **$\mathbf{v}=\begin{bmatrix}1\cr1\end{bmatrix}$**.

---

### Q4

Find eigenvalues and eigenvectors of $A=\begin{bmatrix} 4 & -2 \cr 1 & 1 \end{bmatrix}$.

**Concept.** Same as Q3: eigenvalues come from the **characteristic equation** $\det(A-\lambda I)=0$; each eigenvalue gives a **nullspace** of $A-\lambda I$—those nonzero vectors are eigenvectors.

**Solution (step by step).**

1. **Characteristic polynomial.**  
$\det(A-\lambda I)=(4-\lambda)(1-\lambda)-(-2)(1)=\lambda^2-5\lambda+6=(\lambda-2)(\lambda-3)$.

2. **Eigenvalues.** $\lambda_1=2$, $\lambda_2=3$.

3. **$\lambda=2$.** $A-2I=\begin{bmatrix}2&-2\cr1&-1\end{bmatrix}$. First row: $2v_1-2v_2=0\Rightarrow v_1=v_2$. **$\mathbf{v}=\begin{bmatrix}1\cr1\end{bmatrix}$.**

4. **$\lambda=3$.** $A-3I=\begin{bmatrix}1&-2\cr1&-2\end{bmatrix}$. Equation $v_1-2v_2=0$, so $v_1=2v_2$. **$\mathbf{v}=\begin{bmatrix}2\cr1\end{bmatrix}$.**

---

### Q5

Is $A=\begin{bmatrix} 3 & 1 \cr 0 & 3 \end{bmatrix}$ diagonalizable?

**Concept.** **Diagonalizable** means: you can pick a basis of **eigenvectors**, so $A$ looks like a diagonal matrix (only scales along axes) after a change of basis. That needs **enough** eigenvectors: for each eigenvalue, the **geometric** multiplicity (dimension of eigenspace) must match the **algebraic** multiplicity (how often it appears as a root). If an eigenvalue is “repeated” but only one eigen-direction exists, you cannot diagonalize.

**Solution (step by step).**

1. **Eigenvalues (triangular matrix).** Diagonal entries are eigenvalues: $\lambda=3$ with **algebraic multiplicity** 2.

2. **Eigenspace for $\lambda=3$.**  
$A-3I=\begin{bmatrix}0&1\cr0&0\end{bmatrix}$. So $v_2=0$ and $v_1$ is free: eigenvectors are **$\mathbf{v}=t\begin{bmatrix}1\cr0\end{bmatrix}$**, $t\neq 0$. The eigenspace is **one-dimensional**.

3. **Diagonalizability.** A matrix is diagonalizable over $\mathbb{R}$ iff for each eigenvalue, geometric multiplicity equals algebraic multiplicity. Here geometric multiplicity $=1$ but algebraic $=2$. So **$A$ is not diagonalizable** (Jordan block $\begin{bmatrix}3&1\cr0&3\end{bmatrix}$, not similar to $\mathrm{diag}(3,3)$).

---

<h2 id="sec3">3. Rank of a matrix</h2>

### Q6

Find the rank of $A=\begin{bmatrix} 1 & 2 & 3 \cr 2 & 4 & 6 \cr 1 & 1 & 1 \end{bmatrix}$.

**Concept.** **Rank** counts how many rows are **genuinely new** information—not repeats or combinations of earlier rows. Row reduction reveals **pivots**; rank $=$ number of pivots $=$ dimension of the row space.

**Solution (step by step).**

1. **Eliminate.** $R_2\leftarrow R_2-2R_1$: row 2 becomes $[0,0,0]$.

2. **Remaining matrix** (swap if you like):  
$\begin{bmatrix}1&2&3\cr0&0&0\cr1&1&1\end{bmatrix}$. Then $R_3\leftarrow R_3-R_1$: $[0,-1,-2]$.

3. **Echelon form** (reorder rows):  
$\begin{bmatrix}1&2&3\cr0&-1&-2\cr0&0&0\end{bmatrix}$. Two nonzero rows with pivots in columns 1 and 2.

4. **Rank** $=$ number of pivots $=$ **2**.

---

### Q7

Rank of $A=\begin{bmatrix} 2 & -1 & 0 \cr 4 & -2 & 1 \cr 6 & -3 & 1 \end{bmatrix}$ (row reduction).

**Concept.** Again, rank $=$ number of independent rows. **Row operations** (add multiples of one row to another) do not change rank; they only make the pattern visible—zeros appear when one row is a **combination** of others.

**Solution (step by step).**

1. **$R_2\leftarrow R_2-2R_1$:** $[4-4,\,-2+2,\,1-0]=[0,0,1]$.

2. **$R_3\leftarrow R_3-3R_1$:** $[6-6,\,-3+3,\,1-0]=[0,0,1]$.

3. Matrix: $\begin{bmatrix}2&-1&0\cr0&0&1\cr0&0&1\end{bmatrix}$. Then **$R_3\leftarrow R_3-R_2$** gives row 3 as zero.

4. **Nonzero rows:** $[2,-1,0]$ and $[0,0,1]$ — clearly independent (pivots in different columns after ordering). **$\mathrm{rank}(A)=2$.**

5. **Interpretation:** Note $\mathrm{row}_3=\mathrm{row}_1+\mathrm{row}_2$ because $[6,-3,1]=[2,-1,0]+[4,-2,1]$.

---

### Q8

For what $k$ does $A=\begin{bmatrix} 1 & 2 & 3 \cr 2 & 4 & k \cr 1 & 2 & 3 \end{bmatrix}$ have rank $2$?

**Concept.** A **parameter** $k$ slides one row; rank changes when that row **lines up** with another (becomes dependent). Here rows 1 and 3 are already the same, so rank is at most 2; you only need to see when row 2 **collapses** onto the same line as row 1 (rank drops to 1).

**Solution (step by step).**

1. **Rows 1 and 3 are identical**, so $\mathrm{rank}(A)\le 2$ always.

2. **Case $k=6$.** Then $\mathrm{row}_2=[2,4,6]=2[1,2,3]=2\cdot\mathrm{row}_1$. All nonzero rows are multiples of $[1,2,3]$ $\Rightarrow$ **$\mathrm{rank}(1)$**.

3. **Case $k\neq 6$.** Then $\mathrm{row}_2$ is **not** a scalar multiple of $\mathrm{row}_1$ (the third entry would require $k=6$). With two different directions in the row space and $\mathrm{row}_1=\mathrm{row}_3$, you get exactly **two** independent rows $\Rightarrow$ **$\mathrm{rank}(2)$**.

4. **Answer:** rank is **2** if and only if **$k\neq 6$**.

---

<h2 id="sec4">4. Linear dependence of matrices</h2>

Work in $V=\mathbb{R}^{2\times 2}$ (dimension $4$). Identify each $\begin{bmatrix}a&b\cr c&d\end{bmatrix}$ with $(a,b,c,d)\in\mathbb{R}^4$.

### Q9

Are $A=\begin{bmatrix} 1 & 0 \cr 0 & 1 \end{bmatrix}$, $B=\begin{bmatrix} 0 & 1 \cr 1 & 0 \end{bmatrix}$, $C=\begin{bmatrix} 1 & 1 \cr 1 & 1 \end{bmatrix}$ linearly independent?

**Concept.** Matrices can be treated as **vectors** (list the four entries). **Linear independence** means: the only way to combine $A,B,C$ with coefficients and get the **zero matrix** is the **trivial** combination (all coefficients zero). If you can find **nonzero** $a,b,c$ with $aA+bB+cC=0$, they are **dependent**.

**Solution (step by step).**

1. **Form $aA+bB+cC$.**  
Top-left: $a\cdot 1+b\cdot 0+c\cdot 1=a+c$.  
Top-right: $0+b+c=b+c$.  
Bottom-left: $0+b+c=b+c$.  
Bottom-right: $a+0+c=a+c$.

2. **Set equal to zero matrix:**  
$a+c=0$, $b+c=0$, $b+c=0$, $a+c=0$ $\Rightarrow$ $c=-a$ and $b=-c$, hence **$b=a$**.

3. **Nontrivial solution.** Choose $a=1$, then $b=1$, $c=-1$:  
$1\cdot A+1\cdot B+(-1)\cdot C=\begin{bmatrix}0&0\cr0&0\end{bmatrix}$.

4. **Conclusion.** A nontrivial linear combination is zero $\Rightarrow$ **linearly dependent** (not independent).

---

### Q10

Are $A=\begin{bmatrix} 2 & 1 \cr 1 & 0 \end{bmatrix}$, $B=\begin{bmatrix} 1 & -1 \cr 0 & 2 \end{bmatrix}$, $C=\begin{bmatrix} 3 & 0 \cr 1 & 2 \end{bmatrix}$ linearly dependent?

**Concept.** **Dependent** means one matrix is a **combination** of the others—often one matrix equals a sum of others entry by entry. That immediately gives a nontrivial combination equal to zero (e.g. $A+B-C$).

**Solution (step by step).**

1. **Add $A+B$ entrywise.**  
Top-left: $2+1=3$. Top-right: $1+(-1)=0$.  
Bottom-left: $1+0=1$. Bottom-right: $0+2=2$.

2. So $A+B=\begin{bmatrix}3&0\cr1&2\end{bmatrix}=C$.

3. Hence $1\cdot A+1\cdot B+(-1)\cdot C=0$. **Linearly dependent.**

---

### Q11

Find $a,b,c$ with $aA+bB+cC=0$ for $A=\begin{bmatrix} 1 & 2 \cr 3 & 4 \end{bmatrix}$, $B=\begin{bmatrix} 0 & 1 \cr 1 & 0 \end{bmatrix}$, $C=\begin{bmatrix} 2 & 3 \cr 4 & 5 \end{bmatrix}$.

**Concept.** You get a **small linear system**: each matrix entry gives one equation in $a,b,c$. **Independent** matrices mean only $a=b=c=0$ works. **Dependent** would mean a nonzero solution exists—like solving any homogeneous system, but with four equations from the four positions.

**Solution (step by step).**

1. **Write four equations** from the four entries of $aA+bB+cC=\mathbf{0}$:  
$(1,1)$: $a+0+2c=0$ $\Rightarrow$ **$a=-2c$**.  
$(2,2)$: $4a+0+5c=0$.  
$(1,2)$: $2a+b+3c=0$.  
$(2,1)$: $3a+b+4c=0$.

2. **Use $(1,1)$ in $(2,2)$:** $4(-2c)+5c=-8c+5c=-3c=0$ $\Rightarrow$ **$c=0$**.

3. **Then** $a=-2c=0$. From $(1,2)$: $0+b+0=0$ $\Rightarrow$ $b=0$. (Equation $(2,1)$ is then $0+0+0=0$, consistent.)

4. **Conclusion.** The only solution is **$a=b=c=0$**. So **$A,B,C$ are linearly independent** in $\mathbb{R}^{2\times 2}$.

5. **Remark.** Three matrices in a $4$-dimensional space *can* be independent; here they are.
