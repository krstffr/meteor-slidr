Package.describe({
	name: "krstffr:slidr",
  summary: "A super simple slideshow thing.",
	version: "1.0.0",
	git: "https://github.com/krstffr/meteor-slidr.git"
});

Package.onUse(function (api) {

	api.versionsFrom("METEOR@0.9.0");

	api.use(['templating', 'handlebars', 'jquery'], 'client');

	api.addFiles('lib/jqyeryFns.js', 'client');
  api.addFiles('lib/slidr.js', 'client');

  // The main object.
  api.export('slidr', 'client');

});
