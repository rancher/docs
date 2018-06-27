import $ from 'jquery';
import instantsearch from 'instantsearch.js';

// This is for any custom JS that may need to be added to individual apps.
// Main JS is located in Rancher Website Theme
const bootstrapDocsSearch = function() {
  const search = instantsearch({
    appId: '30NEY6C9UY',
    apiKey: 'b7f43c16886fec97b87981e9e62ef1a5',
    indexName: 'dev_docs',
    routing: true,
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-box',
      placeholder: 'Search Docs...',
      magnifier: false,
      reset: true,
    })
  );

  search.addWidget(
    instantsearch.widgets.infiniteHits({
      container: '#hits',
      templates: {
        empty: '<h3>No results</h3>',
        item: `<h3><a href="{{permalink}}">{{{_highlightResult.title.value}}}</a></h3><div class="body">{{{_highlightResult.summary.value}}}</div>`
      },
      escapeHits: true,
    })
  );

  // search.addWidget(
  //   instantsearch.widgets.hits({
  //     container: '#hits',
  //     templates: {
  //       empty: '<h3>No results</h3>',
  //       allItems: `<table class="search-results">
  //                   <tbody>
  //                     {{#hits}}
  //                       <tr><td><h3><a href="{{permalink}}">{{title}}</a></h3><div>{{summary}}</div></td></tr>
  //                     {{/hits}}
  //                   </tbody>
  //                  </table>`,
  //     }
  //   })
  // );

  search.start();

  $(window).on('keyup', e => {
    if (e.which === 27 && $('.container-search').hasClass('open')) {
      $('.container-search').toggleClass('open');
      $('.overlay-search').toggleClass('open');
    }
  });

  $('header').on('click', '#button-search', e => {

    let container = $('.container-search');
    let overlay   = $('.overlay-search');
    // let header    = $(e.currentTarget).closest('header');

    container.toggleClass('open');
    overlay.toggleClass('open');

    if (container.hasClass('open')) {
      $('input#search').focus();
    }

    overlay.css({top: 120});
  });

}

const bootstrapDocsJS = function() {
  bootstrapDocsSearch();
}

$(document).ready(() => {
  bootstrapDocsJS();
});
