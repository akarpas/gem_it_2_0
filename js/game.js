
function Game(options) {
  this.rows = options.rows;
  this.columns = options.columns;
  this.gems = options.gems;
  this.rowCounter = 0;
  this.rowIndex = 0;
  this.columnIndex = 0;
  this.score = 0;
  this.allowedClicks = [];
  this.clickCounter = 0;
  this.match = false;
  this.selectedCell = 0;
  // var mapGrid = [];
  // _.times(this.rows,function() {
  //   mapGrid.push(_.fill(new Array(this.columns),0));
  // });
  // this.mapGrid = mapGrid;
}

Game.prototype.drawMainBoard = function () {

// first for will loop over each column out of 8
  for(this.columnIndex = 0; this.columnIndex < this.columns; this.columnIndex++) {
// second for will create 6 gems for each column we loop in
    for(this.rowIndex = 0; this.rowIndex < this.rows; this.rowIndex++) {
      $("#col"+this.columnIndex).append($('<div>')
        .addClass("cell")
        .attr('id',this.rowIndex+'-'+this.columnIndex));
      }
    }
};

Game.prototype.updateID = function () {

  var that = this;
  $(".col-md-1").each(function(index1,collumn){
    $(collumn).children().each(function(index2,theCell) {
      $(this).attr('id',index2+'-'+index1);
    });
  });
};

Game.prototype.gemPicker = function(selection,theCell) {
  var that = this;
  var tempId;
  // that.gems.gemCounter++;
  switch (selection) {
    case "red":
      $('#'+theCell).prepend(that.gems.gems[0].image);
      $('#'+theCell).children().attr('id',that.gems.gems[0].number);
      $('#'+theCell).children().attr('data-score','200');
      $('#'+theCell).children().attr('data-type','normal');
      that.gems.redCounter++;
    break;
    case "blue":
      $('#'+theCell).prepend(that.gems.gems[3].image);
      $('#'+theCell).children().attr('id',that.gems.gems[3].number);
      $('#'+theCell).children().attr('data-score','200');
      $('#'+theCell).children().attr('data-type','normal');
      that.gems.blueCounter++;
    break;
    case "green":
      $('#'+theCell).prepend(that.gems.gems[6].image);
      $('#'+theCell).children().attr('id',that.gems.gems[6].number);
      $('#'+theCell).children().attr('data-score','200');
      $('#'+theCell).children().attr('data-type','normal');
      that.gems.greenCounter++;
    break;
    case "redP":
      $('#'+theCell).prepend(that.gems.gems[1].image);
      $('#'+theCell).children().attr('id',that.gems.gems[1].number);
      $('#'+theCell).children().attr('data-score','1000');
      $('#'+theCell).children().attr('data-type','bonus');
      that.gems.redCounter++;
      that.gems.prizeCounter++;
    break;
    case "blueP":
      $('#'+theCell).prepend(that.gems.gems[4].image);
      $('#'+theCell).children().attr('id',that.gems.gems[4].number);
      $('#'+theCell).children().attr('data-score','1000');
      $('#'+theCell).children().attr('data-type','bonus');
      that.gems.blueCounter++;
      that.gems.prizeCounter++;
    break;
    case "greenP":
      $('#'+theCell).prepend(that.gems.gems[7].image);
      $('#'+theCell).children().attr('id',that.gems.gems[7].number);
      $('#'+theCell).children().attr('data-score','1000');
      $('#'+theCell).children().attr('data-type','bonus');
      that.gems.greenCounter++;
      that.gems.prizeCounter++;
    break;
    case "redB":
      $('#'+theCell).prepend(that.gems.gems[2].image);
      $('#'+theCell).children().attr('id',that.gems.gems[2].number);
      $('#'+theCell).children().attr('data-score','500');
      $('#'+theCell).children().attr('data-type','bomb');
      that.gems.redCounter++;
      that.gems.bombCounter++;
    break;
    case "blueB":
      $('#'+theCell).prepend(that.gems.gems[5].image);
      $('#'+theCell).children().attr('id',that.gems.gems[5].number);
      $('#'+theCell).children().attr('data-score','500');
      $('#'+theCell).children().attr('data-type','bomb');
      that.gems.blueCounter++;
      that.gems.bombCounter++;
    break;
    case "greenB":
      $('#'+theCell).prepend(that.gems.gems[8].image);
      $('#'+theCell).children().attr('id',that.gems.gems[8].number);
      $('#'+theCell).children().attr('data-score','500');
      $('#'+theCell).children().attr('data-type','bomb');
      that.gems.greenCounter++;
      that.gems.bombCounter++;
    break;
    case "gray":
      $('#'+theCell).prepend(that.gems.gems[9].image);
      $('#'+theCell).children().attr('id',that.gems.gems[9].number);
      $('#'+theCell).children().attr('data-score','200');
      $('#'+theCell).children().attr('data-type','normal');
      that.gems.grayCounter++;
    break;
    case "purple":
      $('#'+theCell).prepend(that.gems.gems[10].image);
      $('#'+theCell).children().attr('id',that.gems.gems[10].number);
      $('#'+theCell).children().attr('data-score','200');
      $('#'+theCell).children().attr('data-type','normal');
      that.gems.grayCounter++;
    break;
    case "black":
      $('#'+theCell).prepend(that.gems.gems[11].image);
      $('#'+theCell).children().attr('id',that.gems.gems[11].number);
      $('#'+theCell).children().attr('data-score','-5');
      $('#'+theCell).children().attr('data-type','black');
      that.gems.blackCounter++;
    break;
  }
};

Game.prototype.createRandomGems = function () {

  this.rowIndex = 0;

  $(".col-md-1").children().each(function(index1,theCell){
        if (this.rowIndex === this.rows-1) {
          this.rowIndex = 0;
          this.columnIndex++;
        }
        var cellId = $(theCell).attr('id');
      if (this.columnIndex === 0 || 2 || 4 || 6) {
        if (this.rowIndex === 0 || this.rowIndex === 2 || this.rowIndex === 5) {
          selection = _.sample(['red','redP','redB','blue','blueP','blueB','gray','gray','gray','black']);
          if (selection === "black" && this.gems.blackCounter > 2) {
            selection = _.sample(['red','redP','redB','blue','blueP','blueB','gray','gray']);
          }
          }
      }
      if (this.columnIndex === 1 || 3 || 5 || 7) {
        if (this.rowIndex === 1 || this.rowIndex === 3) {
          selection = _.sample(['green','greenB', 'greenP','purple','purple','black']);
          if (selection === "black" && this.gems.blackCounter > 2) {
            selection = _.sample(['green','purple','purple']);
          }
        }
      }
        if (selection === "redP" && this.gems.prizeCounter > 1){
          selection = 'red';
        } else if (selection === "blueP" && this.gems.prizeCounter > 1){
          selection = 'blue';
        } else if (selection === "greenP" && this.gems.prizeCounter > 1){
          selection = 'green';
        } else if (selection === "redB" && this.gems.bombCounter > 1) {
          selection = 'red';
        } else if (selection === "blueB" && this.gems.bombCounter > 1) {
          selection = 'blue';
        } else if (selection === "greenB" && this.gems.bombCounter > 1) {
          selection = 'green';
        }
        console.log("this is cell id: " + cellId);
        this.gemPicker(selection,cellId);
        // this.checkForMatch();
        // this.updateTheGrid();

        this.rowIndex++; // this is needed in order to track at which row we are at each column
                         // it is also possible to use it to add an id to the gem
  }.bind(this));
};

Game.prototype.checkForMatch = function () {

  for (var row = 0; row<this.rows; row++){
      for (var column = 0; column<this.columns; column++){
        this.checkMatchHorizontally(row,column);
        // this.checkMatchVertically(row,column);
      }
  }
};

Game.prototype.checkMatchHorizontally = function (row,column) {

  var that = this;
  var totalScore = 0;
  var tmpScore = 0;
  var matchCounter = 1;
  var hIndex = 1;
  var gemsForRemoval = [];
  var counter = 0;
  var currentID;

  currentID = row + "-" + column;

  if (column === 0) {

    if ($('#'+ currentID).children().attr('id') != $('#'+row+'-'+(column+1)).children().attr('id')) {
      return;

    } else {
      matchCounter++;
      gemsForRemoval = [];
      gemsForRemoval.push($('#'+currentID).attr('id'));
      for (hIndex; hIndex < this.columns; hIndex++) {
        if ($('#'.currentID).children().attr('id') == $('#'+row+'-'+(column+hIndex)).children().attr('id')) {
          gemsForRemoval.push($('#'+row+'-'+(column+hIndex)).attr('id'));
          matchCounter++;
        } else {
          return;
        }
      }
    }
    if (matchCounter >= 3) {
      matchCounter = 0;
      this.removeGemsHorizontally(gemsForRemoval,row);
      // console.log("IF1 this is a test for gems to be removed: " + gemsForRemoval);
    }


  } else if (column === this.columns-1) {

    if ($('#'+ currentID).children().attr('id') != $('#'+row+'-'+(column-1)).children().attr('id')) {
      return;
    } else {
      matchCounter++;
      gemsForRemoval = [];
      gemsForRemoval.push($('#'+currentID).attr('id'));
      for (hIndex; hIndex < this.columns; hIndex++) {
        if ($('#'.currentID).children().attr('id') == $('#'+row+'-'+(column-hIndex)).children().attr('id')) {
          gemsForRemoval.push($('#'+row+'-'+(column-hIndex)).attr('id'));
          matchCounter++;
        } else {
          break;
        }
      }
    }
    if (matchCounter >= 3) {

      matchCounter = 0;
      this.removeGemsHorizontally(gemsForRemoval,row);
      // console.log("IF2 this is a test for gems to be removed: " + gemsForRemoval);
    }


  } else {

    if ($('#'+ currentID).children().attr('id') !== $('#'+row+'-'+(column-hIndex)).children().attr('id') &&
          $('#'+ currentID).children().attr('id') !== $('#'+row+'-'+(column+hIndex)).children().attr('id')) {
      return;
    }

    if ($('#'+ currentID).children().attr('id') === $('#'+row+'-'+(column-hIndex)).children().attr('id') &&
          $('#'+ currentID).children().attr('id') === $('#'+row+'-'+(column+hIndex)).children().attr('id')) {
      gemsForRemoval.push($('#'+currentID).attr('id'));
      gemsForRemoval.push($('#'+row+'-'+(column-hIndex)).attr('id'));
      gemsForRemoval.push($('#'+row+'-'+(column+hIndex)).attr('id'));
      matchCounter=3;
      hIndex=2;
      // ISSUE IS BECAUSE WE JUMP OVER TO NEXT GEM
      for (hIndex; hIndex < this.columns; hIndex++) {
          if ($('#'+ currentID).children().attr('id') === $('#'+row+'-'+(column-hIndex)).children().attr('id')) {
            matchCounter++;
            gemsForRemoval.push($('#'+row+'-'+(column-hIndex)).attr('id'));
          } else {
            break;
          }
      }
      hIndex=2;
      for (hIndex; hIndex < this.columns; hIndex++) {
          if ($('#'+ currentID).children().attr('id') === $('#'+row+'-'+(column+hIndex)).children().attr('id')) {
            matchCounter++;
            gemsForRemoval.push($('#'+row+'-'+(column+hIndex)).attr('id'));
          } else {
            break;
          }
      }
    }
      if (matchCounter >= 3) {

        // console.log("IF3 this is a test for gems to be removed: " + gemsForRemoval);

      this.removeGemsHorizontally(gemsForRemoval,row);
        matchCounter = 0;
      }
    }

    if ($('#'+ currentID).children().attr('id') === $('#'+row+'-'+(column-hIndex)).children().attr('id') &&
          $('#'+ currentID).children().attr('id') !== $('#'+row+'-'+(column+hIndex)).children().attr('id')) {
      gemsForRemoval.push($('#'+currentID).attr('id'));
      matchCounter = 2;
      gemsForRemoval.push($('#'+row+'-'+(column-hIndex)).attr('id'));
      hIndex++;
      for (hIndex; hIndex < (this.columns-1); hIndex++) {
          if ($('#'+ currentID).children().attr('id') === $('#'+row+'-'+(column-hIndex)).children().attr('id')) {
            matchCounter++;
            gemsForRemoval.push($('#'+row+'-'+(column-hIndex)).attr('id'));
          } else {
            return;
          }

      }
      if (matchCounter >= 3) {
        // this.removeGemsHorizontally(gemsForRemoval,row)
        // console.log("IF4 this is a test for gems to be removed: " + gemsForRemoval);

        this.match = true;
        matchCounter = 0;
      }
    }

    if ($('#'+ currentID).children().attr('id') !== $('#'+row+'-'+(column-hIndex)).children().attr('id') &&
          $('#'+ currentID).children().attr('id') === $('#'+row+'-'+(column+hIndex)).children().attr('id')) {
      matchCounter = 2;
      gemsForRemoval.push($('#'+currentID).attr('id'));
      gemsForRemoval.push($('#'+row+'-'+(column+hIndex)).attr('id'));
      hIndex++;
      for (hIndex; hIndex < (this.columns-1); hIndex++) {
        if ($('#'+ currentID).children().attr('id') === $('#'+row+'-'+(column-hIndex)).children().attr('id')) {
          matchCounter++;
          gemsForRemoval.push($('#'+row+'-'+(column+hIndex)).attr('id'));
        } else {
          return;
        }
      }
      if (matchCounter >= 3) {
        totalScore = tmpScore;
        totalScore = (Math.ceil(matchCounter / 3))*totalScore;
        // this.score += totalScore;
        this.removeGemsHorizontally(gemsForRemoval,row);
        matchCounter = 0;
        // console.log("IF5 this is a test for gems to be removed: " + gemsForRemoval);


      }
    }
};

Game.prototype.removeGemsHorizontally = function (gemsForRemoval,rowMark) {

  var removalIndex = 0;
  var p1, p2;
  var temp;
  var arrayMemory = [];
  var arrayKeep = [];
  var tmpScore = 0;
  for (rowMark; rowMark > 0; rowMark--) {
    for (removalIndex; removalIndex<gemsForRemoval.length; removalIndex++) {
      temp = gemsForRemoval[removalIndex];
      $('#'+temp).remove();
      this.addGems();

    }

  }
  this.updateID();

};

Game.prototype.addGems = function () {

  var that = this;
  var gemCounter = 0;
  $(".col-md-1").each(function(index1,collumn){
    var thisId = $(collumn).attr('id');
    console.log(thisId);
    $(collumn).children().each(function(index2,theCell) {
      gemCounter++;
    });
    if (gemCounter < that.rows) {
      var selection = _.sample(['red','redP','redB','blue','blueP','blueB','gray','gray','gray','black']);
      var newCell = ($('<div/>').attr("class","cell"));
      $("#"+thisId).prepend(newCell);
      that.updateID();
      console.log("this is the second cell Id: "+ newCell.attr('id'));
      that.gemPicker(selection,newCell.attr('id'));
    }
  gemCounter=0;
  });
};

Game.prototype.eventListener = function () {

  var that = this;
  var allowedSecondClicks;
  var cellSelected = false;

  $('.col-md-1').on('click', function(e) {
    if (that.selectedCell === 0 || that.clickCounter === 0) {
      $(e.target).parent().css('background-color','rgb(242, 206, 50)');
      that.selectedCell = $(e.target).parent().attr('id');
      console.log("this is the target: " + $(e.target).parent().attr('id'));
      that.defineSecondClickRange(that.selectedCell);
      console.log("this is the selected cell: " + that.selectedCell);
      that.clickCounter = 1; // ISSUE HERE - SECOND TIME CELL DOES NOT HIGHLIGHT
    } else if (that.selectedCell === $(e.target).parent().attr('id') && that.clickCounter === 1 ) {
      $(e.target).parent().css('background-color','');
      that.clickCounter = 0;
      that.selectedCell = 0;
      that.eventListener();
    } else if ($.inArray(($(e.target).parent().attr('id')), that.allowedClicks) != -1) {
      var newSelectionID = ($(e.target).parent().attr('id'));
      that.swapGems(newSelectionID);
      $('#'+that.selectedCell).css('background-color','');
      that.checkForMatch();
      that.updateID();
      that.clickCounter = 0;
      that.selectedCell = 0;
      that.eventListener();
    }

  });
};

Game.prototype.swapGems = function(newSelectionID) {

  var content1 = $('#'+newSelectionID).html();
  var content2 = $('#'+this.selectedCell).html();
  console.log("test: "+this.selectedCell);
  $('#'+newSelectionID).html(content2);
  $('#'+this.selectedCell).html(content1);
  console.log("test: "+this.selectedCell);


};

Game.prototype.defineSecondClickRange = function (thisId) {

  var tempArray = [];
  var tempPostion = [];
  thisId = String(thisId);
  var r = thisId.charAt(0);
  var y = 0;
  var c = thisId.charAt(2);
  var x = 0;
  var position1, position2, position3, position4;

  y = parseInt(r)-1;
  x = parseInt(c);
  position1 = y + "-" + x;
  tempArray.push(position1);
  position4 = String(position1);
  y = parseInt(r);
  x = parseInt(c)-1;
  position2 = y + "-" + x;
  tempArray.push(position2);
  position4 = String(position2);
  y = parseInt(r)+1;
  x = parseInt(c);
  position3 = y + "-" + x;
  position4 = String(position3);
  tempArray.push(position3);
  y = parseInt(r);
  x = parseInt(c)+1;
  position4 = y + "-" + x;
  position4 = String(position4);
  tempArray.push(position4);
  // console.log(tempArray);
  this.allowedClicks = tempArray;
  // console.log(this.allowedClicks);
};

Game.prototype.updateTheGrid = function () {


};


$(document).ready(function() {

  var game = new Game({
    rows: 6,
    columns: 8,
    gems: new Gems()
  });

  game.drawMainBoard();
  game.createRandomGems();
  game.eventListener();
  window.setInterval(function(){
    game.checkForMatch();
  }, 1200);

});
