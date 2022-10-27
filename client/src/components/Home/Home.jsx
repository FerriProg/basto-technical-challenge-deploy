import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAllCows,
  clearState,
  getCowDetail,
  deleteCow,
} from '../../redux/actions';
import Swal from 'sweetalert2';
import { notificationSwal } from '../../utils/notificationSwal';
import './Home.css';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const cowsPerPage = 5;
  const indexOfLastCow = currentPage * cowsPerPage;
  const indexOfFirstCow = indexOfLastCow - cowsPerPage;
  const allCows = useSelector((state) => state.cows);
  const totalPages = Math.ceil(allCows.length / cowsPerPage);
  const currentCows = useSelector((state) =>
    state.cows ? state.cows.slice(indexOfFirstCow, indexOfLastCow) : false
  );

  function prevPage() {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  }

  function nextPage() {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  }

  if (currentPage > totalPages) prevPage();

  function handleEdit(e) {
    dispatch(getCowDetail(e.target.value)).then(() => navigate('/edit'));
  }

  function handleDelete(e) {
    dispatch(getCowDetail(e.target.value)).then((r) => {
      Swal.fire({
        title: '¿Está seguro de que desea eliminar este animal?',
        text: 'Este animal se eliminará de la base de datos',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Sí',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteCow(r.payload._id))
            .then((e) => {
              if (e === 200) {
                notificationSwal(
                  '¡Enhorabuena!',
                  'Animal borrado con éxito',
                  'success',
                  'Ok'
                );
              } else {
                notificationSwal(
                  '¡Ooops!',
                  'No se pudo borrar el animal, intente mas tarde',
                  'error',
                  'Aceptar'
                );
              }
            })
            .then(() => dispatch(getAllCows()));
        } else {
          notificationSwal(
            'Operación cancelada',
            'Animal no borrado',
            'error',
            'Aceptar'
          );
        }
      });
    });
  }

  useEffect(() => {
    dispatch(getAllCows());
    return () => dispatch(clearState());
  }, [dispatch]);

  function dateFormatter(date) {
    const [year, month, day] = date.slice(0, 10).split('-');
    const time = date.slice(11, 19);
    return `${day}/${month}/${year}, ${time}`;
  }

  return (
    <div className="container">
      <h1>Gestion de animales</h1>
      <Link to="/register">
        <button className="buttons">Nuevo Animal</button>
      </Link>
      <h3>Lista de animales</h3>
      {currentCows.length ? (
        <div>
          <div className="buttonspagination">
            <button
              className={'buttons'}
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <p className={'curr'}> {currentPage} </p>
            <button
              className={'buttons'}
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID SENASA</th>
                <th>Tipo de animal</th>
                <th>Peso</th>
                <th>Nombre de potrero</th>
                <th>Tipo de dispositivo</th>
                <th>Número de dispositivo</th>
                <th>Creación</th>
                <th>Actualización</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentCows.map((cow, i) => {
                return (
                  <tr className="data" key={i}>
                    <td>{cow.id_senasa}</td>
                    <td>{cow.animal_type}</td>
                    <td>{cow.animal_weight}</td>
                    <td>{cow.paddock_name}</td>
                    <td>{cow.device_type}</td>
                    <td>{cow.device_number}</td>
                    <td>{dateFormatter(cow.createdAt)}</td>
                    <td>{dateFormatter(cow.updatedAt)}</td>
                    <td>
                      <button
                        className="buttons"
                        value={cow._id}
                        onClick={handleEdit}
                      >
                        Editar
                      </button>

                      <button
                        className="buttons"
                        value={cow._id}
                        onClick={handleDelete}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No hay animales para mostrar</div>
      )}
    </div>
  );
}
