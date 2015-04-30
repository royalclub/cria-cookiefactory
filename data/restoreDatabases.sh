#!/bin/bash

# cookiefactory_prd keeps its data
for db in cookiefactory_dev cookiefactory_test cookiefactory_acc
do
    echo "Dropping $db"
    mongo $db --eval "db.dropDatabase()"
    echo "Restoring $db"
    mongorestore -d $db seed
done