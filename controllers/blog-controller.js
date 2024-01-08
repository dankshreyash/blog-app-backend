import mongoose from 'mongoose';
import Blog from '../models/Blog.js'
import User from '../models/user.js'

export const getAllBlogs = async (req, res, next) => {

    let blogs;
    try {
        blogs = await Blog.find()
    } catch (error) {
        return console.log(error)
    }

    if (!blogs) {
        return res.status(404).json({ message: "no blogfound" })
    }

    return res.status(200).json({ blogs })
}

export const postBlogs = async (req, res, next) => {

    const { title, description, image, user } = req.body

    let existingUser;

    try {
        existingUser = await User.findById(user);
    } catch (error) {
        return console.log(error)
    }

    if (!existingUser) {
        return res.status(400).json({ message: "unable to find user by this id" })
    }

    const blog = new Blog({


        title, description, user, image

    })
    try {
        const session = await mongoose.startSession()

        session.startTransaction();

        await blog.save({ session })

        existingUser.blogs.push(blog)

        await existingUser.save({ session })

        await session.commitTransaction();

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error })

    }

    return res.status(200.).json({ blog })


}

export const updateBlogs = async (req, res, next) => {


    const { title, description } = req.body
    //imp
    const blogId = req.params.id

    let blog;


    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title, description
        })

    } catch (error) {
        console.log(error)
    }


    if (!blog) {
        return res.status(500).json({ message: "unable to update blog" })
    }

    return res.status(200).json({ blog })

}


//update blog
export const getById = async (req, res, next) => {
    const id = req.params.id


    let blog
    try {
        blog = await Blog.findById(id)
    } catch (error) {
        console.log(error)
    }


    if (!blog) {
        return res.status(404).json({ message: "no blog found" })
    }
    return res.status(200).json({ blog })

}


export const deleteBlog = async (req, res, next) => {

    const id = req.params

    let blog
    try {
        blog = await Blog.deleteOne(id).populate('user');

        await blog.user.blogs.pull(blog)

        await blog.user.save()

    } catch (error) {
        console.log(error)
    }


    if (!blog) {
        return res.status(500).json({ message: "unable to delete" })
    }
    return res.status(200).json("deleted done")

}




export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;


    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs")
    } catch (error) {
        console.log(error)

    }


    if (!userBlogs) {
        return res.status(404).json({ message: "no blog found" })
    }

    return res.status(200).json({ blogs: userBlogs })

}