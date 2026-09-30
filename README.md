# My_School_Academy

## Local development

```bash
npm ci
npm start
```

The application runs at `http://localhost:4201`.

## Verification

```bash
npm run test:ci
npm run build
```

## CI/CD

The GitHub Actions workflow in `.github/workflows/ci-cd.yml` performs the following:

- Pull requests and pushes to `develop` or `main`: install dependencies, run unit tests, and create a production build.
- Pushes to `main`: build the application with the GitHub Pages base path and deploy it to production.
- Manual runs from `main`: run the same verification and deployment pipeline.

The production site is deployed from `dist/school-management/browser` to:

```text
https://cnuttoo.github.io/My_School_Academy/
```

Before the first deployment, open **Settings > Pages** in GitHub and select **GitHub Actions** as the deployment source. Repository administrators can review subsequent deployments under **Settings > Environments > github-pages**.
