#!/bin/bash
set -e
    
# Collect images for Air Gap/Private Registry install
# Requires:
#   rke - https://rancher.com/docs/rke/v0.1.x/en/installation/
#   helm - https://docs.helm.sh/using_helm/#installing-helm
#   curl
#   jq
    
echo "RKE Images"
rke config --system-images 2>/dev/null > tmp-images.txt
    
echo "Helm Tiller Image"
helm init --dry-run --debug | grep image: | awk '{print $2}' >> tmp-images.txt
    
echo "Rancher Images"
latest_url=$(curl -sS "https://api.github.com/repos/rancher/rancher/releases/latest" | jq -r '.assets[]|select(.name=="rancher-images.txt")|.browser_download_url')
curl -sSL ${latest_url} >> tmp-images.txt
    
echo "Cert-Manager Image"
cm_repo=$(helm inspect values stable/cert-manager | grep repository: | awk '{print $2}')
cm_tag=$(helm inspect values stable/cert-manager | grep tag: | awk '{print $2}')
echo "${cm_repo}:${cm_tag}" >> tmp-images.txt
    
echo "Sort and uniq the images list"
cat tmp-images.txt | sort -u | uniq > images.txt
    
# cleanup tmp file
rm tmp-images.txt