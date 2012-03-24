{spawn, exec} = require 'child_process'

task 'watch', 'continually build', ->
    coffee = spawn 'coffee', ['-cwo', 'public/javascripts', 'src']
    coffee = spawn 'coffee', ['-cwo', 'build', 'src']
    coffee.stdout.on 'data', (data) -> 
      exec 'cake minify'
      console.log data.toString().trim()
    
task 'minify', 'Minify the resulting application file after build', ->
  filename = 'jquery.superslides'
  exec "uglifyjs -o build/#{filename}.min.js build/#{filename}.js", (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr