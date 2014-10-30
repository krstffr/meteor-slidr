Package.describe({
	name: "krstffr:slidr",
  summary: "A super simple slideshow thing.",
	version: "0.0.5",
	git: "https://github.com/krstffr/meteor-slidr.git"
});

Package.onUse(function (api) {

	api.add_files('lib/jqyeryFns.js', 'client');
  api.add_files('lib/slidr.js', 'client');

  // The main object.
  api.export('slidr', 'client');

});
