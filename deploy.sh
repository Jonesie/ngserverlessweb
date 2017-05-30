#!/bin/bash

echo Deploy static site to jonesie.kiwi

aws_profile="jonesie-kiwi"
aws_region="us-west-2"
domain_name="jonesie.kiwi"
site_bucket_name="jonesie.kiwi"
site_bucket_url="http://$site_bucket_name.s3-website-$aws_region.amazonaws.com"

AWS=0


for i in "$@"; do
    case $1 in
        -aws) AWS=1; shift ;;
        --) shift; SCRIPT_ARGUMENTS+=("$@"); break ;;
        *) SCRIPT_ARGUMENTS+=("$1") ;;
    esac
    shift
done

# create the aws infrastructure
if [ $AWS -eq 1 ]
then
  terraform apply \
      -var "aws_profile=$aws_profile" \
      -var "aws_region=$aws_region" \
      -var "domain_name=jonesie.kiwi" \
      -var "site_bucket_name=$site_bucket_name" \
      aws
fi

# copy the content to the bucket
if [ $? -eq 0 ]
then
    ng build --aot --prod --env=git

    aws s3 cp \
        dist s3://$site_bucket_name/ \
        --profile $aws_profile \
        --recursive
fi
