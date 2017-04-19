
function Game(options) {
  this.rows = options.rows;
  this.columns = options.columns;
  this.gems = options.gems;
  this.rowCounter = 0;
  this.rowIndex = 0;
  this.columnIndex = 0;
  this.score = 0;
  this.match = false;
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

Game.prototype.gemPicker = function(selection,theCell) {
  var that = this;
  var tempId;
  // that.gems.gemCounter++;
  switch (selection) {
    case "red":
      $('#'+theCell).prepend(that.gems.gems[0].image);
      $('#'+theCell).children().attr('id',that.gems.gems[0].number);
      that.gems.redCounter++;
    break;
    case "blue":
      $('#'+theCell).prepend(that.gems.gems[3].image);
      $('#'+theCell).children().attr('id',that.gems.gems[3].number);
      that.gems.blueCounter++;
    break;
    case "green":
      $('#'+theCell).prepend(that.gems.gems[6].image);
      $('#'+theCell).children().attr('id',that.gems.gems[6].number);
      that.gems.greenCounter++;
    break;
    case "redP":
      $('#'+theCell).prepend(that.gems.gems[1].image);
      $('#'+theCell).children().attr('id',that.gems.gems[1].number);
      that.gems.redCounter++;
      that.gems.prizeCounter++;
    break;
    case "blueP":
      $('#'+theCell).prepend(that.gems.gems[4].image);
      $('#'+theCell).children().attr('id',that.gems.gems[4].number);
      that.gems.blueCounter++;
      that.gems.prizeCounter++;
    break;
    case "greenP":
      $('#'+theCell).prepend(that.gems.gems[7].image);
      $('#'+theCell).children().attr('id',that.gems.gems[7].number);
      that.gems.greenCounter++;
      that.gems.prizeCounter++;
    break;
    case "redB":
      $('#'+theCell).prepend(that.gems.gems[2].image);
      $('#'+theCell).children().attr('id',that.gems.gems[2].number);
      that.gems.redCounter++;
      that.gems.bombCounter++;
    break;
    case "blueB":
      $('#'+theCell).prepend(that.gems.gems[5].image);
      $('#'+theCell).children().attr('id',that.gems.gems[5].number);
      that.gems.blueCounter++;
      that.gems.bombCounter++;
    break;
    case "greenB":
      $('#'+theCell).prepend(that.gems.gems[8].image);
      $('#'+theCell).children().attr('id',that.gems.gems[8].number);
      that.gems.greenCounter++;
      that.gems.bombCounter++;
    break;
    case "gray":
      $('#'+theCell).prepend(that.gems.gems[9].image);
      $('#'+theCell).children().attr('id',that.gems.gems[9].number);
      that.gems.grayCounter++;
    break;
    case "purple":
      $('#'+theCell).prepend(that.gems.gems[10].image);
      $('#'+theCell).children().attr('id',that.gems.gems[10].number);
      that.gems.grayCounter++;
    break;
    case "black":
      $('#'+theCell).prepend(that.gems.gems[11].image);
      $('#'+theCell).children().attr('id',that.gems.gems[11].number);
      that.gems.blackCounter++;
    break;
  }
};

Game.prototype.createRandomGems = function () {

  var randomize, randomizerSafe;
  var selection, selectionSafe;
  var arrayGems = this.gems.gems;
  var tempArrayGems = [];
  var counter = 0;
  var counterCol = 0;
  this.rowIndex = 0;
  console.log(arrayGems);

  for (var i=9; i < arrayGems.length; i++) {
    tempArrayGems.push(arrayGems[i].name);
  }

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
      //
      //   } else {
      //       randomizer = Math.floor(Math.random()*(tempArrayGems.length));
      //       selection = _.sample(['red','blue','gray']);
      //       if (selection === "black" && this.gems.blackCounter > 2) {
      //         selection = _.sample(['green','purple','gray']);
      //       }
      //   }
      // }

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
        console.log("this is the selection: " + selection);
        this.gemPicker(selection,cellId);
        // here you need to update the grid


        this.rowIndex++; // this is needed in order to track at which row we are at each column
                         // it is also possible to use it to add an id to the gem
  }.bind(this));
  console.log(counter);
  console.log(counterCol);

};


$(document).ready(function() {

  var game = new Game({
    rows: 6,
    columns: 8,
    gems: new Gems()
  });

  game.drawMainBoard();
  game.createRandomGems();

});
