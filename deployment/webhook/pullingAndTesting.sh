#!/bin/bash

export COMMIT_MESSAGE="Automatic Deployment: `date`"
export STAGE0=development
export STAGE1=test-static-analyzer-passed
export STAGE2=test-unit-tests-passed
export STAGE3=acceptance
export STAGE4=production
export TESTDIR=../../tests
export JSLINT=./$TESTDIR/static-analyzer/node_modules/jslint

echo "#########################################"
echo "# Preflight checks"
echo "#########################################"
# make sure jslint is installed
if [[ ! -d $JSLINT ]]; then
	#install jslint locally
	echo "Please install jslint first."
	echo "  jslint is expected to be installed in $TESTDIR/static-analyzer/."
	exit 1
fi

echo "\n#########################################"
echo "# STAGE0, development"
echo "#########################################\n"
git checkout $STAGE0
git pull

echo "\n#########################################"
echo "# STAGE1, static-analyzer"
echo "#########################################\n"
git checkout $STAGE1

git merge --no-edit $STAGE0
git commit -am "Merging from $STAGE0 to $STAGE1: `date`"

if [ -f ./$TESTDIR/static-analyzer/error_log.txt ]; then
	echo "=~=~=~=~= ERRORS: No commit for branch 'test' was performed. =~=~=~=~=";
	echo "=~=~=~=~= Resolve the conflicts before continuing.           =~=~=~=~=";
	git checkout $STAGE0
	exit 1
fi

git merge --commit -m "MERGE: `date`" $STAGE0
git commit -am "TEST: `date`"

git push origin $STAGE1


echo "\n#########################################"
echo "# STAGE2, unit-tests"
echo "#########################################\n"

git checkout $STAGE2

cd ./$TESTDIR/unit-tests

rm -fr test-results.log

# Run the unit test
npm test

UNIT_TEST_ERRORS=`grep -c 'fail' test-results.log`;


if [ $UNIT_TEST_ERRORS -ne 0 ]; then
    echo echo "=~=~=~=~= ERRORS ERRORS ERRORS =~=~=~=~="
	echo "  Did not pass the unit-tests"
	exit 1
fi

if [ -f ./test/static-analyzer/error_log.txt ]; then
	echo "=~=~=~=~= ERRORS: No commit for branch 'test' was performed. =~=~=~=~=";
	echo "=~=~=~=~= Resolve the conflicts before continuing.           =~=~=~=~=";
	git checkout $STAGE0
	exit 1
fi

git merge --no-edit $STAGE0
git commit -am "Merging from $STAGE0 to $STAGE1: `date`"

git push origin $STAGE1


git checkout $STAGE0
