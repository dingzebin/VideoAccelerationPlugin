/**
 * 定时任务:记录学习进度
 */
var actualCode = `function recordStudyProgress(){
	console.log('注入代码执行--------------')
	var isshowcon =$("#isshowcon").val();//判断是否记录时长
	//console.log("不拖动视屏");
	//console.log(isshowcon);
	if(isshowcon!=undefined && isshowcon != 'true' ){ //只有在后台设置的视屏时长记录时间内才会记录视屏观看进度 
		//console.log("记录时间");
	if(canContinue==false){
		checkEquipment(4);
	}
	playTime++;
	videos = CKobject.getObjectById('ckplayer_player').getStatus();		/* 视频播放的时候.取出当前视频播放的对象 */
	if(videoPoint!=undefined && lastPoint!=videoPoint){
		if(playOrStop == true && parseFloat(videoPoint)-parseFloat(g)>1){
			var tempG = parseInt(g);
			if(g>=3){
				tempG = parseInt(g)-1;
			}
			var sp=$("#video_studentId").val();
			var yd=$("#video_yearId").val(); 
			var o=$("#video_term").val();  
			var cd=$("#video_courseId").val(); 
			var yn=$("#video_mateId").val(); 
			var zzxc=$("#video_spsc").val();
			var tmepvideoPoint=videoPoint;
			if(parseInt(zzxc)-parseInt(tmepvideoPoint)<2){
				tmepvideoPoint=zzxc;
			}
			var c=Base64.encode(sp)+"12-"+Base64.encode(cd)+"35-"+Base64.encode(yd)+"47-"+Base64.encode(o)+"78-"+Base64.encode(yn)+"25-"+Base64.encode(yd)+Base64.encode(tempG)+"-"+Base64.encode(sp)+Base64.encode(parseInt(tmepvideoPoint))+"-"+Base64.encode("33");
			var sign=hex_md5(sp+yn+parseInt(tmepvideoPoint)+"-"+tempG);
			if(sp==undefined||sp==null||sp==""){
				return;
			}
			g=videoPoint;
			lastPoint = videoPoint;
			if(userChoiceContinueShowVideo){
				addArr(param);
			}
			var param="key="+Base64.encode(c)+"&sign="+sign;
			$.ajax({/*向后台传递信息*/
				url: Global_basepath+'courseLearnControler.do?getLearningTracesByTimerFromPage&'+param,	
				async: true,
				type: 'POST',
				error: function(XMLHttpRequest,textStatus,errorThrown) {
					ajaxv4(Global_basepath+'courseLearnControler.do?getLearningTracesByTimerFromPage&'+param,function(data){
						console.log(data);
					},function(errCode){
						alert("网络错误，记录观看进度失败，请联系管理员！");
		        		CKobject.getObjectById('ckplayer_player').videoPause();//暂停视频 
					});
					
					

					
				},
				success: function(d){
					
					
					var jsonDataObj = JSON.parse(d);
					var jsonDataobj = JSON.parse(jsonDataObj);
					if(!jsonDataobj.success){
						alert("网络错误，可能会导致视频进度丢失！是否继续观看");
						if(!userChoiceContinueShowVideo){
							addArr(param);
							$("#errorTip").show();
							//切换视频播放状态
							continueShowVideo(false);
							crenteTipModal("网络错误，可能会导致视频进度丢失！是否继续观看","continueShowVideo("+true+")");
						}
					}else{
						$("#errorTip").text("网络正常！");
						userChoiceContinueShowVideo = false;
						for(var i = 0 ; i<paramArr.length;i++){
							if(paramArr[i]!=""){
								$.ajax({/*向后台传递信息*/
									url: Global_basepath+'courseLearnControler.do?getLearningTracesByTimerFromPage&'+paramArr[i],	
									async: false,
									type: 'POST',
									error: function(XMLHttpRequest,textStatus,errorThrown) {
									},
									success: function(d){
										paramArr[i] = "";
									}
								});
							}
						}
						setTimeout(function(){$("#errorTip").hide()},5000)
					}
					
					
				}
			});
			
		}
		if(playOrStop == true && Math.abs(parseFloat(videoPoint)-parseFloat(g))>31){
			g = videoPoint;
		}
	}	
	}
};
// 倍速
window.playbackRate = function() {
	document.getElementById("ckplayer_player").playbackRate=4;
}
`
var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);

// 
