import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import SearchBar from '@theme/SearchBar';

import styles from './index.module.css';

const docCards = () => {

   const docCardData = [
      {
         title: 'Get started',
         description: 'Install Rancher on Kubernetes',
         link: 'https://rancher.com/docs/rancher/v2.6/en/installation/install-rancher-on-k8s/'
      },
      {
         title: "Cluster Provisioning",
         description: 'Launch downstream Kubernetes clusters with Rancher',
         link: 'https://rancher.com/docs/rancher/v2.6/en/cluster-provisioning/'
      },
      {
         title: "Best practices",
         description: 'Learn about architecture and deployment strategies',
         link: 'https://rancher.com/docs/rancher/v2.6/en/best-practices/'
      },
      {
         title: "Authentication",
         description: 'Add users to Rancher',
         link: 'https://rancher.com/docs/rancher/v2.6/en/admin-settings/'
      }
   ];

   return docCardData.map(docData => {
      const { title, description, link } = docData
      return (
         <div className="box">
            <div className="boxContent">
               <p className="cardTitle">{title}</p>
               <p className="cardText">{description}</p>
               <p><a href={link} className="cardLink">Learn more</a></p>
            </div>
         </div>
      )
   })
}

const productSummaries = () => {

   const productSummaryData = [
      {
         title: "Rancher 2 Terraform Provider",
         description: "Automate Rancher with infrastructure-as-code.",
         link: "https://registry.terraform.io/providers/rancher/rancher2/latest/docs"
      },
      {
         title: "Hosted Rancher Service",
         description: 'A hosted Rancher control plane with 99.9% uptime.',
         link: 'https://www.suse.com/products/suse-rancher-hosted/'
      },
      {
         title: "Rancher Desktop",
         description: 'Kubernetes on your desktop.',
         link: 'https://docs.rancherdesktop.io/'
      }
   ]
   return productSummaryData.map(product => {
      const { title, link, description } = product;
      return (
         <div className="product-summary">
           <div className="boxContent">
                  <p className="cardTitle">
                     <a 
                        target="_blank"
                        href={link}
                        >
                     {title}
                     </a>
                  </p>
                  <p className="cardText">{description}</p>
            </div>
         </div>
         )
   })
}

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
      description="Find guides, tutorials and best practices for running Kubernetes everywhere."
    >
       <HomepageHeader />
       <div className="boxes">
         {docCards()}
       </div>
       <hr/>
      <div className="container">
         <h1 className="landing-page-header">Related Products</h1>
         <div className="boxes">
            {productSummaries()}
         </div>
      </div>
      <main>
      </main>
   </Layout>
  );
}
