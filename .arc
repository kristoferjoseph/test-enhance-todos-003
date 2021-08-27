@app
ftds-001

@static
fingerprint true
spa false

@http
get /
get /auth
get /login
get /todos          # list
get /todos/:id      # read
post /logout
post /todos/delete  # destroy
post /todos/:id     # update
post /todos         # create

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
