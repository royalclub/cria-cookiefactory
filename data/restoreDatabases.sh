#!/bin/bash

# cookiefactory_prd keeps its data
for db in groep9-dev groep9-tst groep9-acc
do
    echo "Dropping $db"
    mongo $db --eval "db.dropDatabase()"
    echo "Restoring $db"
    mongorestore -d $db seed
done