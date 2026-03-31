# Day 6 — Study guide (MML textbook mapping)

**Textbook:** *Mathematics for Machine Learning* — Marc Peter Deisenroth, A. Aldo Faisal, Cheng Soon Ong (Cambridge University Press; PDF editions often dated 2020–2021).

Use the book as the primary reference for definitions, examples, and exercises. Section numbers follow the standard structure of the book (see [mml-book.com](https://mml-book.com/)).

---

## 1. Data models (learning, ERM, loss, regularization, validation)

| Topic | Primary chapter / sections |
| --- | --- |
| Data, models, and learning | **Chapter 8 — When Models Meet Data**, §8.1 *Data, Models, and Learning* |
| Empirical risk minimization | **Chapter 8**, §8.2 *Empirical Risk Minimization* |
| Hypothesis class of functions | **Chapter 8**, §8.1–§8.2 (hypothesis spaces / function classes are introduced in this modeling and ERM story) |
| Loss function for training | **Chapter 8**, §8.2 *Empirical Risk Minimization* |
| Regularization to reduce overfitting | **Chapter 8**, §8.2 *Empirical Risk Minimization* (structural risk / penalized objectives; ties to generalization discussed around ERM) |
| Cross-validation | **Chapter 8**, §8.6 *Model Selection* |

---

## 2. Estimation, probabilistic models, and graphical models

Your outline groups these under a heading similar to “model selection.” In the book, they are **three consecutive sections** before the section whose *title* is “Model Selection”:

| Topic | Primary chapter / sections |
| --- | --- |
| Parameter estimation | **Chapter 8**, §8.3 *Parameter Estimation* |
| Probabilistic modeling and inference | **Chapter 8**, §8.4 *Probabilistic Modeling and Inference* |
| Directed graphical models | **Chapter 8**, §8.5 *Directed Graphical Models* |

The chapter section explicitly named **model selection** (cross-validation, complexity control, etc.) is **§8.6** — linked to cross-validation in §1 above.

---

## 3. Linear regression — formulation and estimation

| Topic | Primary chapter / sections |
| --- | --- |
| Problem formulation | **Chapter 9 — Linear Regression**, §9.1 *Problem Formulation* |
| Parameter estimation | **Chapter 9**, §9.2 *Parameter Estimation* |

*Note:* **§8.3** treats parameter estimation in general; **§9.2** applies estimation to the linear regression model.

---

## 4. Bayesian linear regression and geometric view

| Topic | Primary chapter / sections |
| --- | --- |
| Bayesian linear regression | **Chapter 9**, §9.3 *Bayesian Linear Regression* |
| Maximum likelihood as orthogonal projection | **Chapter 9**, §9.4 *Maximum Likelihood as Orthogonal Projection* |

---

## Suggested reading order for Day 6

1. **Chapter 8** — §8.1 → §8.6 in order (data and learning through model selection).  
2. **Chapter 9** — §9.1 → §9.4 in order (linear regression from formulation through the projection interpretation).

**Prerequisites:** **Chapters 2–3** (vectors, projections), **Chapter 5** (gradients), **Chapter 6** (Gaussian distributions) for **§9.3–§9.4**; **Chapter 7** helps for optimization-flavored reading of regression.

---

## Quick reference — book chapters touched on Day 6

| Book chapter | Title |
| --- | --- |
| 8 | When Models Meet Data |
| 9 | Linear Regression |

---

*This file maps lecture topics to the textbook only; it does not replace solving exercises from the book.*
