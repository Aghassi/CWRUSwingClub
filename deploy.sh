#!/bin/bash
phrase=$1
echo $phrase

# Delete all the old files
find prod -type d | xargs -n1 -I % curl -X DELETE -k https://dsa28:$phrase@www.case.edu:8000/dsa28/swingclub/%

# Deploy all the new ones
find prod -type d -exec basename {} \; | xargs -n1 -I % echo curl -X MKCOL -k https://dsa28:$phrase@www.case.edu:8000/dsa28/swingclub/%

find prod -type f | xargs -n1 -I % curl -X PUT -k -T % https://dsa28:$phrase@www.case.edu:8000/dsa28/swingclub/%