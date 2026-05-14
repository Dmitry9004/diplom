package utils

import (
	"analyze/main/pkg/repository"
	"fmt"
	"time"

	"github.com/xuri/excelize/v2"
)

type ReportServiceExcel struct{}

func (r *ReportServiceExcel) GetReportsBetweenDates(from time.Time, to time.Time) {
	rep := repository.ReportRepository{}
	arrId := rep.GetArrIdBetweenDates(from, to)

	r.GetReportsById(arrId)
}

func (r *ReportServiceExcel) GetReportsById(arrId []int) {
	f := excelize.NewFile()

	defer func() {
		if err := f.Close(); err != nil {
			fmt.Println(err)
		}
	}()

	rep := repository.ReportRepository{}
	reports := rep.GetAllById()

	repMetrics := repository.ResultMetricsRepository{}
	for _, report := range reports {

		reportName := string(report.Id)
		index, _ := f.NewSheet("Report #" + reportName)
		f.SetActiveSheet(index)

		f.SetCellValue(reportName, "A1", "Идентификатор бренда")
		f.SetCellValue(reportName, "A1", string(report.Brand_id))

		f.SetCellValue(reportName, "B1", "Дата создания")
		f.SetCellValue(reportName, "B1", report.Created_at.Format("2000-00-00"))

		allMetricsReport := repMetrics.GetByAnalysisId(reportName)

		if len(allMetricsReport) > 0 {
			for index, metric := range allMetricsReport {
				cell1, _ := excelize.CoordinatesToCellName(index+2, 1)
				cell2, _ := excelize.CoordinatesToCellName(index+2, 2)

				f.SetCellValue(reportName, cell1, "Тип метрики")
				f.SetCellValue(reportName, cell2, metric.Type_metrice)

				cell3, _ := excelize.CoordinatesToCellName(index+2, 3)
				cell4, _ := excelize.CoordinatesToCellName(index+2, 4)
				f.SetCellValue(reportName, cell3, "Значение")
				f.SetCellValue(reportName, cell4, metric.Value)

				cell5, _ := excelize.CoordinatesToCellName(index+2, 5)
				cell6, _ := excelize.CoordinatesToCellName(index+2, 6)
				f.SetCellValue(reportName, cell5, "Дата создания метрики")
				f.SetCellValue(reportName, cell6, metric.Created_at.Format("2000-00-00"))
			}
		}

		f.SetActiveSheet(index)
	}

	err := f.SaveAs("Result_BOOK.xlsx")
	fmt.Println(err)
}
