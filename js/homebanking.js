// TODO: poner el evento para cargar el script despues que cargue el DOM
//Declaración de variables
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


//Declaracion de funciones que piden en 3.2  Guía: parte 2 de 3
function sumarDinero(cantidadASumar) {
  datosDeUsuario[indiceDeUsuario].saldoCuenta = datosDeUsuario[indiceDeUsuario].saldoCuenta + cantidadASumar;
  actualizarSaldoEnPantalla();
}

function restarDinero(cantidadARestar) {
  datosDeUsuario[indiceDeUsuario].saldoCuenta = datosDeUsuario[indiceDeUsuario].saldoCuenta - cantidadARestar;
  actualizarSaldoEnPantalla();
}

// FIXME: No me funciona ni console.log ni tamopco el alert.
function validaPrompt(dato) {
  console.log('entro a validaPrompt');
  if(dato == null) {
    console.log('Usted cancelo la operacion!');
    return false;
  } if (dato == '') {
      alert('Usted no ingreso ningun monto. Se cancela solicitud');
      return false;
    } else {
        return true;
    }
}

function haySaldoDisponible(valor) {
// TODO: cambiar el if por return valor <= saldoCuenta esto es lo mismo que lo de abajo.
  if (valor <= datosDeUsuario[indiceDeUsuario].saldoCuenta) {
    return true;
  } else {
    return false;
  }
}

function verficarCuentaAmiga(cuenta) {
  // TODO: aca tengo que preguntar si tengo cuentas amigas y luego entrar aca!
  for( var i = 0; i < datosDeUsuario[indiceDeUsuario].cuentaAmiga.length; i++ ) {
    console.log('cuenta: ' + cuenta + '\ncuentaAmiga[' + i + ']: '+ datosDeUsuario[indiceDeUsuario].cuentaAmiga[i].numero);
    // conviene usar un while si o si. CAMBIARLO A WHILE
    // devuelvo el indice el indice o -1 sino me sirve
    if ( cuenta == datosDeUsuario[indiceDeUsuario].cuentaAmiga[i].numero) {
      return true;
    }
  }
  return false;
}
function buscarUsuario(usuario) {
  var i = 0;
  while( i <= (datosDeUsuario.length-1) && datosDeUsuario[i].nombreUsuario !== usuario  ) {
    i++;
  }
  if (i === datosDeUsuario.length) {
    console.log('El usuario no existe.');
    return -1;
  } else {
      console.log('la posicion del usuario en el vector es: '+i);
      return i;
  }
}

//Ejecución de las funciones que actualizan los valores de las variables en el HTML
iniciarSesion();
cargarNombreEnPantalla();
actualizarSaldoEnPantalla();
actualizarLimiteEnPantalla();

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
  var limiteAnterior = datosDeUsuario[indiceDeUsuario].limiteExtraccion;
  var monto = prompt('Ingrese el nuevo limite de extraccion que desea setear');
  if ((validaPrompt) && (monto > 0)) {
    datosDeUsuario[indiceDeUsuario].limiteExtraccion = monto;
    alert('Su anterior limite de extraccion era $' + limiteAnterior + '\n Su nuevo limite de extraccion es $' + datosDeUsuario[indiceDeUsuario].limiteExtraccion);
  } else {
    alert ('Usted ha ingresado un valor incorrecto: '+ monto + '\nPor favor gestione nuevamente su solicitud.');
  }
}

function extraerDinero() {
  var cantidadAExtraer;
  var saldoAnterior = datosDeUsuario[indiceDeUsuario].saldoCuenta;
  cantidadAExtraer = prompt('Ingrese la cantidad de dinero que desea extraer');
  cantidadAExtraer = parseInt(cantidadAExtraer);
  if (validaPrompt(cantidadAExtraer)) {
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
        alert('Operacion Cancelada');
    }
    }

function depositarDinero() {
  var cantidadADepositar;
  var saldoAnterior = datosDeUsuario[indiceDeUsuario].saldoCuenta;
  cantidadADepositar = prompt("Ingrese la cantidad de dinero que desea depositar");
  if (validaPrompt(cantidadAExtraer)) {
    cantidadADepositar = parseInt(cantidadADepositar);

    saldoAnterior = datosDeUsuario[indiceDeUsuario].saldoCuenta;
    sumarDinero(cantidadADepositar);
    alert('Has depositado: $' + cantidadADepositar + '\nSaldo anterior: $' + saldoAnterior + '\nSaldo actual: $' + datosDeUsuario[indiceDeUsuario].saldoCuenta);
  } else {
      alert('hahahahahahaha')
  }
}

function pagarServicio() {
  var aguaImporte=350;
  var luzImporte=210;
  var internetImporte=570;
  var telefonoImporte=425;
  var saldoAnterior;
  var opcion = prompt('Ingrese la opcion que desee:\n1.- Agua\n2.- Luz\n3.- Internet\n4.-Telefono')
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
        alert('Has pagado el servicio de Agua.\nSaldo anterior: $' + saldoAnterior +'\nDinero descontado: $'+ luzImporte + '\nSaldo actual: $' + datosDeUsuario[indiceDeUsuario].saldoCuenta);
      } else {
        alert('No tiene saldo suficiente para realizar el pago');
      }
      break;
    case '3':
      if (haySaldoDisponible(internetImporte)) {
        saldoAnterior = datosDeUsuario[indiceDeUsuario].saldoCuenta;
        restarDinero(luzImporte);
        alert('Has pagado el servicio de Agua.\nSaldo anterior: $' + saldoAnterior +'\nDinero descontado: $'+ internetImporte + '\nSaldo actual: $' + datosDeUsuario[indiceDeUsuario].saldoCuenta);
      } else {
        alert('No tiene saldo suficiente para realizar el pago');
      }
      break;
    case '4':
      if (haySaldoDisponible(telefonoImporte)) {
        saldoAnterior = datosDeUsuario[indiceDeUsuario].saldoCuenta;
        restarDinero(luzImporte);
        alert('Has pagado el servicio de Agua.\nSaldo anterior: $' + saldoAnterior +'\nDinero descontado: $'+ telefonoImporte + '\nSaldo actual: $' + datosDeUsuario[indiceDeUsuario].saldoCuenta);
      } else {
        alert('No tiene saldo suficiente para realizar el pago');
      }
      break;

    default:
      alert('No eligio una opcion valida');

  }

}

function transferirDinero() {
  var cantidadATransferir = prompt('Ingrese la cantidad de dinero que desea depositar');
  var saldoAnterior = datosDeUsuario[indiceDeUsuario].saldoCuenta;

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
  }



function iniciarSesion() {
  var usuario;
  var clave;
  var i;
  var currentUser = localStorage.getItem("indiceDeUsuario");
  if (currentUser) {
    indiceDeUsuario = parseInt(currentUser);
  } else {
    usuario = prompt('USUARIO:');
    if (validaPrompt(usuario)) {
      i = buscarUsuario(usuario);
      if (i > 0) {
        clave = prompt('CLAVE:');
        if (validaPrompt(clave)) {
          if (datosDeUsuario[i].claveUsuario == clave) {
            indiceDeUsuario = i;
            localStorage.setItem("indiceDeUsuario", i);
            alert('Bienvenido ' + usuario);
          } else {
              //else de la clave
              //retenerSaldo(i);
              alert('Clave incorrecta.\nSe retendra su saldo por seguridad\nComuniquese con el banco para continuar.');
          }
        } else {
          //else de validapromp
          alert('Intente loguearse nuevamente.');
        }
      } else {
        //else de no existe usuario
      }
    }
  }

}



//   if (i < 0) {
//     alert('Usuario o clave incorrecta');
//   } else if (datosDeUsuario[i].claveUsuario == clave) {
//       // Esta bien que le tire el indice del usuario del array a una global, no queda feo?
//       // Estaria bueno que se lo valla pasando por parametro de funcion a funcion?
//       indiceDeUsuario = i;
//       alert('Bienvenido ' + usuario);
//   } else {
//       retenerSaldo(i);
//       alert('Usuario o clave incorrecta.\nComuniquese con el banco para continuar.');
//   }
// }

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
