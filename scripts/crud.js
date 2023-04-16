//verifica o user admin
firebase.auth().onAuthStateChanged(user => {
    if(!user.email == "teste@gmail.com"){
        window.location.href = "index.html";
    }
})


function reloadPage(){
  window.location.reload();
}

// Referência à coleção "theme"
const themeRef = firebase.firestore().collection("theme");

// Referência à subcoleção "words"
const wordsRef = themeRef.doc().collection("words");

// Referência à subcoleção "tips"
const tipsRef = wordsRef.doc().collection("tips");

//DOM das listas
const themeList = document.getElementById("listTheme");
const wordList = document.getElementById("listWords");
const tipslist = document.getElementById("listTips");


let selectedItemTheme = "";
let selectedNameTheme = "";

let selectedItemWord = "";
let selectedNameWord = "";

let selectedItemTip = "";
let selectedNameTip = "";


// Função para exibir um atributo em uma lista
function addAttrToList(attr, listId, id) {
    const ul = document.getElementById(listId);
    const li = document.createElement("li");
    li.textContent = attr;
    li.setAttribute("id", id); // adiciona o id como um atributo data
    li.setAttribute("class", "item");
    ul.appendChild(li);
  }

//exibe na lista o theme e words cadastrados no banco
  themeRef.get().then((querySnapshot) => {
    const themeSelect = document.getElementById("themeSelect");
    querySnapshot.forEach((doc) => {

      
      const nameTheme = doc.data().nametheme;
      const themeId = doc.id; // obter o id do documento
      const optionTheme = document.createElement("option")
      optionTheme.value = themeId;
      optionTheme.textContent = nameTheme;
      themeSelect.appendChild(optionTheme);

      addAttrToList(nameTheme, "listTheme", themeId); // passar o id como argumento
  
      const wordRef = themeRef.doc(doc.id).collection("words");
      wordRef.get().then((querySnapshot) => {
        
        querySnapshot.forEach((doc) => {
          const nameWord = doc.data().namewords;
          const wordId = doc.id; // obter o id do documento
      
          addAttrToList(nameWord, "listWords", wordId); // passar o id como argumento
  
            // const tipsRef = wordRef.doc(doc.id).collection("tips");
            // tipsRef.get().then((querySnapshot) => {
            //   querySnapshot.forEach((doc) => {
            //     const nameTips = doc.data().nameTips;
            //     //const tipsId = doc.id; // obter o id do documento
            //    addAttrToList(nameTips, "listTips", nameTips); // passar o id como argumento
            //   });
            // });
        });
      });
    });
  });


  // adicionar um evento de clique para cada item da lista de temas
  const titleTheme = document.getElementById('titleTheme')
  const subTitleTheme = document.getElementById('subTitleTheme')

  themeList.addEventListener("click", (event) => {
    const themeId = event.target.id; // o ID do item clicado é o próprio ID do documento na coleção "themes"
    const themeName = event.target.textContent;
    titleTheme.innerHTML = "Palavras do Tema"
    subTitleTheme.textContent = themeName;
    console.log(themeId)
    // limpar a lista de palavras
    wordList.innerHTML = "";
    tipslist.innerHTML = "";
    selectedItemWord = "";
    selectedNameWord = "";
    selectedItemTip = "";
    selectedNameTip = "";
    
    // buscar as palavras relacionadas ao tema clicado
    themeRef.doc(themeId).collection("words").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // adicionar cada palavra como um novo item na lista
          const nameWord = doc.data().namewords;
          const wordId = doc.id; // o ID da palavra é o ID do documento na subcoleção "words"
          addAttrToList(nameWord, "listWords", wordId);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  });

// adicionar um evento de clique para cada item da lista de words
  
const titleWord = document.getElementById('titleWord')
const subTitleWord = document.getElementById('subTitleWord')
  wordList.addEventListener("click", (event) => {
    const wordId = event.target.id; // o ID da palavra clicada é o ID do documento na subcoleção "words"
    const wordName = event.target.textContent;
    titleWord.innerHTML = "Dicas da Palavra"
    subTitleWord.textContent = wordName;

    console.log(wordId);
  
    // limpar a lista de dicas
    tipslist.innerHTML = "";
    selectedItemTip = "";
    selectedNameTip = "";

    // buscar as dicas relacionadas à palavra clicada
    themeRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const themeId = doc.id; // o ID do tema é o ID do documento na coleção "themes"
        const wordRef = themeRef.doc(themeId).collection("words").doc(wordId).collection("tips");
        wordRef.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // adicionar cada dica como um novo item na lista
            const nameTips = doc.data().nameTips;
            const tipId = doc.id; // o ID da dica é o ID do documento na subcoleção "tips"
            addAttrToList(nameTips, "listTips", tipId);
          });
        });
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  });

// controle do modal - create

const openModalTheme = document.getElementById('openModalTheme')
const openModalWord = document.getElementById('openModalWord')
const openModalTips = document.getElementById('openModalTip')

const modalTheme = document.querySelector('.hideTheme')
const modalWord = document.querySelector('.hideWord')
const modalTip = document.querySelector('.hideTip')
const fade = document.querySelector('.fade')

const nameTheme = document.getElementById("nameTheme").value;


function CloseModal(){
  fade.style.display = "none";
  modalTheme.style.display = "none"
  modalWord.style.display = "none"
  modalTip.style.display = "none"
  nameTheme.value = "";
}

openModalTheme.addEventListener("click", (event)=>{
  fade.style.display = "inline";
  modalTheme.style.display = "inline"
})

openModalWord.addEventListener("click", (event)=>{
  fade.style.display = "inline";
  modalWord.style.display = "inline"
})

openModalTips.addEventListener("click", (event)=>{
  fade.style.display = "inline";
  modalTip.style.display = "inline"
})


//CREATE > 
// theme
function addTheme() {
  const nameTheme = document.getElementById("nameTheme").value;
  
  if (nameTheme.trim() === "") {
    alert("Por favor, digite um nome para o tema.");
    return;
  }

  firebase.firestore().collection("theme").add({
    nametheme: nameTheme
  })
  .then((docRef) => {
    console.log("Tema adicionado com sucesso! ID do documento: ", docRef.id);
    // Limpa o formulário após adicionar o tema
    nameTheme.value = "";
    
    // Fecha o modal após adicionar o tema
    CloseModal()
    alert("Tema adicionado com sucesso!")
    reloadPage()
  })
  .catch((error) => {
    console.error("Erro ao adicionar o tema: ", error);
  });
}

// word
const themeSelect = document.getElementById('themeSelect');
const newWord = document.getElementById('newWord');
const newTiptoWord = document.getElementById('newTiptoWord');
const formNewWor = document.getElementById("formNewWord")

function addWordToTheme(themeId, newWord, newTip) {
  const wordsRef = themeRef.doc(themeId).collection("words");
  const newWordRef = wordsRef.doc(); // o Firestore gera automaticamente um ID para o novo documento
  newWordRef.set({
    namewords: newWord
  }).then(() => {
    // adiciona a dica como subcoleção da nova palavra
    newWordRef.collection("tips").add({
      nameTips: newTip
    }).then(() => {
      formNewWor.reset();
      CloseModal()
      alert("Nova palavra adicionada com sucesso!")
      console.log("Nova palavra adicionada com sucesso!");
      reloadPage()
    }).catch((error) => {
      console.error("Erro ao adicionar a dica: ", error);
    });
  }).catch((error) => {
    console.error("Erro ao adicionar a nova palavra: ", error);
  });
}

function addWord(){
  if(newWord.value === "" || newTiptoWord.value === ""){
    alert("Preencha os campos")
  return;
    
  }
  
  addWordToTheme(themeSelect.value, newWord.value, newTiptoWord.value)
  console.log(themeSelect.value, newWord.value, newTiptoWord.value)
}

//Tips
const themesSelect = document.querySelector('#themesSelect');
const newTipInput = document.querySelector('#newTip');
const wordSelect = document.getElementById("wordSelect");
const formNewTip = document.getElementById("formNewWord")
const listTips = document.getElementById("listTips")


themeRef.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const theme = doc.data();
    const option = document.createElement('option');
    option.value = doc.id;
    option.textContent = theme.nametheme;
    themesSelect.appendChild(option);
  });
});

themesSelect.addEventListener('change', (event) => {
  const themeId = event.target.value;
  // Limpa a lista de seleção de palavras
  wordSelect.innerHTML = '<option value="">Selecione uma palavra</option>';

  // Preenche a lista de seleção de palavras com as palavras relacionadas ao tema selecionado
  themeRef
    .doc(themeId)
    .collection('words')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const word = doc.data();
        const option = document.createElement('option');
        option.value = doc.id;
        option.textContent = word.namewords;
        wordSelect.appendChild(option);
        console.log(option.textContent)
      });
    })
    .catch((error) => {
      console.error('Erro ao buscar palavras: ', error);
    });
});

function addTip() {
  const themeId = themesSelect.value;
  const wordId = wordSelect.value;
  const newTip = newTipInput.value;

  if(themeId === "" || wordId === "" || newTip === ""){
    alert("Prencha corretamente!")
    return;
  }

  // Adiciona a nova dica na subcoleção 'tips' da palavra selecionada
  themeRef
    .doc(themeId)
    .collection('words')
    .doc(wordId)
    .collection('tips')
    .add({
      nameTips: newTip,
    })
    .then(() => {
      formNewTip.reset();
      CloseModal()
      alert('Dica adicionada com sucesso!')
      console.log('Dica adicionada com sucesso!');
      reloadPage()
    })
    .catch((error) => {
      console.error('Erro ao adicionar dica: ', error);
    });
}


// adicionar ouvinte de eventos click na lista de temas
document.getElementById("listTheme").addEventListener("click", (event) => {
  selectedItemTheme = event.target.id;
  selectedNameTheme = event.target.textContent;

  const listTheme = document.querySelectorAll("#listTheme .item");
  listTheme.forEach((item) => {
    item.classList.remove("selected");
  });

  // adiciona a classe "selected" apenas no item clicado
  event.target.classList.add("selected");
  
  console.log(selectedNameTheme + selectedItemTheme);
});

// adicionar ouvinte de eventos click na lista de palavras
document.getElementById("listWords").addEventListener("click", (event) => {
  selectedItemWord = event.target.id;
  selectedNameWord = event.target.textContent;

  const listWords = document.querySelectorAll("#listWords .item");
  listWords.forEach((item) => {
    item.classList.remove("selected");
  });

  // adiciona a classe "selected" apenas no item clicado
  event.target.classList.add("selected");

  console.log(selectedNameWord + selectedItemWord);
});

// adicionar ouvinte de eventos click na lista de dicas
document.getElementById("listTips").addEventListener("click", (event) => {
  selectedItemTip = event.target.id;
  selectedNameTip = event.target.textContent;

  const listTips = document.querySelectorAll("#listTips .item");
  listTips.forEach((item) => {
    item.classList.remove("selected");
  });

  // adiciona a classe "selected" apenas no item clicado
  event.target.classList.add("selected");

  console.log(selectedNameTip + selectedItemTip);
});

//DELETE
//tip
function deleteTip() {
  // Verificar se há uma dica selecionada
  if (selectedItemTip) {
    // Percorrer todas as dicas cadastradas
    themeRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const themeId = doc.id; // o ID do tema é o ID do documento na coleção "themes"
        const wordsRef = themeRef.doc(themeId).collection("words");
        wordsRef.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const wordId = doc.id; // o ID da palavra é o ID do documento na subcoleção "words"
            const tipsRef = wordsRef.doc(wordId).collection("tips");
            tipsRef.get().then((querySnapshot) => {
              const numTips = querySnapshot.size;
              querySnapshot.forEach((doc) => {
                const tipId = doc.id; // o ID da dica é o ID do documento na subcoleção "tips"
                // Se o ID da dica atual é igual ao ID da dica selecionada e o número de dicas é maior que 1, excluí-la
                if (tipId === selectedItemTip && numTips > 1) {
                  tipsRef.doc(tipId).delete().then(() => {
                    console.log("Dica excluída com sucesso!");
                    alert("Dica excluída com sucesso!")
                    reloadPage()
                  }).catch((error) => {
                    console.error("Erro ao excluir a dica: ", error);
                  });
                } else if (tipId === selectedItemTip && numTips === 1) {
                  alert("Essa é a última dica da palavra e não pode ser excluída!")
                  console.warn("Essa é a última dica da palavra e não pode ser excluída!");
                }
              });
            });
          });
        });
      });
    }).catch((error) => {
      console.error("Erro ao buscar as dicas: ", error);
    });
  } else {
    console.warn("Nenhuma dica selecionada!");
  }
}

//word
function deleteWord(){
  if(selectedItemWord){
    themeRef.get().then((querySnapshot) => {
      querySnapshot.forEach((themeDoc) => {
        // buscar todas as palavras no tema atual
        const wordRef = themeDoc.ref.collection("words");
        wordRef.get().then((wordQuerySnapshot) => {
          wordQuerySnapshot.forEach((wordDoc) => {
            // verificar se a palavra atual é a selecionada
            if (wordDoc.id === selectedItemWord) {
              // excluir o documento
              wordDoc.ref.delete().then(() => {
                console.log("Documento excluído com sucesso.");
                alert("Palavra excluído com sucesso!")
                reloadPage()
              }).catch((error) => {
                console.error("Erro ao excluir o documento: ", error);
              });
            }
          });
        });
      });
    });
  } else {
    console.warn("Nenhuma dica selecionada!");
  }
}

//theme
function deleteTheme(){
  if (selectedItemTheme) {
    themeRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id === selectedItemTheme) {
            doc.ref.delete()
              .then(() => {
                console.log("Tema excluído com sucesso!");
                alert("Tema excluído com sucesso!")
                reloadPage()
              })
              .catch((error) => {
                console.error("Erro ao excluir tema: ", error);
              });
          }
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar temas: ", error);
      });
  } else {
    console.log("Nenhum tema selecionado para exclusão.");
  }
};

// função para mostrar o popup de confirmação
function showConfirmPopup(itemName, deteleFunction) {
  const popup = document.createElement("div");
  const popupContent = document.createElement("div");
  const popupBtn = document.createElement("div");
  popup.setAttribute("class", "popup");
  popupContent.setAttribute("class", "popupContent");
  popupBtn.setAttribute("class", "popupBtn");
  const message = document.createElement("p");
  
  if(itemName === selectedNameTip){
    message.textContent = `Você tem certeza que deseja excluir a dica "${itemName}"?`;
  }else if (itemName === selectedNameWord){
    message.textContent = `Você tem certeza que deseja excluir a palavra "${itemName}"?`;
  }else if(itemName === selectedNameTheme){
    message.textContent = `Excluindo o tema "${itemName}", é deletada todas as palavras e dicas atrelados a ele, deseja excluir ?`;
  }
    popup.appendChild(popupContent)
    popupContent.appendChild(message);
  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "Excluir";
  confirmBtn.addEventListener("click", () => {
    //alert(itemName + " excluido com sucesso!") 
    deteleFunction();
    popup.remove();
    fade.style.display = "none";
    //
  });

  const cancelBtn = document.createElement("button");
  
  cancelBtn.textContent = "Cancelar";
  cancelBtn.addEventListener("click", () => {
    popup.remove();
    fade.style.display = "none"; // remove o popup da tela
  });
  popupContent.appendChild(popupBtn);
  popupBtn.appendChild(cancelBtn);
  popupBtn.appendChild(confirmBtn);

  document.body.appendChild(popup); // adiciona o popup ao final do body
}

//tip
const btnDeleteTip = document.getElementById('btnDeleteTip')
btnDeleteTip.addEventListener("click", (event) => {
  if(selectedNameTip === ""){
    alert("selecione uma dica");
  }else{
    fade.style.display = "inline";
    showConfirmPopup(selectedNameTip, deleteTip)
  }
  //deleteTip()
  
})

//word
const btnDeleteWord = document.getElementById('btnDeleteWord')
btnDeleteWord.addEventListener("click", (event) => {
  if(selectedNameWord === ""){
    alert("selecione uma Palavra");
  }else{
    
    showConfirmPopup(selectedNameWord, deleteWord)
    fade.style.display = "inline";
  }
  
})

//theme
const btnDeleteTheme = document.getElementById('btnDeleteTheme')
btnDeleteTheme.addEventListener("click", (event) => {
  if(selectedNameTheme === ""){
    alert("selecione um Tema");
  }else{
    
    showConfirmPopup(selectedNameTheme, deleteTheme)
    fade.style.display = "inline";
  }
  
})


//editar - update
//funcoes de update - tip
function updateTip(newTip){
 
  if(selectedItemTip){
    themeRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const themeId = doc.id;
        const wordsRef = themeRef.doc(themeId).collection("words");
        wordsRef.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const wordId = doc.id;
            const tipsRef = wordsRef.doc(wordId).collection("tips");
            tipsRef.doc(selectedItemTip).update({ nameTips: newTip }).then(() => {
              console.log("Dica atualizada com sucesso!");
              reloadPage();
            }).catch((error) => {
              console.error("Erro ao atualizar a dica: ", error);
            });
          });
        });
      });
    }).catch((error) => {
      console.error("Erro ao buscar as dicas: ", error);
    });
  }else{
    console.log("Selecione uma dica")
  }
}
//word
  function updateWord(newWord){
    if(selectedItemWord){
      themeRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const themeId = doc.id;
          const wordsRef = themeRef.doc(themeId).collection("words");
          wordsRef.doc(selectedItemWord).update({ namewords: newWord }).then(() => {
            console.log("Palavra atualizada com sucesso!");
            reloadPage();
          }).catch((error) => {
            console.error("Erro ao atualizar a palavra: ", error);
          });
        });
      }).catch((error) => {
        console.error("Erro ao buscar as palavras: ", error);
      });
    }else{
      console.log("Selecione uma palavra")
    }
  }
//theme
  function updateTheme(newTheme) {
    if (selectedItemTheme) {
      themeRef.doc(selectedItemTheme).update({ nametheme: newTheme }).then(() => {
        console.log("Tema atualizado com sucesso!");
        reloadPage();
      }).catch((error) => {
        console.error("Erro ao atualizar o tema: ", error);
      });
    } else {
      console.log("Selecione um tema");
    }
  }

// funcão do modal de update
function showUpdatePopup(nameItem, updateFunction) {
  
  var tipo = "";
  const popup = document.createElement("div");
  const popupContent = document.createElement("div");
  const popupBtn = document.createElement("div");
  const message = document.createElement("p");
  const input = document.createElement("input")
  //const textarea = document.createElement("textarea")
  
  popup.setAttribute("class", "popup");
  popupContent.setAttribute("class", "popupContent");
  popupBtn.setAttribute("class", "popupBtn");
  input.setAttribute("id", "newDescription");

  if(nameItem === selectedNameTip){
    message.textContent = `Alterar descrição da dica - "${nameItem}", para:`;
    input.setAttribute("placeholder", "Digite a nova descrição da dica...");
    tipo = "DICA"
  }else if (nameItem === selectedNameWord){
    message.textContent = `Alterar nome da palavra - "${nameItem}", para:`;
    input.setAttribute("placeholder", "Digite o novo nome da palavra...");
    tipo = "PALAVRA"
  }else if(nameItem === selectedNameTheme){
    message.textContent = `Alterar nome do tema - "${nameItem}", para:`;
    input.setAttribute("placeholder", "Digite o novo nome do tema...");
    tipo = "TEMA"
  }

    popup.appendChild(popupContent)
    popupContent.appendChild(message);
    popupContent.appendChild(input);

  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "Salvar";
  confirmBtn.addEventListener("click", () => {
    const newDescription = document.getElementById('newDescription').value
    alert(tipo + " alterado de: " + "'" + nameItem +"'"+ " , para: " + "'"+newDescription + "'" + " com sucesso!") 
    console.log(newDescription)
    updateFunction(newDescription)
    popup.remove();
    fade.style.display = "none";
  });

  const cancelBtn = document.createElement("button");
  
  cancelBtn.textContent = "Cancelar";
  cancelBtn.addEventListener("click", () => {
    popup.remove();
    fade.style.display = "none"; // remove o popup da tela
  });

  popupContent.appendChild(popupBtn);
  
  popupBtn.appendChild(cancelBtn);
  popupBtn.appendChild(confirmBtn);

  document.body.appendChild(popup); // adiciona o popup ao final do body
}

//Botoes de controle
const btnUpdateTheme = document.getElementById('updateTheme')
btnUpdateTheme.addEventListener("click", () => {
  if(selectedNameTheme === ""){
    alert("selecione um Tema");
  }else{
    
    showUpdatePopup(selectedNameTheme, updateTheme)
    fade.style.display = "inline";
  }
});


const btnUpdateWord = document.getElementById('updateWord')
btnUpdateWord.addEventListener("click", () => {
  if(selectedNameWord === ""){
    alert("selecione uma palavra");
  }else{
    
    showUpdatePopup( selectedNameWord, updateWord)
    fade.style.display = "inline";
  }
});


const btnUpdateTip = document.getElementById('updateTip')
btnUpdateTip.addEventListener("click", () => {
  if(selectedNameTip === ""){
    alert("selecione uma dica");
  }else{
    
    showUpdatePopup(selectedNameTip, updateTip)
    fade.style.display = "inline";
  }
});

