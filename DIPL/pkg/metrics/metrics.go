package metrics

import "time"

type BaseMetrics struct {
	Id             int
	Type_metrice   string
	Analysis_id    int
	Absolute_value string
	Created_at     time.Time
	Updated_at     time.Time
}

type ResultMetrics struct {
	Id           int
	ReportId     int
	Type_metrice string
	Analysis_id  int
	Value        string
	Created_at   time.Time
}

// create table type_metrics(
// 	id int primary key generated always as identity,
// 	type_metric text,
// 	name_trans text
// );

// create table result_metrics(
// 	id int primary key generated always as identity,
// 	report_id int,
// 	type_metric_id int,
// 	analysis_id int,
// 	value text,
// 	create_at TIMESTAMP,
// 	foreign key(report_id) references reports(id),
// 	foreign key(type_metric_id) references type_metrics(id)
// );

// create table base_metrics(
// 	id int primary key generated always as identity,
// 	type_metric_id int,
// 	absolute_value text,
// 	created_at TIMESTAMP,
// 	update_at TIMESTAMP,
// 	foreign key(type_metric_id) references type_metrics(id)
// )
