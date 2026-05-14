package dto

type DTO interface {
	Output() []byte
}

type ReportDTO struct{}

func (d *ReportDTO) Output() []byte {}

type AnalysisDescriptionDTO struct{}

func (d *AnalysisDescriptionDTO) Output() []byte {}

type MetricDTO struct{}

func (d *MetricDTO) Output() []byte {}
