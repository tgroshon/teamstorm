FROM dockerfile/nodejs

RUN mkdir /code
WORKDIR /code

ADD . /code
RUN npm install --production

CMD npm start
