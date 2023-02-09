echo "loading credentials"

aws configure import --csv file://creads.csv

export AWS_PROFILE=email

aws configure set region us-east-1 --profile email

aws configure list

node index.js 
