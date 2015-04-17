#!/bin/bash

export COMMIT_MESSAGE="Automatic Deployment: `date`"
export STAGE0=development
export STAGE1=test-static-analyzer-passed
export STAGE2=test-unit-tests-passed
export STAGE3=acceptance
export STAGE4=production
export TESTDIR="`pwd`/../../tests"
export JSLINT=$TESTDIR/static-analyzer/node_modules/jslint
export DIR=`pwd`

echo "`date` ********************************* New log" > "$PWD/log.log"
export PARENT_COMMAND=$(ps $PPID | tail -n 1 | awk "{print \$5}")
echo "`date` Executed by $PARENT_COMMAND" | tee -a "$PWD/log.log"

echo
echo "`date` #########################################" | tee -a "$DIR/log.log"
echo "`date` # Preflight checks" | tee -a "$DIR/log.log"
echo "`date` #########################################" | tee -a "$DIR/log.log"
echo
echo "`date` make sure jslint is installed" | tee -a "$DIR/log.log"
if [[ ! -d $JSLINT ]]; then
	#install jslint locally
	echo "`date` Please install jslint first." | tee -a "$DIR/log.log"
	echo "`date`   jslint is expected to be installed in $TESTDIR/static-analyzer/." | tee -a "$DIR/log.log"
	exit 1
fi

echo | tee -a "$DIR/log.log"
echo "`date` #########################################" | tee -a "$DIR/log.log"
echo "`date` # STAGE0, development" | tee -a "$DIR/log.log"
echo "`date` #########################################" | tee -a "$DIR/log.log"
echo | tee -a "$DIR/log.log"

git checkout $STAGE0 | tee -a "$DIR/log.log"
git pull | tee -a "$DIR/log.log"

echo | tee -a "$DIR/log.log"
echo "`date` #########################################" | tee -a "$DIR/log.log"
echo "`date` # STAGE1, static-analyzer" | tee -a "$DIR/log.log"
echo "`date` #########################################" | tee -a "$DIR/log.log"
echo | tee -a "$DIR/log.log"

git checkout $STAGE1 | tee -a "$DIR/log.log"

git merge --no-edit $STAGE0 | tee -a "$DIR/log.log"
git commit -am "Merging from $STAGE0 to $STAGE1: `date`" | tee -a "$DIR/log.log"

cd $TESTDIR/static-analyzer
./run_lint.sh > static-analyzer-results.log

if [ -f $TESTDIR/static-analyzer/error_log.txt ]; then
	echo "`date` =~=~=~=~= ERRORS: No commit for branch 'test' was performed. =~=~=~=~=" | tee -a "$DIR/log.log"
	echo "`date` =~=~=~=~= Resolve the conflicts before continuing.           =~=~=~=~=" | tee -a "$DIR/log.log"
	git checkout $STAGE0 | tee -a "$DIR/log.log"
	exit 1
fi

git merge --commit -m "MERGE: `date`" $STAGE0 | tee -a "$DIR/log.log"
git commit -am "TEST: `date`" | tee -a "$DIR/log.log"

git push origin $STAGE1 | tee -a "$DIR/log.log"

echo "`date` #########################################" | tee -a "$DIR/log.log"
echo "`date` # STAGE2, unit-tests" | tee -a "$DIR/log.log"
echo "`date` #########################################" | tee -a "$DIR/log.log"

cd "$TESTDIR/../server"
export NODE_ENV=test
node bin/www.js >/dev/null 2>&1 &
export node_PID=$!
sleep 4
echo "`date` node started with process id = $node_PID" | tee -a log.log

git checkout $STAGE2 | tee -a "$DIR/log.log"

# Change directory to unit-tests
cd "$TESTDIR/unit-tests"

rm -fr unit-tests-results.log

# Run the unit test
mocha > unit-tests-results.log

# kill nodemon
kill -9 $node_PID

# count fail occurences
export TEST_FAILURUES=`grep -ci 'fail' unit-tests-results.log`

if [ -z "$TEST_FAILURUES" ]; then
    echo "`date` =~=~=~=~= ERRORS ERRORS ERRORS =~=~=~=~=" | tee -a "$DIR/log.log"
	echo "`date`   Could not execute the tests. Variable TEST_FAILURUES=$TEST_FAILURUES" | tee -a "$DIR/log.log"
	git checkout $STAGE0 | tee -a "$DIR/log.log"
    exit 1
fi

if [ $TEST_FAILURUES -ne 0 ]; then
    echo"`date` =~=~=~=~= ERRORS ERRORS ERRORS =~=~=~=~=" | tee -a "$DIR/log.log"
	echo "`date`   Did not pass the unit-tests" | tee -a "$DIR/log.log"
	git checkout $STAGE0 | tee -a "$DIR/log.log"
	exit 1
fi

if [ -f ./test/static-analyzer/error_log.txt ]; then
	echo "=~=~=~=~= ERRORS: No commit for branch 'test' was performed. =~=~=~=~=" | tee -a "$DIR/log.log"
	echo "=~=~=~=~= Resolve the conflicts before continuing.           =~=~=~=~=" | tee -a "$DIR/log.log"
	git checkout $STAGE0 | tee -a "$DIR/log.log"
	exit 1
fi

git merge --no-edit $STAGE1 | tee -a "$DIR/log.log"
git commit -am "Merging from $STAGE2 to $STAGE2: `date`" | tee -a "$DIR/log.log"

git push origin $STAGE2 | tee -a "$DIR/log.log"

echo | tee -a "$DIR/log.log"
echo "`date` #########################################" | tee -a "$DIR/log.log"
echo "`date` # STAGE3, end to end" | tee -a "$DIR/log.log"
echo "`date` #########################################" | tee -a "$DIR/log.log"
echo | tee -a "$DIR/log.log"

git checkout $STAGE3 | tee -a "$DIR/log.log"

# start up node
cd "$TESTDIR/../server"
export NODE_ENV=acceptance
node bin/www.js >/dev/null 2>&1 &
export node_PID=$!
sleep 4
echo "`date` node started with process id = $node_PID" | tee -a log.log

# start up selenium-stand-alone
selenium-standalone start --version=2.43.1
sleep 4
export selenium_PID=$!

# run e2e tests
cd "$TESTDIR/e2e"
echo "`date` Current directory = `pwd`. It should be e2e" | tee -a log.log
protractor conf.js > end-to-end-results.log

kill -9 $node_PID
kill -9 $selenium_PID


# count fail occurences
export TEST_FAILURUES=`grep -ci 'fail' end-to-end-results.log`

if [ -z "$TEST_FAILURUES" ]; then
    echo "`date` =~=~=~=~= ERRORS ERRORS ERRORS =~=~=~=~=" | tee -a "$DIR/log.log"
	echo "`date`   Could not execute the tests. Variable TEST_FAILURUES=$TEST_FAILURUES" | tee -a "$DIR/log.log"
	git checkout $STAGE0 | tee -a "$DIR/log.log"
    exit 1
fi

if [ $TEST_FAILURUES -ne 0 ]; then
    echo"`date` =~=~=~=~= ERRORS ERRORS ERRORS =~=~=~=~=" | tee -a "$DIR/log.log"
	echo "`date`   Did not pass the end-to-end tests." | tee -a "$DIR/log.log"
	git checkout $STAGE0 | tee -a "$DIR/log.log"
	exit 1
fi


git merge --no-edit $STAGE1 | tee -a "$DIR/log.log"
git commit -am "Merging from $STAGE2 to $STAGE3: `date`" | tee -a "$DIR/log.log"

git push origin $STAGE3 | tee -a "$DIR/log.log"



# Reset
echo "`date` Checking out $STAGE0" | tee -a "$DIR/log.log"
git checkout $STAGE0 | tee -a "$DIR/log.log"
