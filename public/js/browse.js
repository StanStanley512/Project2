$(".catCard").on("click", function(){
    let id = this.id;
    console.log('you clicked it');
    window.location.href = `/${id}`;
})