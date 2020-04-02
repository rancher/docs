# Converters
A collection of scripts and tools to transform documentation from one format to another. These scripts leverage docker containers to ease portability to different platforms.

### Usage
To get started first build the local docker image by running the build script:

```
build.sh
```

#### Kube-bench json results to markdown
This converter takes two positional arguments, a `kube-bench` json results file and the directory of the helper scripts used for the kube-bench execution.

```
./run_results_to_md.sh results.json kube-bench/test_helpers
```

The conversion is sent to `stdout` which can be redirected to a file to save the conversion.

#### Markdown to pdf
This converter takes a single argument, a markdown file to convert to pdf format. The resulting pdf file is saved in `output/output.pdf`

```
./run_md_to_pdf.sh ../../content/rancher/v2.x/en/security/hardening-2.3.3/_index.md
```
