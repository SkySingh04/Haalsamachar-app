package blogservice

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Define routes
	r.POST("/:id/blogs", createblogHandler)
	r.GET("/:id/blogs/:blogID", getblogHandler)
	r.PUT("/:id/blogs/:blogID", updateblogHandler)
	r.DELETE("/:id/blogs/:blogID", deleteblogHandler)
	r.GET("/:id/blogs", listblogsHandler)

	// Run server
	r.Run(":8082")
}
