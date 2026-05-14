package repository

import (
	"analyze/main/pkg/analyze"
	"analyze/main/pkg/metrics"
	"database/sql"
)

type ResultMetricsRepository struct {
	db *sql.DB
}

func (r *ResultMetricsRepository) Create(metric metrics.ResultMetrics)               {}
func (r *ResultMetricsRepository) GetAll()                                           {}
func (r *ResultMetricsRepository) GetByAnalysisId(id string) []metrics.ResultMetrics {}

func (r *ResultMetricsRepository) CreateFromAnalysisResult(result analyze.AnalysisResult) {
	for _, metric := range result.Metrics {
		r.Create(metric)
	}
}
