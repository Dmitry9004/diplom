package analyze

import (
	"analyze/main/pkg/metrics"
)

type AnalysisMethod interface {
	Execute(data string) AnalysisResult
}

type AnalysisResult struct {
	Metrics []metrics.ResultMetrics
}

// type FilterAnalysis struct{}
