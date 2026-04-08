# Mathematics for AI and ML

Study materials aligned with **[*Mathematics for Machine Learning*](https://mml-book.com/)** by Marc Peter Deisenroth, A. Aldo Faisal, and Cheng Soon Ong (Cambridge University Press). This repository holds **chapter mappings**, **topic notes**, and **worked examples** organized by study day—not a replacement for the textbook.

Download the official PDF from the [companion site](https://mml-book.com/) or your library; the book itself is **not** included here.

---

## What is in this repository

| Folder | Contents |
|--------|----------|
| [`Day01/`](Day01/) | Linear algebra (Ch. 2), analytic geometry (Ch. 3 §3.1–3.4), and data-oriented pointers (Ch. 6, 8, 9). Topic notes `01-`…`15-`, syllabus map [`Day01.md`](Day01/Day01.md), index [`00-INDEX.md`](Day01/00-INDEX.md). Practice sheets: [`README-practice.md`](Day01/README-practice.md), [`README-practice-part2.md`](Day01/README-practice-part2.md). |
| [`Day02/`](Day02/)–[`Day08/`](Day08/) | One guide per day: textbook sections for orthonormal bases & matrix decompositions (Day 2), vector calculus (Day 3), probability (Day 4), optimization (Day 5), models & regression (Day 6), PCA & GMM (Day 7), SVM (Day 8). Day 4 practice: [`README-practice.md`](Day04/README-practice.md). Day 5 terms & formulas: [`README.md`](Day05/README.md); numerical practice: [`README-practice.md`](Day05/README-practice.md). Day 6 beginner guide (Ch. 8–9): [`README.md`](Day06/README.md). |

Each `DayNN/DayNN.md` file maps that day’s topics to **book chapters and section numbers** from *Mathematics for Machine Learning*.

**Calculus formulas (reference):** [`Day03/README-calculus.md`](Day03/README-calculus.md) — differentiation and integration rules, multivariate gradients and Jacobians, and common ML activations.

**Derivative drills (questions + solutions):** [`Day03/README-derivatives-practice.md`](Day03/README-derivatives-practice.md) — step-by-step worked problems keyed to that formula sheet (edit [`Day03/README-derivatives-practice.source.md`](Day03/README-derivatives-practice.source.md)).

---

## How to use it

1. Open the day folder you are studying (e.g. `Day01/`).
2. Read `DayNN.md` for the **reading order** and **MML references**.
3. Use `00-INDEX.md` (Day 1) or the numbered topic files for **notes and solved examples**.

Math in the notes uses **LaTeX**: inline `$...$`, and **display** math in GitHub’s **math** fenced blocks (see [Day01/00-INDEX.md](Day01/00-INDEX.md#how-to-read-the-math)).

On **github.com**, open the normal file view (not Raw) so formulas render—see GitHub’s [math documentation](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions). Locally, use VS Code with a math-capable Markdown preview, Obsidian, Typora, etc.

### Reading comfort

GitHub does not let repositories change font size on **github.com**—use your browser zoom if needed (**Ctrl +** / **Ctrl + mouse wheel**). In **Cursor / VS Code**, this workspace sets a **larger Markdown preview** and **slightly larger editor font** for **all** `*.md` files (including every `README*.md` in the repo): see [`.vscode/settings.json`](.vscode/settings.json) and [`markdown-preview.css`](markdown-preview.css) at the repo root. Reload the Markdown preview after pulling changes.

### README files with PNG math (reliable display math on GitHub)

Any file whose name matches `*README*.source.md` (anywhere in the repo, except `node_modules`) is the **editable source**. The renderer writes the matching output: e.g. `README-practice.source.md` → `README-practice.md`, `README.source.md` → `README.md`. Display formulas go in ` ```math ` fences; shared PNGs are stored under [`assets/math/`](assets/math/) (`eq-{hash}.png`).

- **Read (example):** [`Day01/README-practice.md`](Day01/README-practice.md) — display math is **PNG images** (reliable in the normal GitHub file view).
- **Edit only:** the corresponding `*.source.md` file. Do **not** edit the generated `README*.md` by hand.

**Automated path (recommended):** Push changes to any `*README*.source.md` on **`main`**. The workflow [`.github/workflows/render-math.yml`](.github/workflows/render-math.yml) runs on the server, regenerates PNGs and the output Markdown, and **commits** them—you do not need Node installed for that.

**Local one-shot (first time or to preview before push):** In the repo root, run:

```bash
npm run practice:all
```

That installs npm dependencies, installs Playwright’s Chromium, and runs the renderer for **all** matching sources. To process only sources under [`Day01/`](Day01/) (including any future `Day01/**/README*.source.md`), use `npm run render:math:day01`. Later edits only need `npm run practice:render` (or `npm run render:math`, or `npm run math:render`) if dependencies are already installed.

**Cursor / VS Code:** Run the task **Practice: full render** (from the command palette: “Tasks: Run Task”) to execute the same steps.

---

## License and textbook

Study notes in this repository are provided for **personal and educational** use. The textbook *Mathematics for Machine Learning* is copyrighted by its authors and Cambridge University Press; cite the book when you use its definitions and exercises.

---

## Contributing

This is a personal course companion repository. If you fork it, keep your own copy of the textbook and respect the publisher’s terms.
