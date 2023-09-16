package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DATABASE = "contents.sqlite"

type DbContentResult struct {
	ID       int
	Category string
	Title    string
	Date     string
	Summary  string
	Path     string
}
type SearchResult struct {
	DbResult DbContentResult
	Tags     []string
}
type TagsResult struct {
	Name string
}
type SearchOutput struct {
	Count   int
	Results []SearchResult
	Errors  []string
}

func searchDB(c *gin.Context) {
	db, err := gorm.Open(sqlite.Open(DATABASE), &gorm.Config{})
	var output SearchOutput
	if err != nil {
		errstr := fmt.Sprintf("Unable to open DB: %s", err.Error)
		logrus.Errorf(errstr)
		output.Errors = append(output.Errors, errstr)
		c.IndentedJSON(http.StatusInternalServerError, output)
		return
	}
	var exists bool
	var q, category string
	category, exists = c.GetQuery("category")
	queryContents := db.Table("db_contents").Select(
		"db_contents.id", "category", "title", "summary", "date", "path").Joins(
		"LEFT JOIN content_tags ct ON ct.db_content_id = db_contents.id").Joins(
		"LEFT JOIN tags ON tags.id = ct.tag_id").Group("db_contents.id")
	if exists {
		likeCat := fmt.Sprintf("%%%s%%", category)
		queryContents.Where("category LIKE ?", likeCat)
	}
	q, exists = c.GetQuery("q")
	if exists {
		likeTerm := fmt.Sprintf("%%%s%%", q)
		queryContents.Where(
			"title LIKE ?", likeTerm).Or(
			"summary LIKE ?", likeTerm).Or(
			"tags.name LIKE ?", likeTerm)
	}
	var results []DbContentResult
	queryContents.Scan(&results)
	var searchResults []SearchResult
	for _, result := range results {
		var searchRes SearchResult
		searchRes.DbResult = result
		var tags []string
		resId := result.ID
		db.Table("tags").Select("name").Joins(
			"LEFT JOIN content_tags ct ON ct.tag_id = tags.id").Where("ct.db_content_id = ?", resId).Scan(&tags)
		searchRes.Tags = tags
		searchResults = append(searchResults, searchRes)
	}
	output.Results = searchResults
	output.Count = len(searchResults)
	c.IndentedJSON(http.StatusCreated, output)
}

func main() {
	args := os.Args
	if len(args) > 1 {
		DATABASE = args[1]
	}
	router := gin.Default()
	router.GET("/search", searchDB)

	router.Run("0.0.0.0:48081")
}
