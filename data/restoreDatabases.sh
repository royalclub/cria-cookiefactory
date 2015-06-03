#!/bin/bash

# cookiefactory_prd keeps its data
for db in groep9-dev groep9-acc groep9-prd
do
    echo "Dropping $db"
    mongo $db --eval "db.dropDatabase()"
    echo "Restoring $db"
    mongorestore -d $db seed
done