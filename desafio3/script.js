function calcularNotasMaiorValor(valor) {
    const notas100 = Math.floor(valor / 100);
    const notas50 = Math.floor((valor % 100) / 50);
    return {
      notas100,
      notas50,
    };
  }
  
  function calcularNotasMenorValor(valor) {
    const notas20 = Math.floor(valor / 20);
    const notas10 = Math.floor((valor % 20) / 10);
    const notas5 = Math.floor((valor % 20 % 10) / 5);
    const notas2 = Math.floor((valor % 20 % 10 % 5) / 2);
    return {
      notas20,
      notas10,
      notas5,
      notas2,
    };
  }
  
  function calcularNotasMeioAMeio(valor) {
    const valorMaior = Math.floor(valor / 2);
    const valorMenor = valor - valorMaior;
    return {
      maiorValor: calcularNotasMaiorValor(valorMaior),
      menorValor: calcularNotasMenorValor(valorMenor),
    };
  }
  
  function solicitarEmprestimo() {
    const nome = document.getElementById("name").value;
    const dataAdmissao = new Date(document.getElementById("admissionDate").value);
    const salarioAtual = parseFloat(document.getElementById("salary").value);
    const valorEmprestimo = parseFloat(document.getElementById("loanAmount").value);

    const tempoCasa = (new Date() - dataAdmissao) / (1000 * 60 * 60 * 24 * 365);
    if (tempoCasa < 5) {
      alert("Agradecemos seu interesse, mas você não atende os requisitos mínimos do programa.");
      return;
    }
  
    if (valorEmprestimo % 2 !== 0) {
      alert("Insira um valor válido! O valor do empréstimo deve ser múltiplo de 2.");
      return;
    }

  if (valorEmprestimo > 2 * salarioAtual) {
    alert("O valor do empréstimo não pode ser maior que 2 vezes o seu salário atual.");
    return;
  }
  
    const notasMaiorValor = calcularNotasMaiorValor(valorEmprestimo);
    const notasMenorValor = calcularNotasMenorValor(valorEmprestimo);
    const notasMeioAMeio = calcularNotasMeioAMeio(valorEmprestimo);
  
    const resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";
  
    const notasMaiorValorDiv = document.getElementById("notasMaiorValor");
    const notasMenorValorDiv = document.getElementById("notasMenorValor");
    const notasMeioAMeioDiv = document.getElementById("notasMeioAMeio");
  
    notasMaiorValorDiv.innerHTML = `Notas de maior valor:
      ➢ ${notasMaiorValor.notas100} x 100 reais;
      ➢ ${notasMaiorValor.notas50} x 50 reais;`;
  
    notasMenorValorDiv.innerHTML = `Notas de menor valor:
      ➢ ${notasMenorValor.notas20} x 20 reais;
      ➢ ${notasMenorValor.notas10} x 10 reais;
      ➢ ${notasMenorValor.notas5} x 5 reais;
      ➢ ${notasMenorValor.notas2} x 2 reais;`;
  
    notasMeioAMeioDiv.innerHTML = `Notas meio a meio:
      ${valorEmprestimo / 2} reais em notas de maior valor:
      ➢ ${notasMeioAMeio.maiorValor.notas100} x 100 reais;
      ➢ ${notasMeioAMeio.maiorValor.notas50} x 50 reais;
      ${valorEmprestimo / 2} reais em notas de menor valor:
      ➢ ${notasMeioAMeio.menorValor.notas20} x 20 reais;
      ➢ ${notasMeioAMeio.menorValor.notas10} x 10 reais;
      ➢ ${notasMeioAMeio.menorValor.notas5} x 5 reais;
      ➢ ${notasMeioAMeio.menorValor.notas2} x 2 reais;`;
  }