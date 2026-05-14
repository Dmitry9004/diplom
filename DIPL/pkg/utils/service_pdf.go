package utils

import "github.com/go-pdf/fpdf"

func GetPDF() {

	pdf := fpdf.New("P", "mm", "A4", "")
	pdf.AddPage()
	pdf.SetFont("Arial", "B", 16)

	pdf.Cell(40, 10, string(t.Id))

	if t.Metric_Data != nil {
		pdf.Cell(40, 10, string(t.Metric_Data.Analysis_type))
		pdf.Cell(40, 10, string(t.Metric_Data.Metric_num))
	}
	pdf.OutputFileAndClose("result.pdf")
}
