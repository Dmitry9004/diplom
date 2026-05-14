package main

import (
	"analyze/main/pkg/api"
	"database/sql"
	"fmt"
)

func main() {
	db, err := sql.Open("postgres", "user=root password=1234 dbname=postgres sslmode=disable")
	if err != nil {
		fmt.Println(err)
	}
	// return db

	api.Run()
}
