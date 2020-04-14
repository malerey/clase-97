import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MovieContainer = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Movie = styled.article`
  margin: 20px;
  width: 180px;

  img {
    width: 100%;
    height: auto;
  }
`

const Modal = styled.div`
  width: 700px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 20px;
  position: absolute;
  right: 30%;
  background-color: #fff;

  img {
    width: 180px;
    height: auto;
  }
`

const App = () => {

  const [listaDePeliculas, setListaDePeliculas] = useState([])
  const [modalAbierto, setModalAbierto] = useState(false)
  const [peliculaElegida, setPeliculaElegida] = useState(null)
  const [generos, setGeneros] = useState([])
  const [generosPeliculaElegida, setGenerosPeliculaElegida] = useState([])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=84e25ac11ad6125024e1d376337be05f`)
    .then(res => res.json())
    .then(data => setListaDePeliculas(data.results))
  }, [])

  const handleClick = pelicula => {
    setPeliculaElegida(pelicula)
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=84e25ac11ad6125024e1d376337be05f`)
    .then(res => res.json())
    .then(data => setGeneros(data.genres))
    handleClickModal()
    setGenerosPeliculaElegida(generos.filter(genero => {
      return peliculaElegida.genre_ids.includes(genero.id)
    }))
  }

  const handleClickModal = () => {
    setModalAbierto(!modalAbierto)
  }


  return (
    <>
      {modalAbierto && 
        <Modal>
          <button onClick={handleClickModal}>X</button>
          <h3>{peliculaElegida.title}</h3>
          <img src={`https://image.tmdb.org/t/p/w500${peliculaElegida.poster_path}`} />
          <p>resumen: {peliculaElegida.overview}</p>
          <p>fecha de lanzamiento: {new Date(peliculaElegida.release_date).toLocaleDateString('es')}</p>
          <p>Generos: {generosPeliculaElegida.map(generos => generos.name).join(", ")}</p>
        </Modal>
      }
      <MovieContainer>
      {listaDePeliculas.map((pelicula) => (
        <Movie key={pelicula.id} onClick={() => handleClick(pelicula)}>
          <p>{pelicula.title}</p>
          <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}/>
        </Movie>
        ))}
      </MovieContainer>
    </>
  );
}

export default App;
