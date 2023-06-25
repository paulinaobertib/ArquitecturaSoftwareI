FROM golang:1.18

ADD . /backend

WORKDIR /backend
RUN go mod init booking-api
RUN go mod tidy
RUN go build -o booking-api .
RUN chmod +x /backend

ENTRYPOINT ["/backend/booking-api"]
