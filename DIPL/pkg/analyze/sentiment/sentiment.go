package sentiment

import (
	"analyze/main/pkg/analyze"
	"analyze/main/pkg/metrics"
	"analyze/main/pkg/repository"
	"fmt"

	"github.com/cdipaolo/sentiment"
)

type SentimentAnalysis struct{}

// type ReputationAnalysisResult struct{}
func (s *SentimentAnalysis) Execute(data string, reportId int) analyze.AnalysisResult {
	var model sentiment.Models

	model, noModel := sentiment.Restore()
	if noModel == nil {
		trained_model, err := sentiment.Train()
		if err != nil {
			fmt.Println(err)
		}
		// persist maybe model.json asset

		model = trained_model
	}
	result := model.SentimentAnalysis(data, sentiment.Russian)

	neutral_sentences := 0
	positivce_sentences := 0
	negative_sentenes := 0

	for _, val := range result.Sentences {
		if val.Score == 0 {
			neutral_sentences++
		}
		if val.Score == 1 {
			positivce_sentences++
		}
		if val.Score == 2 {
			negative_sentenes++
		}
	}
	rep := repository.AnalysisRepository{}
	sentimentModel := rep.GetByName("sentiment")

	return analyze.AnalysisResult{
		Metrics: []metrics.ResultMetrics{
			{
				ReportId:     reportId,
				Analysis_id:  sentimentModel.Id,
				Type_metrice: "sentiment_negative",
				Value:        string(negative_sentenes),
			},
			{
				ReportId:     reportId,
				Analysis_id:  sentimentModel.Id,
				Type_metrice: "sentiment_positvie",
				Value:        string(positivce_sentences),
			},
			{
				ReportId:     reportId,
				Analysis_id:  sentimentModel.Id,
				Type_metrice: "sentiment_neutral",
				Value:        string(neutral_sentences),
			},
			{
				ReportId:     reportId,
				Analysis_id:  sentimentModel.Id,
				Type_metrice: "sentiment_result",
				Value:        string(result.Score),
			},
		},
	}
}
