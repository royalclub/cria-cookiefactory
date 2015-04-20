#!/bin/bash

for db in books-dev books-tst books-acc books-prd
do
    mongo $db --eval "db.dropDatabase()"
    mongorestore -d $db seed
done