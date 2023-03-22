# Need Code

A web app with React & Firebase that helps people to conquer and review Algorithm problems for coding interview. 

# How to contribute
! Contact the repo owner for Firebase permission.

## Basic Installation
Clone the repo.
```bash
git clone git@github.com:sophiiae/need-code.git
```

Install Node JS v16+ or use [NVM](https://github.com/nvm-sh/nvm)

Install dependencies.
```bash
npm install
```

## Firebase
1. Learn basic about Firebase [Authentication](https://firebase.google.com/docs/auth/web/start) on Web

2. Learn basic about Firebase [Realtime database](https://firebase.google.com/docs/database/web/start)

3. Learn basic about Firebase [Hosting](https://firebase.google.com/docs/hosting/test-preview-deploy)

### Test and Preview
1. Check CI and update build folder.
```bash
npm ci && npm run build
```
2. View changes to the web app before going live with preview channels.
ttl can be `5m`, `5d`, and so on. Check Firebase website for more infomation.
```bash
firebase hosting:channel:deploy <channel-name> --expires <ttl>
```
3. Clean up preview channel.
```bash
firebase hosting:channel:delete <channel-name>
```

### Pull requests
1. Create a preview channel for changes.
```bash
firebase hosting:channel:deploy <PR-name> --expires 7d
```

2. Push branch and create a PR for review. Add related issue number and preview channel link in PR description.

# Bug and feature requests
Have a bug or a feature request? [Open an issue](https://github.com/sophiiae/need-code/issues/new)
