package main

import (
	"bufio"
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"time"

	log "github.com/sirupsen/logrus"
	"gopkg.in/yaml.v2"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var loglevels = map[string]log.Level{
	"debug": log.DebugLevel,
	"info":  log.InfoLevel,
}

type Class struct {
	ID   uint `gorm:"primaryKey"`
	name string
}
type Tag struct {
	ID   uint `gorm:"primaryKey"`
	name string
}
type DBContent struct {
	ID           uint `gorm:"primaryKey"`
	Category     string
	Title        string
	Date         time.Time
	Summary      string
	Classes      []Class `gorm:"many2many:content_classes;"`
	Tags         []Tag   `gorm:"many2many:content_tags;"`
	ImageSrc     string
	ImageCaption string
	Draft        bool
}
type ContentYamlHeader struct {
	Category  string
	Title     string
	Date      time.Time
	Summary   string
	Classes   []string
	Tags      []string
	Cover_img struct {
		Src     string
		Caption string
	}
	Draft bool
}

var database *gorm.DB

func initDB() {
	var err error
	database, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	database.AutoMigrate(&Class{})
	database.AutoMigrate(&Tag{})
	database.AutoMigrate(&DBContent{})
}
func analyseFile(filepath string) (ContentYamlHeader, error) {
	var header ContentYamlHeader
	file, err := os.Open(filepath)
	if err != nil {
		log.Errorf("Unable to open file %s: %s", filepath, err.Error())
		return header, err
	}
	var scanner = bufio.NewScanner(file)
	var marker string = "---"

	var header_open, header_close bool = false, false
	var headerString string = ""
	for scanner.Scan() {
		nextblock := scanner.Text()
		if nextblock == marker {
			if header_open {
				// end
				header_open = false
				header_close = true
				break
			} else {
				header_open = true
				continue
			}
		} else {
			if header_open {
				headerString += fmt.Sprintf("%s\n", nextblock)
				continue
			} else {
				// maybe some empty line before header block?
				continue
			}
		}
	}
	if header_close {
		err := yaml.Unmarshal([]byte(headerString), &header)
		if err == nil { // we found the YAML header block
			log.Infof("[analyzeFile] YAML header parsed from file %s", filepath)
			return header, err
		} else {
			log.Errorf("Error deserialising YAML header: %s", headerString)
		}
	}
	return header, errors.New("YAML header not found")
}
func updateDBFromHeader(header ContentYamlHeader) {

}
func walkFunc(path string, d fs.DirEntry, err error) error {
	var reterr error
	if !d.IsDir() {
		log.Debugf("[walkFunc] analysing file %s", path)
		var header ContentYamlHeader
		var lerr error
		header, lerr = analyseFile(path)
		if lerr != nil {
			log.Errorf("Unable to parse YAML header from file %s: %s", path, lerr.Error())
		} else {
			updateDBFromHeader(header)
		}
	}
	return reterr
}
func main() {
	level := os.Getenv("LOG_LEVEL")
	if len(level) > 0 {
		loglevel, ok := loglevels[level]
		if ok {
			log.SetLevel(loglevel)
		}
	}
	initDB()
	// header, err := analyseFile(os.Args[1])
	// if err != nil {
	// 	fmt.Errorf("Error: %s", err.Error())
	// }
	// fmt.Println(header)
	err := filepath.WalkDir(os.Args[1], walkFunc)
	if err != nil {
		log.Errorf("Walk error: %s", err.Error())
	}
}
