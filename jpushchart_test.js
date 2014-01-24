(function($){
	//highchart options 值设置
	Highcharts.setOptions({
		global : {
			useUTC : false
		}
	});
	$.fn.jpushchart = function(options) {
		var defaultOpt = {
			type:1,
			jcode:'',
			zoomType: 'false',
			borderWidth:'0',
			width:500,//设置图表的宽度，建议在只有一个图表的时候修改
			allowPointSelect:false,
			seriesColor:'#4d82aa',
			crosshairs:true,
			xAxis_type:'datetime',
			time_type:'1',//设置请求的数据格式
			request_data:{},//请求数据
			alarmValue:'',//设置警告线的值
			alarmText:'',
			alarmValue2:'',//设置警告线的值
			alarmText2:'',
			request_url:'',//设置动态请求地址
			setTimeopen:false,//设置是否开启动态更新
			setTimeinterval:1000,//设置更新间隔时间
			setTimePicker:true//是否开启日期选择

		}
		var obj = $.extend(defaultOpt,options);
		var chartObj = $(this);
		jQuery.ajaxSettings.traditional = true;
		/*if(obj.setTimePicker){
			$('body').prepend('<form id="form" action="/" method="get" class="form-inline"><label>时间范围：</label><label class="radio"><input id="timeType_m" type="radio" class="redios" name="time_type" value="m" onchange="sectype()" checked="checked">分钟</label><label class="radio"><input id="timeType_h" type="radio" class="redios"  name="time_type" value="h" onchange="sectype()">小时</label><label class="radio">  <input id="timeType_d" type="radio" class="redios"  name="time_type" value="d" onchange="sectype()">天</label><label for=/"from/">From</label><input type="text" id="from" name="sTime" class="time" value="2013-12-03"><label for="to">to</label><input type="text" id="to" name="eTime" class="time" value="2013-12-22"><button type="submit">查询</button></form>');
			var sTime= '';
			$(function() {
				$( "#from" ).datepicker({
					defaultDate: "+1w",
					changeMonth: true,
					onClose: function( selectedDate ) {
						$( "#to" ).datepicker( "option", "minDate", selectedDate );
					},
					onSelect:function(selectedDate){
						sTime = selectedDate;
					}	
				});
				$( "#to" ).datepicker({
					defaultDate: "+1w",
					changeMonth: true,
					onClose: function( selectedDate ) {
						$( "#from" ).datepicker( "option", "maxDate", selectedDate );
					},
					onSelect:function(selectedDate){
						eTime = selectedDate;
					}	
				});
			});
				

		}//end if 
		*/

		$.ajax({
			type:'GET',
			url:obj.jcode,
			data: obj.request_data,
            dataType: 'json',
			
			error:function(){
				console.log('error happend')
			},
			success:function(data){
				// var jdata = $.parseJSON(data);
                var jdata = data;
                // console.log('jdata: '+jdata);
				var jdata = data;
				var jchart = [];
				var newDiv = [];
				var loaded = false;
				for(var i = 0; i < jdata.response.length; i++){
					newDiv.push('<div id="jChart_container'+i+'\" style="width:500px;height:300px;float:left;">'+'</div>');
					chartObj.append(newDiv[i]);
					var jname = jdata.response[i].name;
					if(obj.type == 1){
						jchart['jname'] = new Highcharts.Chart({
							chart:{
								renderTo:'jChart_container'+i,
								zoomType:obj.zoomType,
								borderWidth:obj.borderWidth,
								borderWidth: 1,
								width:obj.width
							},
							title:{
								text:jdata.response[i].title
							},
							subtitle:{
								text:jdata.response[i].subtitle
							},
							xAxis: {
								type:obj.xAxis_type
							},
							yAxis: {
								allowDecimals: false,
								title: {
									text: jdata.response[i].yAxis_text
								},
								plotLines:[{
									value:obj.alarmValue,
									color:'red',
									dashStyle : 'shortdash',
									width : 2,
									label : {
										text : obj.alarmText
									}
								},
								{
									value:obj.alarmValue2,
									color:'red',
									dashStyle : 'shortdash',
									width : 2,
									label : {
										text : obj.alarmText2
									}
								}]

							},
							tooltip:{
								crosshairs: obj.crosshairs,
								formatter: function() {
									var header = '<b>时间: ' + Highcharts.dateFormat('%Y-%m-%e %H:%M:%S', this.x);
									var label = '<br/><span style="color:' + this.point.series.color + '">实时数据:'+ this.point.y.toFixed(2)+'</span> ';
									if (label != "") {
										return header + label;
									} else {
										return false;
									}
								}
							},
							credits: {
								text: 'jpush.cn',
								href: 'http://www.jpush.cn'
							},
							plotOptions: {
								series: {
									allowPointSelect: obj.allowPointSelect
								}
							}
							
						});//end jchart
						for(var j = 0; j <jdata.response[i].series.length; j++){
							jchart['jname'].addSeries({
								name:jdata.response[i].series[j].yAxis_text,
								type:jdata.response[i].series[j].show_type,
								data:jdata.response[i].series[j].data
							})
								
						}//end for
					}//end if
					else if(obj.type == 2){
						var seriesOptions = [];
						jchart['jname'] = new Highcharts.StockChart({
							chart:{
								renderTo:'jChart_container'+i,
								borderWidth:obj.borderWidth,
								borderWidth: 1,
								width:obj.width
							},
							title:{
								text:jdata.response[i].title
							},
							subtitle:{
								text:jdata.response[i].subtitle
							},
							rangeSelector: {
                                enabled:false,
								selected: 1,
								buttons: [{
									count: 1,
									type: 'minute',
									text: '1M'
								}, {
									count: 5,
									type: 'minute',
									text: '5M'
								}, {
									type: 'all',
									text: 'All'
								}]
	   						},
                            navigator: {
                                enabled: false
                            },
							xAxis: {
								type:obj.xAxis_type
							},
							yAxis: {
								allowDecimals: false,
								title: {
									text: jdata.response[i].yAxis_text
								},
								plotLines:[{
									value:obj.alarmValue,
									color:'red',
									dashStyle : 'shortdash',
									width : 2,
									label : {
										text : obj.alarmText
									}
								},
								{
									value:obj.alarmValue2,
									color:'red',
									dashStyle : 'shortdash',
									width : 2,
									label : {
										text : obj.alarmText2
									}
								}]
							},
							tooltip:{
								crosshairs: obj.crosshairs,
								 xDateFormat:'%Y-%m-%e %H:%M:%S'

							},
							credits: {
								text: 'jpush.cn',
								href: 'http://www.jpush.cn'
							}
						});//end jchart
						
						for(var j = 0; j <jdata.response[i].series.length; j++){
							jchart['jname'].addSeries({
								name:jdata.response[i].series[j].yAxis_text,
								data:jdata.response[i].series[j].data
							},false);
							//console.log(jchart['jname'].xAxis.length)
							jchart['jname'].xAxis[0].setExtremes();
							
						}//end for

					}//end else if
				}//end for
				if(obj.setTimeopen){
				var params = jdata.responsetime;
				var report_name_push = [];
				for(var k in jdata.response){
					report_name_push.push(jdata.response[k].name);
				}
				setInterval(function(){
				$.ajax({
					url: obj.request_url,
					data:{"report_name":report_name_push,"timestamp":params},
                    dataType: 'json',
					cache:false,
				    success:function(data){
                        if(data.responsetime){
						    params = data.responsetime;
                            }
							for ( var a = 0; a < data.response.length; a++){
								var jrname = data.response[a].name;
								console.log(jrname);
								console.log(jname);
								console.log(jchart['jname'])
								console.log(jchart['jrname'])
								for( var b = 0; b < data.response[a].value.length;b++){
									jchart['jname'].series[b].addPoint(data.response[a].value[b],true,true);
								}
							}
						
					}//end success
				})//end ajax
			},obj.setTimeinterval)//end setInterval
				}//end if

					}//end success

				})//end ajax
				



			}
	
})(jQuery)
