#!/bin/bash

#results_file="${1:-/source/results.json}"
results_file="${1:-/home/paraglade/brain/projects/cis_benchmark/clusters/cis/csr.json}"
#test_helpers="${2:-/test_helpers}"
test_helpers="${2:-/home/paraglade/brain/repos/rancher-security-scan/package/helper_scripts}"

header() {
cat <<EOF
---
title: CIS 1.6 Benchmark - Self-Assessment Guide - Rancher v2.5
weight: 101
---

### CIS v1.6 Kubernetes Benchmark - Rancher v2.5 with Kubernetes v1.18

[Click here to download a PDF version of this document](https://releases.rancher.com/documents/security/2.5/Rancher_1.6_Benchmark_Assessment.pdf)

#### Overview

This document is a companion to the Rancher v2.5 security hardening guide. The hardening guide provides prescriptive guidance for hardening a production installation of Rancher, and this benchmark guide is meant to help you evaluate the level of security of the hardened cluster against each control in the benchmark.

This guide corresponds to specific versions of the hardening guide, Rancher, CIS Benchmark, and Kubernetes:

Hardening Guide Version | Rancher Version | CIS Benchmark Version |  Kubernetes Version
---------------------------|----------|---------|-------
Hardening Guide with CIS 1.5 Benchmark | Rancher v2.5 | CIS v1.5| Kubernetes v1.15

Because Rancher and RKE install Kubernetes services as Docker containers, many of the control verification checks in the CIS Kubernetes Benchmark don't apply and will have a result of \`Not Applicable\`. This guide will walk through the various controls and provide updated example commands to audit compliance in Rancher-created clusters.

This document is to be used by Rancher operators, security teams, auditors and decision makers.

For more detail about each audit, including rationales and remediations for failing tests, you can refer to the corresponding section of the CIS Kubernetes Benchmark v1.5. You can download the benchmark after logging in to [CISecurity.org]( https://www.cisecurity.org/benchmark/kubernetes/).

#### Testing controls methodology

Rancher and RKE install Kubernetes services via Docker containers. Configuration is defined by arguments passed to the container at the time of initialization, not via configuration files.

Where control audits differ from the original CIS benchmark, the audit commands specific to Rancher Labs are provided for testing.
When performing the tests, you will need access to the Docker command line on the hosts of all three RKE roles. The commands also make use of the the [jq](https://stedolan.github.io/jq/) and [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) (with valid config) tools to and are required in the testing and evaluation of test results.

> NOTE: only scored tests are covered in this guide.

### Controls
EOF
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
