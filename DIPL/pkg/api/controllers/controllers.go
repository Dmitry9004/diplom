package controllers

import (
	"analyze/main/pkg/api/controllers/dto"
	"analyze/main/pkg/repository"
	"analyze/main/pkg/utils"
	"encoding/json"
	"fmt"
)

type Controller interface {
	// DB WHERE FROM GET
}
type ReportController struct {
	rep *repository.ReportRepository
}

type AnalysisController struct {
	rep *repository.AnalysisMethodDescription
}

type MetricsResultController struct {
	rep *repository.ResultMetricsRepository
}

type MetricsBaseCotntroller struct {
	rep *repository.BaseMetricsRepository
}

// type SchedulerController struct{}

func (m *MetricsResultController) GetAll() []dto.DTO                {}
func (m *MetricsResultController) GetByAnalysisId(id int) []dto.DTO {}

func GetReportController(rep *repository.ReportRepository) *ReportController {
	return &ReportController{rep: rep}
}

func (c *ReportController) GetReports() dto.DTO {
	reports := c.rep.GetAll()
	b, err := json.Marshal(&reports)
	if err != nil {
		fmt.Println(err)
	}

	return &dto.ReportDTO{}
}

func (c *ReportController) GetReport(id int) dto.DTO {}

func (c *ReportController) GetReportPDF(id int) {
}

func (c *ReportController) GetReportExcel(id int) {
	service := utils.ReportServiceExcel{}
	service.GetReportsById([]int{id})
}

func (c *ReportController) CreateReports() dto.DTO {
	c.rep.GetAll()
}

func (c *AnalysisController) GetAnalysisAll() dto.DTO {

}

// func (c *AnalysisController) SetAnalysisFor() {}
// func (c *SchedulerController) SetScheduler()   {}
// func (c *SchedulerController) UpdateSchedule() {}
