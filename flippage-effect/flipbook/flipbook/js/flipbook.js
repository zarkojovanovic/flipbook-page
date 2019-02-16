function addPage(page, book) {

  var id, pages = book.turn('pages');

  // Create a new element for this page
  var element = $('<div class="hard" />');

  // Add the page to the flipbook
  if (book.turn('addPage', element, page)) {

    // Add the initial HTML
    // It will contain a loader indicator and a gradient
    element.html('<div class="gradient  " depth="5"></div><div class="loader"></div>');

    // Load the page
    loadPage(page, element);
    resizeViewport();
  }
}

function loadPage(page, pageElement) {
  // Create an image element
  var overlay = $('<div id="image/' + page + '" class="overlay"></div>');
  $(overlay).appendTo(pageElement);

  var img = $('<img/>');
  img.mousedown(function(e) {
    e.preventDefault();
  });

  img.load(function() {

    // Set te size
    $(img).css({
      width: '100%',
      height: '100%'
    });

    // Add the image to the page after loaded

    $(img).appendTo(overlay);

    // Remove the loader indicator

    pageElement.find('.loader').remove();
  });

  // Load the page

  img.attr('src', 'pages/' + page + '.png');
}

// Set the width and height for the viewport

function resizeViewport() {
  var sizeOfBook = book;
  var width, height, options;

  if (sizeOfBook === 'fullscreen') {
    width = $(window).width();
    height = $(window).height();
    options = $('.flipbook').turn('options');


  } else if (sizeOfBook === 'nav') {

    width = $(window).width();
    height = $(window).height() / 1.4;
    options = $('.flipbook').turn('options');

  } else {

    width = $(window).width();
    height = $(window).height();
    options = $('.flipbook').turn('options');
  }

  $('.flipbook').removeClass('animated');

  $('.flipbook-viewport').css({

    width: width,
    height: height * 1.4

  });

  var bound;
  if (sizeOfBook === 'fullscreen') {
    bound = calculateBound({
      width: options.width,
      height: options.height,
      boundWidth: Math.min(options.width, width),
      boundHeight: Math.min(options.height, height)
    });

  } else if ($('.flipbook').turn('zoom') == 1) {
    bound = calculateBound({
      width: options.width,
      height: options.height,
      boundWidth: Math.min(options.width, width),
      boundHeight: Math.min(options.height, height)
    });
  }
  if (bound.width % 2 !== 0)
    bound.width -= 1;


  if (bound.width != $('.flipbook').width() || bound.height != $('.flipbook').height()) {

    $('.flipbook').turn('size', bound.width, bound.height);

    if ($('.flipbook').turn('page') == 1)
      $('.flipbook').turn('peel', 'br');
  }
  if (sizeOfBook === 'fullscreen') {
    $('.flipbook').css({
      top: -bound.height / 2,
      left: -bound.width / 2
    });
  } else

  if (sizeOfBook === 'nav') {
    $('.flipbook').css({
      top: -bound.height / 1.5,
      left: -bound.width / 2
    });
  } else {
    $('.flipbook').css({
      top: -bound.height / 2,
      left: -bound.width / 2
    });
  }

  $('.bottom').css({
    height: bound.height / 3.5
  });
  $('.single-image').css({
    //  height: bound.height / 4,
    width: bound.width / 8
  });
  $('.pagination').css({
    bottom: bound.height / 2
  });
  $('.right-page').css({
    right: bound.width / 8
  });
  $('.left-page').css({
    left: bound.width / 8
  });


}

// Calculate the width and height of a square within another square

function calculateBound(d) {

  var bound = {
    width: d.width,
    height: d.height
  };

  if (bound.width > d.boundWidth || bound.height > d.boundHeight) {

    var rel = bound.width / bound.height;

    if (d.boundWidth / rel > d.boundHeight && d.boundHeight * rel <= d.boundWidth) {

      bound.width = Math.round(d.boundHeight * rel);
      bound.height = d.boundHeight;

    } else {

      bound.width = d.boundWidth;
      bound.height = Math.round(d.boundWidth / rel);

    }
  }

  return bound;
}

function pageBrighten(firstPage, secondPage) {

  var flip = $(document.getElementById("image/" + firstPage));
  var flip1 = $(document.getElementById("image/" + secondPage));

  flip.animate({
    opacity: 0.2
  }, 50);
  flip.animate({
    opacity: 1
  }, 700);
  flip1.animate({
    opacity: 0.2
  }, 50);
  flip1.animate({
    opacity: 1
  }, 700);

}

function down() {
  document.getElementsByClassName('img-thumbnail')[0].style.display = "none";
  document.getElementsByClassName('up-down')[0].style.bottom = "5%";
  book = '';
  resizeViewport();
}

function up() {
  document.getElementsByClassName('img-thumbnail')[0].style.display = "block";
  document.getElementsByClassName('up-down')[0].style.bottom = "93%";
  book = 'nav';
  resizeViewport();
}
