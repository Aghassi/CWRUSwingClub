#!/bin/bash
if [ "$TRAVIS_BRANCH" == "prod" ]; then
    grunt prod

    # Delete all the old files
    ls prod | xargs -n1 -I % curl -X DELETE -k https://$USER:$PHRASE@www.case.edu:8000/dsa28/swingclub/%

    # Deploy all the new ones to prod/

    find prod -type d | xargs -n1 -I % curl -X MKCOL -k https://$USER:$PHRASE@www.case.edu:8000/dsa28/swingclub/%

    find prod -type f | xargs -n1 -I % curl -X PUT -k -T % https://$USER:$PHRASE@www.case.edu:8000/dsa28/swingclub/%


    # 3. Delete prod/
    # NOTE: For some reason this leaves a folder called "prod/". 
    # Find out how to remove that.
    curl -X MKCOL -k https://$USER:$PHRASE@www.case.edu:8000/dsa28/swingclub/test
    ls prod -I index.html | xargs -n1 -I % curl -X MKCOL -k https://$USER:$PHRASE@www.case.edu:8000/dsa28/swingclub/%

    ls prod | xargs -n1 -I % curl -X MOVE -k https://$USER:$PHRASE@www.case.edu:8000/dsa28/swingclub/prod/% --header "Destination: https://$USER:$PHRASE@www.case.edu:8000/dsa28/swingclub/%" --header "Overwrite: T"

    curl -X DELETE -k https://$USER:$PHRASE@www.case.edu:8000/dsa28/swingclub/prod
fi