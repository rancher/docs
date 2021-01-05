locals {
  results = jsondecode(file(var.results_file))
  markdown = templatefile("${path.module}/templates/hardening.template.default.layout.md",
    {
      rancher_version    = var.rancher_version
      kubernetes_version = var.kubernetes_version
      cis_version        = var.cis_version
      test_node          = var.test_node
      test_helper_path   = var.test_helper_path
      results            = local.results
      weight             = var.index_weight
    }
  )
}

resource "local_file" "output" {
  content         = local.markdown
  file_permission = "0644"
  filename        = var.output_file
}
