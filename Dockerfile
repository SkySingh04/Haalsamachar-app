FROM golang:1.18-alpine AS build

ENV DB_HOST=mouse.db.elephantsql.com
ENV DB_PORT=5432
ENV DB_USER=nxviwtse
ENV DB_PASSWORD=c1kyPBGM7KDtH-nqRBCjSO3JHUQQlOFH
ENV DB_NAME=nxviwtse


WORKDIR /app
COPY . .

RUN go mod tidy
RUN go build -o /app/server ./comment-service

FROM alpine:latest

WORKDIR /app
COPY --from=build /app/server .

CMD ["./server"]
