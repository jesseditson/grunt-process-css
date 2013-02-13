/*
 * grunt-process-css
 * https://github.com/jesseditson/grunt-css
 *
 * Copyright (c) 2012 Jesse Ditson
 * Licensed under the MIT license
 */

module.exports = function(grunt){
  
  grunt.registerMultiTask('process-css',"replace absolute urls in css with a new base path.",function(){
    var options = grunt.config(['process-css',this.target])
    var operations = options.operations
    if(!operations) return !!grunt.log.warn('missing operations object on process-css config')
    operations = operations.map(function(op){
      try {
        op.fn = require('./lib/' + op.name)
      } catch(e){
        op = false
      }
      return op
    }).filter(function(o){ return o })
    if(!operations.length) return !!grunt.log.warn('No operations found to do in process-css')
    
    this.files.forEach(function(f){
      var files = f.src.filter(function(filepath){
          // Warn on and remove invalid source files (if nonull was set).
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          } else {
            return true;
          }
        })
        .map(grunt.file.read)
      
      var processed = files.map(function(file){
        operations.forEach(function(op){
          file = op.fn(file,op.options,grunt)
        })
        return file
      }).join(grunt.util.normalizelf(grunt.util.linefeed))
      grunt.file.write(f.dest,processed)
      grunt.log.writeln('Output processed css to ' + f.dest + '.')
    })
  })
}