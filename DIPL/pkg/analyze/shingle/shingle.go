package shingle

import (
	"analyze/main/pkg/analyze"
	"analyze/main/pkg/metrics"
	"analyze/main/pkg/repository"
	"fmt"

	golang_shingles "github.com/leprosus/golang-shingles"
)

type ShingleAnalysis struct{}

func (s *ShingleAnalysis) Execute(data string, dataToString string) analyze.AnalysisResult {
	anaysisRep := repository.AnalysisRepository{}

	// by date
	methodModel := anaysisRep.GetByName("shingle")

	golang_shingles.SetLanguage(golang_shingles.Russian)
	golang_shingles.SetShinglesLength(4)

	resultShingle, err := golang_shingles.Compare(dataToString, data)
	if err != nil {
		fmt.Println(err)
	}

	metricsRep := repository.BaseMetricsRepository{}
	metricsShingle := metrics.ResultMetrics{
		Type_metrice: "shingle",
		Analysis_id:  methodModel.Id,
		Value:        string(resultShingle),
	}
	metricsRep.CreateMetric(metricsShingle)

	return nil
}
