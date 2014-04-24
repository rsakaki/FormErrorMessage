$(function(){
  $(document).on('click', '.submit', function(){
    $.ajax({
      url: '/js/formErrorMessage.json',
      dateType: 'json',
      success: function(data){
        var dataArray = data.error,
            $errorTarget,
            $parent;

        for(var i = 0; i < dataArray.length; i++){
          $errorTarget = $("[name='"+ dataArray[i].errorInputName + "']");

          // 一つの項目に対して複数入力フィールドがある場合（住所等）
          // 各入力フィールドを .field__input__box で囲う
          if($errorTarget.parents('.field__input__box').length){
            $parent = $errorTarget.parents('.field__input__box');
          }else {
            $parent = $errorTarget.parents('.field__input');
          }
          $parent.find('.errorMessage').slideDown()
          .children('.errorMessage__content').append(dataArray[i].errorMessageStr);
        }

      },
      error: function(){
        alert('json読み込み失敗');
      }
    })
    return false;
  });

  $(document).on('change', ".fileInline > [type='file']", function() {
    var file = this.files[0],
    $this = $(this);
    if(file != null) {
      $this.parent('.fileInline').after('&emsp;<strong>' + file.name + '</strong>');
    }
  });

});
