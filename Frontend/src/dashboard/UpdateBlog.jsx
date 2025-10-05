
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBlog() {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");

  // keep file separate from preview
  const [blogImage, setBlogImage] = useState(null); // File only
  const [blogImagePreview, setBlogImagePreview] = useState(""); // string url

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBlogImagePreview(reader.result); // show preview
        setBlogImage(file); // save actual file
      };
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/blogs/single-blog/${id}`,
          { withCredentials: true }
        );

        console.log("Fetched blog:", data);

        setTitle(data?.title || "");
        setCategory(data?.category || "");
        setAbout(data?.about || "");

        // set preview from backend but no file selected
        setBlogImagePreview(data?.blogImage?.url || "");
        setBlogImage(null);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load blog data");
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);

    // only append if new file chosen
    if (blogImage instanceof File) {
      formData.append("blogImage", blogImage);
    }

    try {
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const { data } = await axios.put(
        `http://localhost:4001/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Update response:", data);
      toast.success(data.message || "Blog updated successfully");
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to update blog"
      );
    }
  };

  return (
    <div className="container mx-auto my-12 p-4">
      <section className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">UPDATE BLOG</h3>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Category</label>
            <select
              className="w-full p-2 border rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Devotion">Devotion</option>
              <option value="Sports">Sports</option>
              <option value="Coding">Coding</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="BLOG MAIN TITLE"
            className="w-full p-2 mb-4 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="mb-4">
            <label className="block mb-2 font-semibold">BLOG IMAGE</label>
            <img
              src={blogImagePreview || "/imgPL.webp"}
              alt="Blog Main"
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <input
              type="file"
              className="w-full p-2 border rounded-md"
              onChange={changePhotoHandler}
            />
          </div>

          <textarea
            rows="6"
            className="w-full p-2 mb-4 border rounded-md"
            placeholder="Something about your blog at least 200 characters!"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            UPDATE
          </button>
        </form>
      </section>
    </div>
  );
}

export default UpdateBlog;
