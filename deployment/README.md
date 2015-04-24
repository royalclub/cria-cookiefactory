
##Flows
The following branches are used in this example:
* development
  * In this branch is the code for actual development. Can always be committed and push, even _with_ errors. In fact, there is no validation forced.
* test with static analyzers
  * branch name is "test-static-analyzer-passed"
  * The test stage. All files will be validated with `jslint`, `jshint` and `esprima`.
  * Commit and push is only possible with valid files.
  * The working directory is tests/static-analyzer.
  * See the README.md in that directory for the setup and running the tests yourself.
* test API's with unit-tests
  * branch name is "test-unit-tests-passed"
  * Commit and push is only possible with valid files.
  * The working directory for unit-tests is tests/unit-tests.
  * See the README.md in that directory for the setup and running the tests yourself.
* test API's with acceptance
  * branch name is "acceptance"
  * Commit and push is only possible with valid files.
  * The working directory for end to end is tests/e2e.
  * See the README.md in that directory for the setup and running the tests yourself.
* production
  * branch name is "production"
* master
  * This branch is used for production code.

##Usage
**Do not use the `git` commands from your IDE.**

If you use the git commands from your IDE, then you have to commit, merge and push for each branch separately.


![Github web configuration](https://raw.githubusercontent.com/theotheu/hook-test/master/assets/github-webhooks.png)




