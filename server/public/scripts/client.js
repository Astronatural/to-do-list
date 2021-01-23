$(function () {
    console.log('JQ and JS up and running');
    // Establish Click Listeners
   // setupClickListeners()
    // load existing koalas on page load
  //  getChores();

}); // end doc ready


// GET -- show chores table on the DOM
function getChores() {
    $.ajax({
      type: 'GET',
      url: '/chores'
    }).then(function (response) {
      console.log(response);
      showChores(response);
    }).catch(function (error) {
      console.log('error in GET', error);
    });
  }


// Displays an array of chores to the DOM
function showChores(chores) {
  $('#taskTable').empty();

  for (let i = 0; i < chores.length; i += 1) {
    let chores = chores[i];
    // For each book, append a new row to our table
    let $tr = $('<tr></tr>');
    $tr.data('chores', chores);
    $tr.append(`<td>${chores.task}</td>`);
    $tr.append(`<td>${chores.status}</td>`);
    $tr.append(`<td> <button data-bookidd=${chores.id} class="toread"> Have Read </button></td>`);
    $tr.append(`<td> <button data-bookid=${chores.id} class="deleter"> Delete Task </button></td>`);
    

    $('#taskTable').append($tr);
  }
}

// POST --  add a new chore

// PUT -- edit a chore, mark as finished.

// DELETE -- Remove a chore from the DB and DOM