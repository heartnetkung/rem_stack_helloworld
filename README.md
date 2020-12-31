# rem_stack_helloworld
[React Express Mongoose](https://www.google.com/search?q=rem+anime&tbm=isch) stack hello world used for testing that infrastructure works as expected.

# Getting Certificate
```sh
snap install core
snap refresh core
apt-get remove certbot
snap install --classic certbot
ln -s /snap/bin/certbot /usr/bin/certbot
certbot certonly --standalone
```

# Example env.json
```json
{
	"mongo_url": "mongodb+srv://...",
	"port": 3000,
	"https": true
}
```

# Deploy React
```sh
cd react_netlify
yarn build
#dev
yarn netlify deploy --dir=build --prod --site="5e2e9730-1a43-4f83-a03d-cda9fbb4a71c"
#app
yarn netlify deploy --dir=build --prod --site="c465b6bd-7797-4e2b-9ee1-6ac3d24cf442"
```
Then go to
- https://jobfinfin-dev.netlify.app
- https://jobfinfin-app.netlify.app
