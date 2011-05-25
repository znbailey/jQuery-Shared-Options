(function( $ ){

  $.fn.sharedOptions = function() {
    var elements = $(this);
    
    var allOptions = [];
    var $optGroups = elements.first().find('optgroup');
    elements.first().find('option').each(function(idx, option) {
      var $option = $(option);
      var optionValue = $option.attr('value');
      if ( optionValue ) {
        allOptions[optionValue] = {'label': $option.text(), 'beforeValue': $option.prev().attr('value'), 'index': idx };
        if ( $optGroups.length  ) {
          allOptions[optionValue].optgroup = $optGroups.index($option.parent('optgroup'));
        }
      }
    });
    
    //add change handler to all dropdowns
    elements.change(function(){
      var $this = $(this); //the dropdown that changed
      var selectedOption = $this.find('option:selected');
      var newValue = selectedOption.attr('value');
      var oldValue = $this.data('old-value');
      
      //nothing to change
      if ( newValue === oldValue ) {
        return true;
      }
      
      if ( oldValue && $.trim(oldValue).length !== 0 ) {
        elements.not($this).each(function(junk, select) {
          var myIndex = allOptions[oldValue].index;
          var $select = $(select);
          var $parent = $optGroups.length > 0 ? 
            $select.find('optgroup').eq(allOptions[oldValue].optgroup) : $select;
          var $options = $parent.find('option');
            
          $options.each(function(ignore, option) {
            var $option = $(option);
            var optionValue = $option.attr('value');
            if ( !optionValue || $.trim(optionValue).length === 0 ) {
              return true;
            }
            var $nextOption = $option.next('option');
            var curIndex = allOptions[optionValue].index;
            var nextOptionValue;
            var nextIndex;
            if ( $nextOption.length ) {
              nextOptionValue = $nextOption.attr('value');
              if ( nextOptionValue && $.trim(nextOptionValue).length !== 0 ) {
                nextIndex = allOptions[nextOptionValue].index;
              }
            }
            if ( myIndex < curIndex ) {
              $option.before('<option value="' + oldValue + '">' + allOptions[oldValue].label + '</option>');
              return false;
            } else if ( !nextIndex || myIndex < nextIndex ) {
              $option.after('<option value="' + oldValue + '">' + allOptions[oldValue].label + '</option>');
              return false;
            }
          });
          if ( !$options.length ) {
            $parent.append('<option value="' + oldValue + '">' + allOptions[oldValue].label + '</option>');
          }
        });
      }
      
      if ( newValue && $.trim(newValue).length !== 0 ) {
        elements.not($this).find('option[value=' + newValue + ']').remove();
      }
      
      $this.data('old-value', newValue);
    });

    //remove selected options
    return elements.each(function(){
      var $this = $(this);
      var $selected = $this.find('option:selected');
      var value = $selected.attr('value');
      if ( value && $.trim(value).length !== 0 ) {
        $this.data('old-value', value);
        elements.not($this).find('option[value=' + value + ']').remove();
      }
    });
  };
})( jQuery );