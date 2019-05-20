document.getElementsByName("search")[0].addEventListener('change',bringBackImage);
function similarity(s1, s2) {
		var longer = s1;
		var shorter = s2;
		if (s1.length < s2.length) {
			longer = s2;
			shorter = s1;
		}
		var longerLength = longer.length;
		if (longerLength === 0) {
			return 1.0;
		}
		return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
	}

function editDistance(s1, s2) {
	s1 = s1.toLowerCase();
	s2 = s2.toLowerCase();

	var costs = new Array();
	for (var i = 0; i <= s1.length; i++) {
		var lastValue = i;
		for (var j = 0; j <= s2.length; j++) {
			if (i == 0)
				costs[j] = j;
			else {
				if (j > 0) {
					var newValue = costs[j - 1];
					if (s1.charAt(i - 1) != s2.charAt(j - 1))
						newValue = Math.min(Math.min(newValue, lastValue),
							costs[j]) + 1;
					costs[j - 1] = lastValue;
					lastValue = newValue;
				}
			}
		}
		if (i > 0)
			costs[s2.length] = lastValue;
	}
		return costs[s2.length];
	}


function bringBackImage(){
	console.log(this.value,this.value.trim.length);
	if (this.value.trim.length==0)
	{
		document.getElementById("bgid").style.backgroundImage = 'url(static/img/d.jpg)';
		document.getElementById("footerid").style.display = "block";

	}
}

		var app = new Vue({
				el: '#app',
				data: {
						message: 'Hello Vue!',
						hidden_result:[],
						source:[],
						query: ''
				},
				methods: {
						search: function() {
												var elems = document.querySelectorAll("[id='d']");
												for(var i = 0; i <elems.length;i++)
												{
													elems[i].remove();
												}
												// $("#d").remove()
												// console.log(this.source.length);
												var query  = document.getElementById('search').value;
												if (query.length > 0)
												{
													var jsonld = JSON.parse(document.querySelector('script[type="application/ld+json"]').innerText);
													console.log(jsonld.itemListElement);
													var data =  jsonld.itemListElement;
													var list = []
													for(var i in data){
														var values = $.map(data[i]['item'],function(value,key){return value});
														var simi = []
														for (var j in values){
															cur_sim = Math.round(similarity(query,values[j].toString())*10000)/100;
															simi.push(cur_sim)
															}
														var s_value = simi.sort((a,b) => a>b).slice(0,3);
														var s_sum = s_value.reduce(function(a,b){return a+b;},0);
														list.push({key:data[i],value:s_sum});
														}
													list.sort((a, b) => (a.value < b.value) ? 1 : -1)
													console.log(list);
													for(var i in list)
													{
														// console.log("aaa");
														// console.log(list[i].key);
														// var count = Object.keys(data[i]["_source"]).length ;
														// console.log(count);

															if (i < 6) {
																$('#result_box').append("<div class=\"col-md-3\"  id=\"d\" ><div class=\" panel panel-default \"><div class=\"panel-heading\" style=\"background-color:#91ffa1;\">"+list[i].key["item"]["keywords"]+", "+list[i].key["item"]["keywords"]+", <br>"+list[i].key["item"]["keywords"]+"</div><div class=\"panel-body\" style = \"color:#000000;\"><p><b>Event: </b> "+list[i].key["item"]["keywords"]+", <br><b>tags: </b>"+list[i].key["item"]["keywords"]+".</p></div></div>")
														}
													}

													list = [];
													document.getElementById("bgid").style.backgroundImage = 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/2000px-Solid_white.svg.png)';
													document.getElementById('text').style.color = "black";
													document.getElementById("footerid").style.display = "none";
												}
												else
												{
													document.getElementById("bgid").style.backgroundImage = 'url(static/img/d.jpg)';
													document.getElementById('text').style.color = "white";
													document.getElementById("footerid").style.display = "block";
												}
										}
				},
				watch: {
						query: function(){
							this.search();
						}
				}

		})
