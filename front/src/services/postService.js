// Reemplazar por la URL de la API
const URL_API = "http://localhost:3000/api/posts";

export const getPosts = async () => {
  const response = await fetch(URL_API);
  const data = await response.json();
  return data;
};

export const addPost = async (post) => {
  const response = await fetch(URL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const data = await response.json();
  return data;
};

export const deletePost = async (id) => {
  const response = await fetch(`${URL_API}/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

export const likePost = async (data) => {
  console.log('--------- data like', data)
  await fetch(`${URL_API}/like/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ likes: data.likes }),
  });
};
