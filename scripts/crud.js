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



// Função para exibir um atributo em uma lista
function addAttrToList(attr, listId, id) {
    const ul = document.getElementById(listId);
    const li = document.createElement("li");
    li.textContent = attr;
    li.setAttribute("id", id); // adiciona o id como um atributo data
    li.setAttribute("class", "item");
    ul.appendChild(li);
  }


  themeRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const nameTheme = doc.data().nametheme;
      const themeId = doc.id; // obter o id do documento
      addAttrToList(nameTheme, "listTheme", themeId); // passar o id como argumento
  
      // const wordRef = themeRef.doc(doc.id).collection("words");
      // wordRef.get().then((querySnapshot) => {
      //   querySnapshot.forEach((doc) => {
      //     const nameWord = doc.data().namewords;
      //     const wordId = doc.id; // obter o id do documento
      //     //console.log(nameWord, wordId)
      //     //addAttrToList(nameWord, "listWords", wordId); // passar o id como argumento
  
      //     const tipsRef = wordRef.doc(doc.id).collection("tips");
      //     tipsRef.get().then((querySnapshot) => {
      //       querySnapshot.forEach((doc) => {
      //         const nameTips = doc.data().nameTips;
      //         //const tipsId = doc.id; // obter o id do documento
      //        // addAttrToList(nameTips, "listTips", nameTips); // passar o id como argumento
      //       });
      //     });
      //   });
      // });
    });
  });



//função para adicionar um item na tela
  function addToList(data, listId, itemId) {
    const list = document.getElementById(listId);
    const item = document.createElement("li");
    item.textContent = data;
    item.setAttribute("id", itemId);
    list.appendChild(item);
  }

  // adicionar um evento de clique para cada item da lista de temas
  themeList.addEventListener("click", (event) => {
    const themeId = event.target.id; // o ID do item clicado é o próprio ID do documento na coleção "themes"
    console.log(themeId)
    // limpar a lista de palavras
    wordList.innerHTML = "";
  
    // buscar as palavras relacionadas ao tema clicado
    themeRef.doc(themeId).collection("words").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // adicionar cada palavra como um novo item na lista
          const nameWord = doc.data().namewords;
          const wordId = doc.id; // o ID da palavra é o ID do documento na subcoleção "words"
          addToList(nameWord, "listWords", wordId);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  });

// adicionar um evento de clique para cada item da lista de words
  wordList.addEventListener("click", (event) => {
    const wordId = event.target.id; // o ID da palavra clicada é o ID do documento na subcoleção "words"
    console.log(wordId);
  
    // limpar a lista de dicas
    tipslist.innerHTML = "";
  
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
            addToList(nameTips, "listTips", tipId);
          });
        });
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  });






// controle do modal

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
    reloadPage()
  })
  .catch((error) => {
    console.error("Erro ao adicionar o tema: ", error);
  });
}

