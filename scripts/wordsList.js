const themeRef = firebase.firestore().collection("theme");
const wordsWithTips = [];

function fetchWordsWithTips() {
  return themeRef.get().then((querySnapshot) => {
    const promises = [];

    querySnapshot.forEach((themeDoc) => {
      const themeId = themeDoc.id;
      const themeName = themeDoc.data().nametheme;

      const wordsRef = themeRef.doc(themeId).collection("words");
      const promise = wordsRef.get().then((querySnapshot) => {
        const wordPromises = [];

        querySnapshot.forEach((wordDoc) => {
          const wordId = wordDoc.id;
          const wordName = wordDoc.data().namewords;
          const wordNivel = wordDoc.data().nivel;
          const wordTips = [];

          const tipsRef = wordsRef.doc(wordId).collection("tips");
          const wordPromise = tipsRef.get().then((querySnapshot) => {
            querySnapshot.forEach((tipDoc) => {
              const tipId = tipDoc.id;
              const tipText = tipDoc.data().nameTips;

              wordTips.push({
                id: tipId,
                nameTips: tipText,
              });
            });
          });

          wordPromises.push(wordPromise);
          
          wordsWithTips.push({
            nivel: wordNivel,
            theme: themeName,
            word: wordName,
            tips: wordTips,
          });
        });
        
        return Promise.all(wordPromises);
        
      });

      promises.push(promise);
    });
    return Promise.all(promises);
  });
}
