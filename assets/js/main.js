// Main JavaScript file for Crown Nova Technologies Limited

(function($) {
  'use strict';

  // Document Ready
  $(document).ready(function() {
    
    // Current Year in Footer
    if (document.getElementById("currentYear")) {
      document.getElementById("currentYear").textContent = new Date().getFullYear();
    }

    // Navbar Toggle
    $('.navbar-toggler').click(function() {
      $('body').toggleClass('noscroll');
    });

    // Fixed Navbar on Scroll
    $(window).on("scroll", function() {
      var scroll = $(window).scrollTop();
      if (scroll >= 80) {
        $("#site-header").addClass("nav-fixed");
      } else {
        $("#site-header").removeClass("nav-fixed");
      }
    });

    // Main navigation Active Class
    $(".navbar-toggler").on("click", function() {
      $("header").toggleClass("active");
    });

    // Remove active class on window resize
    $(window).on("resize", function() {
      if ($(window).width() > 991) {
        $("header").removeClass("active");
      }
    });

    // Counter Animation with Waypoints
    if (typeof $.fn.waypoint !== 'undefined' && typeof $.fn.countTo !== 'undefined') {
      var counterTriggered = false;
      $('.counter').waypoint(function() {
        if (!counterTriggered) {
          $('.counter').each(function() {
            var $this = $(this);
            var countTo = parseInt($this.text());
            $this.text('0');
            $this.countTo({
              from: 0,
              to: countTo,
              speed: 2000,
              refreshInterval: 50
            });
          });
          counterTriggered = true;
        }
      }, {
        offset: '85%'
      });
    } else if (typeof $.fn.countTo !== 'undefined') {
      // Fallback if waypoints not available
      $(window).on('load', function() {
        $('.counter').each(function() {
          var $this = $(this);
          var countTo = parseInt($this.text());
          $this.text('0');
          $this.countTo({
            from: 0,
            to: countTo,
            speed: 2000,
            refreshInterval: 50
          });
        });
      });
    }

    // Progress Bar Animation with Waypoints
    if (typeof $.fn.waypoint !== 'undefined') {
      var progressTriggered = false;
      $('.progress-bar').waypoint(function() {
        if (!progressTriggered) {
          $('.progress-bar').each(function() {
            var $bar = $(this);
            var targetWidth = $bar.attr('data-target') || $bar.attr('aria-valuenow');
            if (targetWidth) {
              $bar.css('width', '0%');
              setTimeout(function() {
                $bar.css({
                  'width': targetWidth + '%',
                  'transition': 'width 1.5s ease-in-out'
                });
              }, 100);
            }
          });
          progressTriggered = true;
        }
      }, {
        offset: '85%'
      });
    } else {
      // Fallback if waypoints not available
      $(window).on('load', function() {
        setTimeout(function() {
          $('.progress-bar').each(function() {
            var $bar = $(this);
            var targetWidth = $bar.attr('data-target') || $bar.attr('aria-valuenow');
            if (targetWidth) {
              $bar.css('width', '0%');
              setTimeout(function() {
                $bar.css({
                  'width': targetWidth + '%',
                  'transition': 'width 1.5s ease-in-out'
                });
              }, 100);
            }
          });
        }, 500);
      });
    }

    // Card Hover Animation - Add scale effect
    $('.feature-gird, .grids-1, .card, .blog-item').hover(
      function() {
        $(this).css('transform', 'translateY(-10px)');
      },
      function() {
        $(this).css('transform', 'translateY(0)');
      }
    );

    // Add smooth transitions to all cards
    $('.feature-gird, .grids-1, .card, .blog-item').css({
      'transition': 'transform 0.3s ease, box-shadow 0.3s ease'
    });

    // Smooth Scroll for Anchor Links
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && 
          location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 70
          }, 1000, function() {
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) {
              return false;
            } else {
              $target.attr('tabindex', '-1');
              $target.focus();
            }
          });
        }
      }
    });

    // Fade in elements on scroll
    if (typeof $.fn.waypoint !== 'undefined') {
      $('.w3l-grids-3, .w3l-ab-features, .w3l-stats, .w3l-news-2, .w3l-content-6').waypoint(function() {
        $(this.element).addClass('fade-in-up');
      }, {
        offset: '85%'
      });
    }

    // Add fade-in animation to blog cards
    $('.grids-1').each(function(index) {
      $(this).css({
        'animation': 'fadeInUp 0.6s ease forwards',
        'animation-delay': (index * 0.2) + 's',
        'opacity': '0'
      });
    });

    // Add fade-in animation to service features
    $('.col-lg-4.col-md-6.features-w3l-main').each(function(index) {
      $(this).css({
        'animation': 'fadeInUp 0.6s ease forwards',
        'animation-delay': (index * 0.15) + 's',
        'opacity': '0'
      });
    });

    // Team member card hover effect
    $('.team-grids img').hover(
      function() {
        $(this).css({
          'transform': 'scale(1.05)',
          'transition': 'transform 0.3s ease'
        });
      },
      function() {
        $(this).css('transform', 'scale(1)');
      }
    );

    // Owl Carousel - Testimonials
    if (typeof $.fn.owlCarousel !== 'undefined') {
      $('.owl-testimonial').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        responsiveClass: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplaySpeed: 1000,
        autoplayHoverPause: false,
        responsive: {
          0: {
            items: 1,
            nav: false
          },
          480: {
            items: 1,
            nav: false
          },
          667: {
            items: 1,
            nav: true
          },
          1000: {
            items: 1,
            nav: true
          }
        }
      });

      // Owl Carousel - Banner Slider
      $('.owl-one').owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        responsiveClass: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplaySpeed: 1000,
        autoplayHoverPause: false,
        responsive: {
          0: {
            items: 1,
            nav: false
          },
          480: {
            items: 1,
            nav: false
          },
          667: {
            items: 1,
            nav: true
          },
          1000: {
            items: 1,
            nav: true
          }
        }
      });

      // Owl Carousel - News
      $('.owl-news').owlCarousel({
        stagePadding: 200,
        loop: true,
        margin: 30,
        nav: true,
        responsiveClass: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplaySpeed: 1000,
        autoplayHoverPause: false,
        responsive: {
          0: {
            items: 1,
            stagePadding: 40,
            nav: false
          },
          480: {
            items: 1,
            stagePadding: 40,
            nav: true
          },
          667: {
            items: 2,
            stagePadding: 50,
            nav: true
          },
          1000: {
            items: 2,
            nav: true
          }
        }
      });
    }

    // Add loading animation
    $('body').css('opacity', '0').animate({
      opacity: 1
    }, 500);

  });

  // Window Load
  $(window).on('load', function() {
    // Page Loader
    if ($('.page-loader').length) {
      $('.page-loader').fadeOut('slow');
    }

    // Trigger animations after page load
    setTimeout(function() {
      $('.banner-info-bg').addClass('animated fadeInUp');
    }, 300);
  });

  // Scroll animations
  $(window).on('scroll', function() {
    var windowScroll = $(this).scrollTop();
    
    // Parallax effect on banner
    $('.bg-video').css({
      'transform': 'translateY(' + (windowScroll * 0.5) + 'px)'
    });
  });

})(jQuery);

// Move to Top Button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  var movetop = document.getElementById("movetop");
  if (movetop) {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      movetop.classList.add("show");
    } else {
      movetop.classList.remove("show");
    }
  }
}

function topFunction() {
  // Force smooth scroll with jQuery (most reliable)
  $('html, body').animate({
    scrollTop: 0
  }, 800, 'swing');
  return false;
}

// Form Validation
function validateContactForm() {
  var name = document.getElementById('w3lName').value;
  var email = document.getElementById('w3lSender').value;
  var subject = document.getElementById('w3lSubject').value;
  var message = document.getElementById('w3lMessage').value;

  if (name == "" || email == "" || subject == "" || message == "") {
    alert("All fields are required!");
    return false;
  }

  var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    alert("Please enter a valid email address!");
    return false;
  }

  return true;
}

// Add CSS animations dynamically
var style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animated {
    animation-duration: 1s;
    animation-fill-mode: both;
  }

  .fadeInUp {
    animation-name: fadeInUp;
  }

  .fade-in-up {
    animation: fadeInUp 0.8s ease forwards;
  }
`;
document.head.appendChild(style);