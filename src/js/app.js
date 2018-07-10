import $ from 'jquery';
import instantsearch from 'instantsearch.js';

// This is for any custom JS that may need to be added to individual apps.
// Main JS is located in Rancher Website Theme
const bootstrapDocsSearch = function() {

  var firstSearchRender = true;

  const search = instantsearch({
    appId: '30NEY6C9UY',
    apiKey: 'b7f43c16886fec97b87981e9e62ef1a5',
    indexName: window.location.host === 'rancher.com' ? 'prod_docs' : 'dev_docs',
    routing: true,
    searchFunction: (helper) => {

      if (helper.state.query === "" && firstSearchRender) {

        firstSearchRender = false;

        return;
      }

      helper.search();
    }
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      autofocus: true,
      loadingIndicator: true,
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
        item: `<h3><a href="{{permalink}}">{{{_highlightResult.title.value}}}</a></h3><div class="body">{{{_snippetResult.content.value}}}</div>`
      },
      escapeHits: true,
    })
  );

  search.start();

  $(window).on('keyup', e => {
    if (e.which === 27 && $('.container-search').hasClass('open')) {
      $('.container-search').toggleClass('open');
      $('.overlay-search').toggleClass('open');
    }
  });

  $('header').on('click', '#button-search', () => {

    let container = $('.container-search');
    let overlay   = $('.overlay-search');

    container.toggleClass('open');
    overlay.toggleClass('open');

    if (container.hasClass('open')) {
      $('input#search-box').focus();
    }

    overlay.css({top: 120});
  });
}

const bootstrapIdLinks = function() {
  const container = '.wrapper ARTICLE';
  const selector = 'h2[id], h3[id], h4[id], h5[id], h6[id]';
  $(container).on('mouseenter', selector, function(e) {
    $(e.target).append($('<a />').addClass('header-anchor').attr('href', '#' + e.target.id).html('<i class="material-icons p-l-xs" aria-hidden="true">link</i>'));
  });

  $(container).on('mouseleave', selector, function(e) {
    $(e.target).parent().find('.header-anchor').remove();
  });
}

$(document).ready(() => {
  bootstrapDocsSearch();
  bootstrapIdLinks();
});
