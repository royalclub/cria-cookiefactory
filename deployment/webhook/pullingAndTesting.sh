#!/bin/bash

export STAGE0=development
export STAGE1=test-static-analyzer-passed
export STAGE2=test-unit-tests-passed
export STAGE3=acceptance
export STAGE4=production
export TESTDIR=../../tests
export JSLINT=./$TESTDIR/static-analyzer/node_modules/jslint

#########################################
# STAGE0, development
#########################################
git checkout $STAGE0
git pull

#########################################
# STAGE1, static-analyzer
#########################################

# make sure jslint is installed
if [[ ! -d $JSLINT ]]; then
	#install jslint locally
	echo "Please install jslint first."
	echo "  jslint is expected to be installed in $TESTDIR/static-analyzer/."
	exit 1
fi

rm -fr ./$TESTDIR/static-analyzer/error_log.txt
cd ./$TESTDIR/static-analyzer
./run_lint.sh

if [ -f ./$TESTDIR/static-analyzer/error_log.txt ]; then
	echo "=~=~=~=~= ERRORS ERRORS ERRORS =~=~=~=~="
	echo "  Did not pass the static analyse"
	exit 1
fi



git pull $STAGE0
