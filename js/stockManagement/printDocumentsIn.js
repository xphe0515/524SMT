window.instockOnlyShowInfo = (function($, module) {
	var instockId=$("#instockOrderId").val();
	var instockDate = $("#instockDate").val().substr(0,10);
	function init(){
		if($(".operate_area").attr("id") == 1){
			$(".operate_area").html("");
		}
		query();
		$("#instockDate").val(instockDate);
	} 
	function query	(){
		$.ajax({
			url : "instock/getInstockApplyDetails?instockId="+instockId,
			type : "GET",
			datatype : "json",
			cache : false,
			success : function(data) {
				showInstockApplyDetailList(data);
				initPageInfo(data);
			}
		});
	}
	function initPageInfo(data) {
		var url = "instock/getInstockApplyDetails?instockId="+instockId;
		CommonUtils.getAjaxData({
			url : url,
			type : 'GET'
		}, function(data) {
			PageUtils.refreshPageInfo({
				element : 'instockDetailPage',
				url : url,
				callback : showInstockApplyDetailList
			}, data['page']);
		});
	}
	// 显示
	function showInstockApplyDetailList(data) {
		
		var html = template('instockApplyDetailTemp', data);
		$("#tablelist").html("").html(html);
		CommonUtils.ie8TrChangeColor();
		//二维码加载的时候，此方法在拼接内容之后
		//二维码加载的时候，此方法在拼接内容之后
	/*	$(".info_area td").hover(function() {
			$(this).parent().children().addClass("td_hover");
			$(this).append("<div class='twocode_hover'><img src="+$(this).parent().find("input").val() +" /></div>");
		}, function() {
			$(this).parent().children().removeClass("td_hover");
			$(".twocode_hover").remove();
		});*/
		$(".time").each(function(i){
			$(".time").eq(i).html($(".time").eq(i).html().substr(0,10));
		});
	}
	
	module.init = init; 
	return module;
}($, window.Material || {}));
$(function() {
	instockOnlyShowInfo.init();
});
