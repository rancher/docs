#! /usr/bin/env node
'use strict';
const jsdom         = require("jsdom");
const {
  JSDOM
}                   = jsdom;
const md5           = require('md5');
const atomicalgolia = require("atomic-algolia");
const fs            = require('fs');
const nue           = [];
const rawdata       = fs.readFileSync('public/algolia.json');
const nodes         = JSON.parse(rawdata);

nodes.forEach(node => {
  const dom             = new JSDOM(node.content);
  const content         = dom.window.document.body; //post content wrapped in a body tag
  const contentChildren = content.children; // all the children of the body tag
  const paragraphOut    = {
    anchor:    '#',
    title:     '',
    content:   '',
    postref:   node.objectID,
    objectID: null,
    permalink: node.permalink
  };

  let childCount = contentChildren.length - 1; // how many children

  // loop over the content until the next h2 heading -> this is the paragraph of searchable text
  while(childCount >= 0) {
    const child = contentChildren[childCount];

    if (child.tagName === "H2") {
      //this is our header
      paragraphOut.anchor = `#${child.id}`;
      paragraphOut.title  = child.textContent;

      let next = child.nextElementSibling;

      while(next && next.tagName !== 'H2') {
        if (next) {
          paragraphOut.content += next.textContent;
        }
        next = next.nextElementSibling;
      }

    }

    childCount--;
  }

  // a post without headers
  if (paragraphOut.title === '') {
    // Set the title to the page title
    paragraphOut.title   = node.title;

    // pass along the content
    paragraphOut.content = content.textContent;
  }

  if (paragraphOut.content) {
    // limit the content to 10k so we dont blow up just incase someone decides to make a 40k blog post in one paragraph ¯\_(ツ)_/¯
    paragraphOut.content  = paragraphOut.content.substr(0, 18000);

    // objectID is not quite unique yet so hash the entire object
    paragraphOut.objectID = md5(JSON.stringify(paragraphOut));

    if (paragraphOut.objectID === "d41d8cd98f00b204e9800998ecf8427e") {
      console.log(paragraphOut)
      console.log(JSON.stringify(paragraphOut))
    }

    nue.push(paragraphOut);
  }


  // remove potentially large content (see size limits) and replace with teh summary so that we don't get results with zero highlightable results
  node.content = node.summary;

  // remove summary for dedup
  delete node.summary;

});

const merged = [...nodes, ...nue];

fs.writeFileSync('public/final.algolia.json', JSON.stringify(merged));
process.exit(0);
