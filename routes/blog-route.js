
import express from 'express'
import { getById, getByUserId, getAllBlogs, postBlogs, updateBlogs, deleteBlog } from '../controllers/blog-controller.js'

const blogrouter = express.Router()


blogrouter.get("/", getAllBlogs)

//add a new blog
blogrouter.post("/add", postBlogs)

//update blog
blogrouter.put("/update/:id", updateBlogs)


//gets a specific blog
blogrouter.put("/:id", getById)


//delete a blog 
blogrouter.delete('/:id', deleteBlog)

//getting blog of user
blogrouter.get('/user/:id', getByUserId)





export default blogrouter