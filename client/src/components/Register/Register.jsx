import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCows, postCow } from '../../redux/actions';
import { validate } from './Validations';
import Swal from 'sweetalert2';
import { notificationSwal } from '../../utils/notificationSwal';
import './Register.css';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    id_senasa: '',
    animal_type: '',
    animal_weight: '',
    paddock_name: '',
    device_type: '',
    device_number: '',
  });

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  }

  const have = () => {
    if (
      errors.id_senasa ||
      errors.animal_type ||
      errors.animal_weight ||
      errors.paddock_name ||
      errors.device_type ||
      errors.device_number
    ) {
      return true;
    } else if (
      input.id_senasa &&
      input.animal_type &&
      input.paddock_name &&
      input.device_type &&
      input.device_number
    ) {
      return false;
    } else {
      return 'e';
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (have() === false) {
      Swal.fire({
        title: '¿Está seguro de que desea crear este animal?',
        text: 'Este animal se agregará a la base de datos',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Sí',
      })
        .then((result) => {
          if (result.isConfirmed) {
            dispatch(postCow(input))
              .then((e) => {
                if (e === 201) {
                  notificationSwal(
                    '¡Enhorabuena!',
                    'Animal creado con éxito',
                    'success',
                    'Ok'
                  );
                } else {
                  notificationSwal(
                    '¡Ooops!',
                    'No se pudo crear el animal, intente mas tarde',
                    'error',
                    'Aceptar'
                  );
                }
              })
              .then(() => dispatch(getAllCows()));
          } else {
            notificationSwal(
              'Operación cancelada',
              'Animal no creado',
              'error',
              'Aceptar'
            );
          }
        })
        .then(() => {
          navigate('/');
        });

      setInput({
        id_senasa: '',
        animal_type: '',
        animal_weight: '',
        paddock_name: '',
        device_type: '',
        device_number: '',
      });
    } else if (have() === 'e') {
      notificationSwal(
        '¡Faltan datos!',
        'Complete todos los campos obligatorios',
        'error',
        'Aceptar'
      );
    } else
      notificationSwal(
        '¡Hay errores!',
        'Corríjalos por favor',
        'error',
        'Aceptar'
      );
  }

  return (
    <div>
      <div>
        <div className="center">
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>

        <form className="createCard" onSubmit={(event) => handleSubmit(event)}>
          <div className="rowCreate">
            <div className="textAlign">
              <div>
                <div className="pushApart">
                  <label>ID SENASA*: </label>
                  <input
                    type="text"
                    size="40"
                    value={input.id_senasa}
                    name="id_senasa"
                    id="id_senasa"
                    placeholder="Registro en SENASA"
                    onChange={(event) => handleChange(event)}
                  />
                </div>
                {errors.id_senasa && (
                  <p className="errors">{errors.id_senasa}</p>
                )}
              </div>
              <div>
                <div className="pushApart">
                  <label>Tipo de animal*: </label>
                  <select
                    className="selectCss"
                    onChange={(event) => handleChange(event)}
                    name="animal_type"
                  >
                    <option value="Select" defaultValue hidden>
                      Seleccionar
                    </option>
                    <option value="Novillo">Novillo</option>
                    <option value="Toro">Toro</option>
                    <option value="Vaquillona">Vaquillona</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="pushApart">
                  <label>Peso: </label>
                  <input
                    type="text"
                    size="40"
                    value={input.animal_weight}
                    name="animal_weight"
                    id="animal_weight"
                    placeholder="0"
                    onChange={(event) => handleChange(event)}
                  />
                </div>
                {errors.animal_weight && (
                  <p className="errors">{errors.animal_weight}</p>
                )}
              </div>
              <div>
                <div className="pushApart">
                  <label>Nombre de potrero*: </label>
                  <input
                    type="text"
                    size="40"
                    value={input.paddock_name}
                    name="paddock_name"
                    id="paddock_name"
                    placeholder="Ingrese el nombre de potrero"
                    onChange={(event) => handleChange(event)}
                  />
                </div>
                {errors.paddock_name && (
                  <p className="errors">{errors.paddock_name}</p>
                )}
              </div>
              <div>
                <div className="pushApart">
                  <label>Tipo de dispositivo*: </label>
                  <select
                    className="selectCss"
                    onChange={(event) => handleChange(event)}
                    name="device_type"
                  >
                    <option value="Select" defaultValue hidden>
                      Seleccionar
                    </option>
                    <option value="COLLAR">COLLAR</option>
                    <option value="CARAVANA">CARAVANA</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="pushApart">
                  <label>Número de dispositivo*: </label>
                  <input
                    type="text"
                    size="40"
                    value={input.device_number}
                    name="device_number"
                    id="device_number"
                    placeholder="Ingrese el número de dispositivo"
                    onChange={(event) => handleChange(event)}
                  />
                </div>
                {errors.device_number && (
                  <p className="errors">{errors.device_number}</p>
                )}
              </div>
            </div>
          </div>
          <div className="center">
            <button type="submit">Crear animal</button>
          </div>
        </form>
      </div>
    </div>
  );
}
