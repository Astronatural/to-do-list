$(function () {
  console.log('JQ and JS up and running');
  // Establish Click Listeners
  clickListeners();

  getChores();  // get chores from DB

}); // end doc ready

// Clickers go here
function clickListeners() {
  $('#submit').on('click', function () {
    console.log('in clickListen on click');
    // get user input and put in an object
    let choreInput = { // check that these corispond with database keys ??
      task: $("#taskPut").val(),
      status: "n",
    };
    // call makeChore with the new obejct
    makeChore(choreInput);
    $("input").val('');
  });
  $('#taskList').on('click', '.completer', compCheck);  // getById is for status change function.
  $('#taskList').on('click', '.deleter', deleteChore);  // <-- add back for the DELETE.
}


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
} // end getChores (from DB)


// Displays an array of chores to the DOM
function showChores(chores) {
  $('#taskList').empty();

  for (let i = 0; i < chores.length; i += 1) {
    let chore = chores[i];
    // For each chore, append a new row to our table, include status and delet buttons
    let $tr = $(`<tr data-choreSt=${chore.status} ></tr>`);
    $tr.data('chores', chore);
    $tr.append(`<td>${chore.task}</td>`);
    $tr.append(`<td data-choreSt=${chore.status}>${chore.status}</td>`);
    $tr.append(`<td> <button data-choreId=${chore.id} class="completer"> Complete? </button></td>`);
    $tr.append(`<td> <button data-choreId=${chore.id} class="deleter"> Delete Task </button></td>`);


    $('#taskTable').append($tr);
  }
}  // end showChores


// POST --  add a new chore
function makeChore(newChore) {
  console.log('in makeChore', newChore);
  // ajax call to server to get chore table
  $.ajax({
    type: 'POST',
    url: '/chores',
    data: newChore
  }).then(function (response) {
    console.log('Response from server.', response);
    getChores();
  }).catch(function (error) {
    console.log('Error in POST', error)
    alert('Unable to add chore please try again.');
  });
}


// DELETE -- Remove a chore from the DB and DOM
function deleteChore(event) {
  console.log('deleter clicked');
  console.log(event.target);

  const choreId = $(event.target).data('choreid');

  console.log(`Deleting chore with id ${choreId}`);
  // swal, sweet alert will go here.
  $.ajax({
    method: "DELETE",
    url: `/chores/${choreId}`,
  }).then(function (response) {
    getChores();
  })
};



// PUT -- edit a chore by marking as finished.
function compCheck(event) {
  console.log('completer clicked');
  console.log(event.target);
  console.log($(event.target).parent().parent().data('chorest'));

  let choreStatus = $(event.target).parent().parent().data('chorest');
  //    const choreStatus = $(event.target).parent()("<td>").find(".status").text(); 
  console.log(choreStatus);

  const choreId = $(event.target).data('choreid');
  console.log(`Updating chore with id ${choreId}`);
  if (choreStatus === "n") {  // The if statement, it does nothing!
    choreStatus = "y";
  } else if (choreStatus === "y") {
    choreStatus = "n";
  };
  let choreInput = { // check that these corispond with database keys ??
    id: choreId,
    status: choreStatus,
  };
  $.ajax({
    method: 'PUT',
    url: `/chores/${choreId}`,
    data: choreInput
  }).then(response => {
    console.log(`Task updated where id: ${choreId} and status of ${choreStatus}`);
    getChores();
  }).catch(error => {

  });
}