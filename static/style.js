
function changeColor(id, newColor) 
{
	var word = document.getElementById(id);
	word.style.color = newColor;
}

function submitForm()
{
	document.getElementById('form1').submit();
}

var answers = [ 18 , 7 , 1, 3 ];

function myAnswer(answer_list) 
{
	var x = answer_list[Math.floor(Math.random() * (answer_list.length))]
	var x = Number(x);
	var index = answer_list.indexOf(x);
	answer_list.splice(index,1);
	return x; //president answer and key 
}

var pres_dict = {

18 : ["(6 pts.) During the year 2000, three novels were published about me." +
	" One historian has written: “It’s [his] essential ordinariness that keeps " +
	" him interesting and appealing.” I was a man of few words. Son of a tanner," +
	" I was born in a northern state in a house just one step up from a log cabin.",

	"(4 pts.) My father Jesse was an abolitionist, but my father-in-law Frederick" +
	" Dent was pro-slavery. “Horses seem to understand [him],” my mother Hannah once"+
	" said about me.",

	"(2 pts.) My secretary of the treasury, William Richardson, was forced to resign "+
	"after it was discovered he allowed a tax collector to keep 50 percent of the "+
	"delinquent taxes he tracked down. Also the notorious “Whiskey Ring” stole"+
	" millions of dollars in liquor taxes."],	

7 :	["(6 pts.) I delivered my inaugural address on the platform under the eastern portico "  + 
	"of the Capitol, starting a trend that has continued to the present. I vetoed far more " +
	"bills than any previous president. None of my vetoes were overridden by Congress. Most " +
	"of these vetoes involved bills for building roads or improving harbors.",

	"(4 pts.) I rode to see my successor inaugurated in a carriage made of the wood of the " +
	"frigate Constitution. That successor had been my vice president for my second term.",

	"(2 pts.) My wife lacked the social training of earlier First Ladies; she and I had not " +
	"traveled to Europe, were unacquainted with most of the classics of literature, and were unfamiliar " +
	"with East Coast drawing room etiquette. As a result, we became the focus of critical gossip and " +
	"heard our grammar and accents mimicked."],

3 : ["(6 pts.) I urged Congress to sweep away just about all the taxes that had been imposed on " +
	"the American people. During my first term as president, the whiskey tax (as well as other similar, " +
	"direct taxes) was repealed.",

	"(4 pts.) I was so much opposed to show and form in government that I wanted Washington to be " +
	"inaugurated in 1793 in his house, privately, without show or speech of any kind. I also believed " +
	"that in America, as opposed to France, women knew their place, which was in the nursery. American " +
	"women, I said, were content with 'the tender and tranquil amusements of domestic life.'",

	"(2 pts.) I organized my library into three sections: Memory, Reason, and Imagination. My " +
	"library later formed the core of the Library of Congress."],

1 : ["(6 pts.) At age 26, I was described this way: “His frame is padded with " + 
	"well-developed muscles, indicating great strength … His mouth is large and " +
	"generally firmly closed, but which from time to time discloses some defective " +
	"teeth.” The first Congress of my presidency was more than a month late in assembling " +
	"and officially verifying my election. ",

	"(4 pts.) During my first year in office, I toured New England alone on horseback " +
	"for 28 days. In Boston, Governor John Hancock did not welcome me; so I stayed at " +
	"a boarding house." ,

	"(2 pts.) With the passing years, my doubts about slavery grew. I noted the parallel " +
	"between the “arbitrary rule of Britain over the American colonies and the ‘arbitrary " +
	"sway’ of Virginians over their … slaves.” I provided for the freeing of my slaves at " +
	"my wife’s death and guaranteed their support. In the 1830s, payments were still being " +
	"made to my aging freedmen."]
};


var count = 0;


var score = JSON.parse(sessionStorage.getItem('score'));
var correct = myAnswer(answers);

console.log(correct);

function which_clue(dictionary,key){
	if (count == 2) {		
		return [dictionary[key][2], '2point', count];
	}
	else if (count == 1) {	
		return [dictionary[key][1], '4point', count];
	}
	else {
		return [(dictionary[key][0]), '6point', count];
	}

};


function onClick() {
	printClue(which_clue(pres_dict, correct));
	document.getElementById('count').innerHTML = count;
	count = count + 1;
	return count;

};

function printClue(answer_array) {
	var clue_num = answer_array;
	var clue = clue_num[0];
	var ID = clue_num[1];
	document.getElementById(ID).innerHTML = clue;
}

function changeColor(new_color) {
	document.body.style.backgroundColor = new_color;
}

function checkAnswer(right,guess,points) {
	var point_worth;
	if (guess == right) {
		if (points <= 1) {
			point_worth = 6;
			score += 6;
			changeColor("#00FF00");
			return [score, point_worth];
		}
		else if (points == 2) {
			point_worth = 4;
			score += 4;
			changeColor("#00FF00");
			return [score, point_worth];
		}
		else {
			point_worth = 2;
			score +=2;
			changeColor("#00FF00");
			return [score, point_worth];		}
	}
	else {
		changeColor('#F75D59');
		return [score, point_worth];
	}
}

var hidden = true;
function show(elementId) {
	hidden = !hidden;
	if (hidden) {
		document.getElementById(elementId).disabled = true; 
	}
	else {
		document.getElementById(elementId).disabled = false
	}
}

function newScore(elementId,point_num) {
	if (point_num == null) {
		point_num = 0;
	}
	document.getElementById(elementId).innerHTML = "Score = " + point_num;
}

function pointsGot(elementId,point_get) {
	if (point_get == undefined) {
		point_get = 0;
	}
	document.getElementById(elementId).innerHTML = point_get + ' Points'
}


function submitAnswer() {
	var input = document.getElementById('button').value;
	var final_count = which_clue(pres_dict,correct);
	var score_total = checkAnswer(correct, input, final_count[2]); 
	newScore('score', score_total[0]);
	pointsGot('points', score_total[1]);
	show('next_question');
	hide.disabled = true;
}


function reloadPage() {
	sessionStorage.setItem('score', JSON.stringify(score));
	window.location.reload();
}





