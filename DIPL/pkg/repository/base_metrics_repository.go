package repository

import (
	"analyze/main/pkg/metrics"
	"database/sql"
)

type BaseMetricsRepository struct {
	db *sql.DB
}

func (r *BaseMetricsRepository) CreateMetric(metric metrics.ResultMetrics) {}
func (r *BaseMetricsRepository) Update(metric metrics.ResultMetrics)       {}
func (r *BaseMetricsRepository) GetAll()                                   {}
func (r *BaseMetricsRepository) GetById(id string)                         {}
