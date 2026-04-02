# Day 1 — Topic notes index

Study notes aligned with *Mathematics for Machine Learning* (Deisenroth, Faisal & Ong). Each file is **numbered** for quick access.

Every topic note begins with **Why learn this?** — motivation, **where the idea appears**, and **applications** (ML and related)—then the main content and **Additional solved examples**.

---

## How to read the math

These notes are formatted for **GitHub Flavored Markdown** math ([MathJax](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions)):

- **Inline:** `$ ... $` (e.g. `$A\mathbf{x}=\mathbf{b}$`)
- **Display:** Use a **math** fenced block. Open with a line containing only three backticks followed immediately by the word `math`, put the formula on the next lines, then close with a line containing only three backticks (see the example below).
- **GitHub tip:** Those fence lines must **not** be indented with spaces. If the opening line starts with four spaces, GitHub treats the block as ordinary code, not math.
- **Unary minus in inline math:** If a formula that *starts* with a minus right after the opening delimiter does not render on GitHub, group the minus with braces (standard LaTeX): write `{-}` first inside the math, then the rest (for example lambda as `{-}\lambda` inside the same pair of dollar signs). Avoid putting Markdown **bold** markers immediately before math that would begin with “dollar, minus, …”—put emphasis on nearby words instead.
- **Matrices in inline math:** Row breaks inside `bmatrix` / `pmatrix` normally use `\\` in LaTeX. In **inline** `$...$` on GitHub, `\\` is often mangled by Markdown. Prefer a **display** `math` block for multi-row matrices, or use `\cr` between rows in inline matrices (e.g. `\begin{bmatrix} 1 \cr -1 \end{bmatrix}`).

Example:

```math
\mathbf{y} = A\mathbf{x}\,, \quad \|\mathbf{x}\|_2 = \sqrt{\mathbf{x}^\top\mathbf{x}}\,.
```

**On GitHub:** Open any topic `.md` in the **normal file view** (not **Raw**). **Locally:** VS Code with a math-capable Markdown preview, Obsidian, Typora, Jupyter, etc.

The **YouTube companion** pages under [`youtube/`](youtube/README.md) use plain Unicode for short lines; the **topic notes** here use full LaTeX in inline `$...$` and in display math fences as shown above.

**Day 1 practice sheet:** [`README-practice.md`](README-practice.md) is **generated** (display math as PNG). Edit [`README-practice.source.md`](README-practice.source.md); push to `main` and CI regenerates outputs, or run `npm run practice:all` locally once (see root [`README.md`](../README.md)). The same pipeline applies to any `*README*.source.md` in the repo; for Day 1 only, `npm run render:math:day01` runs every `Day01/**/README*.source.md`. The short YouTube topic pages under [`youtube/`](youtube/README.md) stay plain Markdown (no ` ```math `); add a `README*.source.md` there only if you introduce display math and want PNG output.

---

## Topic list

| # | File | Topic |
|---|------|--------|
| 01 | [01-systems-of-linear-equations.md](01-systems-of-linear-equations.md) | Systems of linear equations (§2.1) |
| 02 | [02-matrices.md](02-matrices.md) | Matrices (§2.2) |
| 03 | [03-solving-systems-of-linear-equations.md](03-solving-systems-of-linear-equations.md) | Solving systems (§2.3) |
| 04 | [04-vector-spaces.md](04-vector-spaces.md) | Vector spaces (§2.4) |
| 05 | [05-linear-independence.md](05-linear-independence.md) | Linear independence (§2.5) |
| 06 | [06-basis-and-rank.md](06-basis-and-rank.md) | Basis and rank (§2.6) |
| 07 | [07-linear-mappings.md](07-linear-mappings.md) | Linear mappings (§2.7) |
| 08 | [08-affine-spaces.md](08-affine-spaces.md) | Affine spaces (§2.8) |
| 09 | [09-norms.md](09-norms.md) | Norms (§3.1) |
| 10 | [10-inner-products.md](10-inner-products.md) | Inner products (§3.2) |
| 11 | [11-lengths-and-distances.md](11-lengths-and-distances.md) | Lengths and distances (§3.3) |
| 12 | [12-angles-and-orthogonality.md](12-angles-and-orthogonality.md) | Angles and orthogonality (§3.4) |
| 13 | [13-cleaning-data-outliers.md](13-cleaning-data-outliers.md) | Cleaning data / outliers (Ch. 6, 8, 9) |
| 14 | [14-generating-random-datasets.md](14-generating-random-datasets.md) | Generating random datasets (Ch. 6, 8, 9) |
| 15 | [15-smoothing-noise-in-data.md](15-smoothing-noise-in-data.md) | Smoothing noise (Ch. 6, 9, 10) |

**Syllabus mapping:** [Day01.md](Day01.md) lists chapter/section references and suggested reading order.

**YouTube (per topic):** [youtube/README.md](youtube/README.md) — curated links for each Day 1 topic.

Each topic file includes an **Additional solved examples** section: extra problems in the **style of MML** chapter exercises, with **step-by-step** solutions (book-style where standard; original problems where the topic is applied, e.g. outliers / synthetic data).

---

*Work the official textbook exercises alongside these notes for full mastery.*
