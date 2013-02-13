// Add a base path to files

module.exports = function(css,options,grunt){
  var basePath = options.basePath || ''
  var url
  while(url = css.match(/url\((['"])(\/[^\/][^\1]+?)\1\)/i)){
    // only replace absolute urls that are not http urls (starts with a single slash)
    var newUrl = "url(" + url[1] + basePath + url[2] + url[1] + ")"
    grunt.verbose.writeln('Replacing url ' + url[2] + ' with ' + newUrl)
    css = css.replace(url[0],newUrl)
  }
  return css
}