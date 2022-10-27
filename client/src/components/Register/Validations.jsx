export function validate(input) {
  let errors = {};

  if (!input.id_senasa)
    errors.id_senasa = 'ID SENASA no puede quedar en blanco';
  else if (!/^[A-Za-z0-9\S]+$/g.test(input.id_senasa))
    errors.id_senasa = 'Sólo se permiten letras y números';
  else if (input.id_senasa.length < 1 || input.id_senasa.length > 16)
    errors.id_senasa = 'ID SENASA debe tener entre 1 y 16 caracteres';

  //Animal weight is not a mandatory field.
  if (input.animal_weight && isNaN(input.animal_weight))
    errors.animal_weight = 'Sólo se permiten números';
  else if (/[  +]$/.test(input.animal_weight))
    errors.animal_weight = 'Sólo se permiten números';
  else if (!Number.isInteger(Number(input.animal_weight)))
    errors.animal_weight = 'Sólo se permiten números enteros';
  else if (
    input.animal_weight &&
    (parseInt(input.animal_weight) < 1 || parseInt(input.animal_weight) > 1000)
  )
    errors.animal_weight = 'El peso del animal debe ser entre 1 y 1000 Kg';

  if (!input.paddock_name)
    errors.paddock_name = 'El nombre de potrero no puede quedar en blanco';
  else if (!/^[A-Za-z]+$/g.test(input.paddock_name))
    errors.paddock_name = 'Sólo se permiten letras';
  else if (input.paddock_name.length < 1 || input.paddock_name.length > 200)
    errors.paddock_name =
      'El nombre de potrero debe ser entre 1 y 200 caracteres';

  if (!input.device_number)
    errors.device_number = 'El número de dispositivo no puede quedar en blanco';
  else if (!/^[A-Za-z0-9\S]+$/g.test(input.device_number))
    errors.device_number = 'Sólo se permiten letras y números';
  else if (input.device_number.length < 1 || input.device_number.length > 8)
    errors.device_number =
      'El número de dispositivo debe tener entre 1 y 8 caracteres';

  return errors;
}
