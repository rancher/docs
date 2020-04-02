#!/bin/bash -e

md_source="${1:-/source/source.md}"

pandoc -s --template="templates/default.html" -f markdown-smart --toc -c css/style-portrait.css "${md_source}" -o "source.html"
python3 -m weasyprint source.html /output/output.pdf
