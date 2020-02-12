window.outstockApplyList = (function($, module) {
	/*var _username = $("#username").val();*/
	/**
	 * 初始化
	 */
	function init() {
		query();

	}
	function query() {
		$.ajax({
			url : "outstock/getOutstockApplyList",
			type : "GET",
			datatype : "json",
			cache : false,
			success : function(data) {
				showOutstockApplyList(data);
				initPageInfo(data);
			}
		});
	}
	/**
	 * 初始化分页信息
	 */
	function initPageInfo(data) {
		var url = 'outstock/getOutstockApplyList';
		CommonUtils.getAjaxData({
			url : url,
			type : 'GET'
		}, function(data) {
			PageUtils.refreshPageInfo({
				element : 'outstockApplyPage',
				url : url,
				callback : showOutstockApplyList
			}, data['page']);
		});
	}

	/**
	 * 绑定事件
	 */
	function bindEvent() {
		$("input[type='checkbox']").on("click", function() {
			setDeleteIsUsed();
		});
	}

	/**
	 * 删除按钮是否可用
	 */
	function setDeleteIsUsed() {
		var checks = $("input[type='checkbox']:checked");
		if (checks == '' || checks.length == 0) {
			$("#delCheck").attr("disabled", true);
		} else {
			$("#delCheck").attr("disabled", false);
		}
	}

	// 显示
	function showOutstockApplyList(data) {
		
		var html = template('outstockApplyTemp', data);
		$("#tablelist").html("").html(html);
		 CommonUtils.ie8TrChangeColor();
		/*$("tbody tr:odd").css("background", "#EBF5FF");*/
		//出库列表待审核的单子，状态显示红颜色
		/*$(".listTableText").each(function(){
		  var _tdvalue  = $(this).find("td").eq(9).text();
		  if(_tdvalue == '待审核' && _username == $(this).find("input").eq(1).val())
	      {
			  $(this).find("td").eq(9).css("color","red");
	      }
		});*/
		//在出库列表点击出库详情的时候，判断当前的用户是否为审核人，如果是的话，就更换掉跳转的URL
		/*$("tr").click(function(){
		var _reviewer = $(this).find("input").eq(1).val();
		var _hrefurl = $(this).find("a").attr("href").substr(-6);
		if(_reviewer == _username)
		{
			$(this).find("a").attr("href","outstock/toOutStockAduitJsp"+_hrefurl);
		}
		});*/
		$(".time").each(function(i){
			$(".time").eq(i).html($(".time").eq(i).html().substr(0,10));
		});
	}

	
	 /**
     * 批量删除出库信息
     */
  /*  function delOutstockApply(){
        var list = [];//项目中要删除的id集合
        var checks = $("input[type='checkbox']:checked");
        $.each(checks,function(index,obj){
            list.push(obj.id);
        });
        
        if (list.length == 0){
            return;
        }
        
        window.confirm("确定要删除吗?",function(result){
            if (result){
                var deleteOutstockOrderUrl = 'outstock/delOutstockApplys';
                CommonUtils.getAjaxData({
                    url : deleteOutstockOrderUrl,
                    data : JSON.stringify(list),
                    type : 'POST'
                }, function(data) {
                    if(data=="success"){
                        //刷新当前分页数据
                        var current = PageUtils._currentPage['outstockApplyPage'];
        				PageUtils.pageClick(current, 'outstockApplyPage');
                    }
                });
            }
        });
    }*/
    
    
    /**
     * 批量删除出库信息
     */
    function delOutstockApply(){
        var list = [];//项目中要删除的id集合
        var checks = $("input[type='checkbox']:checked");
        $.each(checks,function(index,obj){
            list.push(obj.id);
        });
        
        if (list.length == 0){
            return;
        }
        
        if (!confirm("确定要删除吗?")){
            return;
        }
        
        var deleteOutstockOrderUrl = 'outstock/delOutstockApplys';
        CommonUtils.getAjaxData({
            url : deleteOutstockOrderUrl,
            data : JSON.stringify(list),
            type : 'POST'
        }, function(data) {
            if(data=="success"){
                //刷新当前分页数据
                var current = PageUtils._currentPage['outstockApplyPage'];
                PageUtils.pageClick(current,'outstockApplyPage');
            }
        });
    }
	
	module.init = init;
	module.delOutstockApply = delOutstockApply;
	return module;
}($, window.Material || {}));
$(function() {
	outstockApplyList.init();
});
