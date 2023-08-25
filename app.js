function codificar() {
    const entradaDatos = document.getElementById("entradaDatos").value;
    const codigoLinea = document.getElementById("codigoLinea").value;
    
    let resultadoCodificacion = '';
    
    switch (codigoLinea) {
      case 'Unipolar':
        resultadoCodificacion = codificacionUnipolar(entradaDatos);
        break;
      case 'NRZ':
        resultadoCodificacion = codificacionNRZ(entradaDatos);
        break;
      case 'RZ':
        resultadoCodificacion = codificacionRZ(entradaDatos);
        break;
      case 'Manchester':
        resultadoCodificacion = codificacionManchester(entradaDatos);
        break;
      case 'Manchester diferencial':
        resultadoCodificacion = codificacionManchesterDiferencial(entradaDatos);
        break;
      case 'AMI':
        resultadoCodificacion = codificacionAMI(entradaDatos);
        break;
      case 'B8ZS':
        resultadoCodificacion = codificacionB8ZS(entradaDatos);
        break;
      case 'HDB3':
        resultadoCodificacion = codificacionHDB3(entradaDatos);
        break;
      default:
        resultadoCodificacion = 'Código de línea inválido';
        break;
    }
    
    document.getElementById("resultadoCodificacion").innerText = "El resultado en codificacion "+ codigoLinea+ " es: \n" + resultadoCodificacion;
}

  function codificacionUnipolar(datos) {
    let resultado = '';
    for (let i = 0; i < datos.length; i++) {
      resultado += datos[i] === '0' ? '0' : '1';
    }
    return resultado;
}
  
function codificacionNRZ(datos) {
    let resultado = '';
    for (let i = 0; i < datos.length; i++) {
      resultado += datos[i] === '0' ? '-1' : '1';
    }
    return resultado;
}

function codificacionRZ(datos) {
    let resultado = '';
    for (let i = 0; i < datos.length; i++) {
      resultado += datos[i] === '0' ? '-10' : '10';
    }
    return resultado;
}

function codificacionManchester(datos) {
    let resultado = '';
    for (let i = 0; i < datos.length; i++) {
      resultado += datos[i] === '0' ? '-1 1' : '1 -1';
    }
    return resultado;
}
  
function codificacionManchesterDiferencial(datos) {
    let resultado = '';
    let anterior = '1';
    for (let i = 0; i < datos.length; i++) {
      if (datos[i] === '0') {
        resultado += anterior === '1' ? '-1 1' : '1 -1';
      } else {
        resultado += anterior === '1' ? '1 -1' : '-1 1';
        anterior = anterior === '1' ? '-1' : '1';
      }
    }
    return resultado;
}
  
function codificacionAMI(datos) {
    let resultado = '';
    let nivelVoltaje = 1;
    for (let i = 0; i < datos.length; i++) {
      if (datos[i] === '0') {
        resultado += '0';
      } else {
        resultado += nivelVoltaje === 1 ? '1' : '-1';
        nivelVoltaje = nivelVoltaje === 1 ? -1 : 1;
      }
    }
    return resultado;
}

function codificacionB8ZS(datos) {
    let resultado = '';
    let contadorCeros = 0;
    for (let i = 0; i < datos.length; i++) {
      if (datos[i] === '0') {
        contadorCeros++;
      } else {
        contadorCeros = 0;
      }
      if (contadorCeros === 8) {
        resultado += '+000-000+';
        contadorCeros = 0;
      } else {
        resultado += datos[i] === '0' ? '0' : '1';
      }
    }
    return resultado;
}

function codificacionHDB3(datos) {
    let resultado = '';
    let contadorCeros = 0;
    let contadorViolaciones = 0;
    for (let i = 0; i < datos.length; i++) {
      if (datos[i] === '0') {
        contadorCeros++;
      } else {
        contadorCeros = 0;
      }
      if (contadorCeros === 4) {
        if (contadorViolaciones % 2 === 0) {
          resultado += '+000-';
        } else {
          resultado += '-000+';
        }
        contadorViolaciones++;
        contadorCeros = 0;
      } else {
        resultado += datos[i] === '0' ? '0' : '1';
      }
    }
    return resultado;
}
  