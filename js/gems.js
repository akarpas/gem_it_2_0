function Gems() {
  this.colors = ['red','redP','redB','blue','blueP','blueB','gray','green','greenB','greenP','purple','black'];
  this.gems = [
    {name: "red", number: '1-a', image: "<img class=\"gems\" src=\"./images/red_gem.png\" alt=\"\">"},
    {name: "redP", number: '1-c', image: "<img class=\"gems\" src=\"./images/red_gem_bonus.png\" alt=\"\">"},
    {name: "redB", number: '1-b', image: "<img class=\"gems\" src=\"./images/red_bomb.png\" alt=\"\">"},
    {name: "blue", number: '2-a', image: "<img class=\"gems\" src=\"./images/blue_gem.png\" alt=\"\">"},
    {name: "blueP", number: '2-c', image: "<img class=\"gems\" src=\"./images/blue_gem_bonus.png\" alt=\"\">"},
    {name: "blueB", number: '2-b', image: "<img class=\"gems\" src=\"./images/blue_bomb.png\" alt=\"\">"},
    {name: "green", number: '3-a', image: "<img class=\"gems\" src=\"./images/green_gem.png\" alt=\"\">"},
    {name: "greenP", number: '3-c', image: "<img class=\"gems\" src=\"./images/green_gem_bonus.png\" alt=\"\">"},
    {name: "greenB", number: '3-b', image: "<img class=\"gems\" src=\"./images/green_bomb.png\" alt=\"\">"},
    {name: "gray", number: '4-a' , image: "<img class=\"gems\" src=\"./images/gray_gem.png\" alt=\"\">"},
    {name: "purple", number: '5-a', image: "<img class=\"gems\" src=\"./images/purple_gem.png\" alt=\"\">"},
    {name: "black", number: '6-a', image: "<img class=\"gems\" src=\"./images/black_gem_circle.png\" alt=\"\">"}];
  this.blackCounter = 0;
  this.prizeCounter = 0;
  this.bombCounter = 0;
  this.redCounter = 0;
  this.blueCounter = 0;
  this.greenCounter = 0;
  this.yellowCounter = 0;
  this.grayCounter = 0;
  this.gemCounter = 0;
}
