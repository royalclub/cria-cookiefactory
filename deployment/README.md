
Change directory to the root of your project.

`ln -s deployment/hooks/pre-commit .git/hooks/pre-commit`

`chmod +x .git/hooks/pre-commit`

##Flows
The following branches are used in this example:
* development
  * In this branch is the code for actual development. Can always be committed and push, even _with_ errors. In fact, there is no validation forced.
* test
  * The test stage. All files will be validated with `jslint`, `jshint` and `esprima`.
  * Commit and push is only possible with valid files.
  * The configuration is in directory tests/static-analyzer.
* master
  * This branch is used for production code.


##Usage
**Do not use the `git` commands from your IDE.**

If you use the git commands from your IDE, then you have to commit, merge and push for each branch separately.


![Github web configuration](https://raw.githubusercontent.com/theotheu/hook-test/master/assets/github-webhooks.png)


