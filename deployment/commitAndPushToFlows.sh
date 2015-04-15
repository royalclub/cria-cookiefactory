#!/bin/bash


# Take commit message from command line, if given. Default commit message is the date.
export COMMIT_MESSAGE="DEVELOPMENT: `date`"
export STAGE0=development
export STAGE1=test-static-analyzer-passed
export STAGE2=test-unit-tests-passed
export STAGE3=acceptance
export STAGE4=production
export TEST_DIR=../tests

while getopts ":m:" opt; do
  case $opt in
    m)
      export COMMIT_MESSAGE=$OPTARG
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done


git checkout $STAGE0

git commit -am "$COMMIT_MESSAGE"

git push origin development


#############################
# STAGE 1 --> static analyzers
#############################
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


#############################
# STAGE 2 --> unit tests
#############################
git checkout $STAGE1

cd ./$TESTDIR/unit-tests

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

#############################
# STAGE 3
#############################
git checkout $STAGE2

git merge --no-edit $STAGE1
git commit -am "Merging from $STAGE1 to $STAGE2: `date`"

git push origin $STAGE2


#############################
# Checking out development branch
#############################
git checkout $STAGE0


