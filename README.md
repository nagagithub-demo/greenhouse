```
$ docker build . -t nagajagan/greenhouse

# get token from https://github.com/settings/tokens
$ docker run -dt -p 3000:3000 -e PERSONAL_ACCESS_TOKEN="TOKEN FROM GITHUB" nagajagan/greenhouse

$ ngrok http 3000
# collect global URL from following line
# Forwarding                    https://194c-107-204-21-155.ngrok.io -> http://localhost:3000

# User the global URL to create webhooks on Github Organization.
```
