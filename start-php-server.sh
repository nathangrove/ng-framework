#!/bin/bash
docker run -p 3333:3306 -p 8888:80 --name=phpframe -e LOG_STDERR=true -e LOG_LEVEL=debug -v "$(pwd)"/src/api/public:/var/www/html -v "$(pwd)"/src/api/secure:/var/www/secure fauria/lamp
docker exec phpframe mysql -u root < /var/www/secure/database/create.sql