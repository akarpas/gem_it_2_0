
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
  this.selectedCell = 0;
  this.match = false;
  this.secondGem = 0;
  this.timer = 0;
  this.time = 60;
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
          if (selection === "black" && this.gems.blackCounter > 0) {
            selection = _.sample(['red','redP','redB','blue','blueP','blueB','gray','gray']);
          }
          }
      }
      if (this.columnIndex === 1 || 3 || 5 || 7) {
        if (this.rowIndex === 1 || this.rowIndex === 3) {
          selection = _.sample(['green','greenB', 'greenP','purple','purple','black']);
          if (selection === "black" && this.gems.blackCounter > 0) {
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
        $(".score").text(this.score);
        this.checkMatchVertically(row,column);
        $(".score").text(this.score);
      }
  }
};

Game.prototype.checkMatchHorizontally = function (row,column) {

  var that = this;
  var totalScore = 0;
  var subScore = 0;
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
      subScore += Number(($('#'+currentID).children().attr('data-score')));
      for (hIndex; hIndex < this.columns; hIndex++) {
        if ($('#'.currentID).children().attr('id') == $('#'+row+'-'+(column+hIndex)).children().attr('id')) {
          gemsForRemoval.push($('#'+row+'-'+(column+hIndex)).attr('id'));
          subScore += Number(($('#'+row+'-'+(column+hIndex)).children().attr('data-score')));
          console.log("subscore " + subScore);
          matchCounter++;
        } else {
          return;
        }
      }
    }
    if (matchCounter >= 3) {

      this.match = true;
      totalScore += (Math.ceil(matchCounter / 3))*subScore;
      this.score += totalScore;
      console.log("score: " + totalScore);
      matchCounter = 0;
      this.removeGemsHorizontally(gemsForRemoval,row);

    }


  } else if (column === this.columns-1) {
    if ($('#'+ currentID).children().attr('id') != $('#'+row+'-'+(column-1)).children().attr('id')) {
      return;
    } else {
      matchCounter++;
      gemsForRemoval = [];
      gemsForRemoval.push($('#'+currentID).attr('id'));
      subScore += Number(($('#'+currentID).children().attr('data-score')));
      for (hIndex; hIndex < this.columns; hIndex++) {
        if ($('#'.currentID).children().attr('id') == $('#'+row+'-'+(column-hIndex)).children().attr('id')) {
          gemsForRemoval.push($('#'+row+'-'+(column-hIndex)).attr('id'));
          subScore += Number(($('#'+row+'-'+(column-hIndex)).children().attr('data-score')));
          console.log("subscore " + subScore);
          matchCounter++;
        } else {
          break;
        }
      }
    }
    if (matchCounter >= 3) {

      this.match = true;
      totalScore += (Math.ceil(matchCounter / 3))*subScore;
      this.score += totalScore;
      console.log("score: " + totalScore);
      matchCounter = 0;
      this.removeGemsHorizontally(gemsForRemoval,row);
    }
    subScore = 0;
    totalScore = 0;

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
      subScore += Number(($('#'+currentID).children().attr('data-score')));
      subScore += Number(($('#'+row+'-'+(column-hIndex)).children().attr('data-score')));
      subScore += Number(($('#'+row+'-'+(column+hIndex)).children().attr('data-score')));
      console.log("subscore " + subScore);
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
            subScore += Number(($('#'+row+'-'+(column+hIndex)).children().attr('data-score')));
          } else {
            break;
          }
      }
    }
      if (matchCounter >= 3) {

        console.log("IF3 this is a test for gems to be removed: " + gemsForRemoval);
        this.match = true;
        totalScore += (Math.ceil(matchCounter / 3))*subScore;
        this.score += totalScore;
        this.removeGemsHorizontally(gemsForRemoval,row);
        matchCounter = 0;
      }
    subScore = 0;
    totalScore = 0;
    }

    if ($('#'+ currentID).children().attr('id') === $('#'+row+'-'+(column-hIndex)).children().attr('id') &&
          $('#'+ currentID).children().attr('id') !== $('#'+row+'-'+(column+hIndex)).children().attr('id')) {
      gemsForRemoval.push($('#'+currentID).attr('id'));
      subScore += Number(($('#'+currentID).children().attr('data-score')));
      matchCounter = 2;
      gemsForRemoval.push($('#'+row+'-'+(column-hIndex)).attr('id'));
      subScore += Number(($('#'+row+'-'+(column-hIndex)).children().attr('data-score')));
      hIndex++;
      for (hIndex; hIndex < (this.columns); hIndex++) {
          if ($('#'+ currentID).children().attr('id') === $('#'+row+'-'+(column-hIndex)).children().attr('id')) {
            matchCounter++;
            gemsForRemoval.push($('#'+row+'-'+(column-hIndex)).attr('id'));
            subScore += Number(($('#'+row+'-'+(column-hIndex)).children().attr('data-score')));
          } else {
            return;
          }

      }
      if (matchCounter >= 3) {
        this.removeGemsHorizontally(gemsForRemoval,row);
        this.match = true;
        totalScore += (Math.ceil(matchCounter / 3))*subScore;
        this.score += totalScore;
        matchCounter = 0;
      }
    }

    if ($('#'+ currentID).children().attr('id') !== $('#'+row+'-'+(column-hIndex)).children().attr('id') &&
          $('#'+ currentID).children().attr('id') === $('#'+row+'-'+(column+hIndex)).children().attr('id')) {
      matchCounter = 2;
      gemsForRemoval.push($('#'+currentID).attr('id'));
      subScore += Number(($('#'+currentID).children().attr('data-score')));
      gemsForRemoval.push($('#'+row+'-'+(column+hIndex)).attr('id'));
      subScore += Number(($('#'+row+'-'+(column+hIndex)).children().attr('data-score')));
      hIndex++;
      for (hIndex; hIndex < (this.columns); hIndex++) {
        if ($('#'+ currentID).children().attr('id') === $('#'+row+'-'+(column-hIndex)).children().attr('id')) {
          matchCounter++;
          gemsForRemoval.push($('#'+row+'-'+(column+hIndex)).attr('id'));
          subScore += Number(($('#'+row+'-'+(column+hIndex)).children().attr('data-score')));
        } else {
          return;
        }
      }
      if (matchCounter >= 3) {
        totalScore = tmpScore;
        totalScore = (Math.ceil(matchCounter / 3))*subScore;
        this.match = true;
        this.removeGemsHorizontally(gemsForRemoval,row);
        matchCounter = 0;

      }
      subScore = 0;
      totalScore = 0;
    }
};

Game.prototype.checkMatchVertically = function (row,column) {

  var that = this;
  var totalScore = 0;
  var subScore = 0;
  var matchCounter = 1;
  var vIndex = 1;
  var gemsForRemoval = [];
  var counter = 0;
  var currentID;

  currentID = row + "-" + column;

  if (row === 0) {

    if ($('#'+ currentID).children().attr('id') != $('#'+(row+1)+'-'+(column)).children().attr('id')) {
      return;
    } else {
      matchCounter++;
      gemsForRemoval = [];
      gemsForRemoval.push($('#'+currentID).attr('id'));
      subScore += Number(($('#'+currentID).children().attr('data-score')));
      for (vIndex; vIndex < this.rows; vIndex++) {
        if ($('#'.currentID).children().attr('id') == $('#'+(row+vIndex)+'-'+(column)).children().attr('id')) {
          gemsForRemoval.push($('#'+(row+vIndex)+'-'+(column)).attr('id'));
          subScore += Number(($('#'+(row+vIndex)+'-'+(column)).children().attr('data-score')));
          matchCounter++;
        } else {
          return;
        }
      }
    }
    if (matchCounter >= 3) {
      matchCounter = 0;
      this.match = true;
      totalScore = (Math.ceil(matchCounter / 3))*subScore;
      this.score += totalScore;
      this.removeGemsVertically(gemsForRemoval,column);
      console.log("IF1 this is a test for gems to be removed: " + gemsForRemoval);
    }
    subScore = 0;
    totalScore = 0;

  } else if (row === this.rows-1) {

    if ($('#'+ currentID).children().attr('id') != $('#'+(row-vIndex)+'-'+(column)).children().attr('id')) {
      return;
    } else {
      matchCounter++;
      gemsForRemoval = [];
      gemsForRemoval.push($('#'+currentID).attr('id'));
      subScore += Number(($('#'+currentID).children().attr('data-score')));
      gemsForRemoval.push($('#'+(row+vIndex)+'-'+(column)).attr('id'));
      subScore += Number(($('#'+(row+vIndex)+'-'+(column)).children().attr('data-score')));
      for (vIndex; vIndex < this.rows; vIndex++) {
        if ($('#'.currentID).children().attr('id') == $('#'+(row-vIndex)+'-'+(column)).children().attr('id')) {
          gemsForRemoval.push($('#'+(row-vIndex)+'-'+(column)).attr('id'));
          subScore += Number(($('#'+(row-vIndex)+'-'+(column)).children().attr('data-score')));
          matchCounter++;
        } else {
          break;
        }
      }
    }
    if (matchCounter >= 3) {
      matchCounter = 0;
      this.match = true;
      totalScore = (Math.ceil(matchCounter / 3))*subScore;
      this.score += totalScore;
      this.removeGemsVertically(gemsForRemoval,column);
      console.log("IF2 this is a test for gems to be removed: " + gemsForRemoval);
    }
    subScore = 0;
    totalScore = 0;

  } else {

    if ($('#'+ currentID).children().attr('id') !== $('#'+(row-vIndex)+'-'+(column)).children().attr('id') &&
          $('#'+ currentID).children().attr('id') !== $('#'+(row+vIndex)+'-'+(column)).children().attr('id')) {
      return;
    }

    if ($('#'+ currentID).children().attr('id') === $('#'+(row-vIndex)+'-'+(column)).children().attr('id') &&
          $('#'+ currentID).children().attr('id') === $('#'+(row+vIndex)+'-'+(column)).children().attr('id')) {
      gemsForRemoval.push($('#'+currentID).attr('id'));
      subScore += Number(($('#'+currentID).children().attr('data-score')));
      gemsForRemoval.push($('#'+(row-vIndex)+'-'+(column)).attr('id'));
      subScore += Number(($('#'+(row-vIndex)+'-'+(column)).children().attr('data-score')));
      gemsForRemoval.push($('#'+(row+vIndex)+'-'+(column)).attr('id'));
      subScore += Number(($('#'+(row+vIndex)+'-'+(column)).children().attr('data-score')));
      matchCounter=3;
      vIndex=2;
      // ISSUE IS BECAUSE WE JUMP OVER TO NEXT GEM
        for (vIndex; vIndex < this.rows; vIndex++) {
          if ($('#'+ currentID).children().attr('id') === $('#'+(row-vIndex)+'-'+(column)).children().attr('id')) {
            matchCounter++;
            gemsForRemoval.push($('#'+(row-vIndex)+'-'+(column)).attr('id'));
            subScore += Number(($('#'+(row-vIndex)+'-'+(column)).children().attr('data-score')));
          } else {
            break;
          }
      }
      vIndex=2;
      for (vIndex; vIndex < this.rows; vIndex++) {
          if ($('#'+ currentID).children().attr('id') === $('#'+(row+vIndex)+'-'+(column)).children().attr('id')) {
            matchCounter++;
            gemsForRemoval.push($('#'+(row+vIndex)+'-'+(column)).attr('id'));
            subScore += Number(($('#'+(row+vIndex)+'-'+(column)).children().attr('data-score')));
          } else {
            break;
          }
      }
    }
      if (matchCounter >= 3) {

        console.log("IF3 this is a test for gems to be removed: " + gemsForRemoval);
        this.match = true;
        totalScore = (Math.ceil(matchCounter / 3))*subScore;
        this.score += totalScore;
        this.removeGemsVertically(gemsForRemoval,column);
        matchCounter = 0;
      }
    }

    if ($('#'+ currentID).children().attr('id') === $('#'+(row-vIndex)+'-'+(column)).children().attr('id') &&
          $('#'+ currentID).children().attr('id') !== $('#'+(row+vIndex)+'-'+(column)).children().attr('id')) {
      gemsForRemoval.push($('#'+currentID).attr('id'));
      subScore += Number(($('#'+currentID).children().attr('data-score')));
      matchCounter = 2;
      gemsForRemoval.push($('#'+(row-vIndex)+'-'+(column)).attr('id'));
      subScore += Number(($('#'+(row-vIndex)+'-'+(column)).children().attr('data-score')));
      vIndex++;
      for (vIndex; vIndex < (this.rows-1); vIndex++) {
          if ($('#'+ currentID).children().attr('id') === $('#'+(row-vIndex)+'-'+(column)).children().attr('id')) {
            matchCounter++;
            gemsForRemoval.push($('#'+(row-vIndex)+'-'+(column)).attr('id'));
            subScore += Number(($('#'+(row-vIndex)+'-'+(column)).children().attr('data-score')));
          } else {
            return;
          }

      }
      if (matchCounter >= 3) {
        this.removeGemsVertically(gemsForRemoval,column);
        this.match = true;
        totalScore += (Math.ceil(matchCounter / 3))*subScore;
        this.score += totalScore;
        matchCounter = 0;
      }
    }

    if ($('#'+ currentID).children().attr('id') !== $('#'+(row-vIndex)+'-'+(column)).children().attr('id') &&
          $('#'+ currentID).children().attr('id') === $('#'+(row+vIndex)+'-'+(column)).children().attr('id')) {
      matchCounter = 2;
      gemsForRemoval.push($('#'+currentID).attr('id'));
      subScore += Number(($('#'+currentID).children().attr('data-score')));
      gemsForRemoval.push($('#'+(row+vIndex)+'-'+(column)).attr('id'));
      subScore += Number(($('#'+(row+vIndex)+'-'+(column)).children().attr('data-score')));
      vIndex++;
      for (vIndex; vIndex < (this.rows-1); vIndex++) {
        if ($('#'+ currentID).children().attr('id') === $('#'+(row-vIndex)+'-'+(column)).children().attr('id')) {
          matchCounter++;
          gemsForRemoval.push($('#'+(row+vIndex)+'-'+(column)).attr('id'));
          subScore += Number(($('#'+(row+vIndex)+'-'+(column)).children().attr('data-score')));
        } else {
          return;
        }
      }
      if (matchCounter >= 3) {
        this.match = true;
        totalScore += (Math.ceil(matchCounter / 3))*subScore;
        this.score += totalScore;
        this.removeGemsVertically(gemsForRemoval,column);
        matchCounter = 0;

      }
      subScore = 0;
      totalScore = 0;
    }
    subScore = 0;
    totalScore = 0;
};

Game.prototype.removeGemsHorizontally = function (gemsForRemoval,rowMark) {

  var that = this;
  var audio2 = new Audio('./sounds/break.mp3');
  var removalIndex = 0;
  var p1, p2;
  var temp;
  var arrayMemory = [];
  var arrayKeep = [];
  var tmpScore = 0;
  var blackCounter = 0;
  var tempBlack;

  for (var i = 0; i < 3; i++) {
    tempBlack = gemsForRemoval[i];
    console.log("this is the tempBlack: "+ tempBlack);
    console.log("this is the type of the black gems: " + $('#'+tempBlack).children().attr('data-type'));
    if ($('#'+tempBlack).children().attr('data-type') === 'black') {
      blackCounter++;
    }
  }

  if (blackCounter >= 3) {
    $('.gems').css('opacity','0.5').css('filter', 'grayscale(100%)');
    $('.col-md-1').off('click');
    $('.gameboard').append("<div class='gameover'><strong>Game Over!</strong><br> You Crashed 3 or More Black Gems!!!<br>");
    clearInterval(that.timer);
  }

  for (rowMark; rowMark > -1; rowMark--) {
    for (removalIndex; removalIndex<gemsForRemoval.length; removalIndex++) {
      temp = gemsForRemoval[removalIndex];
      this.checkGemType(temp);
      $('#'+temp).remove();
      this.addGems();
    }
  }
  audio2.play();
  this.updateID();
};

Game.prototype.removeGemsVertically = function (gemsForRemoval,columnMark) {

  var audio2 = new Audio('./sounds/break.mp3');
  var removalIndex = 0;
  var p1, p2;
  var temp;
  var sorted = [];
  var tmpScore = 0;
  var blackCounter = 0;
  var tempBlack;

  gemsForRemoval.sort();

  for (var i = 0; i < 3; i++) {
    tempBlack = gemsForRemoval[i];
    console.log("this is the tempBlack: "+ tempBlack);
    console.log("this is the type of the black gems: " + $('#'+tempBlack).children().attr('data-type'));
    if ($('#'+tempBlack).children().attr('data-type') === 'black') {
      blackCounter++;
    }
  }

  if (blackCounter >= 3) {
    $('.gems').css('opacity','0.5').css('filter', 'grayscale(100%)');
    $('.col-md-1').off('click');
    $('.gameboard').append("<div class='gameover'><strong>Game Over!</strong><br> You Crashed 3 or More Black Gems!!!<br>");
  }

  for (columnMark; columnMark > -1; columnMark--) {
    for (removalIndex; removalIndex<gemsForRemoval.length; removalIndex++) {
      temp = gemsForRemoval[removalIndex];
      this.checkGemType(temp);
      $('#'+temp).remove();
      this.addGems();
    }
  }
  audio2.play();
  this.updateID();
};

Game.prototype.checkGemType = function (temp) {

  var that = this;
  var type = $('#'+temp).children().attr('data-type');
  var color = $('#'+temp).children().attr('id');
  color = Number(color);

  if (type === 'bomb') {
    if (color === 1) {
      $(".cell").each(function(index,cell){
        if ($(cell).children().attr('id') === '1') {
          that.score += Number($(this).children().attr('data-score'));
          $(cell).remove();
          that.addGems();
          that.updateID();
        }
      });
    }
    if (color === 2) {
      $(".cell").each(function(index,cell){
        if ($(cell).children().attr('id') === '2') {
          that.score += Number($(this).children().attr('data-score'));
          $(cell).remove();
          that.addGems();
          that.updateID();
        }
      });
    }
    if (color === 3) {
      $(".cell").each(function(index,cell){
        if ($(cell).children().attr('id') === '3') {
          that.score += Number($(this).children().attr('data-score'));
          $(cell).remove();
          that.addGems();
          that.updateID();
        }
      });
    }
  }
  if (type === 'bonus') {
    that.score += 5000;
    $(".score").text(this.score);
    that.time += 3;
  }

};

Game.prototype.addGems = function () {

  var that = this;
  var gemCounter = 0;
  $(".col-md-1").each(function(index1,collumn){
    var thisId = $(collumn).attr('id');
    $(collumn).children().each(function(index2,theCell) {
      gemCounter++;
    });
    if (gemCounter < that.rows) {
      var selection = _.sample(['red','red','red','red','redP','redB','blue','blue','blue','blue','blueP','blueB','purple','purple','gray','black','gray','gray']);
      var newCell = ($('<div/>').attr("class","cell"));
      $("#"+thisId).prepend(newCell);
      that.updateID();
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
    console.log("this is the selected cell out of if: " + that.selectedCell);
    console.log("counter out of if: " + that.clickCounter);
    if (that.selectedCell === 0 && that.clickCounter === 0) {
      if ($(e.target).attr("data-type") === "black") {
        that.score -= 5000;
        $(".score").text(that.score);
      }
      $(e.target).parent().css('background-color','rgb(242, 206, 50)');
      that.selectedCell = $(e.target).parent().attr('id');
      that.defineSecondClickRange(that.selectedCell);
      that.clickCounter = 1; // ISSUE HERE - SECOND TIME CELL DOES NOT HIGHLIGHT
      console.log("this is the selected cell if1: " + that.selectedCell);
      console.log("counter if1: " + that.clickCounter);
    } else if (that.selectedCell === $(e.target).parent().attr('id') && that.clickCounter === 1 ) {
      $(e.target).parent().css('background-color','');
      that.clickCounter = 0;
      that.selectedCell = 0;
      console.log("this is the selected cell if2: " + that.selectedCell);
      console.log("counter if2: " + that.clickCounter);
    } else if ($.inArray(($(e.target).parent().attr('id')), that.allowedClicks) != -1) {
      if ($(e.target).attr("data-type") === "black") {
        that.score -= 5000;
        $(".score").text(that.score);
      }
      that.secondGem = ($(e.target).parent().attr('id'));
      that.swapGems();
      $('#'+that.selectedCell).css('background-color','');
      that.checkForMatch();
      that.updateID();
      that.clickCounter = 0;
      console.log("this is the selected cell if3: " + that.selectedCell);
      console.log("counter if3: " + that.clickCounter);
      that.selectedCell = 0;
    }
  });
};

Game.prototype.swapGems = function() {

  this.match = false;
  var content1 = $('#'+this.secondGem).html();
  var content2 = $('#'+this.selectedCell).html();
  $('#'+this.secondGem).html(content2);
  $('#'+this.selectedCell).html(content1);
  var tempId1 = $('#'+this.secondGem).attr('id');
  var tempId2 = $('#'+this.selectedCell).attr('id');
  setTimeout(function() {
    if (this.match === false) {
      $('#'+tempId1).html(content1);
      $('#'+tempId2).html(content2);
    }
  }.bind(this),1200);

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
    gems: new Gems(),
  });

  var audio1 = new Audio('./sounds/beep.wav');

  game.drawMainBoard();
  game.createRandomGems();

  $('.gems').css('opacity','0.5').css('filter', 'grayscale(100%)');
  $("#start").fadeIn(400).fadeOut(400).fadeIn(400).fadeOut(400).fadeIn(400).fadeIn(400).fadeOut(400).fadeIn(400).fadeOut(400).fadeIn(400);
  $("#start").on("click",function() {
    $('.gems').css('opacity','1').css('filter', '');
    $('.gameover').remove();
    window.clearInterval(game.timer);
    game.time = 60;
    game.timer = setInterval(function() {
      game.time -= 1;
      $(".timer").text(game.time);
      if (game.time < 11) {
        $(".timer").addClass('redColor');
        audio1.play();
      }
      if (game.time === 0) {
        clearInterval(game.timer);
        $('.gems').css('opacity','0.5').css('filter', 'grayscale(100%)');
        $('.col-md-1').off('click');
        $('.gameboard').append("<div class='gameover'><strong>Game Over!</strong><br> Your Final Score:<br> <div id=\"finalscore\">0</div></div>");
        $('#finalscore').text(game.score);
      }
    },1000);
    game.eventListener();

  });

  window.setInterval(function(){
    game.checkForMatch();
  }, 900);

});
