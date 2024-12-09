import { successToast, errorToast } from "./utils/toast";
import { useEffect, useState } from "react";

import {
  getPosts,
  addPost,
  deletePost,
  likePost,
} from "./services/postService";

import AddPost from "./components/AddPost";
import CardPost from "./components/CardPost";

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then((data) => {
        console.log('esto trae data', data.data.rows)
        successToast(data.msg);
        setPosts(data.data.rows);
      })
      .catch((err) => {
        errorToast("Error al obtener los posts", err);
      });
  }, []);

  const createPost = (post) => {
    addPost(post)
      .then((data) => {
        setPosts([data.data.rows[0], ...posts]);
        successToast(data.msg);
      })
      .catch((err) => {
        errorToast("Error al crear el post");
      });
  };

  const deletePostById = (id) => {
    deletePost(id).then((data) => {
      const newPosts = posts.filter((post) => {
        return post.id !== id;
      });
      setPosts(newPosts);
      successToast(data.msg);
    });
  };

  const likePostById = (data) => {
    const auxPost = { ...data, likes: data.likes + 1 };
     
    likePost(auxPost).then(() => {
      const newPosts = posts.map((post) => {
        if (post.id === data.id) {
          return {
            ...post,
            likes: post.likes + 1,
          };
        }
        return post;
      });
      setPosts(newPosts);
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">📷 Like Me 📷</h1>
      <main className="row">
        <section className="col-12 col-md-4 mt-5">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h2>Add Post</h2>
              <AddPost createPost={createPost} />
            </div>
          </div>
        </section>

        <section className="col-12 col-md-8 mt-5">
          <div className="row">
            {posts.map((post, index) => {
              return (
                <div className="col-4"  key={index}>
                  <CardPost
                    post={post}
                    deletePostById={deletePostById}
                    likePostById={likePostById}
                  />
                </div>
              );
            })}
          </div>
       

          {posts.length === 0 && (
            <div className="card">
              <div className="card-body">
                <h2>No hay posts</h2>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
