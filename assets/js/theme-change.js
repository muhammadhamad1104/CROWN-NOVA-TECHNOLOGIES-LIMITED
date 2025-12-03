// Theme Switcher for Crown Nova Technologies Limited

(function($) {
  'use strict';

  function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
  }

  function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-light');
    } else {
      setTheme('theme-dark');
    }
  }

  $(document).ready(function() {
    // Check for saved theme preference or default to 'light' theme
    var theme = localStorage.getItem('theme') || 'theme-light';
    setTheme(theme);

    // Update checkbox state based on theme
    if (theme === 'theme-dark') {
      $('#checkbox').prop('checked', true);
    }

    // Theme toggle button - handle checkbox change
    $('#checkbox').on('change', function() {
      toggleTheme();
    });

    // Mobile theme toggle
    $('.mobile-theme-switch').on('click', function() {
      toggleTheme();
      $('#checkbox').prop('checked', localStorage.getItem('theme') === 'theme-dark');
    });
  });

})(jQuery);