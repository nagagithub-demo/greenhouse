# GitHub Greenhouse Challenge

### Solution
- [Presentation](https://docs.google.com/presentation/d/1uX2OS9Z8wkVvKVl9R1GH3bpaZV2-PPnXm-4qnlomrj8/edit?usp=sharing)

### Demo

These are steps to run and test this applicaiton.
```
$ git clone git@github.com:nagagithub-demo/greenhouse.git
$ cd greenhouse

$ docker build . -t nagajagan/greenhouse

# get token from https://github.com/settings/tokens
$ docker run -dt -p 3000:3000 -e PERSONAL_ACCESS_TOKEN="TOKEN FROM GITHUB" nagajagan/greenhouse

$ ngrok http 3000
# collect global URL from following line
# Forwarding                    https://194c-107-204-21-155.ngrok.io -> http://localhost:3000

# Use the global URL (eg: xxxxxx.ngrok.io ) to create webhooks on GitHub Organization.
```
