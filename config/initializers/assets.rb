# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
Rails.application.config.assets.precompile += %w(
  skel/style.css
  skel/style-xlarge.css
  skel/style-large.css
  skel/style-medium.css
  skel/style-small.css
  skel/style-xsmall.css
  skel/ie/html5shiv.js
  skel/ie/v8.css
  skel/ie/v9.css
  index.js
)
