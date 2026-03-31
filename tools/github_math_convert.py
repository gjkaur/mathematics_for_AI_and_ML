"""Convert $$...$$ display math to GitHub ```math fenced blocks (GFM / MathJax)."""
from __future__ import annotations

import sys
from pathlib import Path


def replace_display_math(md: str) -> str:
    """Replace $$...$$ outside triple-backtick fences with ```math ... ```."""
    parts: list[tuple[str, str]] = []
    pos = 0
    while True:
        i = md.find("```", pos)
        if i == -1:
            parts.append(("t", md[pos:]))
            break
        parts.append(("t", md[pos:i]))
        j = md.find("```", i + 3)
        if j == -1:
            parts.append(("t", md[i:]))
            break
        parts.append(("f", md[i : j + 3]))
        pos = j + 3

    out: list[str] = []
    for kind, chunk in parts:
        if kind == "f":
            out.append(chunk)
            continue
        s = chunk
        buf: list[str] = []
        p = 0
        while p < len(s):
            a = s.find("$$", p)
            if a == -1:
                buf.append(s[p:])
                break
            buf.append(s[p:a])
            b = s.find("$$", a + 2)
            if b == -1:
                buf.append(s[a:])
                break
            inner = s[a + 2 : b]
            buf.append("\n```math\n")
            buf.append(inner.lstrip("\n"))
            if not inner.rstrip("\n").endswith("\n"):
                buf.append("\n")
            buf.append("```\n")
            p = b + 2
        out.append("".join(buf))
    return "".join(out)


def main() -> None:
    import re

    root = Path(__file__).resolve().parent.parent / "Day01"
    # 01-… through 15-… only (not Day01.md; not 00-INDEX — it documents ```math and must not be auto-converted)
    files = sorted(
        p
        for p in root.glob("*.md")
        if re.match(r"^\d{2}-", p.name)
    )

    for path in sorted(files):
        text = path.read_text(encoding="utf-8")
        new = replace_display_math(text)
        if new != text:
            path.write_text(new, encoding="utf-8")
            print("updated", path.name)


if __name__ == "__main__":
    main()
