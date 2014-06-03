Package.describe({
  "summary": "A super simple slideshow thing."
});

Package.on_use(function (api) {

  api.add_files('lib/slidr.js', 'client');

  if (typeof api.export !== 'undefined') {

    // The main object.
    api.export('slidr', 'client');

  }

});
