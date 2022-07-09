import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import SearchBar from '@theme/SearchBar';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className="searchBarStyle">
          <SearchBar/>
        </div>
        
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
title={`Hello from ${siteConfig.title}`}
description="Description will go into a meta tag in 
<head />
   ">
   <HomepageHeader />
   <div className="boxes">
      <div className="box">
         <div className="boxContent">
            <p className="cardTitle">Get started</p>
            <p className="cardText">Install Rancher on Kubernetes</p>
            <p><a href="https://rancher.com/docs/rancher/v2.6/en/installation/install-rancher-on-k8s/" className="cardLink">Learn more</a></p>
         </div>
      </div>
      <div className="box">
         <div className="boxContent">
            <p className="cardTitle">Cluster Provisioning</p>
            <p className="cardText">Launch downstream Kubernetes clusters with Rancher</p>
            <p><a className="cardLink" href="https://rancher.com/docs/rancher/v2.6/en/cluster-provisioning/">Learn more</a></p>
         </div>
      </div>
      <div className="box">
         <div className="boxContent">
            <p className="cardTitle">Best practices</p>
            <p className="cardText">Learn about architecture and deployment strategies</p>
            <p><a href="https://rancher.com/docs/rancher/v2.6/en/best-practices/" className="cardLink">Learn more</a></p>
         </div>
      </div>
      <div className="box">
         <div className="boxContent">
            <p className="cardTitle">Authentication</p>
            <p className="cardText">Add users to Rancher</p>
            <p><a className="cardLink" href="https://rancher.com/docs/rancher/v2.6/en/admin-settings/">Learn more</a></p>
         </div>
      </div>
   </div>
   <hr/>
   <div className="container">
      <h1 className="landing-page-header">Related Products</h1>
      <div className="boxes">
         <div className="product-summary">
            <div className="boxContent">
                     <p className="cardTitle">
                        <a 
                           target="_blank"
                           href="https://registry.terraform.io/providers/rancher/rancher2/latest/docs"
                           >
                        Rancher 2 Terraform Provider
                        </a>
                     </p>
                     <p className="cardText">Automate Rancher with infrastructure-as-code.</p>
            </div>
         </div>
         <div className="product-summary">
            <div className="boxContent">
                     <p className="cardTitle">
                        <a 
                           target="_blank"
                           href="https://www.suse.com/products/suse-rancher-hosted/"
                           >
                        Hosted Rancher Service
                        </a>
                     </p>
                     <p className="cardText">A hosted Rancher control plane with 99.9% uptime.</p>
            </div>
         </div>
         <div className="product-summary">
            <div className="boxContent">
                     <p className="cardTitle">
                        <a 
                           target="_blank"
                           href="https://docs.rancherdesktop.io/"
                           >
                        Rancher Desktop
                        </a>
                     </p>
                     <p className="cardText">Kubernetes on your desktop.</p>
            </div>
         </div>
      </div>
   </div>
   <main>
   </main>
   </Layout>
  );
}
