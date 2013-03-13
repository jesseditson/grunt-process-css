// Add a base path to files

module.exports = function(css,options,grunt){
  var basePath = options.basePath || ''
  var url
  var replacements = options.replacements || {}
  var urls = []
  // only replace absolute urls that are not http urls (starts with a single slash)
  urls = css.match(/url\((['"])(\/[^\/][^\1]+?)\1\)/ig)
  
  urls.forEach(function(url){
    var url = url.match(/url\((['"])(\/[^\/][^\1]+?)\1\)/i)
    var replaced = false
    Object.keys(replacements).map(function(replace){
      if(replaced) return
      if(replacements[replace].test(url[2])){
        replaced = true
        css = css.replace(url[0],getUrl.call({grunt : grunt},replace,url))
      }
    })
    if(!replaced){
      // default to basePath
      css = css.replace(url[0],getUrl.call({grunt : grunt},basePath,url))
    }
  })
  return css
}

var getUrl = function(basePath,url){
  var newUrl = "url(" + url[1] + basePath + url[2] + url[1] + ")"
  this.grunt.verbose.writeln('Replacing url ' + url[2] + ' with ' + newUrl)
  return newUrl
}