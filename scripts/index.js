const buttonCrud = document.getElementById('crud')
const buttonGame = document.getElementById('buttonGame')

const buttonGameDiv = document.getElementById('btngame')
const buttonCrudDiv = document.getElementById('buttonCrud')

const coins = document.getElementById('coins')
const btnMoedas = document.getElementById('btnMoedas')
const emailPerfil = document.getElementById('emailPerfil')
const nomePerfil = document.getElementById('nomePerfil')
const moedasPerfil = document.getElementById('moedasPerfil')
const partidasGanhasPerfil = document.getElementById('partidasGanhasPerfil')
const lastLogin = document.getElementById('lastLogin')

const auth = firebase.auth();
const usersRef = firebase.firestore().collection("users");


const btnRecompensa = document.getElementById('btnBonus')
const modalRecompensa = document.getElementById('modal-recompensa')
const coletarRecompensa = document.getElementById('coletarRecompensa')

btnRecompensa.addEventListener('click' , ()=>{
  modalRecompensa.classList.remove('hide')
})

buttonCrud.addEventListener('click' , ()=>{
  window.location.href = "crud.html";
})

buttonGame.addEventListener('click' , ()=>{
  window.location.href = "niveis.html";
})

showLoading();

firebase.auth().onAuthStateChanged((user) => {
  const uid = user.uid;
  if (user) {
    const currentDate = new Date().toLocaleDateString(); // Obtém a data atual no formato de string
    usersRef.doc(uid).update({ lastAccess: currentDate }) // Atualiza o lastAccess com a data atual
      .then(() => {
        usersRef.doc(uid).get()
          .then((doc) => {
            if (doc.exists) {
              // o documento do usuário existe, recupere as informações
              const data = doc.data();
              const nome = data.name;
              const email = data.email;
              const moedas = data.money;
              const profile = data.profile;
              const partidasGanhas = data.partidasGanhas;
              const ultimoAcesso = data.lastAccess
              const ultimoBonusColetado = data.lastBonusDate

              if (profile == "admin") {
                buttonGameDiv.classList.add("hide");
                buttonCrudDiv.classList.remove("hide");
              } else {
                buttonGameDiv.classList.remove("hide");
                buttonCrudDiv.classList.add("hide");
                //coins.classList.toggle("hide")
              }

              moedasPerfil.innerHTML = moedas;
              partidasGanhasPerfil.innerHTML = partidasGanhas;
              lastLogin.innerHTML = "último login " +ultimoAcesso
              
              //console.log(nome, email, moedas, profile, partidasGanhas, doc.data());
              
              if (ultimoAcesso !== ultimoBonusColetado){
                btnRecompensa.disabled = false
                btnRecompensa.style.cursor = "pointer"
              }else{
                btnRecompensa.disabled = true
                btnRecompensa.style.cursor = "not-allowed"
                btnRecompensa.querySelector('img').style.filter = "opacity(0.4) drop-shadow(0 0 0 #777777)";
              }

              coletarRecompensa.addEventListener('click' , ()=>{
                updateLastBonusDate(uid);
                adicionarMoedasUsuario(100)
                showLoading();
              })

              hideLoading();
            } else {
              // o documento do usuário não existe
              console.log("Documento do usuário não encontrado.");
              hideLoading();
            }
          })
          .catch((error) => {
            console.log("Erro ao recuperar informações do usuário: ", error);
          });
      })
      .catch((error) => {
        console.log("Erro ao atualizar o último acesso do usuário: ", error);
      });
  }
});


function updateLastBonusDate(uid) {
  usersRef.doc(uid).get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const lastBonusDate = data.lastBonusDate;

        const currentDate = new Date().toLocaleDateString(); // Obtém a data atual no formato de string

        if (lastBonusDate === currentDate) {
          console.log("Bônus já resgatado hoje.");
        } else {
          usersRef.doc(uid).update({ lastBonusDate: currentDate })
            .then(() => {
              console.log("Data do último bônus atualizada com sucesso!");
              console.log("Você pode resgatar o bônus agora!");
            })
            .catch((error) => {
              console.log("Erro ao atualizar a data do último bônus: ", error);
            });
        }
      } else {
        console.log("Documento do usuário não encontrado.");
      }
    })
    .catch((error) => {
      console.log("Erro ao recuperar informações do usuário: ", error);
    });
}
  

  function logout(){
    firebase.auth().signOut().then(()=>{
        showLoading()
        window.location.href = "login.html";
    }).catch(() =>{
        alert("Erro ao fazer logout")
    })
  }



const buttonLoja = document.getElementById('buttonLoja');
const modal = document.getElementById('modal');
const fecharModal = document.getElementById('fecharModal');
const modalConfirmacao = document.getElementById('modalConfirmacao');
const buttonsComprar = document.getElementsByClassName('comprar');
const confirmarCompra = document.getElementsByClassName('confirmar')[0];
const cancelarCompra = document.getElementsByClassName('cancelar')[0];
const msg = document.getElementById('msg');
const valor = document.getElementById('valor')



const imgConfirm = document.getElementById('imgConfirm');

let quantidadeMoedas = 0

function reloadPage(){
  window.location.reload();
}

buttonLoja.addEventListener('click', function() {
    modal.classList.remove('hide');
});

function ocultarModal() {
  modal.classList.add('hide');
}

fecharModal.addEventListener('click', function() {
    ocultarModal()
});

function exibirModalConfirmacao(valorReal) {
    modalConfirmacao.classList.remove('hide');
    valor.innerHTML = "Deseja confirmar a compra no valor " + valorReal +" ?"
}

function ocultarModalConfirmacao() {
    modalConfirmacao.classList.add('hide');
    valor.innerHTML = "-"
}

// Event listeners para as opções de compra (opcao1, opcao2, opcao3)
document.getElementById('opcao1').addEventListener('click', function() {
    const valorReal = "R$ 5,00" 
    let quantidadeMoedas = 100
    const img = 1
    confirmarCompraMoedas(valorReal,quantidadeMoedas,img)
});

document.getElementById('opcao2').addEventListener('click', function() {
    // Lógica para processar a compra da opção 2
    const valorReal = "R$ 10,00"
    let quantidadeMoedas = 300
    const img = 2
    confirmarCompraMoedas(valorReal,quantidadeMoedas,img)
});

document.getElementById('opcao3').addEventListener('click', function() {
    // Lógica para processar a compra da opção 3
    const valorReal = "R$ 25,00"
    let quantidadeMoedas = 1000
    const imgT = 3
    confirmarCompraMoedas(valorReal,quantidadeMoedas,imgT)
});


function confirmarCompraMoedas(valorReal, quantidadeMoedas, img) {
  msg.innerHTML = quantidadeMoedas + " - moedas";
  imgConfirm.src = "images/icon_moedas"+img+".png";
  console.log(valorReal, quantidadeMoedas)
  exibirModalConfirmacao(valorReal);

  confirmarCompra.addEventListener('click', function() {
    showLoading()  
    adicionarMoedasUsuario(quantidadeMoedas);
  });

  cancelarCompra.addEventListener('click', function() {
      ocultarModalConfirmacao();
  });
}

function adicionarMoedasUsuario(valorMoedas) {
  const user = firebase.auth().currentUser;

  if (user) {
      const userId = user.uid;

      // Atualiza o campo 'money' do usuário no Firestore
      console.log(valorMoedas)
      usersRef.doc(userId).update({
          money: firebase.firestore.FieldValue.increment(valorMoedas)
      })
      .then(() => {

        setTimeout(() => {
          reloadPage();
          console.log('Moedas adicionadas com sucesso');
      }, 2000);

      })
      .catch((error) => {
          console.error('Erro ao adicionar moedas:', error);
      });
  } else {
      console.log('Nenhum usuário logado.');
  }
}