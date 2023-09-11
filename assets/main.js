let nivel = 0;
let ultimoNivel = 150; //vai ate a tela 200
let telaIni = "url('https://64.media.tumblr.com/cfcfcfdf859182b5fe03b0c6072bd746/53bc382e63d71f2c-63/s540x810/f42b796e22f34b8451eb1484eff87a5f3f731ae0.gifv')";
mostrarMenu();
function mostrarMenu() {
	if (nivel === 50)
		telaIni = "url('https://64.media.tumblr.com/cfacf758ecde2c3e83a02d33edb42ffd/53bc382e63d71f2c-f2/s500x750/695413005a4aa453af551da60733f897b295c633.gifv')";
	else if (nivel === 100)
		telaIni = "url('https://64.media.tumblr.com/74085e0f3bcce2c9720f9ce1a7ed11b4/0de65dbc5de7cc87-23/s540x810/bf141447554e41a65431b382bb338b3ce6254645.gifv')";
	else if (nivel === 150)
		telaIni = "url('https://64.media.tumblr.com/c3533d3b9d23e1813afc97dec9ec086b/4d23a8c7581f904d-7b/s500x750/b2267fbe12b123f5c4a4bfc6880f49d61172d180.gifv')";
	document.body.style.backgroundImage = telaIni;
	document.getElementById("divTela").style.display = 'none';
	document.getElementById("divMenu").style.display = 'block';
	document.getElementById("divBtn").style.display = 'none';
}
document.getElementById("bot2").disabled = true;
document.getElementById("bot3").disabled = true;
document.getElementById("bot4").disabled = true;
document.getElementById("bot5").disabled = true;
function novaTela() {
	if (tela >= 51 && tela < 101)
		mudarTela51();
	else if (tela >= 101 && tela < 151)
		mudarTela101();
	else if (tela >= 151 && tela < 201)
		mudarTela151();
	else
		mudarTela();
}
function escolherTema(escolha) {
	tela = escolha + nivel;
	novaTela();
	chance = 8;
	stringTela = document.getElementById("divTela");
	stringTela.innerHTML = `Tela ${tela} - ${chance} chances`;
	mostrarTelaNumerosChances();
}
function mostrarTelaNumerosChances() {
	document.getElementById("divTela").style.display = 'block';
	document.getElementById("divMenu").style.display = 'none';
	document.getElementById("divBtn").style.display = 'block';
}
let cheat = 0;
let bonus = 4;
let novaCor = 0;
let terminou = 0;
let ativos = [];
let arrayBtn = document.getElementsByClassName("btn");
registrarAtivos();
function registrarAtivos() {
	for (let i = 0; i < arrayBtn.length; i++) {
		ativos[i] = i + 1;
	}
}
let segredo = Math.floor(Math.random() * arrayBtn.length) + 1;
for (let i = 0; i < arrayBtn.length; i++) {
	arrayBtn[i].addEventListener("click", function () {
		if (terminou) {
			if (chance <= 0) {
				mostrarMenu();
				arrayBtn[palpite - 1].classList.remove("gameover");
				arrayBtn[segredo - 1].disabled = false;
				arrayBtn[segredo - 1].classList.remove("segredo");
			}
			else if (tela % 10 == 0) {
				if (tela == 10 + nivel)
					document.getElementById("bot2").disabled = false;
				else if (tela == 20 + nivel)
					document.getElementById("bot3").disabled = false;
				else if (tela == 30 + nivel)
					document.getElementById("bot4").disabled = false;
				else if (tela == 40 + nivel)
					document.getElementById("bot5").disabled = false;
				mostrarMenu();
			}
			else {
				tela++;
				novaTela();
			}
			chance = chance + bonus;
			stringTela.innerHTML = `Tela ${tela} - ${chance} chances`;
			terminou = 0;
			arrayBtn[palpite - 1].classList.remove("segredo");
			segredo = Math.floor(Math.random() * arrayBtn.length) + 1;
			ativar();
			registrarAtivos();
		}
		else {
			palpite = parseInt(this.value);
			if (palpite === 3 && cheat === 0) {
				cheat = 1;
			} else if (palpite === 58 && cheat === 1) {
				cheat = 2;
			} else if (palpite === 5 && cheat === 2) {
				cheat = 3;
			} else if (palpite === 56 && cheat === 3) {
				if ((tela - 1) % 10 === 0 && tela < ultimoNivel + 40) {
					tela += 9;
					palpite = segredo;
				}
				cheat = 0;
			} else if (palpite === 57 && cheat === 3) {
				if ((tela - 1) % 50 === 0 && tela < ultimoNivel) {
					tela = 50 + nivel;
					palpite = segredo;
				}
				cheat = 0;
			} else {
				cheat = 0;
			}
			comparar(palpite);
			desativar();
		}
	});
}
function desativar() {
	for (let i = 0; i < arrayBtn.length; i++) {
		if (novaCor) {
			arrayBtn[i].disabled = true;
			if (chance <= 0) {
				arrayBtn[palpite - 1].classList.add("gameover");
			}
			arrayBtn[segredo - 1].disabled = false;
			arrayBtn[segredo - 1].classList.add("segredo");
			terminou = 1;
		}
		else if (!ativos.includes(parseInt(arrayBtn[i].value))) {
			arrayBtn[i].disabled = true;
			arrayBtn[i].classList.add("transparente");
		}
	}
	novaCor = 0;
}
function ativar() {
	for (let i = 0; i < arrayBtn.length; i++) {
		arrayBtn[i].disabled = false;
		arrayBtn[i].classList.remove("transparente");
	}
}
function comparar(palpite) {
	if (palpite == segredo) {
		arrayBtn[palpite - 1].classList.add("segredo");
		if (tela % 10 == 0) {
			if (tela === 50 + nivel && nivel != ultimoNivel) {
				nivel += 50;
				document.getElementById("bot2").disabled = true;
				document.getElementById("bot3").disabled = true;
				document.getElementById("bot4").disabled = true
				document.getElementById("bot5").disabled = true;
			}
			if (tela === 50 + nivel && nivel === ultimoNivel)
				stringTela.innerHTML = `ÚLTIMA TELA!\nClique ${palpite} para continuar`;
			else
				stringTela.innerHTML = `Telas ${tela + 1} a ${tela + 10} liberadas! \nClique ${palpite} para continuar`;
		}
		else
			stringTela.innerHTML = `Clique ${palpite} para Tela ${tela + 1}`;
		novaCor = 1;
	} else {
		if (palpite < segredo) {
			let index = ativos.indexOf(palpite);
			ativos.splice(0, index + 1);
		}
		if (palpite > segredo) {
			let index = ativos.indexOf(palpite);
			ativos.splice(index);
		}
		chance--;
		if (chance == 0) {
			stringTela.innerHTML = `Clique ${segredo} para tela menu`;
			novaCor = 1;
		}
		else if (chance == 1)
			stringTela.innerHTML = `Tela ${tela} - última chance`;
		else
			stringTela.innerHTML = `Tela ${tela} - ${chance} chances`;
	}
}


