#!/bin/bash -e

abs_path() {
  echo "$(cd "$(dirname "$1")"; pwd -P)/$(basename "$1")"
}

md_source=${1:?path to markdown file is a required argument}

[ -f ${md_source} ] || (echo "file:'${results}' does not exist"; exit 1)

docker run -v $(abs_path ${md_source}):/source/source.md -v $(pwd)/output:/output -it --rm doc_converters:latest md_to_pdf
