$(".botao-excluir").off("click").on("click", function() {
  if(confirm("Tem certeza que deseja realizar essa exclusão?")) {
    var form = $(this).closest("form");
    form.submit();
    alert("Exclusão concluída com sucesso!")
  }
});