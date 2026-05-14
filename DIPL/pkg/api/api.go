package api

import (
	"analyze/main/pkg/api/controllers"
	"encoding/json"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"net/http"
)

func Run() {
	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Route("/reports", func(r chi.Router) {
		// r.Use(middleware.AuthServiceAPIToker)
		c := controllers.ReportController{}
		r.Get("/pdf/{id}", func(w http.ResponseWriter, r *http.Request) {
			id, _ := strconv.Atoi(chi.URLParam(r, "id"))
			c.GetReportPDF(id)
		})
		r.Get("/excel/{id}", func(w http.ResponseWriter, r *http.Request) {
			id, _ := strconv.Atoi(chi.URLParam(r, "id"))
			c.GetReportExcel(id)
		})

		r.Get("/{id}", func(w http.ResponseWriter, r *http.Request) {
			id, _ := strconv.Atoi(chi.URLParam(r, "id"))
			c.GetReport(id)
		})
		r.Get("/all", func(w http.ResponseWriter, r *http.Request) {
			jsonRports := c.GetReports()
			json.NewEncoder(w).Encode(jsonRports)

			// w.Header().Set("Content-Type", "application/json")
			// w.WriteHeader(http.StatusOK)
			// w.Write(jsonRports)
		})
		// r.Post("", func(w http.ResponseWriter, r *http.Request{})
	})

	r.Route("/analysis", func(r chi.Router) {
		r.Get("/", func(w http.ResponseWriter, r *http.Request) {
			cont := controllers.AnalysisController{}
			cont.GetAnalysisAll()
		})
	})

	r.Route("/metrics", func(r chi.Router) {

		r.Route("/result", func(r chi.Router) {
			c := controllers.MetricsResultController{}

			r.Get("/", func(w http.ResponseWriter, r *http.Request) {
				c.GetAll()
			})
			r.Get("/analysis/{id}", func(w http.ResponseWriter, r *http.Request) {
				c.GetAll()
			})
		})
		r.Route("/base", func(r chi.Router) {
			c := controllers.MetricsBaseCotntroller{}

			r.Get("/", func(w http.ResponseWriter, r *http.Request) {
				c.GetAll()
			})
			r.Get("/analysis/{id}", func(w http.ResponseWriter, r *http.Request) {
				c.GetAll()
			})
			r.Patch("/{id}", func(w http.ResponseWriter, r *http.Request) {})
		})
	})

	// r.Route("/scheduler", func(r chi.Router) {
	// 	r.Post("/", func(w http.ResponseWriter, r *http.Request) {})
	// 	r.Get("/{id}", func(w http.ResponseWriter, r *http.Request) {})
	// })

	http.ListenAndServe(":80", r)
}
