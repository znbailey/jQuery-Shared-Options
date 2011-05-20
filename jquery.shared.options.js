(function( $ ){

  $.fn.sharedOptions = function() {
    var elements = $(this);
    
    //add change handler to all dropdowns
    elements.change(function(){
      var $this = $(this); //the dropdown that changed
      var selectedOption = $this.children('option:selected');
      var newValue = selectedOption.attr('value');
      var oldValue = $this.data('old-value');
      
      //nothing to change
      if ( newValue === oldValue ) {
        return true;
      }
      
      if ( newValue && $.trim(newValue).length !== 0 ) {
        elements.children('option[value=' + newValue + ']').hide();
      }
      
      if ( oldValue && $.trim(oldValue).length !== 0 ) {
        elements.children('option[value=' + oldValue + ']').show();
      }
      $this.data('old-value', newValue);
    });

    //hide selected options
    return elements.each(function(){
      var $this = $(this);
      var oldValue = $this.children('option:selected').attr('value');
      if ( oldValue && $.trim(oldValue).length !== 0 ) {
        $this.data('old-value', oldValue);
        elements.children('option[value=' + oldValue + ']').hide();
      }
    });
  };
})( jQuery );