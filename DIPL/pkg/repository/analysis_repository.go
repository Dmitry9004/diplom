package repository

import "database/sql"

type AnalysisRepository struct {
	db *sql.DB
}

type AnalysisMethodDescription struct {
	Id          int
	Description string
}

func (r *AnalysisRepository) GetByName(name string) AnalysisMethodDescription {}
