package repository

import (
	"analyze/main/pkg/reports"
	"database/sql"
	"fmt"
	"time"

	_ "github.com/lib/pq"
)

type ReportRepository struct {
	db *sql.DB
}

func (r *ReportRepository) openCon() *sql.DB {

}

func (r *ReportRepository) Insert() int {
	conn := r.openCon()
	defer conn.Close()

	// result, err := conn.Exec("insert into reports() values()")

	return -1
}

func (r *ReportRepository) GetArrIdBetweenDates(from time.Time, to time.Time) []int {

	stmt, _ := r.db.Prepare("select id from reports where created_at between $1 and $2")
	rows, err := stmt.Query(from, to) // id
	if err != nil {
		fmt.Println(err)
	}

	defer rows.Close()

	all := []int{}

	for rows.Next() {
		var id int
		err := rows.Scan(&id)

		if err != nil {
			fmt.Println(err)
		}

		all = append(all, id)
	}

	return all
}

func (r *ReportRepository) Find(id int) *reports.Report {
	stmt, _ := r.db.Prepare("select * from reports where id = $1")
	rows, err := stmt.Query(id) // id
	if err != nil {
		fmt.Println(err)
	}

	for rows.Next() {
		report := reports.Report{}
		// metric_report := reports.ReportMethodData{}

		err := rows.Scan(&report.Id, &report.Brand_id, &report.Created_at) // &metric_report.Analysis_type, &metric_report.Metric_num, &metric_report.Metric_type, &metric_report.Created_at)
		if err != nil {
			fmt.Println(err)
		}
		return &report
	}

	return nil
}

func (r *ReportRepository) GetAllById() []*reports.Report {}

func (r *ReportRepository) GetAll() []*reports.Report {
	conn := r.openCon()
	defer conn.Close()

	rows, err := conn.Query("select * from reports")
	if err != nil {
		fmt.Println(err)
	}

	defer rows.Close()

	all := []*reports.Report{}

	for rows.Next() {
		report := reports.Report{}
		metric_report := reports.ReportMethodData{}

		err := rows.Scan(&report.Id, &report.Brand_id, &report.Created_at, &metric_report.Analysis_type, &metric_report.Metric_num, &metric_report.Metric_type, &metric_report.Created_at)
		if err != nil {
			fmt.Println(err)
		}

		all = append(all, &report)
	}

	return all
}
