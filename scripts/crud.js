$(".table-theme-list li").click(function() {
    alert(this.id); // id of clicked li by directly accessing DOMElement property
    alert($(this).attr('id'));

});