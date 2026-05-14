#build stage
FROM golang:latest as builder_base

# RUN apt update
# RUN apt install -y golang-go
# RUN apt-get install -y ca-certificates

COPY . ./

# RUN go mod download 

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix cgo -o go-app ./...
# RUN chmod +x /go-app
# RUN chmod 777 /go-app
EXPOSE 80

# FROM alpine
# RUN apk add ca-certificates
# COPY --from=builder_base /go-app /go-app

CMD ["./go-app/cmd"]