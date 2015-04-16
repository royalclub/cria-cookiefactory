#!/bin/bash

export COMMIT_MESSAGE="Automatic Deployment: `date`"
export STAGE0=development
export STAGE1=test-static-analyzer-passed
export STAGE2=test-unit-tests-passed
export STAGE3=acceptance
export STAGE4=production
export TESTDIR=../../tests
export JSLINT=./$TESTDIR/static-analyzer/node_modules/jslint
export DIR=`pwd`

echo "`date` : " > log.log

echo
echo "#########################################"
echo "# Preflight checks"
echo "#########################################"
echo
# make sure jslint is installed
if [[ ! -d $JSLINT ]]; then
	#install jslint locally
	echo "Please install jslint first." | tee -a "$DIR/log.log"
	echo "  jslint is expected to be installed in $TESTDIR/static-analyzer/." | tee -a "$DIR/log.log"
	exit 1
fi

echo | tee -a "$DIR/log.log"
echo "#########################################" | tee -a "$DIR/log.log"
echo "# STAGE0, development" | tee -a "$DIR/log.log"
echo "#########################################" | tee -a "$DIR/log.log"
echo | tee -a "$DIR/log.log"

git checkout $STAGE0
git pull

echo | tee -a "$DIR/log.log"
echo "#########################################" | tee -a "$DIR/log.log"
echo "# STAGE1, static-analyzer" | tee -a "$DIR/log.log"
echo "#########################################" | tee -a "$DIR/log.log"
echo | tee -a "$DIR/log.log"

git checkout $STAGE1 | tee -a "$DIR/log.log"

git merge --no-edit $STAGE0 | tee -a "$DIR/log.log"
git commit -am "Merging from $STAGE0 to $STAGE1: `date`" | tee -a "$DIR/log.log"

if [ -f ./$TESTDIR/static-analyzer/error_log.txt ]; then
	echo "=~=~=~=~= ERRORS: No commit for branch 'test' was performed. =~=~=~=~=" | tee -a "$DIR/log.log"
	echo "=~=~=~=~= Resolve the conflicts before continuing.           =~=~=~=~=" | tee -a "$DIR/log.log"
	git checkout $STAGE0 | tee -a "$DIR/log.log"
	exit 1
fi

git merge --commit -m "MERGE: `date`" $STAGE0 | tee -a "$DIR/log.log"
git commit -am "TEST: `date`" | tee -a "$DIR/log.log"

git push origin $STAGE1 | tee -a "$DIR/log.log"

echo "#########################################" | tee -a "$DIR/log.log"
echo "# STAGE2, unit-tests" | tee -a "$DIR/log.log"
echo "#########################################" | tee -a "$DIR/log.log"

git checkout $STAGE2 | tee -a "$DIR/log.log"

cd ./$TESTDIR/unit-tests | tee -a "$DIR/log.log"

rm -fr test-results.log | tee -a "$DIR/log.log"

# Run the unit test
npm test | tee -a "$DIR/log.log"

UNIT_TEST_ERRORS=`grep -c 'fail' test-results.log`

if [ -z $UNIT_TEST_ERRORS ]; then
    echo echo "=~=~=~=~= ERRORS ERRORS ERRORS =~=~=~=~=" | tee -a "$DIR/log.log"
	echo "  Could not execute the tests" | tee -a "$DIR/log.log"
	echo "" >> "$DIR/log.log"
	echo "" >> "$DIR/log.log"
	echo "--------" >> "$DIR/log.log"
	cat log.log >> "$DIR/log.log"
    exit 1
fi

if [ $UNIT_TEST_ERRORS -ne 0 ]; then
    echo echo "=~=~=~=~= ERRORS ERRORS ERRORS =~=~=~=~=" | tee -a "$DIR/log.log"
	echo "  Did not pass the unit-tests" | tee -a "$DIR/log.log"
	exit 1
fi

if [ -f ./test/static-analyzer/error_log.txt ]; then
	echo "=~=~=~=~= ERRORS: No commit for branch 'test' was performed. =~=~=~=~=" | tee -a "$DIR/log.log"
	echo "=~=~=~=~= Resolve the conflicts before continuing.           =~=~=~=~=" | tee -a "$DIR/log.log"
	git checkout $STAGE0 | tee -a "$DIR/log.log"
	exit 1
fi

git merge --no-edit $STAGE0 | tee -a "$DIR/log.log"
git commit -am "Merging from $STAGE0 to $STAGE1: `date`" | tee -a "$DIR/log.log"

git push origin $STAGE2 | tee -a "$DIR/log.log"


# Reset
git checkout $STAGE0 | tee -a "$DIR/log.log"

