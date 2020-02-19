#!/bin/bash -e

results=${1:?path to kube-bench json results is a required argument}
test_helpers=${2:?path to kube-bench test_helpers scripts is a required argument}

[ -f ${results} ] || (echo "file:'${results}' does not exist"; exit 1)
[ -d ${test_helpers} ] || (echo "dir: '${test_helpers}' not a valid directory"; exit 1)

docker run -v${results}:/source/results.json -v ${test_helpers}:/test_helpers -it --rm doc_converters:latest results_to_md
