#!/bin/bash
phrase=$1

# Delete all the old files
find prod -type d -not -name prod | awk -F'prod/' '{print $2}' | xargs -n1 -I % curl -X DELETE -k https://dsa28:$phrase@www.case.edu:8000/dsa28/swingclub/%

# Deploy all the new ones
find prod -type d -not -name prod | awk -F'prod/' '{print $2}' | xargs -n1 -I % curl -X MKCOL -k https://dsa28:$phrase@www.case.edu:8000/dsa28/swingclub/%

find prod -type f | awk -F'prod/' '{print $2}' | xargs -n1 -I % curl -X PUT -k -T % https://dsa28:$phrase@www.case.edu:8000/dsa28/swingclub/%