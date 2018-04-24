let config = {
  confidentials: [{
    clientId: process.env.OAUTH2_CLIENT_ID,
    clientSecret: process.env.OAUTH2_CLIENT_SECRET
  }],
  
  tokens: []
}

let getAccessToken = function(bearerToken, callback) {
  let tokens = config.tokens.filter(function(token) {
    return token.accessToken === bearerToken
  })

  return callback(false, tokens[0])
}

let getClient = function(clientId, clientSecret, callback) {
  let confidentials = config.confidentials.filter(function(client) {
    return client.clientId === clientId && client.clientSecret === clientSecret
  })

  callback(false, confidentials[0])
}

let grantTypeAllowed = function(clientId, grantType, callback) {
  let clientsSource
  let clients = []

  if(grantType === 'client_credentials') {
    clientsSource = config.confidentials
  }

  if(!!clientsSource) {
    clients = clientsSource.filter(function(client) {
      return client.clientId === clientId
    })
  }

  callback(false, clients.length)
}

let saveAccessToken = function(accessToken, clientId, expires, user, callback) {
  config.tokens.push({
    accessToken: accessToken,
    expires: expires,
    clientId: clientId,
    user: user
  })

  callback(false)
}

let getUser = function(username, password, callback) {
  let users = config.users.filter(function(user) {
    return user.username === username && user.password === password
  })

  callback(false, users[0])
}

let getUserFromClient = function(clientId, clientSecret, callback) {
  let clients = config.confidentials.filter(function(client) {
    return client.clientId === clientId && client.clientSecret === clientSecret
  })

  let user

  if(clients.length) {
    user = {
      username: clientId
    }
  }

  callback(false, user)
}

module.exports = {
  getAccessToken: getAccessToken,
  getClient: getClient,
  grantTypeAllowed: grantTypeAllowed,
  saveAccessToken: saveAccessToken,
  getUser: getUser,
  getUserFromClient: getUserFromClient
}
