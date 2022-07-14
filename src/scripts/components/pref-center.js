

export default function initPrefCenter() {

  function setAllSwitches(items, val, isDisabled) {
    $.each(items, function(i, item) {

      item.checked = val;
      item.disabled = isDisabled;

    });
  }

  const form = $('#prefForm');
  const switches = form.find('input:not(#prefAll)');
  const allSwitch = form.find('#prefAll');
  const submitBtn = form.find('#submit');

  console.log(switches);

  allSwitch.on('change', function() {
    const $el = $(this);
    const isChecked = $el.is(':checked');

    // set all prefs to false
    if (isChecked) {
      setAllSwitches(switches, false, true);
    } else {
      setAllSwitches(switches, false, false);
    }

  });


  submitBtn.on('click', function() {

      // let formData = form.find('input').serializeArray();
    let formData = form.serializeArray();

    // console.log(formData);
    // console.log(form);

  });


}

