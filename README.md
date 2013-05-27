Bring Your Own Magnum
=====================

The Website for Bring Your Magnum

Version : 0.2

Dev URL:            http://ws2013byom.s3-website-us-east-1.amazonaws.com/
Deployment URL:     http://byom.winespectator.com
Deployment script:  s3cmd put --recursive ~/Code/bringyourownmagnum/*
s3://byom.winespectator.com
Bucket policy:  

                {
                  "Version": "2008-10-17",
                  "Statement": [
                    {
                      "Sid": "AddPerm",
                      "Effect": "Allow",
                      "Principal": {
                        "AWS": "*"
                      },
                      "Action": "s3:GetObject",
                      "Resource": "arn:aws:s3:::byom.winespectator.com/*"
                    }
                  ]
                }
