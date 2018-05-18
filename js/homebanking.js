// TODO: poner el evento para cargar el script despues que cargue el DOM
//Declaración de variables
var msgOperacionCancelada = 'Operacion cancelada por el usuario';
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
      saldoCuenta:0,
      saldoCuentaRetenido:0,
      limiteExtraccion:0,
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
      nombreUsuario: 'diego',
      claveUsuario: 0000,
      saldoCuenta:0,
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
  if(dato == null) {
    console.log('warning: validaPrompt --> cancela operacion');
    return false;
  } if (dato == '') {
      console.log('warning: validaPrompt --> acepta operacion con campo vacio');
      return false;
    } else {
        return true;
    }
}

function haySaldoDisponible(valor) {
  return valor <= datosDeUsuario[indiceDeUsuario].saldoCuenta;
}

function verficarCuentaAmiga(cuenta) {
  var i = 0;
  if (datosDeUsuario[indiceDeUsuario].cuentaAmiga) {
    while(i <= datosDeUsuario[indiceDeUsuario].cuentaAmiga.length-1 && datosDeUsuario[indiceDeUsuario].cuentaAmiga[i].numero !== cuenta) {
      i++;
    }
    if(i == datosDeUsuario[indiceDeUsuario].cuentaAmiga.length-1) {
      return -1;
      console.log('warning: verificarCuentaAmiga --> la cuenta no existe ');
    } else {
      return i;
    }

  } else {
    return -1;
    console.log('warning: verificarCuentaAmiga --> no hay cuentas asociadas');
  }
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

//Ejecución de las funciones que actualizan los valores de las variables en el HTML
iniciarSesion();
cargarNombreEnPantalla();
actualizarSaldoEnPantalla();
actualizarLimiteEnPantalla();

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
  var limiteAnterior = datosDeUsuario[indiceDeUsuario].limiteExtraccion;
  var monto = prompt('Ingrese el nuevo limite de extraccion que desea setear');
  if (validaPrompt(monto)) {
    if (monto>-1) {
      datosDeUsuario[indiceDeUsuario].limiteExtraccion = monto;
      alert('Su anterior limite de extraccion era $' + limiteAnterior + '\n Su nuevo limite de extraccion es $' + datosDeUsuario[indiceDeUsuario].limiteExtraccion);
    } else {
      alert('Debe ingresar un limite mayor o igual a 0');
    }
  } else {
    alert (msgOperacionCancelada);
  }
}

// TODO: estaria bueno que el limite de extraccion tenga un incremental durante el dia y que se valla sumando hasta el otro dia donde deberia volver a 0.
function extraerDinero() {
  var cantidadAExtraer;
  var saldoAnterior = datosDeUsuario[indiceDeUsuario].saldoCuenta;
  cantidadAExtraer = prompt('Ingrese la cantidad de dinero que desea extraer');
  if (validaPrompt(cantidadAExtraer)) {
    // TODO: Preguntar si estan bien puestos estos parseInt, si son al pedo o que!
    cantidadAExtraer = parseInt(cantidadAExtraer);
    if (haySaldoDisponible(cantidadAExtraer) === false) {
      alert('No hay sufuciente saldo en la cuenta');
    } else if(cantidadAExtraer > datosDeUsuario[indiceDeUsuario].limiteExtraccion) {
        alert('No puede extraer mas de: $' + datosDeUsuario[indiceDeUsuario].limiteExtraccion);
    } else if((cantidadAExtraer % 100) != 0) {
          alert('El cajero solo puede entregar billetes de 100, por favor elija un importe multiplo de 100');
        } else {
          restarDinero(cantidadAExtraer);
          alert('Has extraido: $' + cantidadAExtraer+';\nSaldo anterior: $' + saldoAnterior + ';\nSaldo actual: $' + datosDeUsuario[indiceDeUsuario].saldoCuenta + '.');
        }
  } else {
        alert(msgOperacionCancelada);
  }
}

function depositarDinero() {
  var cantidadADepositar;
  var saldoAnterior = datosDeUsuario[indiceDeUsuario].saldoCuenta;
  cantidadADepositar = prompt("Ingrese la cantidad de dinero que desea depositar");
  if (validaPrompt(cantidadADepositar)) {
    cantidadADepositar = parseInt(cantidadADepositar);
    saldoAnterior = datosDeUsuario[indiceDeUsuario].saldoCuenta;
    sumarDinero(cantidadADepositar);
    alert('Has depositado: $' + cantidadADepositar + '\nSaldo anterior: $' + saldoAnterior + '\nSaldo actual: $' + datosDeUsuario[indiceDeUsuario].saldoCuenta);
  } else {
      alert(msgOperacionCancelada);
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
  } else {
    alert(msgOperacionCancelada);
  }
}

function transferirDinero() {
  var cantidadATransferir = prompt('Ingrese la cantidad de dinero que desea transferir');
  var saldoAnterior = datosDeUsuario[indiceDeUsuario].saldoCuenta;
  if (validaPrompt(cantidadATransferir)) {
    if (haySaldoDisponible(cantidadATransferir) === false) {
      alert('No hay saldo suficiente para realizar la transferencia');
    } else {
        cuenta= prompt('Ingrese el numero de cuenta al que desea transferir el dinero');
        //cuenta = parseInt(cuentaAmiga);
        if (verficarCuentaAmiga(cuenta) === false){
          alert('El numero de cuenta ingresado no existe en su lista de cuentas amigas');
        } else {
          restarDinero(cantidadATransferir);
          alert('Has transferido a la cuenta amiga:' + cuentaAmiga + '\nSaldo anterior: $' + saldoAnterior +'\nDinero descontado: $'+ cantidadATransferir + '\nSaldo actual: $' + datosDeUsuario[indiceDeUsuario].saldoCuenta);
        }
    }
  } else {
      alert(msgOperacionCancelada);
  }
}

function iniciarSesion() {
  var usuario;
  var clave;
  var contadorDeIntentos = 3;
  var i = -1;
  var currentUser = localStorage.getItem("indiceDeUsuario");
  if (currentUser) {
    indiceDeUsuario = parseInt(currentUser);
  } else {
    usuario = prompt('Ingrese su nombre de USUARIO:');
    if (validaPrompt(usuario)) {
      i = buscarUsuario(usuario);
      if (i >= 0) {
        do {
          clave = prompt('Ingrese su CLAVE:\nUsted tendra ' + contadorDeIntentos + ' intentos para ingresar la clave de forma correcta, de lo contario su saldo sera retenido.');
          contadorDeIntentos--;
        } while (!validaPrompt(clave) || datosDeUsuario[i].claveUsuario != clave && contadorDeIntentos > 0);
        if (contadorDeIntentos > 0) {
          indiceDeUsuario = i;
          localStorage.setItem("indiceDeUsuario", i);
          alert('Bienvenido ' + usuario);
        } else if (!validaPrompt(clave)) {
          alert(msgOperacionCancelada);
        }
      } else {
        // TODO: falta hacer la funcion retener saldo.
        //retenerSaldo(i);
        alert('Clave incorrecta.\nSe retendra su saldo por seguridad\nComuniquese con el banco para continuar.');
      }
    } else {
        alert('Intente loguearse nuevamente.');
    }
  }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + datosDeUsuario[indiceDeUsuario].nombreUsuario;
}

function actualizarSaldoEnPantalla() {
console.log('entra a la funcion sactualizar saldo en pantall con un id:' + indiceDeUsuario);
document.getElementById("saldo-cuenta").innerHTML = "$" + datosDeUsuario[indiceDeUsuario].saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + datosDeUsuario[indiceDeUsuario].limiteExtraccion;
}
//tratando de arreglar el head desacoplado
