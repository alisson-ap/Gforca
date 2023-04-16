//const themeRef = firebase.firestore().collection("theme");

const wordsWithTips = [];

// Percorrer todos os temas cadastrados
themeRef.get().then((querySnapshot) => {
  const promises = []; // Array para armazenar todas as promessas

  querySnapshot.forEach((themeDoc) => {
    const themeId = themeDoc.id;
    const themeName = themeDoc.data().nametheme;

    // Percorrer todas as palavras cadastradas dentro do tema atual
    const wordsRef = themeRef.doc(themeId).collection("words");
    const promise = wordsRef.get().then((querySnapshot) => {
      const wordPromises = []; // Array para armazenar todas as promessas

      querySnapshot.forEach((wordDoc) => {
        const wordId = wordDoc.id;
        const wordName = wordDoc.data().namewords;
        const wordTips = [];

        // Percorrer todas as dicas cadastradas para a palavra atual
        const tipsRef = wordsRef.doc(wordId).collection("tips");
        const wordPromise = tipsRef.get().then((querySnapshot) => {
          querySnapshot.forEach((tipDoc) => {
            const tipId = tipDoc.id;
            const tipText = tipDoc.data().nameTips;

            // Adicionar a dica ao array de dicas da palavra atual
            wordTips.push({
              id: tipId,
              nameTips: tipText,
            });
          });
        });

        wordPromises.push(wordPromise);

        // Adicionar a palavra com todas as suas dicas ao array de palavras com dicas
        wordsWithTips.push({
          theme: themeName,
          word: wordName,
          tips: wordTips,
        });
      });

      return Promise.all(wordPromises);
    });

    promises.push(promise);
  });

  // Esperar todas as promessas serem concluídas antes de continuar
  return Promise.all(promises);
}).then(() => {
  // Todos os dados foram recuperados do Firebase
  
  console.log(wordsWithTips.length);
}).catch((error) => {
  console.error("Erro ao buscar as palavras com dicas: ", error);
});



function getRandomWordWithTips() {
  const randomIndex = Math.floor(Math.random() * wordsWithTips.length);
  return wordsWithTips[randomIndex];
}


setTimeout(()=>{
    console.log(wordsWithTips);
}, 3000);
