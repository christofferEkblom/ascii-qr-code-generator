# ASCII QR code generator

![Application demo](https://raw.githubusercontent.com/christofferEkblom/ascii-qr-code-generator/master/demo.gif)

## Description
A QR code generator that generates QR codes in ASCII format.

## Features
* 🎤 Live preview
* 🖥 API
* 💾 Sample data
* ✂️ Fast copy & paste

## API
### For everyone
#### 💬 Get QR code
```
curl {SCHEME}://{HOST}:{PORT}/api/get-qr?data={DATA}
```

#### 🎲 Get random sample data post
```
curl {SCHEME}://{HOST}:{PORT}/api/get-random-sample-data
```

#### 👐 Get sample data list
```
curl {SCHEME}://{HOST}:{PORT}/api/get-sample-data-list
```

### For administrator
#### 🔐 Obtain an access token
```
curl {SCHEME}://{HOST}:{PORT}/oauth/token \
  -d "grant_type=client_credentials" \
  -H "Authorization: Basic base64({CLIENT ID}:{CLIENT SECRET})" \
  -H "Content-Type: application/x-www-form-urlencoded"
```

#### 📬 Create new sample data post
```
curl --data "data={POST DATA}" {SCHEME}://{HOST}:{PORT}/api \
  -H "Authorization: Bearer {ACCESS TOKEN}"
```

#### 🗑 Delete sample data post
```
curl -X "DELETE" {SCHEME}://{HOST}:{PORT}/api/{POST ID} \
  -H "Authorization: Bearer {ACCESS TOKEN}"
```

## Installation guide
1. Clone this repository
```
git clone https://github.com/christofferEkblom/ascii-qr-code-generator.git
```

2. Go to the directory
```
cd ascii-qr-code-generator
```

3. Create .env file for the environment variables
```
nano .env
```

4. Set the following variables:
```
PORT = {APPLICATION PORT NUMBER}
MONGODB_CONNECTION_STRING = {MONGO DB CONNECTION STRING}
OAUTH2_CLIENT_ID = {CLIENT ID}
OAUTH2_CLIENT_SECRET = {CLIENT SECRET}
```

5. Install the npm packages
```
npm install
```

6. 🏁 Finish! To run the application, type:
```
npm start
```

## Tech
* Node.js
* oauth2
* SASS
* MongoDB

## Developer
🇸🇪Christoffer Ekblom

## License
📚 [See license](LICENSE)
