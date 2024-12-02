function Form({ form, setForm, agregarPost }) {

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
    
  };


  return (
    <div className="form">
      <div className="mb-2">
        <h6>Agregar post</h6>
        <label>Título</label>
        <input
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <label>URL de la imagen</label>
        <input
          name="img"
          value={form.img}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Descripción</label> <br />
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          className="form-control"
        ></textarea>
      </div>
      <div className="d-flex">
        <button onClick={agregarPost} className="btn btn-light m-auto">
          Agregar
        </button>
      </div>
    </div>
  );
}

export default Form;
