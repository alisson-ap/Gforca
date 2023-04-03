firebase.auth().onAuthStateChanged(user => {
    if(!user.email == "teste@gmail.com"){
        window.location.href = "index.html";
    }
})



findBase()

// function findBase(){
//     setTimeout(()=>{
//         addBaseToScreen(faketheme,  fakeword, fakeTips);
//     }, 1000)
// }




// function findBase(){
//     firebase.firestore()
//         .collection('theme')
//         .get()
//         .then(snapshot =>{
//             const themeBD = snapshot.docs.map(doc => doc.data())
//             addBaseToScreen(themeBD,themeBD,themeBD)
//         })
// }


function findBase(){
    firebase.firestore()
        .collection('theme')
        .get()
        .then(snapshot =>{
            snapshot.docs.forEach(doc =>{
                console.log(doc.id) 
            })
                        
        })
}




function addBaseToScreen(theme,word,tips){
    const listTheme = document.getElementById('listTheme');
    const listWords = document.getElementById('listWords');
    const listTips = document.getElementById('listTips');


    theme.forEach(theme => {
        const li = document.createElement('li');
        li.innerHTML = theme.nametheme
        console.log(li)
        listTheme.appendChild(li);
    });

    word.forEach(word => {
        const li = document.createElement('li');
        li.innerHTML = word.nameWord
        listWords.appendChild(li);
    });

    tips.forEach(tips => {
        const li = document.createElement('li');
        li.innerHTML = tips.nameTips
        listTips.appendChild(li);
    });
}


// const faketheme = [{
//     type: 'theme',
//     nameTheme: 'Tema 1' 
// }, {
//     type: 'theme',
//     nameTheme: 'Tema 2' 
// }


// ]

// const fakeword =[{
//     type: 'word',
//     nameWord: 'Palavra 1'
// }, {
//     type: 'word',
//     nameWord: 'Palavra 2'
// }, {
//     type: 'word',
//     nameWord: 'Palavra 3'
// }, {
//     type: 'word',
//     nameWord: 'Palavra 4'
// }, {
//     type: 'word',
//     nameWord: 'Palavra 5'
// }]

// const fakeTips = [{
//     type: 'tips',
//     nameTips: 'Dica 1' 
// },{
//     type: 'tips',
//     nameTips: 'Dica 2' 
// },{
//     type: 'tips',
//     nameTips: 'Dica 3' 
// },{
//     type: 'tips',
//     nameTips: 'Dica 4' 
// }]
