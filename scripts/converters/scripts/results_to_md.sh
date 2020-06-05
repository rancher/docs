results_file="${1:-/source/results.json}"
test_helpers="${2:-/test_helpers}"

get_ids() {
  jq -r .id ${results_file} | sort -n
}

get_id_text() {
  id=${1}
  jq -r --arg id "${id}" 'select(.id==$id) | .text' ${results_file}
}

get_section_ids() {
  id=${1}
  jq -r --arg id "${id}" 'select(.id==$id) | .tests[].section' ${results_file}
}

get_section_desc() {
  id=${1}
  section=${2}
  jq -r --arg id "${id}" --arg section "${section}" 'select(.id==$id).tests[] | select(.section==$section).desc' ${results_file}
}

get_tests() {
  id=${1}
  section=${2}
  jq -r --arg id "${id}" --arg section "${section}" 'select(.id==$id).tests[] | select(.section==$section).results[].test_number' ${results_file}
}

get_test() {
  id=${1}
  section=${2}
  test_number=${3}
  jq -r --arg id "${id}" --arg section "${section}" --arg test_number "${test_number}" 'select(.id==$id).tests[] | select(.section==$section).results[] | select(.test_number==$test_number)' ${results_file}
}

cat headers/header-2.4.md

for id in $(get_ids); do
  echo "## ${id} $(get_id_text ${id})"
  for section in $(get_section_ids ${id}); do
    echo "### ${section} $(get_section_desc ${id} ${section})"
    echo
    for test in $(get_tests ${id} ${section}); do
      result=$(get_test ${id} ${section} ${test})
      test_desc=$(echo ${result} | jq -r '.test_desc')
      audit=$(echo ${result} | jq -r '.audit')
      audit_config=$(echo ${result} | jq -r '.AuditConfig')
      actual_value=$(echo ${result} | jq -r '.actual_value')
      type=$(echo ${result} | jq -r '.type')
      status=$(echo ${result} | jq -r '.status')
      remediation=$(echo ${result} | jq -r '.remediation')
      expected_result=$(echo ${result} | jq -r '.expected_result')
      echo "#### ${test} ${test_desc}"
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
        echo "${remediation}"
        echo
      fi
      if [ ! -z "${audit}" ] && [ ${status} != "INFO" ]; then
        if [[ ${audit} =~ "test_helpers" ]]; then
          audit_script=$(basename ${audit})
          test_helper="${test_helpers}/${audit_script}"
          echo "**Audit Script:** ${audit_script}"
          echo
          echo '```'
          cat "${test_helper}"
          echo '```'
          echo
          echo "**Audit Execution:**"
          echo
          echo '```'
          echo "./${audit_script} $(echo ${audit} | awk '{print $2}')"
          echo '```'
          echo
        else
          echo "**Audit:**"
          echo
          echo '```'
          echo "${audit}"
          echo '```'
          echo
        fi
      fi
      if [ ! -z "${audit_config}" ] && [ ${status} != "INFO" ]; then
        echo "**Audit Config:**"
        echo
        echo '```'
        echo "${audit_config}"
        echo '```'
        echo
      fi
      if [ ! -z "${actual_value}" ] && [ ${status} != "PASS" ]; then
        echo "**Returned Value**:"
        echo
        echo "\`${actual_value}\`"
        echo
      fi
      if [ ! -z "${expected_result}" ]; then
        echo "**Expected result**:"
        echo
        echo '```'
        echo ${expected_result}
        echo '```'
        echo
      fi
    done
  done
done
