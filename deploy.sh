#!/bin/bash
user=$1
phrase=$2

# Delete all the old files
ls prod | xargs -n1 -I % curl -X DELETE -k https://$user:$phrase@www.case.edu:8000/dsa28/swingclub/%

# Deploy all the new ones
find prod -type d | xargs -n1 -I % curl -X MKCOL -k https://$user:$phrase@www.case.edu:8000/dsa28/swingclub/%

find prod -type f | xargs -n1 -I % curl -X PUT -k -T % https://$user:$phrase@www.case.edu:8000/dsa28/swingclub/%


# Move all the new data to proper folders
# 1. Make the folder
# 2. Move the data from prod
# 3. Delete prod
ls prod | xargs -n1 -I % curl -X MKCOL -k https://$user:$phrase@www.case.edu:8000/dsa28/swingclub/%

ls prod | xargs -n1 -I % curl -X MOVE -k https://$user:$phrase@www.case.edu:8000/dsa28/swingclub/prod/% --header "Destination: https://$user:$phrase@www.case.edu:8000/dsa28/swingclub/%" --header "Overwrite: T"