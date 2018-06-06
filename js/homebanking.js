// TODO: poner el evento para cargar el script despues que cargue el DOM
//Declaración de variables
var msgOperacionCancelada = 'Operacion cancelada!';
var indiceDeUsuario = -1;
var datosDeUsuario = [
    {
      nombreUsuario: '',
      claveUsuario: 0000,
      saldoCuenta:0,
      saldoCuentaRetenido:0,
      limiteExtraccion:0,
      cuentaAmiga: [
          {
              nombre: '',
              numero: 0
          },
          {
              nombre: '',
              numero: '0'
          },
      ],
    },
    {
      nombreUsuario: 'elcharly',
      claveUsuario: 0000,
      saldoCuenta:333333,
      saldoCuentaRetenido:0,
      limiteExtraccion:500,
      cuentaAmiga: [
          {
              nombre: 'Cuenta amiga 1',
              numero: 12345678
          },
          {
              nombre: 'Cuenta amiga 2',
              numero: '00000000'
          },
          {
              nombre: 'Cuenta amiga 3',
              numero: 11111111
          },
          {
              nombre: 'Cuenta amiga 3',
              numero: 22222222
          },
      ],
    },
    {
      nombreUsuario: 'casu',
      claveUsuario: 0000,
      saldoCuenta:2000,
      saldoCuentaRetenido:0,
      limiteExtraccion:0,
      cuentaAmiga: [
          {
              nombre: 'Cuenta amiga 1',
              numero: '12345678'
          },
          {
              nombre: 'Cuenta amiga 2',
              numero: '00000000'
          },
          {
              nombre: 'Cuenta amiga 3',
              numero: 11111111
          },
          {
              nombre: 'Cuenta amiga 3',
              numero: '22222222'
          },
      ],
    },
    {
      nombreUsuario: 'diego',
      claveUsuario: 0000,
      saldoCuenta:25900,
      saldoCuentaRetenido:0,
      limiteExtraccion:500,
      cuentaAmiga: [
          {
              nombre: 'Cuenta amiga 1',
              numero: '12345678'
          },
          {
              nombre: 'Cuenta amiga 2',
              numero: '00000000'
          },
          {
              nombre: 'Cuenta amiga 3',
              numero: 11111111
          },
          {
              nombre: 'Cuenta amiga 3',
              numero: 22222222
          },
      ],
    },
];


//Declaracion de funciones
function sumarDinero(cantidadASumar) {
  datosDeUsuario[indiceDeUsuario].saldoCuenta = datosDeUsuario[indiceDeUsuario].saldoCuenta + cantidadASumar;
  actualizarSaldoEnPantalla();
}


function restarDinero(cantidadARestar) {
  datosDeUsuario[indiceDeUsuario].saldoCuenta = datosDeUsuario[indiceDeUsuario].saldoCuenta - cantidadARestar;
  actualizarSaldoEnPantalla();
}


function validaPrompt(dato) {
// TODO: usar trim para sacar espacios dato.trim()
  if(dato == null) {
    console.log('warning: validaPrompt --> cancela operacion');
    alert('Operacion cancelada');
    return false;
  } if (dato == '') {
      console.log('warning: validaPrompt --> acepta operacion con campo vacio');
      alert('Operacion cancelada');
      return false;
  } else {
        return true;
  }
}


function validaNumeroPositivo(dato) {
  if(!isNaN(dato) && dato > 0) {
    console.log('info: validaNumeroPositivo --> ingresa validado, numero positivo');
    return true;
  } else {
      console.log('warning: validaNumeroPositivo --> ingresa numero negativo o 0, se cancela operacion');
      alert('Debe ingresar un numero positivo para poder efectuar la operacion que desea.');
      return false;
  }
}


function haySaldoDisponible(valor) {
  return valor <= datosDeUsuario[indiceDeUsuario].saldoCuenta;
}

function buscarCuentaAmiga(cuenta) {
  var cuentasAmiga = datosDeUsuario[indiceDeUsuario].cuentaAmiga;
  for (var i = 0; i < cuentasAmiga.length; i++) {
    if (cuentasAmiga[i].numero === cuenta) {
      return i;
    }
  }
  return -1;
  console.log('warning: buscarCuentaAmiga -> la cuenta amiga no existe');
}


function buscarUsuario(usuario) {
  for (var i = 0; i < datosDeUsuario.length; i++) {
    if (datosDeUsuario[i].nombreUsuario === usuario) {
      return i;
    }
  }
  return -1;
  console.log('warning: buscarUsuario -> el usuario no existe');
}


// viejaFuncionBuscarUsuario(usuario) es tan fea que no quise borrarla
// function viejaFuncionBuscarUsuario(usuario) {
//   var i = 0;
//   while ((i <= (datosDeUsuario.length-1)) && (datosDeUsuario[i].nombreUsuario !== usuario)) {
//     i++;
//   }
//   if (i == datosDeUsuario.length-1) {
//     return -1;
//     console.log('warning: buscarUsuario -> el usuario no existe');
//   } else {
//       return i;
//   }
// }


function retenerSaldo(idUsuario, retengo){
// Esta funcion se utiliza tanto para tetener como para devolver el dinero deacuerdo si la
// variable booleana retengo sea positiva o negativa.
  if (retengo) {
    datosDeUsuario[idUsuario].saldoCuentaRetenido = datosDeUsuario[idUsuario].saldoCuenta;
    datosDeUsuario[idUsuario].saldoCuenta = 0;
    console.log('info: retenerSaldo --> saldo retenido');
  } else {
    datosDeUsuario[idUsuario].saldoCuenta = datosDeUsuario[idUsuario].saldoCuentaRetenido
    datosDeUsuario[idUsuario].saldoCuentaRetenido = 0;
    console.log('info: retenerSaldo --> saldo habilitado');
  }
}

function ocultarElementos(elementos) {
  for (var i = 0; i < elementos.length; i++) {
    //var elementoDom = document.querySelector(elementos[i]);
    var elementoDom = document.getElementById(elementos[i]);
    elementoDom.classList.toggle('oculto');
  }
}


//Ejecución de las funciones que actualizan los valores de las variables en el HTML
ocultarElementos(['publicidad', 'menuYDemas', 'bienvenido', 'login']);
if (localStorage.getItem("indiceDeUsuario")) {
  cargarNombreEnPantalla();
  actualizarSaldoEnPantalla();
  actualizarLimiteEnPantalla();
} else {
  // TODO:
  //hide hb,
  //mostrar contenedor publicidad,
  //mostrar boton login
  //iniciarSesion();
}

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
  var limiteAnterior = datosDeUsuario[indiceDeUsuario].limiteExtraccion;
  var monto = prompt('Ingrese el nuevo limite de extraccion que desea setear');
  if (validaPrompt(monto) && validaNumeroPositivo(monto)) {
      datosDeUsuario[indiceDeUsuario].limiteExtraccion = monto;
      alert('Su anterior limite de extraccion era $' + limiteAnterior + '\n Su nuevo limite de extraccion es $' + datosDeUsuario[indiceDeUsuario].limiteExtraccion);
      actualizarLimiteEnPantalla();
  }
}


// TODO: estaria bueno que el limite de extraccion tenga un incremental durante el dia y que se valla sumando hasta el otro dia donde deberia volver a 0.
function extraerDinero() {
  var cantidadAExtraer;
  var saldoAnterior = datosDeUsuario[indiceDeUsuario].saldoCuenta;
  cantidadAExtraer = prompt('Ingrese la cantidad de dinero que desea extraer');
  if (validaPrompt(cantidadAExtraer) && validaNumeroPositivo(cantidadAExtraer)) {
    // TODO: Preguntar si estan bien puestos estos parseInt, si son al pedo o que!
    cantidadAExtraer = parseInt(cantidadAExtraer);
    if (!haySaldoDisponible(cantidadAExtraer)) {
      alert('No hay sufuciente saldo en la cuenta');
    } else if(cantidadAExtraer > datosDeUsuario[indiceDeUsuario].limiteExtraccion) {
        alert('No puede extraer mas de: $' + datosDeUsuario[indiceDeUsuario].limiteExtraccion);
    } else if((cantidadAExtraer % 100) != 0) {
          alert('El cajero solo puede entregar billetes de 100, por favor elija un importe multiplo de 100');
        } else {
          restarDinero(cantidadAExtraer);
          alert('Has extraido: $' + cantidadAExtraer+';\nSaldo anterior: $' + saldoAnterior + ';\nSaldo actual: $' + datosDeUsuario[indiceDeUsuario].saldoCuenta + '.');
          actualizarSaldoEnPantalla();
        }
  }
}


function depositarDinero() {
  var cantidadADepositar;
  var saldoAnterior = datosDeUsuario[indiceDeUsuario].saldoCuenta;
  cantidadADepositar = prompt("Ingrese la cantidad de dinero que desea depositar");
  if (validaPrompt(cantidadADepositar) && validaNumeroPositivo(cantidadADepositar)) {
    if (validaNumeroPositivo(cantidadADepositar)) {
      cantidadADepositar = parseInt(cantidadADepositar);
      saldoAnterior = datosDeUsuario[indiceDeUsuario].saldoCuenta;
      sumarDinero(cantidadADepositar);
      alert('Has depositado: $' + cantidadADepositar + '\nSaldo anterior: $' + saldoAnterior + '\nSaldo actual: $' + datosDeUsuario[indiceDeUsuario].saldoCuenta);
    }
  }
}


function pagarServicio() {
  var aguaImporte = 350;
  var luzImporte = 210;
  var internetImporte = 570;
  var telefonoImporte = 425;
  var saldoAnterior;
  // TODO: aca en vez de poner este prompt feo deberia poner algun combo box.
  var opcion = prompt('Ingrese la opcion que desee:\n1.- Agua\n2.- Luz\n3.- Internet\n4.-Telefono');
  if (validaPrompt(opcion)) {
    switch (opcion) {
      case '1':
        if(haySaldoDisponible(aguaImporte)) {
          saldoAnterior = datosDeUsuario[indiceDeUsuario].saldoCuenta;
          restarDinero(aguaImporte);
          alert('Has pagado el servicio de Agua.\nSaldo anterior: $' + saldoAnterior +'\nDinero descontado: $'+ aguaImporte + '\nSaldo actual: $' + datosDeUsuario[indiceDeUsuario].saldoCuenta);
        } else {
          alert('No tiene saldo suficiente para realizar el pago');
        }
        break;
      case '2':
        if (haySaldoDisponible(luzImporte)) {
          saldoAnterior = datosDeUsuario[indiceDeUsuario].saldoCuenta;
          restarDinero(luzImporte);
          alert('Has pagado el servicio de Luz.\nSaldo anterior: $' + saldoAnterior +'\nDinero descontado: $'+ luzImporte + '\nSaldo actual: $' + datosDeUsuario[indiceDeUsuario].saldoCuenta);
        } else {
          alert('No tiene saldo suficiente para realizar el pago');
        }
        break;
      case '3':
        if (haySaldoDisponible(internetImporte)) {
          saldoAnterior = datosDeUsuario[indiceDeUsuario].saldoCuenta;
          restarDinero(luzImporte);
          alert('Has pagado el servicio de Internet.\nSaldo anterior: $' + saldoAnterior +'\nDinero descontado: $'+ internetImporte + '\nSaldo actual: $' + datosDeUsuario[indiceDeUsuario].saldoCuenta);
        } else {
          alert('No tiene saldo suficiente para realizar el pago');
        }
        break;
      case '4':
        if (haySaldoDisponible(telefonoImporte)) {
          saldoAnterior = datosDeUsuario[indiceDeUsuario].saldoCuenta;
          restarDinero(luzImporte);
          alert('Has pagado el servicio de Telefono.\nSaldo anterior: $' + saldoAnterior +'\nDinero descontado: $'+ telefonoImporte + '\nSaldo actual: $' + datosDeUsuario[indiceDeUsuario].saldoCuenta);
        } else {
          alert('No tiene saldo suficiente para realizar el pago');
        }
        break;

      default:
        alert('No eligio una opcion valida');
    }
  }
}


function transferirDinero() {
  var cantidadATransferir = prompt('Ingrese la cantidad de dinero que desea transferir');
  var saldoAnterior = datosDeUsuario[indiceDeUsuario].saldoCuenta;
  if (validaPrompt(cantidadATransferir) && validaNumeroPositivo(cantidadATransferir)) {
    if (!haySaldoDisponible(cantidadATransferir)) {
      alert('No hay saldo suficiente para realizar la transferencia');
    } else {
        cuentaDestino = prompt('Ingrese el numero de cuenta al que desea transferir el dinero');
        //cuentaDestino = parseInt(cuentaDestino);
        if (buscarCuentaAmiga(cuentaDestino) == -1){
          alert('El numero de cuenta ingresado no existe en su lista de cuentas amigas');
        } else {
          restarDinero(cantidadATransferir);
          //datosDeUsuario[indiceDeUsuario].cuentaAmiga[i]
          alert('Has transferido a la cuenta amiga:' + cuentaDestino + '\nSaldo anterior: $' + saldoAnterior +'\nDinero descontado: $'+ cantidadATransferir + '\nSaldo actual: $' + datosDeUsuario[indiceDeUsuario].saldoCuenta);
        }
    }
  }
}


function cerrarSesion() {
  localStorage.removeItem("indiceDeUsuario");
  indiceDeUsuario = -1;
  alert('Gracias por utilizar nuestros servicios, Se cerro su sesion, 0800-BANCO-GAITAN');
  ocultarElementos(['publicidad', 'menuYDemas', 'bienvenido', 'login']);
}


function iniciarSesion() {
  var usuario;
  var clave;
  var contadorDeIntentos = 3;
  var indiceDeUsuarioAuxiliar = -1;
  var currentUser = localStorage.getItem("indiceDeUsuario");
  if (currentUser) {
    // FIXME: Esta bien este parseint?
    indiceDeUsuario = parseInt(currentUser);
  } else {
    usuario = prompt('Ingrese su nombre de USUARIO:');
    if (validaPrompt(usuario)) {
      indiceDeUsuarioAuxiliar = buscarUsuario(usuario);
      if (indiceDeUsuarioAuxiliar >= 0) {
        do {
          clave = prompt('Ingrese su CLAVE:\nUsted tendra ' + contadorDeIntentos + ' intentos para ingresar la clave de forma correcta, de lo contario su saldo sera retenido.');
          contadorDeIntentos--;
        } while (!validaPrompt(clave) || datosDeUsuario[indiceDeUsuarioAuxiliar].claveUsuario != clave && contadorDeIntentos > 0);
        if (contadorDeIntentos > 0) {
          indiceDeUsuario = indiceDeUsuarioAuxiliar;
          localStorage.setItem("indiceDeUsuario", indiceDeUsuarioAuxiliar);
          console.log('info: iniciarSesion --> Se loguea usuario con id:' + indiceDeUsuario);
          ocultarElementos(['publicidad', 'menuYDemas', 'bienvenido', 'login']);
          alert('Bienvenido ' + usuario);
          cargarNombreEnPantalla();
          actualizarSaldoEnPantalla();
          actualizarLimiteEnPantalla();
          // TODO: hay que hacer un flag de logueo
        } else {
          // TODO: falta hacer la funcion retener saldo y y borrar el localstorage
          retenerSaldo(indiceDeUsuarioAuxiliar, true);
          localStorage.removeItem("indiceDeUsuario");
          alert(msgOperacionCancelada + 'y ademas le retenemos el saldo');
        }
      } else {
        alert('El usuario que ha ingresado no existe.\nIntente loguearse nuevamente o comuniquese con el 0800-BANCO-GAITAN');
      }
    } else {
        alert('Intente loguearse nuevamente.\nPreste atencion al ingresar el usuario y si continua con inconvenientes, comuniquese con el 0800-BANCO-GAITAN');
    }
  }
}


//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
  document.getElementById("nombre").innerHTML = "Bienvenido/a " + datosDeUsuario[indiceDeUsuario].nombreUsuario;
}


function actualizarSaldoEnPantalla() {
  console.log('info: actualizarSaldoEnPantalla --> Se loguea usuario con id:' + indiceDeUsuario);
  document.getElementById("saldo-cuenta").innerHTML = "$" + datosDeUsuario[indiceDeUsuario].saldoCuenta;
}


function actualizarLimiteEnPantalla() {
  document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + datosDeUsuario[indiceDeUsuario].limiteExtraccion;
}
