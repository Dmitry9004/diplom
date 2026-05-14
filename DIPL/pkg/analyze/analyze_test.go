package analyze_test

import (
	"analyze/main/pkg/analyze"
	"analyze/main/pkg/analyze/sentiment"
	"testing"
)

func compareTestsResults(a analyze.AnalysisResult, b analyze.AnalysisResult) bool {}

type AnalisisTest struct {
	data         string
	expcted      analyze.AnalysisResult
	messageError string
}

func testExecuteBase(tests []AnalisisTest, serviceAnalysis analyze.AnalysisMethod, t *testing.T) {
	for _, test := range tests {
		if compareTestsResults(serviceAnalysis.Execute(test.data), test.expcted) {
			t.Errorf(test.messageError)
		}
	}
}

func TestAnalysisBaseSemantic(t *testing.T) {
	serviceAnalysis := &sentiment.SentimentAnalysis{}
	tests := []AnalisisTest{}

	testExecuteBase(tests, serviceAnalysis, t)
}

func TestAnalisisBaseShingle(t *testing.T) {
	serviceAnalysis := &sentiment.SentimentAnalysis{}
	tests := []AnalisisTest{}

	testExecuteBase(tests, serviceAnalysis, t)
}
