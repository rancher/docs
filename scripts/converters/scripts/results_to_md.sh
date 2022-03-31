#!/bin/bash

results_file="${1:-/source/results.json}"
test_helpers="${2:-/test_helpers}"
header_file="${3:-/headers/header.md}"

header() {
cat ${header_file}
}

get_ids() {
  jq -r .[].id ${results_file} | sort -n
}

get_id_text() {
  id=${1}
  jq -r --arg id "${id}" '.[] | select(.id==$id) | .description' ${results_file}
}

get_section_ids() {
  id=${1}
  jq -r --arg id "${id}" '.[] | select(.id==$id) | .checks[].id' ${results_file}
}

get_section_desc() {
  id=${1}
  section=${2}
  jq -r --arg id "${id}" --arg section "${section}" '.[] | select(.id==$id).checks[] | select(.id==$section).description' ${results_file}
}

get_tests() {
  id=${1}
  section=${2}
  jq -r --arg id "${id}" --arg section "${section}" '.[] | select(.id==$id).checks[] | select(.id==$section).id' ${results_file}
}

get_test() {
  id=${1}
  section=${2}
  test_number=${3}
  jq -r --arg id "${id}" --arg section "${section}" --arg test_number "${test_number}" '.[] | select(.id==$id).checks[] | select(.id==$test_number)' ${results_file}
}

header

for id in $(get_ids); do
  echo "## ${id} $(get_id_text ${id})"
  for section in $(get_section_ids ${id}); do
    echo "### ${section} $(get_section_desc ${id} ${section})"
    echo
    for test in $(get_tests ${id} ${section}); do
      result=$(get_test ${id} ${section} ${test})
      test_desc=$(echo ${result} | jq -r '.description')
      audit=$(echo ${result} | jq -r '.audit')
      audit_config=$(echo ${result} | jq -r '.audit_config')
      actual_value=$(echo ${result} | jq -r '.actual_value_per_node."cis-aio-0"')
      type=$(echo ${result} | jq -r '.test_type')
      status=$(echo ${result} | jq -r '.state')
      remediation=$(echo ${result} | jq -r '.remediation')
      expected_result=$(echo ${result} | jq -r '.expected_result')
#      echo "#### ${test} ${test_desc}"
      echo
      if [ "${type}" = "skip" ]; then
        echo "**Result:** Not Applicable"
        echo
      else
        echo "**Result:** ${status}"
        echo
      fi
      if [ ! -z "${remediation}" ]; then
        echo "**Remediation:**"
        echo -e "${remediation//\\n/<br />}"
        echo
      fi
      if [ ! -z "${audit}" ] && [ "${status}" != "INFO" ] && [ "${type}" != "skip" ]; then
        if [[ ${audit} =~ ".sh" ]]; then
          audit_script=$(basename $(echo ${audit} | cut -d ' ' -f1))
          test_helper="${test_helpers}/${audit_script}"
          echo "**Audit Script:** ${audit_script}"
          echo
          echo '```bash'
          cat ${test_helper}
          echo
          echo '```'
          echo
          echo "**Audit Execution:**"
          echo
          echo '```bash'
          echo "./${audit_script} $(echo ${audit} | awk '{print $2}')"
          echo '```'
          echo
        else
          echo "**Audit:**"
          echo
          echo '```bash'
          echo ${audit}
          echo '```'
          echo
        fi
      fi
      if [ ! -z "${audit_config}" ] && [ ${status} != "INFO" ]; then
        echo "**Audit Config:**"
        echo
        echo '```bash'
        echo ${audit_config}
        echo '```'
        echo
      fi
      if [ ! -z "${actual_value}" ] && [ "${status}" != "PASS" ] && [ "${type}" != "skip" ] && [ "${type}" != "manual" ]; then
        echo "**Returned Value**:"
        echo
        echo '```console'
        echo ${actual_value}
        echo '```'
        echo
      fi
      if [ ! -z "${expected_result}" ]; then
        echo "**Expected result**:"
        echo
        echo '```console'
        echo ${expected_result}
        echo '```'
        echo
      fi
    done
  done
done
