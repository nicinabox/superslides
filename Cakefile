{spawn, exec} = require 'child_process'

run = (name, args) ->
  proc =           spawn name, args
  proc.stderr.on   'data', (buffer) -> console.log buffer.toString()
  proc.stdout.on   'data', (buffer) -> console.log buffer.toString()
  proc.on          'exit', (status) -> process.exit(1) if status != 0

task 'sbuild', 'ST2 build', ->
    coffee = spawn 'coffee', ['-co', 'build', 'src']
    coffee.stdout.on 'data', (data) ->
      exec 'cake minify'
      console.log data.toString().trim()

task 'minify', 'Minify the resulting application file after build', ->
  filename = 'jquery.superslides'
  exec "uglifyjs -o build/#{filename}.min.js build/#{filename}.js", (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr

task 'watch', 'Watch source files and build JS & CSS', (options) ->
  run 'coffee',  ['-wco', 'build', 'src']
  run 'compass', ['watch']
  exec 'cake minify'