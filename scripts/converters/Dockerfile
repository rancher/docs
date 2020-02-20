FROM debian:latest

RUN apt-get update
RUN apt-get -y install build-essential python3-dev python3-pip python3-setuptools python3-wheel python3-cffi libcairo2 libpango-1.0-0 libpangocairo-1.0-0 libgdk-pixbuf2.0-0 libffi-dev shared-mime-info pandoc jq

RUN apt-get clean
RUN apt-get autoclean

RUN pip3 install WeasyPrint

COPY fonts/ /usr/share/fonts/truetype/

WORKDIR /doc_tools

COPY css css/
COPY images images/
COPY templates templates/
COPY headers headers/
COPY scripts scripts/ 

ENTRYPOINT ["scripts/entrypoint.sh"]
