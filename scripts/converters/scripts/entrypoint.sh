#!/bin/bash -e

usage() {
echo -n "[command] [command_options]

commands:
  results_to_md: take json output from kube-bench as source and outputs markdown
    options: 
      -s,  --source	source json from kube-bench default: /source/results.json
"
}

if [[ $# -eq 0 ]]; then
		usage
    exit 2
fi

scripts/${1}.sh
