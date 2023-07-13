export const valida = (input) => {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  }
};

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "Este campo no puede estar vacio",
  },
  email: {
    valueMissing: "Este campo no puede estar vacio",
    typeMismatch: "El correo no es valido",
  },
  password: {
    valueMissing: "Este campo es obligatorio",
    patternMismatch:
      "Entre 6 a 18 caracteres con 1 mayuscula, un número y un simbolo minimo",
  },
  nacimiento: {
    valueMissing: "Este campo no puede estar vacio",
    customError: "Debes tener 18 años",
  },
  numero: {
    valueMissing: "Este campo no puede estar vacio",
    patternMismatch: "Debe ser un número de telefono de 10 digitos",
  },
  direccion: {
    valueMissing: "Este campo es obligatorio",
    patternMismatch: "Debe tener entre 10 a 40 caracteres",
  },
  ciudad_estado: {
    valueMissing: "Este campo es obligatorio",
    patternMismatch: "Debe tener entre 2 a 40 caracteres",
  },
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

const mostrarMensajeDeError = (tipoDeInput, input) => {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });

  return mensaje;
};

const validarNacimiento = (input) => {
  const fechaCliente = new Date(input.value);
  let mensaje = "";

  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes ser mayor de edad";
  }

  input.setCustomValidity(mensaje);
};

const mayorDeEdad = (fecha) => {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return fechaActual > diferenciaFechas;
};
