$(function () {
  console.log('JQ and JS up and running');
  clickListeners();
  getChores();  // get chores from DB

}); // end doc ready

// Clickers go here
function clickListeners() {
  $('#submit').on('click', function () {
    console.log('in clickListen on click');
    // get user input and put in an object
    let choreInput = {
      task: $("#taskPut").val(),
      status: "n",
    };
    // call makeChore with the new object as argument
    makeChore(choreInput);
    $("input").val('');
  });
  $('#taskList').on('click', '.completer', compCheck);
  $('#taskList').on('click', '.deleter', deleteChore);
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
    // Insert If to check the status value 
    let checkImg;
    let striker;
    if (chore.status === 'n') {
      // change statusImg to redX  
      checkImg = `<td> <img id="statusImg" src="./styles/redX.png"> </td>`;
      striker = `<td>${chore.task}</td>`
    } else if (chore.status === 'y') {
      // change statusImg to greenCheck
      checkImg = `<td> <img id="statusImg" src="./styles/greenCheck.png"> </td>`;
      striker = `<td class="strike">${chore.task}</td>`
    }
    // For each chore, append a new row to our table, include status and delete buttons
    let $tr = $(`<tr data-choreSt=${chore.status} ></tr>`);
    $tr.data('chores', chore);
    $tr.append(checkImg);  // ./styles/redX.png 
    $tr.append(striker);
    $tr.append(`<td> <button data-choreId=${chore.id} class="completer"> Complete? </button></td>`);  // PUT event target
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

  let choreStatus = $(event.target).parent().parent().data('chorest');
  console.log(choreStatus);
  console.log(this);  // same as event targt
  const choreId = $(event.target).data('choreid');
  console.log(`Updating chore with id ${choreId}`);
  if (choreStatus === "n") {
    choreStatus = "y";
  } else if (choreStatus === "y") {
    choreStatus = "n";
  };
  let choreInput = {
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