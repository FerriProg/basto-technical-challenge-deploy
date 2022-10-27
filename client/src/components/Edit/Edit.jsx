import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCows, editCow } from '../../redux/actions';
import { validate } from '../Register/Validations';
import Swal from 'sweetalert2';
import { notificationSwal } from '../../utils/notificationSwal';
import './Edit.css';

export default function Edit() {
  const detail = useSelector((state) => state.detail);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    id: detail._id,
    id_senasa: detail.id_senasa,
    animal_type: detail.animal_type,
    animal_weight: detail.animal_weight,
    paddock_name: detail.paddock_name,
    device_type: detail.device_type,
    device_number: detail.device_number,
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
        title: '¿Está seguro de que desea editar este animal?',
        text: 'Este animal se editará en la base de datos',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Sí',
      })
        .then((result) => {
          if (result.isConfirmed) {
            dispatch(editCow(detail._id, input))
              .then((e) => {
                if (e === 201) {
                  notificationSwal(
                    '¡Enhorabuena!',
                    'Animal editado con éxito',
                    'success',
                    'Ok'
                  );
                } else {
                  notificationSwal(
                    '¡Ooops!',
                    'No se pudo editar el animal, intente mas tarde',
                    'error',
                    'Aceptar'
                  );
                }
              })
              .then(() => dispatch(getAllCows()));
          } else {
            notificationSwal(
              'Operación cancelada',
              'Animal no editado',
              'error',
              'Aceptar'
            );
          }
        })
        .then(() => {
          navigate('/');
        });

      setInput({
        id_senasa: detail.id_senasa,
        animal_type: detail.animal_type,
        animal_weight: detail.animal_weight,
        paddock_name: detail.paddock_name,
        device_type: detail.device_type,
        device_number: detail.device_number,
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
                    placeholder={input.id_senasa}
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
                    <option
                      value="Novillo"
                      selected={input.animal_type === 'Novillo' ? true : false}
                    >
                      Novillo
                    </option>
                    <option
                      value="Toro"
                      selected={input.animal_type === 'Toro' ? true : false}
                    >
                      Toro
                    </option>
                    <option
                      value="Vaquillona"
                      selected={
                        input.animal_type === 'Vaquillona' ? true : false
                      }
                    >
                      Vaquillona
                    </option>
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
                    placeholder={input.animal_weight}
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
                    placeholder={input.paddock_name}
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
                    <option
                      value="COLLAR"
                      selected={input.device_type === 'COLLAR' ? true : false}
                    >
                      COLLAR
                    </option>
                    <option
                      value="CARAVANA"
                      selected={input.device_type === 'CARAVANA' ? true : false}
                    >
                      CARAVANA
                    </option>
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
                    placeholder={input.device_number}
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
            <button type="submit">Editar animal</button>
          </div>
        </form>
      </div>
    </div>
  );
}
