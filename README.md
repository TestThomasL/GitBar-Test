# GitBar

Your new Pull Request tool for GitHub, GitLab and Azure.

## Featues

- [x] GitHub
- [x] GitLab (self-hosted and gitlab.com)
- [x] Azure DevOps
- [x] View Pull Requests
- [x] Get Notifications
- [x] Launch at Login
- [x] Dark / Light Mode
- [x] Amount of PRs in the menubar
- [x] Open PRs in your browser
- [x] Hide PRs from Relevant PRs tab

### To Do

- [ ] Bitbucket
- [ ] Prioritize PRs
- [ ] Ignore Repositories
- [ ] Merge PRs
- [ ] See Pipeline Status

## Release Process

1. Bump the version with `npm run version:{major/minor/patch}`
   1. This will bump the version/build number and update the `CHANGELOG.md`
2. Commit the changes with `git commit -am "chore(release): v{x.x.x}"`
3. Create a tag with that version `git tag v{x.x.x}` and push it to git
4. A release on GitHub will be created automatically
5. [TODO]: The CI will build the app and publish it to the release
   1. Create a build locally and upload it to TestFlight
