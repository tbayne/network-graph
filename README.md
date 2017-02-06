A D3 based React component for displaying a somewhat interactive
network graph.

## Notes

Create a new Heroku Application:
>  heroku login 
>  heroku create
>  git push heroku master
>  heroku open

Use 'nodemon' to watch webpack.config.js for changes:
>  nodemon --exec "webpack -w" --watch "webpack.config.js"

To push all changes after commit:
>  git push; git push heroku master; heroku open