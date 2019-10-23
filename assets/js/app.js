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
      placeholder: 'Search Blog, Events, etc...',
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

  $(document).on('click', '.search-open', (e) => {
    let wrapperId = $(e.currentTarget).data('launch-id');
    let wrapper = $(`#${wrapperId}`);

    let content = wrapper.find('div.content');

    const modal = new tingle.modal({
      closeMethods: ['overlay', 'button', 'escape'],
      closeLabel: "Close",

      onOpen: () => {
        console.log('Search opened');
      },

      onClose: () => {
        console.log('Search closed');
      },

      beforeClose: () => {
        content.detach()
        wrapper.append(content);
        return true;
      }
    });

    // set content
    content.detach();
    modal.setContent(content[0]);

    // add a button
    let label = wrapper.find('.footer-button-label').data('footer-label');
    if ( label ) {
      modal.addFooterBtn(label, 'tingle-btn tingle-btn--primary', function() {
        // here goes some logic
        modal.close();
      });
    }

    modal.open();
    setTimeout(function() {
      $('#search-box').focus();
    }, 50);
  });

  //mobile nav toggle
  $(document).ready(function() {
    $("body").addClass("js");
    var $menu = $("#menu"),
        $menulink = $(".menu-link");

    $menulink.click(function() {
      $menulink.toggleClass("active");
      $menu.toggleClass("active");
      return false;
    });
  });
}

const bootstrapIdLinks = function() {
  const $container = $('.main-content')
  const selector = 'h2[id], h3[id], h4[id], h5[id], h6[id]';

  $container.on('mouseenter', selector, function(e) {
    $(e.target).append($('<a />').addClass('header-anchor').attr('href', '#' + e.target.id).html('<img src="/imgs/icon-link.svg" alt="link">'));
  });

  $container.on('mouseleave', selector, function(e) {
    $container.find('.header-anchor').remove();
  });
}

const replaceReleaseChannel = function() {
  const form = $('#release-channel')[0];
  if ( form ) {
    const val = form.channel.value;

    $('CODE').each((idx, code) => {
      const $code = $(code);
      const text = $code.data('original') || code.innerHTML;

      if ( text.includes('&lt;CHART_REPO&gt;') ) {
        $code.data('original', text);
        code.innerHTML = text.replace(/&lt;CHART_REPO&gt;/g, val);
      }
    });
  }
};

$(document).ready(() => {
  bootstrapDocsSearch();
  bootstrapIdLinks();
  replaceReleaseChannel();
});


