package reports

import (
	"time"
)

type Report struct {
	Id          int
	Brand_id    int
	Metric_Data *ReportMethodData
	Created_at  time.Time
}
type ReportMethodData struct {
	Id            int
	Analysis_type string
	Metric_num    int
	Metric_type   string
	Created_at    time.Time
}
