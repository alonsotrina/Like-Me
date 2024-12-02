import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";

const urlBaseServer = "http://localhost:3000/api";

const formInital = {
  titulo: '',
  img: '',
  descripcion: ''
}

function App() {
  const [form, setForm] = useState(formInital)
  const [posts, setPosts] = useState([]);
  // const [msg, setMsg] = useState(null);

  const getPosts = async () => {
    const { data } = await axios.get(urlBaseServer + "/posts");
    setPosts([...data.data.rows])
    console.log('data', data.data.rows)
  };

  const agregarPost = async () => {
    const post = form;
    await axios.post(urlBaseServer + "/posts", post);
    getPosts();
    setForm(formInital)
  };

  // este método se utilizará en el siguiente desafío
  const like = async (id) => {
    await axios.put(urlBaseServer + `/posts/like/${id}`);
    getPosts();
  };

  // este método se utilizará en el siguiente desafío
  const eliminarPost = async (id) => {
    await axios.delete(urlBaseServer + `/posts/${id}`);
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            form={form}
            setForm={setForm}
            agregarPost={agregarPost}
          />
        </div>

        <div className="col-12 col-sm-8 px-5 row posts align-items-start">

          {
            posts.length > 0 ?
              <>
                {posts.map((post, i) => (
                  <Post
                    key={i}
                    post={post}
                    like={like}
                    eliminarPost={eliminarPost}
                  />
                ))}
              </>
              : <h2 className="text-center">Debe agregar un Posts :)</h2>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
